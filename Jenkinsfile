pipeline {
    agent any

    environment {
        SSH_HOST = '172.16.62.133'
        SSH_USER = 'esraa'
        SSH_CREDENTIALS = credentials('jenkins-key')
        APP_DIR = '/var/www/html/'
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

        stage('Install Dependencies') {
            steps {
                script {
                    if (fileExists('package-lock.json')) {
                        sh 'npm install'
                    } else if (fileExists('yarn.lock')) {
                        sh 'yarn install'
                    }
                }
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