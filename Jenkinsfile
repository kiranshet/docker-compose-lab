pipeline { agent any

    environment {
        IMAGE_NAME = "kiran588/node-demo"
        IMAGE_TAG = "v${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                docker build -t $IMAGE_NAME:$IMAGE_TAG .
                '''
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'USERNAME',
                    passwordVariable: 'PASSWORD'
                )]) {
                    sh '''
                    echo $PASSWORD | docker login -u $USERNAME --password-stdin
                    docker push $IMAGE_NAME:$IMAGE_TAG
                    '''
                }
            }
        }

	stage('Helm Lint') {
 	   steps {
        sh 'helm lint helm'
    			}
	}

stage('Helm Package') {
    steps {
        sh 'helm package helm'
    }
}

stage('Deploy to Kubernetes') {
    steps {
        sh '''
        helm upgrade --install node-demo helm
        '''
    }
}


        stage('Update Helm values.yaml') {
            steps {
                sh '''
                sed -i "s/tag:.*/tag: \\"$IMAGE_TAG\\"/" helm/values.yaml
                echo "Updated values.yaml:"
                grep tag helm/values.yaml
                '''
            }
        }
    }

    post {
        success {
            echo "Pipeline completed successfully!"
        }
    }
}
