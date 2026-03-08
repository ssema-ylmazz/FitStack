# Fitness Tracking API - OpenAPI Specification

**OpenAPI Spesifikasyon Dosyası:** [openapi.yaml](openapi.yaml)

Bu doküman, kullanıcıların egzersiz programlarını takip ettiği sistemi tanımlayan **OpenAPI 3.0.3** standardına uygun bir API tasarımı içermektedir.

## OpenAPI Specification

```yaml
openapi: 3.0.3

info:
  title: Fitness Tracking API
  description: Kullanıcıların egzersiz programlarını takip ettiği sistem
  version: 1.0.0

servers:
  - url: http://localhost:3000/v1
    description: Development Server

tags:
  - name: auth
    description: Kullanıcı kayıt ve giriş işlemleri
  - name: users
    description: Kullanıcı profil işlemleri
  - name: programs
    description: Egzersiz programları
  - name: workouts
    description: Antrenman kayıtları
  - name: badges
    description: Rozet işlemleri
  - name: streak
    description: Günlük seri işlemleri

paths:
  /users/register:
    post:
      tags:
        - auth
      summary: Kullanıcı kaydı
      description: Yeni kullanıcı sisteme kayıt olur
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UserRegister'
      responses:
        '201':
          description: Kullanıcı oluşturuldu

  /users/login:
    post:
      tags:
        - auth
      summary: Kullanıcı girişi
      description: Kullanıcı email ve şifre ile giriş yapar
      responses:
        '200':
          description: Giriş başarılı

  /users/profile:
    get:
      tags:
        - users
      summary: Profil görüntüleme
      responses:
        '200':
          description: Profil bilgileri döner
    put:
      tags:
        - users
      summary: Profil güncelleme
      responses:
        '200':
          description: Profil güncellendi
    delete:
      tags:
        - users
      summary: Hesap silme
      responses:
        '204':
          description: Hesap silindi

  /users/points:
    get:
      tags:
        - users
      summary: Toplam puanı görüntüleme
      responses:
        '200':
          description: Kullanıcı puanı

  /programs:
    get:
      tags:
        - programs
      summary: Program listeleme
      responses:
        '200':
          description: Program listesi

  /programs/{id}:
    get:
      tags:
        - programs
      summary: Program detay görüntüleme
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Program detayı

  /programs/{id}/select:
    post:
      tags:
        - programs
      summary: Program seçme
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Program seçildi

  /workouts:
    post:
      tags:
        - workouts
      summary: Antrenman kaydı oluşturma
      responses:
        '201':
          description: Antrenman kaydedildi
    get:
      tags:
        - workouts
      summary: Geçmiş antrenmanları görüntüleme
      responses:
        '200':
          description: Antrenman listesi

  /workouts/{id}/points:
    put:
      tags:
        - workouts
      summary: Antrenman tamamlanınca puan kazanma
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Puan eklendi

  /workouts/{id}:
    delete:
      tags:
        - workouts
      summary: Antrenman kaydını silme
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '204':
          description: Antrenman silindi

  /badges:
    post:
      tags:
        - badges
      summary: Rozet kazanma
      responses:
        '201':
          description: Rozet eklendi
    get:
      tags:
        - badges
      summary: Rozetleri görüntüleme
      responses:
        '200':
          description: Kullanıcı rozetleri

  /streak:
    get:
      tags:
        - streak
      summary: Günlük seri görüntüleme
      responses:
        '200':
          description: Seri bilgisi
    put:
      tags:
        - streak
      summary: Seri bilgisi güncelleme
      responses:
        '200':
          description: Seri güncellendi

components:
  schemas:
    UserRegister:
      type: object
      required:
        - email
        - password
        - username
      properties:
        email:
          type: string
        password:
          type: string
        username:
          type: string
