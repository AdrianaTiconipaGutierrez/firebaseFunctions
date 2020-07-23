# CLOUD FUNCTIONS
```
git status
git pull origin master
git add <file>
git commit -m “message or remarks about the action done”
git push origin
git status
```
Cloud Functions para Firebase es un framework sin servidores que te permite ejecutar de forma automática el código de backend en respuesta a las solicitudes HTTPS. Tu código JavaScript o TypeScript se almacena en la nube de Google y se ejecuta en un entorno administrado. No necesitas administrar ni escalar tus propios servidores.

[Cloud Functions para firebase](https://firebase.google.com/docs/functions) 

## RUTA DE IMPLEMENTACION

### CONFIGURA CLOUD FUNCTIONS

### ESCRIBE FUNCIONES

### IMPLEMETA Y SUPERVISA

##  ¿QUE PODEMOS HACER CON CLOUD FUNCTIONS?

### Ejecuta la limpieza y el mantenimiento de la base de datos.

Con la **administración de eventos de base de datos de Cloud Functions**, puedes modificar Realtime Database o Cloud Firestore en respuesta al comportamiento del usuario a fin de mantener el sistema actualizado y limpio.

![9](https://user-images.githubusercontent.com/39227411/88200369-0f84e000-cc14-11ea-8488-f793cf41b44f.png)


1. El controlador de eventos de la base de datos de la función detecta eventos de escritura en una ruta de acceso específica y recupera datos del evento con el texto de cualquier mensaje de chat.
2. La función procesa el texto para detectar y quitar el lenguaje inapropiado.
3. La función vuelve a escribir el texto actualizado en la base de datos.

Otros casos: borrar usuarios de la BD, convertir texto en emoji, trabjar con metadatos

### Ejecuta tareas intensivas en la nube en lugar de en la app.

Los desarrolladores pueden aprovechar Cloud Functions para descargar a la nube de Google el trabajo que requiere una gran cantidad de recursos (uso intensivo de CPU o de la red) y que no sería práctico ejecutar en el dispositivo de un usuario.

![10](https://user-images.githubusercontent.com/39227411/88200372-10b60d00-cc14-11ea-9426-eea5d68d0b42.png)

1. Una función se activa cuando un archivo de imagen se sube a Storage.
2. La función descarga la imagen y crea una versión en miniatura.
3. La función escribe la ubicación de esa miniatura en la base de datos, de manera que una app cliente pueda encontrarla y usarla.
4. La función vuelve a subir la miniatura a Storage en una ubicación nueva.
5. La app descarga el vínculo de la miniatura.

### Realiza integraciones con API y servicios de terceros.

Cloud Functions puede ayudar a que tu app funcione mejor con otros servicios a través de llamadas y muestras de API web.

- Crea respuestas automáticas para llamadas telefónicas y mensajes SMS.

- Crea un chatbot con el Asistente de Google.

### Notifica a los usuarios cuando ocurre algo interesante.

Los desarrolladores pueden usar Cloud Functions para mantener a los usuarios interesados y actualizados con información relevante sobre la app.

![8](https://user-images.githubusercontent.com/39227411/88200367-0e53b300-cc14-11ea-889a-1971fbe4c771.png)

Otros casos: enviar correos elctronicos de confirmación, bienvenida,o sms!

## TRABAJAREMOS CON FIRESTORE Y STORAGE


# EMPEZEMOS CON FUNCTIONS!

## Crear un proyecto de Firebase

1. En Firebase console, haz clic en Agregar proyecto y selecciona o ingresa el Nombre del proyecto, y continuar.
[Firebase Consola](`[Firebase consola](https://console.firebase.google.com/?pli=1) `) 
2. Configura Google Analytics para tu proyecto (opcional).
3. Crear Proyecto

## Habilitar Cloud Storage

Pasos a seguir.... 

## Instalar la interfaz de línea de comandos de Firebase

La interfaz de línea de comandos de Firebase (CLI) le permitirá servir la aplicación web localmente e implementar su aplicación web y las funciones de la nube.

Para escribir funciones, necesitarás un entorno de Node.js. Además, si quieres implementarlas en el entorno de ejecución de Cloud Functions, necesitarás Firebase CLI. Te recomendamos usar Node Version Manager para instalar Node.js y npm.

Para instalar la CLI, debe tener instalado npm, que generalmente viene con NodeJS.

Para instalar o actualizar la CLI, ejecute el siguiente comando npm:

### npm install -g firebase-tools

Esto instala el comando firebase disponible de manera global.

Para verificar que la CLI se haya instalado correctamente, abra una consola y ejecute:

### firebase --version

Asegúrese de que la versión de Firebase CLI esté por encima de 4.0.0 para que tenga todas las funciones más recientes requeridas para Cloud Functions. 

Autorice la CLI de Firebase ejecutando:

### firebase login

Asegúrate de estar en el directorio ProyectoAngularFirebase y luego configura Firebase CLI para usar tu Firebase Project:

### firebase use --add

Luego seleccione su ID de proyecto y siga las instrucciones. Cuando se le solicite, puede elegir cualquier Alias, como studyjam, por ejemplo.

## DIRECTORIO FUNCTIONS
Cloud Functions le permite tener fácilmente código que se ejecuta en la nube sin tener que configurar un servidor. Le mostraremos cómo crear funciones que reaccionen a los eventos de Firestore y Cloud Storage.

Al usar Firebase SDK para Cloud Functions, su código de Funciones estará en el directorio de funciones. Su código de Funciones también es una aplicación Node.js y, por lo tanto, necesita un paquete.json que brinde información sobre su aplicación y enumere las dependencias.

### cd functions
### ls

El archivo package.json ya enumera dos dependencias requeridas: Firebase SDK para Cloud Functions y Firebase Admin SDK. Para instalarlos localmente, ejecute npm install desde la carpeta de functions:

### npm install

De forma predeterminada, Cloud Functions ejecuta su código en un tiempo de ejecución del Nodo 6. Hemos cambiado esto al tiempo de ejecución del Nodo 8 que está en Beta al especificarlo en el archivo package.json agregando

### "engines": { "node": "8" }

## Importamos Cloud functions y el modulo Firebase Admin

Primero importaremos los módulos requeridos y luego escribiremos tres funciones en lugar de TODO. Primero importemos los módulos de Nodo requeridos.

Se requerirán dos módulos, el módulo de funciones firebase nos permite escribir las reglas de activación de Cloud Functions, mientras que el módulo firebase-admin nos permite usar la plataforma Firebase en un servidor con acceso de administrador, por ejemplo, para escribir en el Cloud Firestore.

![3](https://user-images.githubusercontent.com/39227411/88220447-fb031080-cc30-11ea-932c-93478caf432f.PNG)

Encada documento de la coleccion productos podemos encontrar los campos precio, descripcion, titulo del producto: 

# CLOUD FUNCTIONS FIRESTORE
Cloud Firestore triggers

En nuestra aplicacion nos permite agregar productos electronicos, por lo tanto analizemos la estructura de la base de datos en la consola de FIREBASE, donde esta la coleccion de products.

![4](https://user-images.githubusercontent.com/39227411/88220716-56cd9980-cc31-11ea-97d4-243047dce5db.PNG)

## CICLO VIDA FUNCIONCLOUD FIRESTORE
![6](https://user-images.githubusercontent.com/39227411/88233532-e2e9bc00-cc45-11ea-988b-13a488b73090.PNG)

## Activadores de funciones de Cloud Firestore

![7](https://user-images.githubusercontent.com/39227411/88233758-1debef80-cc46-11ea-8fc6-24fce09d87a3.PNG)

### Define un activador de función
Para definir un activador de Cloud Firestore, especifica la ruta de acceso de un documento y un tipo de evento:

![8](https://user-images.githubusercontent.com/39227411/88234482-fb0e0b00-cc46-11ea-8e10-ea63b54f9915.PNG)
Las rutas de acceso de los documentos pueden hacer referencia a un documento específico o un patrón de comodín.
Si deseas conectar un activador a un grupo de documentos, como cualquier documento de una colección determinada, utiliza un {wildcard} en lugar del ID del documento:

![9](https://user-images.githubusercontent.com/39227411/88234483-fc3f3800-cc46-11ea-85ec-349503399392.PNG)

Las coincidencias de comodines se extraen de la ruta del documento y se almacenan en **context.params.** Puedes definir tantos comodines como desees para sustituir los ID explícitos de colección o de documento.

Importante: Las rutas de acceso de los documentos no deben contener barras finales.

### Activa una función cuando se cree un documento nuevo

Activa una función cuando se cree un documento nuevo

Puedes usar un controlador onCreate() con un comodín para que se active una función cada vez que se cree un documento nuevo en una colección. Esta función de ejemplo llama a createUser cada vez que se agrega un nuevo perfil de usuario:
![10](https://user-images.githubusercontent.com/39227411/88235925-dc5d4380-cc49-11ea-81b6-5155926dd0e3.PNG)

- Escribir datos

Cada invocación de función está asociada a un documento específico de tu base de datos de Cloud Firestore. Puedes acceder a ese documento como una DocumentReference en la propiedad ref de la instantánea que se mostró a tu función.

Esta DocumentReference proviene del SDK de Cloud Firestore para Node.js que incluye métodos (como **update()**, **set()** y **remove()**) que te permiten modificar fácilmente el documento que activó la función.

- Datos fuera del evento activador

![11](https://user-images.githubusercontent.com/39227411/88236796-d7998f00-cc4b-11ea-9f94-4c8b613dd2ba.PNG)


Las funciones de Cloud Functions se ejecutan en entornos de confianza, lo que significa que están autorizadas como una cuenta de servicio en tu proyecto. Puedes realizar operaciones de lectura y escritura con el SDK de Firebase Admin:

## TEORIA FUNCTIONS FIRESTORE
## MANOS A LA OBRA
Para detectar cuándo se publican nuevos PRODUCTS,se usara  functions.firestore.document().onCreate Cloud Functions Trigger  que ejecuta su código cuando se crea un nuevo objeto en una ruta determinada de Cloud Firestore. 

Agregue la función ................  en su archivo index.js:
![fries](https://user-images.githubusercontent.com/39227411/88226014-749efc80-cc39-11ea-9e29-e80fecd9837c.PNG)



## MODIFICAR IMAGEN TAMAñO

Por lo tanto la primera función en la nube sera para reconocer ....

Como se trata de una operación asincrónica, debemos devolver la Promesa que indica cuándo finalizó la escritura de Cloud Firestore, para que las Funciones no salgan de la ejecución demasiado pronto.

## Deploy the Function
La función solo estará activa después de que la haya implementado. En la línea de comando ejecutar

### firebase deploy --only functions

porque habilitamos las API en su Proyecto Google Cloud. La duración de la implementación también depende de la cantidad de funciones que se implementen y aumentará a medida que agregue más con el tiempo.

# CLOUD FUNCTIONS STORAGE 

Puedes activar una función en respuesta a la carga, actualización o eliminación de archivos y carpetas en Cloud Storage.

Activa una función en los cambios de Cloud Storage

Usa functions.storage para crear una función que maneje los eventos de Cloud Storage. Según si deseas definir el permiso de la función para un depósito específico de Cloud Storage o usar el depósito predeterminado, usa una de las siguientes opciones:

- **functions.storage.object()** para detectar cambios en los objetos del depósito de almacenamiento predeterminado
- **functions.storage.bucket('bucketName').object()** para detectar los cambios en los objetos de un depósito específico.

Cloud Storage admite los siguientes eventos:

Se quitó el controlador de eventos onChange. En su lugar, la versión 1.0 admite los eventos siguientes:

- onArchive: Solo se envía cuando un depósito tiene habilitado el control de versiones de objetos. Este evento señala que la versión publicada de un objeto se convirtió en una versión archivada, ya sea porque se la archivó o porque se reemplazó cuando se subió un objeto con el mismo nombre.
- onDelete: Se envía cuando se borra un objeto de manera permanente. Incluye los objetos que se reemplazan o se borran según la configuración del ciclo de vida del depósito. En el caso de los depósitos que tienen habilitado el control de versiones de objetos, no este evento se envía cuando se archiva un objeto (consulta onArchive), incluso si el archivado se produce mediante el método storage.objects.delete.
- onFinalize: Se envía cuando se crea correctamente un objeto nuevo (o una nueva generación de un objeto existente) en el depósito. Incluye la copia o la reescritura de un objeto existente. Una carga con errores no activa este evento.
- onMetadataUpdate: Se envía cuando cambian los metadatos de un objeto existente.


![storadfe](https://user-images.githubusercontent.com/39227411/88226490-23dbd380-cc3a-11ea-9804-9edc9300c972.PNG)

## Accede a los atributos de objetos de Storage

const fileBucket = object.bucket; // El depósito de almacenamiento que contiene el archivo

const filePath = object.name; // Ruta del archivo en el bucket deposito.

const contentType = object.contentType; // Tipo de contenido del archivo.

const metageneration = object.metageneration; //Número de veces que se han generado metadatos. Los nuevos objetos tienen un valor de 1.

## Descarga, transforma y sube un archivo

En algunos casos, es posible que no sea necesario descargar archivos desde Cloud Storage. Sin embargo, para realizar tareas intensivas, como generar una imagen en miniatura de un archivo almacenado en Cloud Storage, debes descargar archivos en la instancia de las funciones, es decir, en la máquina virtual que ejecuta el código.

Para descargar objetos y volver a subirlos a Cloud Storage con facilidad, instala el paquete de Google Cloud Storage mediante el comando npm install --save @google-cloud/storage y, luego, impórtalo. Si quieres usar promesas de JavaScript para controlar procesos externos, como las tareas de procesamiento de miniaturas de la muestra, importa también child-process-promise:

### const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp()
const spawn = require('child-process-promise').spawn;
const path = require('path');
const os = require('os');
const fs = require('fs');

### Descargar un archivo

Usa **gcs.bucket.file(filePath).download** para descargar un archivo en un directorio temporal en tu instancia de Cloud Functions. En esta ubicación, puedes procesar el archivo según sea necesario y, luego, subirlo a Cloud Storage. Cuando ejecutes tareas asíncronas, asegúrate de mostrar una promesa de JavaScript en tu devolución de llamada.

Para moderar imágenes, realizaremos el siguiente proceso:

1. Verficficar se ha subido una imagen
2. Descargar la imagen de manera tenporal
3. Modificar la imagen
4. Subir la imagen a cloud Storage

## 
## MODIFICAMOS LAS IMAGENES 


Para moderar las imágenes necesitaremos algunos paquetes de Node.js:

## ADMINISTRAR DEPENDENCIAS
Las funciones pueden usar módulos de Node.js externos y datos locales. Las dependencias en Node.js se administran con npm y se expresan en un archivo de metadatos llamado package.json. Por lo general, los entornos de ejecución de Node.js para Cloud Functions admiten la instalación mediante npm o yarn.
A fin de especificar una dependencia para tu función, agrégala a tu archivo package.json.


Luego, la dependencia se importa en la función:

Instalar módulos de Node.js localmente con npm

La manera más fácil de instalar un módulo de Node.js de forma local implica usar el comando npm install en la carpeta que contiene la Cloud Function. Por ejemplo, el siguiente comando agrega el módulo uuid:

### npm install uuid

Esto combina dos pasos:

    Marca la última versión del módulo como una dependencia en tu archivo package.json. Esto es muy importante: Cloud Functions solo instala módulos que están declarados en tu archivo package.json.
    Descarga el módulo en tu directorio node_modules. Esto te permite usar el módulo cuando desarrollas de forma local.

Carga módulos Node.js

Utiliza la función require() de Node.js para cargar cualquier módulo de Node.js que instales. También puedes usar la función require() para importar archivos locales que implementes junto con tu función.
# PROCESO 
## Borra los archivos temporales siempre

El almacenamiento en el directorio temporal del disco local es un sistema de archivos en la memoria. Los archivos que escribes consumen memoria disponible en tu función y a veces persisten entre invocaciones. No borrar estos archivos explícitamente podría generar un error por falta de memoria y un posterior inicio en frío.

## Instalamos dependencias para el proceso de las imagenes en cloud storage

- npm i @google-cloud/storage –save
- npm i fs-extra –save
- npm i sharp --save
- npm i imagemin --save
- npm i imagemin-pngquant --save
- npm i imagemin-mozjpeg --save
Esto instalará los dos paquetes localmente y los agregará como dependencias declaradas en su archivo package.json.


Para instalar estos dos paquetes en su aplicación Cloud Functions, ejecute el siguiente comando 
### npm install --save.
Asegúrese de hacerlo desde el directorio de funcionts.

##  Importar y configurar dependencias

Para importar las dos dependencias que se instalaron y algunos módulos principales de Node.js (path, os y fs) que necesitaremos en esta sección, agregue las siguientes líneas en la parte superior de su archivo index.js:

IMAGEN DE REQUIRE !

![5](https://user-images.githubusercontent.com/39227411/88222831-89c55c80-cc34-11ea-8441-82e15554d46c.PNG)

Utilizará el trigger de Cloud Functions  functions.storage.onChange  que ejecuta su código tan pronto como se cree o modifique un archivo o carpeta en un depósito de Cloud Storage. Agregue la función ............. en su archivo index.js:

EJEMPLO DE CLOUD FUNCITON STORAGE MODIFICAR
![fstorage](https://user-images.githubusercontent.com/39227411/88223708-e117fc80-cc35-11ea-8c5a-6465b7a03289.PNG)


##  funcion que modifica la imagen MODOFICAR

![modificarImagen](https://user-images.githubusercontent.com/39227411/88225403-6f8d7d80-cc38-11ea-8471-dd85c64680f4.PNG)

En la función anterior, la imagen binaria se descarga desde Cloud Storage. Luego, la imagen se vuelve borrosa con la herramienta de conversión de ImageMagick y la versión borrosa se vuelve a cargar en el Storage Bucket. Luego eliminamos el archivo en la instancia de Cloud Functions para liberar espacio en el disco, lo hacemos porque la misma instancia de Cloud Functions puede reutilizarse y, si no se limpian los archivos, podría quedarse sin disco. Finalmente, agregamos un booleano al mensaje de chat que indica que la imagen fue moderada, esto desencadenará una actualización del mensaje en el cliente.




## PATH 

- path: base name example = '/Users/Refsnes/demo_path.js'" BASENAME=  demo_path.js

- os.join : ('one', 'two', 'three') : 'one/two/three' OR ('/', 'one', 'two', 'three') : '/one/two/three'

- os.path.basename(path) : EJEMPLO   '/one/two/three' : 'three' OR '/one/two/three/' : ''

- os.path.dirname(path) :  devuelve la primera parte de la ruta : '/one/two/three' : '/one/two'


## Blurin Imagen
## DEPLOY FUNCTION
La función solo estará activa después de que la haya implementado. En la línea de comando, ejecute firebase deploy, solo funciones:
### firebase deploy --only functions

**REQUERIMIENTOS:**

- IDE TEXT editor
- Terminal para ejecutar comandos de shell con NODEJS v8 or 10
- Reposirorio 
Las versiones 8 y 10 de Node.js son compatibles. 
 ## Clonar el projecto
 ### git clone https://github.com/firebase/friendlychat
### Inicializa el SDK de Firebase para Cloud Functions

Para inicializar tu proyecto, haz lo siguiente:

- Ejecuta firebase login para acceder a través del navegador y autenticar la herramienta de Firebase.
- Ve al directorio del proyecto de Firebase.
- Ejecuta firebase init functions. La herramienta te ofrece una opción para instalar las dependencias con npm. Es seguro rechazarla si quieres administrar las dependencias de otra manera, pero, si lo haces, deberás ejecutar npm install antes de emular o implementar tus funciones.
- La herramienta te ofrece dos opciones de lenguaje:
        JavaScript
        TypeScript: Consulta Escribe funciones en TypeScript para obtener más información

### Importa los módulos requeridos para inicializar una app

Por defecto FIREBASE CLI  instala automaticamnet los modulos de Node y el SDK de firebase para Cloud Functions al inicializar el proyecto! 

### BIBLIOTECAS DE TERCEROS:
 - Modificar el archivo package.json
 - Ejecutar npm install
 
 ## 
 
 Las funciones controladas por eventos, como los eventos de Cloud Firestore son asíncronas. La función de devolución de llamada debería mostrar null, un objeto o una promesa. Si no se muestra nada, se agota el tiempo de espera de la función, se indica un error y se hace un nuevo intento. Consulta Síncrono, asíncrono y promesas.
 
 ## Implementa funciones en un entorno de producción
 
 Ejecuta este comando para implementar las funciones:
 
 
###  firebase deploy --only functions
 
 
 
COMO FUNCIONA: 

![10](https://user-images.githubusercontent.com/39227411/87824891-1db5b380-c844-11ea-85f7-28223ee633d4.png)

    onArchive: Solo se envía cuando un depósito tiene habilitado el control de versiones de objetos. Este evento señala que la versión publicada de un objeto se convirtió en una versión archivada, ya sea porque se la archivó o porque se reemplazó cuando se subió un objeto con el mismo nombre.
    
    onDelete: Se envía cuando se borra un objeto de manera permanente. Incluye los objetos que se reemplazan o se borran según la configuración del ciclo de vida del depósito. En el caso de los depósitos que tienen habilitado el control de versiones de objetos, no este evento se envía cuando se archiva un objeto (consulta onArchive), incluso si el archivado se produce mediante el método storage.objects.delete.
    
    onFinalize: Se envía cuando se crea correctamente un objeto nuevo (o una nueva generación de un objeto existente) en el depósito. Incluye la copia o la reescritura de un objeto existente. Una carga con errores no activa este evento.
    
    onMetadataUpdate: Se envía cuando cambian los metadatos de un objeto existente.



![5](https://user-images.githubusercontent.com/39227411/87825560-5904b200-c845-11ea-87ab-f86e52723c9b.PNG)
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
