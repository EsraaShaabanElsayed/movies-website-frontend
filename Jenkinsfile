pipeline {
    agent any

    environment {
        SSH_HOST = '172.16.62.133'
        SSH_USER = 'esraa'
        SSH_CREDENTIALS = credentials('jenkins-key')
        APP_DIR = '/var/www/html/'
        NODEJS_TOOL = 'NodeJS' // Ensure this matches the NodeJS installation name in Jenkins
    }

    tools {
        nodejs "${NODEJS_TOOL}" // Use Node.js version managed by the NodeJS plugin
    }

    stages {
        stage('Checkout') {
            steps {
                git(
                    url: 'https://github.com/EsraaShaabanElsayed/movies-website-frontend.git',
                    branch: 'main'
                )
            }
        }
        stage('Clean and Install Dependencies') {
            steps {
                sh 'rm -rf node_modules'
                sh 'npm install'
                sh 'npm audit fix'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Deploy') {
            steps {
                script {
                    sshagent(credentials: [SSH_CREDENTIALS]) {
                        sh "scp -r build/* ${SSH_USER}@${SSH_HOST}:${APP_DIR}"
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
