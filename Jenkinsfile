pipeline {
    agent any

    options {
        timestamps()
    }

    stages {
        stage('Checkout') {
            steps {
                echo '=== Checkout ==='
                echo 'FitStack deposu Jenkins workspace içine alınır.'
                echo 'Job tipi: "Pipeline script from SCM" önerilir; böylece checkout scm çalışır.'
                checkout scm
            }
        }

        stage('Backend install') {
            steps {
                echo '=== Backend install ==='
                dir('backend') {
                    sh '''
                        set -e
                        if npm ci; then
                          echo 'backend: npm ci tamam.'
                        else
                          echo 'UYARI: npm ci başarısız; npm install deneniyor (lock uyumsuzluğu olabilir).'
                          npm install
                        fi
                    '''
                }
            }
        }

        stage('Backend syntax check') {
            steps {
                echo '=== Backend syntax check ==='
                echo 'package.json içindeki npm test şimdilik placeholder; node --check kullanılıyor.'
                dir('backend') {
                    sh 'node --check server.js'
                }
            }
        }

        stage('Web frontend install') {
            steps {
                echo '=== Web frontend install ==='
                dir('fitstack-frontend') {
                    sh '''
                        set -e
                        if npm ci; then
                          echo 'fitstack-frontend: npm ci tamam.'
                        else
                          echo 'UYARI: npm ci başarısız; npm install deneniyor.'
                          npm install
                        fi
                    '''
                }
            }
        }

        stage('Web frontend build') {
            steps {
                echo '=== Web frontend build ==='
                dir('fitstack-frontend') {
                    sh 'npm run build'
                }
            }
        }

        stage('Docker compose build') {
            steps {
                echo '=== Docker compose build ==='
                echo 'İmaj push veya sunucu deploy bu pipeline içinde YOK; yalnızca docker compose build.'
                sh '''
                    if ! command -v docker >/dev/null 2>&1; then
                      echo 'HATA: docker komutu bulunamadı. Jenkins agent üzerinde Docker kurulu olmalı.'
                      exit 1
                    fi
                    if docker compose version >/dev/null 2>&1; then
                      docker compose build
                    elif command -v docker-compose >/dev/null 2>&1; then
                      echo 'UYARI: docker compose yok; docker-compose kullanılıyor.'
                      docker-compose build
                    else
                      echo 'HATA: docker compose veya docker-compose bulunamadı.'
                      exit 1
                    fi
                '''
            }
        }
    }
}
