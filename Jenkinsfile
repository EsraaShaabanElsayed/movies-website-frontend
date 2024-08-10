pipeline {
    agent any

    environment {
        SSH_HOST = '172.16.62.133'
        SSH_USER = 'esraa'
        SSH_CREDENTIALS = credentials('jenkins-key')
        APP_DIR = '/var/www/html/'
        NODE_VERSION = '18'
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
        stage('Setup') {
            steps {
                script {
                    // Ensure nvm is installed and sourced
                    sh '''
                    export NVM_DIR="$HOME/.nvm"
                    if [ -s "$NVM_DIR/nvm.sh" ]; then
                        . "$NVM_DIR/nvm.sh"
                        nvm install $NODE_VERSION
                        nvm use $NODE_VERSION
                    else
                        echo "nvm is not installed."
                        exit 1
                    fi
                    '''
                }
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                    // Check for package-lock.json or yarn.lock
                    if (fileExists('package-lock.json')) {
                        sh 'npm install'
                    } else if (fileExists('yarn.lock')) {
                        sh 'yarn install'
                    } else {
                        echo 'No package-lock.json or yarn.lock found, skipping dependency installation.'
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
