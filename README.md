# firebaseFunctions

Aprenderemos a usar el sdk de firebase para usar Google cloud functions

Implementaremos Functions en FIRESTORE Y STORAGE, para fucntions se realizara de acuerdo a la base de datos alos cambios estos pueden ser cuando se activen lo siguientes: 


![5](https://user-images.githubusercontent.com/39227411/87825560-5904b200-c845-11ea-87ab-f86e52723c9b.PNG)

COMO FUNCIONA: 

![10](https://user-images.githubusercontent.com/39227411/87824891-1db5b380-c844-11ea-85f7-28223ee633d4.png)


![9](https://user-images.githubusercontent.com/39227411/87824934-2e662980-c844-11ea-850d-6e6a347cee36.png)

En cambio en Cloud Storage : 
 
 
# REQUERIMIENTOS

## Para utilizar cloud Functions es necesario   instalara Node Js

- Intall  Node.js > 8 
- node -v

## Instalar Firebase - Tools 

- npm -g install firebase-tools
- firebase –versión

![firebase tools](https://user-images.githubusercontent.com/39227411/87824786-ec3ce800-c843-11ea-8894-c9daaf9a67ac.PNG)


## En code editor

- Ingresar al proyecto que estamos trabajando cd Proyecto
- Firebase login
### Firebase CLI accede ala cuenta de Google

![firebase login 0](https://user-images.githubusercontent.com/39227411/87824588-8a7c7e00-c843-11ea-886d-8fadcbda8d63.PNG)

### Seleccionamos nuestra cuenta

![firebase login -1](https://user-images.githubusercontent.com/39227411/87824596-8d776e80-c843-11ea-9092-15afcdb32402.PNG)

NOs logueamos 

![firebase login](https://user-images.githubusercontent.com/39227411/87824600-8f413200-c843-11ea-8c44-ab125b08260f.PNG)

En consola


![firebase login2](https://user-images.githubusercontent.com/39227411/87824701-c0b9fd80-c843-11ea-9b2f-93ed9ba375b4.PNG)

## Iniciamos el proyecto
- Firebase init 


![firebase init](https://user-images.githubusercontent.com/39227411/87824541-78024480-c843-11ea-88a9-a07a156ba9d0.PNG)


- Escojemos firebase Functions

## Instalamos librerias para el proceso de las imagenes en cloud storage

- npm i @google-cloud/storage –save
- npm i fs-extra –save
- npm i sharp --save
- npm i imagemin --save
- npm i imagemin-pngquant --save
- npm i imagemin-mozjpeg --save



## ESTRUCTURA DE FUNCTIONS
