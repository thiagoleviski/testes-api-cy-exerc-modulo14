/// <reference types="cypress" />
import usuarios from '../contracts/usuarios.contract'

let nome = `atividade${Math.floor(Math.random() * 1000)}`;
let email = nome + "@testador.com.br";


describe('Testes da Funcionalidade Usuários', () => {
     it('Deve validar contrato de usuários', () => {
          cy.request('usuarios').then(response => {
               return usuarios.validateAsync(response.body)
          })
     });

     it('Deve listar usuários cadastrados', () => {
          cy.request({
               method: 'GET',
               url: 'usuarios'
          }).then((response) => {
               expect(response.status).to.equal(200)
               expect(response.body).to.have.property('usuarios')
               expect(response.body).to.have.property('quantidade')
               expect(response.duration).to.be.lessThan(17)
               expect(response.body.quantidade).to.be.not.equal(0)
          })
     });

     it('Deve cadastrar um usuário com sucesso', () => {

          cy.request({
               method: 'POST',
               url: 'usuarios',
               body: {
                    "nome": nome,
                    "email": email,
                    "password": "teste",
                    "administrador": "true"

               }
          }).then((response) => {
               expect(response.status).to.equal(201)
               expect(response.body.message).to.equal('Cadastro realizado com sucesso')
               expect(response.body._id).to.be.not.equal("")
          })
     });

     it('Deve validar um usuário com email inválido', () => {

          cy.request({
               method: 'POST',
               url: 'usuarios',
               body: {
                    "nome": nome,
                    "email": email,
                    "password": "teste",
                    "administrador": "true"

               },
               failOnStatusCode: false
          }).then((response) => {
               expect(response.status).to.equal(400)
               expect(response.body.message).to.equal('Este email já está sendo usado')
               expect(response.duration).to.be.lessThan(20)
          })
     });

     it('Deve editar um usuário previamente cadastrado', () => {

          cy.request({
               method: 'GET',
               url: 'usuarios'
          }).then((response) => {
               let id = response.body.usuarios[0]._id

               cy.request({
                    method: 'PUT',
                    url: `usuarios/${id}`,
                    body:
                    {
                         "nome": "Alterei meu nome",
                         "email": nome+"@qa.com.br",
                         "password": "teste",
                         "administrador": "true"
                    }
               }).then(response => {
                    expect(response.body.message).to.equal('Registro alterado com sucesso')
                    expect(response.duration).to.be.lessThan(27)
                    expect(response.status).to.equal(200)
               })
          })

          it('Deve deletar um usuário previamente cadastrado', () => {
               let id = response.body.usuarios[0]._id
               cy.request({
                    method: 'DELETE',
                    url: `usuarios/${id}`,
               }).then(response => {
                    expect(response.body.message).to.equal('Registro excluído com sucesso')
                    expect(response.status).to.equal(200)
               })
          })
     });
})