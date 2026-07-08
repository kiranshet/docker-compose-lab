pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Node Version') {
            steps {
                sh 'node --version'
                sh 'npm --version'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t kiran588/node-demo:latest .'
            }
        }

        stage('Verify Image') {
            steps {
                sh 'docker images | grep node-demo'
            }
        }
    }
}
