# INTRODUCCION A CLOUD FUNCTIONS
Cloud Functions para Firebase es un framework sin servidores(no necesitas administrar ni escalar tus propios servidores), que te permite ejecutar de forma automática el código de backend en respuesta a las solicitudes HTTPS. Es decir son **funciones en la nube y son activadas cuando sucede un evento particular sucede en tu proyecto de firebase**, cuando creas un documento, o se crrea una nueva cuenta en Firebase auth.

- Escribe algún tipo de lógica en el back-end. Las funciones en la nube le permiten ejecutar lo que es esencialmente código del lado del servidor sin necesidad de configurar un servidor

[Cloud Functions para firebase](https://firebase.google.com/docs/functions) 

Cuando un evento sucede Las funciones en la nube hacen girar una pequeña instancia de servidor, donde la funcion es activada para hacer un tipo de trabajo en respuesta a estos eventos cuando suceden.
Pero estas tareas como enviar notificaciones, estas tareas finales implica hacer ping a otros servicios en la nube, lo que significa que no sucedera al instante, esto tomara un tiempo para el controlador de eventos para comunicarse con Firestore, mientras cloud function esta esperando, monitoreando la funcion hasta que termine, pero como sabe que termino?? ENTONCES LA FUNCION RETORNARA UNA PROMESA, las funciones indican NO ME TERMINES A CLOUD FUNCTION HAY MUCHO POR HACER 
Realizamos una accion escribir en DB, esta llamada me retornará una promesa


## ¿QUE PODEMOS HACER CON CLOUD FUNCTIONS?

### Ejecuta la limpieza y el mantenimiento de la base de datos.

Con la **administración de eventos de base de datos de Cloud Functions**, puedes modificar Realtime Database o Cloud Firestore en respuesta al comportamiento del usuario a fin de mantener el sistema actualizado y limpio.

![9](https://user-images.githubusercontent.com/39227411/88200369-0f84e000-cc14-11ea-8488-f793cf41b44f.png)


1. El controlador de eventos de la base de datos de la función detecta eventos de escritura en una ruta de acceso específica y recupera datos del evento con el texto de cualquier mensaje de chat.
2. La función procesa el texto para detectar y quitar el lenguaje inapropiado.
3. La función vuelve a escribir el texto actualizado en la base de datos.

Otros casos: borrar usuarios de la BD, convertir texto en emoji, trabjar con metadatos

### Ejecuta tareas intensivas en la nube en lugar de la app.

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

Otros casos: enviar correos elctronicos de confirmación, bienvenida,o sms!

# STUDY JAM DE FIREBASE 3RA SESSION, QUE HAREMOS? 

Para este proyecto implementaremos cloud functions con los servicios de firestore y storage
- **FIRESTORE**
![firestoreFunctions](https://user-images.githubusercontent.com/39227411/88378437-fd6b8480-cd6e-11ea-917b-4824ce491d03.PNG)
- **STORAGE**
![storageFunctions](https://user-images.githubusercontent.com/39227411/88378441-ffcdde80-cd6e-11ea-9434-121fd31e7cfc.PNG)
# EMPEZEMOS!!!!! :> CONFIGURACION BASICA
## 1. Crear un proyecto de Firebase

- En Firebase console, haz clic en Agregar proyecto y selecciona o ingresa el Nombre del proyecto, y continuar.

[Firebase Consola](https://console.firebase.google.com/?pli=1)

- Configura Google Analytics para tu proyecto (opcional).
- Crear Proyecto

## 2. Habilitar Cloud Storage y la base de datos 

Pasos a seguir.... 


## 3. Instalar la interfaz de línea de comandos de Firebase

La interfaz de línea de comandos de Firebase (CLI) le permitirá servir la aplicación web localmente e implementar su aplicación web y las funciones de la nube.
### 3.1 Requerimientos

-------
- IDE TEXT editor
- Debe tener instalado Node Js ==>  npm OJO: Las versiones 8 y 10 de Node.js son compatibles.  

Verificamos la instalacion de Node Js:

```diff
node -v
```
- Reposirorio 
 - Clonar el projecto
 - git clone https://github.com/....
 - El archivo package.json ya enumera las dependencias requeridas: Firebase SDK para Cloud Functions, Firebase Admin SDK, y otros. Para instalarlos localmente, ejecute npm install desde la carpeta de functions:)
 ```
 npm install
 ```
```diff
- OJO NODE JS 8 ESTA OBSOLETO PARA FIREBASE FUNCTIONS!!! ==> NODE 10
```
De forma predeterminada, Cloud Functions ejecuta su código en un tiempo de ejecución del Nodo 6. Hemos cambiado esto al tiempo de ejecución del Nodo 8 que está en Beta al especificarlo en el archivo package.json agregando
```
 "engines": { "node": "8" }
```
-----

### 3.2 Instalamos firebase tools:
Para instalar o actualizar la CLI, ejecute el siguiente comando npm:

```
npm install -g firebase-tools
```
Esto instala el comando firebase disponible de manera global.

Para verificar que la CLI se haya instalado correctamente, abra una consola y ejecute:

```
firebase --version
```
![firebase tools](https://user-images.githubusercontent.com/39227411/87824786-ec3ce800-c843-11ea-8894-c9daaf9a67ac.PNG)

```diff
+ Asegúrese de que la versión de Firebase CLI esté por encima de 4.0.0 para que tenga todas las funciones más recientes requeridas para Cloud Functions. 
```

## 4. Autorizamos la linea de comando de firebase:

Para inicializar tu proyecto, haz lo siguiente:

- Ejecuta firebase login para acceder a través del navegador y autenticar la herramienta de Firebase.

```
firebase login
```

![firebase login 0](https://user-images.githubusercontent.com/39227411/87824588-8a7c7e00-c843-11ea-886d-8fadcbda8d63.PNG)

![firebase login -1](https://user-images.githubusercontent.com/39227411/87824596-8d776e80-c843-11ea-9092-15afcdb32402.PNG)

Nos logueamos 

![firebase login](https://user-images.githubusercontent.com/39227411/87824600-8f413200-c843-11ea-8c44-ab125b08260f.PNG)

En consola

![firebase login2](https://user-images.githubusercontent.com/39227411/87824701-c0b9fd80-c843-11ea-9b2f-93ed9ba375b4.PNG)
 
 OJO NO ES NECESARIO!
----------

Asegúrate de estar en el directorio ProyectoAngularFirebase y luego configura Firebase CLI para usar tu Firebase Project:
```
firebase use --add
```
Luego seleccione su ID de proyecto y siga las instrucciones. Cuando se le solicite, puede elegir cualquier Alias, como studyjam, por ejemplo.

----------

## 5. Inicializamos el Proyecto
- Ve al directorio del proyecto de Firebase, podemo realizarlo en nuestra app de angular y firebase.
- Ejecuta firebase init functions. 
```
firebase init 
```

![firebase init](https://user-images.githubusercontent.com/39227411/87824541-78024480-c843-11ea-88a9-a07a156ba9d0.PNG)

- La herramienta te ofrece dos opciones de lenguaje:
        - JavaScript
        - TypeScript
- Escojemos firebase Functions

### 5.1 DIRECTORIO FUNCTIONS
Al realizar firebase init nos genera la carpeta de functions:

Al usar Firebase SDK para Cloud Functions, su código de Funciones estará en el directorio de funciones. Su código de Funciones también es una aplicación Node.js y, por lo tanto, se tiene paquete.json que brinda información sobre la aplicación y enumera las dependencias.

```
cd functions
ls
```

# *TRABAJAMOS CON CLOUD FUNCTIONS Y FIRESTORE*

## TEORIA :( Cloud Firestore triggers

En nuestra aplicacion nos permite agregar productos electronicos, por lo tanto analizemos la estructura de la base de datos en la consola de FIREBASE, donde esta la coleccion de products.

![4] (https://user-images.githubusercontent.com/39227411/88220716-56cd9980-cc31-11ea-97d4-243047dce5db.PNG)

### A. Ciclo de vida de una funcion en cloud firestore

![6](https://user-images.githubusercontent.com/39227411/88233532-e2e9bc00-cc45-11ea-988b-13a488b73090.PNG)

### B. Activadores de funciones de Cloud Firestore

![7](https://user-images.githubusercontent.com/39227411/88233758-1debef80-cc46-11ea-8fc6-24fce09d87a3.PNG)

### C. Guardar Datos en Firebase

![guardar datos](https://user-images.githubusercontent.com/39227411/88312827-a4550f80-cce0-11ea-850f-9c712baf8c39.PNG)

## A CODEAR!!!!

Las funciones controladas por eventos, como los eventos de Cloud Firestore son asíncronas. La función de devolución de llamada debería mostrar null, un objeto o una promesa. Si no se muestra nada, se agota el tiempo de espera de la función, se indica un error y se hace un nuevo intento.
[Ejemplos Basicos Firestore Functions ](https://firebase.google.com/docs/functions/firestore-events) 

### 1. Importar los módulos requeridos para inicializar una app

Por defecto FIREBASE CLI  instala automaticamnetelos modulos de Node y el SDK de firebase para Cloud Functions al inicializar el proyecto! 

- **Importamos Cloud functions y el modulo Firebase Admin**

Primero importaremos los módulos requeridos y luego escribiremos tres funciones. 

Se requerirán dos módulos, el módulo de funciones firebase nos permite escribir las reglas de activación de Cloud Functions, mientras que el módulo firebase-admin nos permite usar la plataforma Firebase en un servidor con acceso de administrador, por ejemplo, para escribir en el Cloud Firestore.

```
//Importamos el SDK de Firebase para Cloud Functions 

const functions = require('firebase-functions');

// Importamos e inicializamos el  Firebase Admin SDK para acceder a Cloud Firestore.

const admin = require('firebase-admin');
admin.initializeApp()
```

### 2. Definir un activador de función

Para definir un activador de Cloud Firestore, especifica la ruta de acceso de un documento y un tipo de evento:

Las rutas de acceso de los documentos pueden hacer referencia a un documento específico o un patrón de comodín.
```
exports.nombreFunción = functions.firestore
.document('miColeccion/idDocumento')
.onCreate((snapshot, context) => {
/*...*/
});
```

Si deseas conectar un activador a un grupo de documentos, como cualquier documento de una colección determinada, utiliza un {wildcard} en lugar del ID del documento:
```
//Escuchar cambios en todos los documentos de coleción PRODUCTS

exports.nombreFunción = functions.firestore
.document('mIColeccion/{documentoId}')
.onCreate((snapshot, context) => {
/*...*/
wildCard= context.params.nombreWildcard;
});
```

- *Las coincidencias de comodines se extraen de la ruta del documento y se almacenan en **context.params.** *

- Puedes definir tantos comodines como desees para sustituir los ID explícitos de colección o de documento.

+ Importante: Las rutas de acceso de los documentos no deben contener barras finales.

### 3. Activa una función cuando se cree un documento nuevo

Puedes usar un controlador onCreate() con un comodín para que se active una función cada vez que se cree un documento nuevo en una colección. 
```
//Escuchar cambios en todos los documentos de colección PRODUCTS

exports.crearProducto = functions.firestore
.document('products/{productId}')
.onCreate((snapshot, context) => {
const productId= context.params.productId;

//Obtenemos un objeto representa documento

const nuevoProducto = snapshot.data();

// Acceder a un campor particular   del objeto

const name = nuevoProducto.name;
console.log(nuevoProducto)
return null;
});
```
---------------
### 4.  Escribir datos

Cada invocación de función está asociada a un documento específico de tu base de datos de Cloud Firestore. Puedes acceder a ese documento como una DocumentReference en la propiedad ref de la instantánea que se mostró a tu función.

Esta DocumentReference proviene del SDK de Cloud Firestore para Node.js que incluye métodos (como **update()**, **set()** y **remove()**) que te permiten modificar fácilmente el documento que activó la función.

- Datos fuera del evento activador

```
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

exports.writeToFirestore = functions.firestore
  .document('some/doc')
  .onWrite((change, context) => {
    db.doc('some/otherdoc').set({ ... });
  });

```


Las funciones de Cloud Functions se ejecutan en entornos de confianza, lo que significa que están autorizadas como una cuenta de servicio en tu proyecto. Puedes realizar operaciones de lectura y escritura con el SDK de Firebase Admin:
--------------

### 5. Ejemplo de Agregar Emojins

Funcion Cloud Functions: 

```
exports.onCreateStars = functions.firestore
    .document('products/{productId}')
    .onCreate((snap, context) => {
        // Obtener un objeto que represente el documento
        const newProduct = snap.data();
        const productId = context.params.productId;


        console.log(`****ID NEW PRODUCT ${productId}`);
        console.log(newProduct);

        if (newProduct) {
            // accede a un campo particular como lo harías con cualquier propiedad JS
            const titleProduct = newProduct.titleProduct;
            const starsProduct = newProduct.starsProduct;
            const descriptionProduct = newProduct.descriptionProduct;

            const titleProductUpper = changeToUpperCase(titleProduct);
            const starsProductEmojin = changeToEmojin(starsProduct);
            // Cada invocacion de funcion esta asociada a un documento de firestore,
            // y se puede acceder al documento como una DocumentReference en la propiedad ref
            // ref.update
            return snap.ref.update({ titleProduct: titleProductUpper, starsProduct: starsProductEmojin});
        }
        else {
            return null;
        }
    });
```
Funcion que replaze un nuemro por emojin
```
function changeToEmojin(text) {
    cantStars = text.match(/[0-9]+/g)[0];
    cantStars = parseInt(cantStars);
    stars = '';
    for (i = 0; i < cantStars; i++) {
        stars = '⭐' + stars;
    }
    return text.replace(/[0-9]+/g, stars);
}


function changeToUpperCase(text) {
    return text.toUpperCase();
}
```
### 6. Ejemplo Sanitizar Palabras

Para detectar cuándo se publican nuevos PRODUCTS,se usara  functions.firestore.document().onCreate Cloud Functions Trigger  que ejecuta su código cuando se crea un nuevo objeto en una ruta determinada de Cloud Firestore. 

```
exports.onWriteSanitizarPalabras = functions.firestore
    .document('products/{productId}')
    .onWrite((change, context) => {
        //change 2 documentos. bfeore . after
        const nuevoProducto = change.after.data();
        console.log(nuevoProducto);
        if (nuevoProducto) {
            const descripcionProducto = nuevoProducto.descriptionProduct;
            const descripcionProductoActualizado = sanitizarTexto(descripcionProducto);
            if (descripcionProducto === descripcionProductoActualizado) {
                console.log('Nda que hacer');
                return null;
            }

            // hacemos una llamada a otro recurso en la nube
            //updtae call nos retorna una promesa,
            //puedo hacer mas una ves que la promesa este resuelta .then()
            return change.after.ref.update({ descripcionProducto: descripcionProductoActualizado })
        }
        else {
            return null;
        }

    })
```
Funcion: 
```
function sanitizarTexto(text) {
    const x = 'fuck';
    const y = text.replace(x, "😘");
    return y;
}

```

Como se trata de una operación asincrónica, debemos devolver la Promesa que indica cuándo finalizó la escritura de Cloud Firestore, para que las Funciones no salgan de la ejecución demasiado pronto.
### 7. Deploy the Function
La función solo estará activa después de que la haya implementado. En la línea de comando ejecutar
```
 firebase deploy --only functions
```
Porque habilitamos las API en su Proyecto Google Cloud. La duración de la implementación también depende de la cantidad de funciones que se implementen y aumentará a medida que agregue más con el tiempo.

# TRABAJAMOS CON CLOUD FUNCTIONS Y STORAGE
![storageFunctions](https://user-images.githubusercontent.com/39227411/88378441-ffcdde80-cd6e-11ea-9434-121fd31e7cfc.PNG)

# TEORIA :( CLOUD FUNCTIONS STORAGE 

Puedes activar una función en respuesta a la carga, actualización o eliminación de archivos y carpetas en Cloud Storage.

[Activadores en Cloud Storage](https://firebase.google.com/docs/functions/gcp-storage-events) 

Cloud Storage admite los siguientes eventos:

Se quitó el controlador de eventos onChange. En su lugar, la versión 1.0 admite los eventos siguientes:

- **onArchive:** Solo se envía cuando un depósito tiene habilitado el control de versiones de objetos. Este evento señala que la versión publicada de un objeto se convirtió en una versión archivada, ya sea porque se la archivó o porque se reemplazó cuando se subió un objeto con el mismo nombre.
- **onDelete:** Se envía cuando se borra un objeto de manera permanente. Incluye los objetos que se reemplazan o se borran según la configuración del ciclo de vida del depósito. En el caso de los depósitos que tienen habilitado el control de versiones de objetos, no este evento se envía cuando se archiva un objeto (consulta onArchive), incluso si el archivado se produce mediante el método storage.objects.delete.
- **onFinalize:** Se envía cuando se crea correctamente un objeto nuevo (o una nueva generación de un objeto existente) en el depósito. Incluye la copia o la reescritura de un objeto existente. Una carga con errores no activa este evento.
- **onMetadataUpdate:** Se envía cuando cambian los metadatos de un objeto existente.

![storadfe](https://user-images.githubusercontent.com/39227411/88226490-23dbd380-cc3a-11ea-9804-9edc9300c972.PNG)

# MODIFICAR IMAGEN TAMAñO

Para optimizar la imagen, realizaremos el siguiente proceso:

![Proceso](https://user-images.githubusercontent.com/39227411/88324930-682aaa80-ccf2-11ea-9107-79f9be933169.PNG)

## DEPENDENCIAS
Debemos instalar 

- Para modificar tamaño de la imagen requerimos la libreria [sharp](https://sharp.pixelplumbing.com/)
```
npm install sharp
```
- Trabajaremos con archivos del sistema, por defecto Nodejstiene su libreria de file system, pero usaremos uan version mejorada:  [fs-extra](https://www.npmjs.com/package/fs-extra)
```
npm install fs-extra
```
Observaciones
```diff
+ Node 8, y la ultima version de fs-extra no trabaja con node 8 
npm i fs-extra@8.0.1 --save
```
- Para optimizar la imagen debemos comprimirla por lo tanto usaremos [imagemin](https://www.npmjs.com/package/imagemin) 

- [imagemin-pngquant](https://www.npmjs.com/package/imagemin-pngquant) 
- [imagemin-mozjpeg](https://www.npmjs.com/package/imagemin-mozjpeg) 

```
npm i imagemin --save
npm i imagemin-pngquant@8.0.0 --save
npm i imagemin-mozjpeg@8.0.0 --save
```

imagemin
Recomendacion librerias: NODE 8 Y VERSIONES 7,8,8

[imagemin-pngquant](https://openbase.io/js/imagemin-pngquant/versions)

[imagemin](https://openbase.io/js/imagemin/versions)

[imagemin-mozjpeg](https://openbase.io/js/imagemin-mozjpeg/versions)

Otra manera ya más fácil de instalar un módulo de Node.js de forma local implica usar el comando npm install en la carpeta que contiene la Cloud Function. Es decir es agregar las dependencias requeridas para la funcion en el archivo package.json y ejecutar el siguiente comando:

 - Modificar el archivo package.json
 - Ejecutar npm install
```
npm install 
```
Asegúrese de hacerlo desde el directorio de functions.

Esto combina dos pasos:

- Marca la última versión del módulo como una dependencia en tu archivo package.json. Esto es muy importante: Cloud Functions solo instala módulos que están declarados en tu archivo package.json.
- Descarga el módulo en tu directorio node_modules. Esto te permite usar el módulo cuando desarrollas de forma local.


## CODIFIQUEMOS!!!!
### Importa los módulos requeridos para inicializar una app

Por defecto FIREBASE CLI  instala automaticamnet los modulos de Node y el SDK de firebase para Cloud Functions al inicializar el proyecto! 

### 0. Importamos las dependencias
```
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp()

const path = require('path');
const os = require('os');
const fs = require('fs');
```
### 1. Activa una función cuando hay un cambio en Cloud Storage

Usa functions.storage para crear una función que maneje los eventos de Cloud Storage. Según si deseas definir el permiso de la función para un depósito específico de Cloud Storage o usar el depósito predeterminado, usa una de las siguientes opciones:

- **functions.storage.object()** para detectar cambios en los objetos del depósito de almacenamiento predeterminado
- **functions.storage.bucket('bucketName').object()** para detectar los cambios en los objetos de un depósito específico.

```
// PRUEBA al subir imagen
exports.optimizarImagen = functions.storage
    .object()
    .onFinalize(async object => {
        console.log('///////////////SE SUBIO UNA IMAGEN');
    });
```

### 2. Accede a los atributos de objetos de Storage
```
const fileBucket = object.bucket; // El depósito de almacenamiento que contiene el archivo: fir-angular-94580.appspot.com 
const filePath = object.name; // Ruta del archivo en el bucket deposito: images/1.jpg 
const contentType = object.contentType; // Tipo de contenido del archivo.: image/jpeg 
const metageneration = object.metageneration; // Número de veces que se han generado metadatos. Los 
```

### 3. Verificamos que el archivo que se subio es una imagen
Trabajamos con contentType
```
        if (!contentType.startsWith('image/')) {
            console.log('No es una imagen');
            return null;
        }
```

### 4. Verificamos si la imagen ya ha sido optimizada

El evento de subir una imagen por completo, activa esta funcion y nuestro programa una vez que optimize la imagen volvera a subir al STORAGE, es por eso que cambiamos de nombre a la imagen y modificamos los metadatos de la imagen

PARA ESTA PARTE PODEMOS HACERLO DE 2 MANERAS: 

- Verificar el nombre del nuevo archivo
- Revisar su metadatos

#### 4.1 Verifiacos por el nombre del archivo: 

Verificar si es una imagen ya optimizada, usamos filePath para capturar el nombre del archivo y verificar si tiene la palabra "thumbnail_"

Para eso usamos la libreria path:

```
const path = require('path');
```
#### PATH 

- path: base name example = '/Users/Refsnes/demo_path.js'" BASENAME=  demo_path.js

- os.join : ('one', 'two', 'three') : 'one/two/three' OR ('/', 'one', 'two', 'three') : '/one/two/three'

- path.basename(path) : EJEMPLO   '/one/two/three' : 'three' OR '/one/two/three/' : ''

- os.path.dirname(path) :  devuelve la primera parte de la ruta : '/one/two/three' : '/one/two'

Capturamos el nombre del archivo
```
const path = require('path');

        
        // Obtenemos el nombre del archivo. 
        const fileName = path.basename(filePath);  //1.jpg
        //Extension del archivo
        const fileExtension = path.extname(filePath);  //.jpg

```

Verificamos si tiene el nombre the "thumbnail_"
```
       // Salir si la imagen ya es una miniatura.
        
      if (fileName.startsWith('thumbnail_')) {
            console.log('*******La imagen ya ha sido optimizada');
            return null;
        }

```
#### 4.2 Verificamos los metadatos de la imagen
Segunda forma de verificar si el archivo ya fue optimizado, en este punto agregaremos metadatos en archivo subido de storage, para esto trabajaremos con el bucket contendor por que necesito propiedades del archivo

PARA ESTO necesitamos obtener los metadatos con la funcion getmetadata(), entonces descargamos el archivo del bucket de deposito


```
        // Descargar archivo del bucket deposito
  
        const bucket = admin.storage().bucket(fileBucket); // Objeto
        const file = bucket.file(filePath); // Objeto


        // Capturamos los metadatos del archivo subido al firebase Storage
        const [data] = await file.getMetadata();//Array metadata

        if (data.metadata.optimized) {
            console.log(`Imagen ya ha sido optimizada`);
            return null;
        }

```

### 5.  DESCARGAMOS EL ARCHIVO DEL BUCKET de firebase storage  A LA CARPETA TEMPORAL
Creamos una carpeta temporal, para eso usamos carpeta temporal del sistema actual con os.tmpdir().
Importamos la librerias necesarias: 
```
const os = require('os');
const fse=require('fs-extra');
```
#### 5.1 GENERAMOS UN DIRECTORIO TEMPORAL Y LA RUTA TEMPORAL DE LA IMAGEN

``` 
        //Generamos un directorio temporal 
        const directoryTemporary = path.join(os.tmpdir(), 'Imagenes'); // /tmp/Imagenes
       
       //Generamos la ruta temporal de la imagen 
        const pathTempFile = path.join(directoryTemporary, fileName);// /tmp/Imagenes/1.jpg 

        //  Aseguramos que se creo el archivo y si  no lo crea
        
        await fse.ensureDir(directoryTemporary).then(console.log('++++++SI CREO EL ARCHIVO'));     

```
#### 5.2 DESCARGAMOS EL ARCHIVO DE STORAGE EN LA RUTA TEMPORAL 

Usa **bucket.file(filePath).download** para descargar un archivo en un directorio temporal en tu instancia de Cloud Functions. En esta ubicación, puedes procesar el archivo según sea necesario y, luego, subirlo a Cloud Storage. Cuando ejecutes tareas asíncronas, asegúrate de mostrar una promesa de JavaScript en tu devolución de llamada.

```
        await bucket.file(filePath).download({ destination:  pathTempFile}).then(console.log('---+++SI DESACARGO'));
```

### 6. Modificamos la imagen desde el directorio Temporal
EMPEZAMOS A MODIFICAR LA IMAGEN ORIGINAL  DESDE LA RUTA TEMPORAL

Generamos un nuevo nombre del archivo que sera modificado. Agregamos un prefijo 'thumbnail_' Y Generamos ruta Temporal del nuevo archivo:

```
        // Generamos un nuevo nombre del archivo que sera modificado. Agregamos un prefijo 'thumbnail_'
        const thumbFileName=`thumbnail_${fileName}`; // thumbnail_1.jpg 
        
        // Generamos ruta Temporal del nuevo archivo
        const pathTempFileThumb= path.join(directoryTemporary, thumbFileName);// /tmp/Imagenes/thumbnail_1.jpg 

```
#### 6.1 Cambiamos el tamaño de la imagen con sharp ==> Redimensionamos
```
         await sharp(pathTempFile)  ///tmp/Imagenes/1.jpg
             .resize(500)
             .toFile(pathTempFileThumb); // /tmp/Imagenes/thumbnail_1.jpg 
```
#### 6.2 Optimizar la imagen
Comprimiremos la imagen con  imagemin
```
     const x=  await imagemin([`${directoryTemporary}/*.{jpg,png,jpeg}`],{
            destination: directoryTemporary,
            plugins: [
                imageminMozjpegt({quality: 50}),
                imageminPngquant([0.3, 0.5])
            ]
        });
```
### 7. Subimos la imagen modificada a Firebase Storag

```
         //SUBIMOS A FIREBASE STORAGE
         
        // Generamos la ruta de la imagen que subiremos a Storage 
        const filePathThumb = path.join(path.dirname(filePath), thumbFileName); //  images/thumbnail_1.jpg 
        
        //Subiendo la miniatura.
        await bucket.upload(pathTempFileThumb, {
            destination: filePathThumb,
            metadata: {metadata: {optimized: true}},
        });
```
### 8. Borra los archivos temporales siempre
Una vez que se haya subido la miniatura, elimine el archivo local para liberar espacio en disco.
El almacenamiento en el directorio temporal del disco local es un sistema de archivos en la memoria. Los archivos que escribes consumen memoria disponible en tu función y a veces persisten entre invocaciones. No borrar estos archivos explícitamente podría generar un error por falta de memoria y un posterior inicio en frío.

```
 return fse.remove(directoryTemporary);
```

 ## DEPLOY FUNCTION
 Implementa funciones en un entorno de producción
 La función solo estará activa después de que la haya implementado. En la línea de comando, ejecute firebase deploy, solo funciones:
 
 Ejecuta este comando para implementar las funciones:
 
```
 firebase deploy --only functions
``` 
## OBSERVACIONES:
 
