pipeline {
    agent any
    bat 'npx serverest@latest'

    stages {
        stage('Clonar repositório') {
            steps {
                git branch: 'master', url: 'https://github.com/thiagoleviski/testes-api-cy-exerc-modulo14.git'
            }
        }
        stage ('Instalar dependências') {
            steps{
                bat 'npm install'
            }
        }
        stage ('Executar testes'){
            steps{
                bat 'npm run cy:run'
            }
        }
        stage ('Executar relatório'){
            steps{
                bat 'npm run cy:report'
            }
        }
    }
}