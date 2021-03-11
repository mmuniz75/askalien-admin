node {
   stage('Checkout') { // for display purposes
      git 'https://github.com/mmuniz75/askalien-admin'
   }
   stage('Install Modules') {
      env.NODEJS_HOME = "${tool 'nodejs'}"
      env.PATH="${env.NODEJS_HOME}/bin:node_modules/@angular/cli/bin:${env.PATH}"
      sh 'npm install'
   }
   stage('Compile Typescript') {
	  sh 'ng build --prod --build-optimizer || true'
    }    
   stage('Sync with AWS') {
	 sh "export PATH=/var/jenkins_home/.local/bin:$PATH && aws s3 sync dist s3://admin.askalien.muniz-api.top/ --delete"
    }    
}
