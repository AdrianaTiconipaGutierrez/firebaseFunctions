const functions = require('firebase-functions');

// Importamos e inicializamos el  Firebase Admin SDK para acceder a Cloud Firestore.

const admin = require('firebase-admin');
admin.initializeApp()
// STORAGE


const path = require('path');
const os = require('os');
const fse = require('fs-extra');

const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpegt = require('imagemin-mozjpeg');

const sharp = require('sharp');


exports.convertirScoreProductoToEmojin = functions.firestore
    .document('products/{productId}')
    .onCreate((snapshot, context) => {

        const nuevoProducto = snapshot.data();

        const titleProduct = nuevoProducto.titleProduct;
        const starsProduct = nuevoProducto.starsProduct;
        const newTitleProduct = txtToMayus(titleProduct);
        const newStarsProduct = txtToEmojin(starsProduct);
        console.log(`SUBIO UN NUEVO ARCHIVO  ${titleProduct}`);


        return snapshot.ref.update({ titleProduct: newTitleProduct, starsProduct: newStarsProduct });

    });


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
                console.log('Ya se ha sanitizado la palabra');
                return null;
            }
            // hacemos una llamada a otro recurso en la nube
            //updtae call nos retorna una promesa,
            //puedo hacer mas una ves que la promesa este resuelta .then()
            return change.after.ref.update({ descriptionProduct: descripcionProductoActualizado })
        }
        else {
            return null;
        }

    });


// PRUEBA al subir imagen
exports.optimizarImagen = functions.storage
    .object()
    .onFinalize(async object => {

        const fileBucket = object.bucket; // El depósito de almacenamiento que contiene el archivo: fir-angular-94580.appspot.com 
        const filePath = object.name; // Ruta del archivo en el bucket deposito: images/1.jpg 
        const contentType = object.contentType; // Tipo de contenido del archivo.: image/jpeg 
        const metageneration = object.metageneration; // Número de veces que se han generado meta

        console.log('///////////////SE SUBIO UNA IMAGEN');

        if (!contentType.startsWith('image/')) {
            console.log('No es una imagen');
            return null;
        }

        // Obtenemos el nombre del archivo. 
        const fileName = path.basename(filePath);  //1.jpg
        //Extension del archivo
        const fileExtension = path.extname(filePath);  //.jpg

        // Salir si la imagen ya es una miniatura.

        if (fileName.startsWith('thumbnail_')) {
            console.log('*******La imagen ya ha sido optimizada');
            return null;
        }
        // Descargar archivo del bucket deposito

        const bucket = admin.storage().bucket(fileBucket); // Objeto
        const file = bucket.file(filePath); // Objeto


        // Capturamos los metadatos del archivo subido al firebase Storage
        const [data] = await file.getMetadata();//Array metadata

        if (data.metadata.optimized) {
            console.log(`Imagen ya ha sido optimizada`);
            return null;
        }



        //Generamos un directorio temporal 
        const directoryTemporary = path.join(os.tmpdir(), 'Imagenes'); // /tmp/Imagenes

        //Generamos la ruta temporal de la imagen 
        const pathTempFile = path.join(directoryTemporary, fileName);// /tmp/Imagenes/1.jpg 

        //  Aseguramos que se creo el archivo y si  no lo crea

        await fse.ensureDir(directoryTemporary).then(console.log('++++++SI CREO EL ARCHIVO'));

        await bucket.file(filePath).download({ destination:  pathTempFile}).then(console.log('---+++SI DESACARGO'));

        // Generamos un nuevo nombre del archivo que sera modificado. Agregamos un prefijo 'thumbnail_'
        const thumbFileName=`thumbnail_${fileName}`; // thumbnail_1.jpg 
        
        // Generamos ruta Temporal del nuevo archivo
        const pathTempFileThumb= path.join(directoryTemporary, thumbFileName);// /tmp/Imagenes/thumbnail_1.jpg 

        await sharp(pathTempFile)  ///tmp/Imagenes/1.jpg
             .resize(500)
             .toFile(pathTempFileThumb); // /tmp/Imagenes/thumbnail_1.jpg 

                 //SUBIMOS A FIREBASE STORAGE
         
        // Generamos la ruta de la imagen que subiremos a Storage 
        const filePathThumb = path.join(path.dirname(filePath), thumbFileName); //  images/thumbnail_1.jpg 
        

        const x=  await imagemin([`${directoryTemporary}/*.{jpg,png,jpeg}`],{
            destination: directoryTemporary,
            plugins: [
                imageminMozjpegt({quality: 50}),
                imageminPngquant([0.3, 0.5])
            ]
        });





        //Subiendo la miniatura.
        await bucket.upload(pathTempFileThumb, {
            destination: filePathThumb,
            metadata: {metadata: {optimized: true}},
        });
            
        return fse.remove(directoryTemporary);
    });






function sanitizarTexto(text) {
    const x = 'fuck';
    const y = text.replace(x, "😘");
    return y;
}

function txtToMayus(text) {
    return text.toUpperCase();

}
function txtToEmojin(text) {
    cantStars = text.match(/[0-9]+/g)[0];
    cantStars = parseInt(cantStars);
    stars = '';
    for (i = 0; i < cantStars; i++) {
        stars = '⭐' + stars;
    }
    return text.replace(/[0-9]+/g, stars);
}