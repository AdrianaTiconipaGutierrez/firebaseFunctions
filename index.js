const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp()

const path = require('path');
const os = require('os');
const fs = require('fs');

// const { Storage } = require('@google-cloud/storage');
const sharp = require('sharp');

exports.onCreateStars = functions.firestore
.document('products/{productId}')
.onCreate((snap, context) => {

    const newProduct = snap.data();
    const productId = context.params.productId;

  
    console.log(`****ID NEW PRODUCT ${productId}`);
    console.log(newProduct);

    if (newProduct) {
        const titleProduct = newProduct.titleProduct;
        const starsProduct=newProduct.starsProduct;
        
        const titleProductUpper = changeToUpperCase(titleProduct);
        const starsProductEmojin=  changeToEmojin(starsProduct);
        return snap.ref.update({ titleProduct: titleProductUpper, starsProduct: starsProductEmojin });
    }
    else {
        return null;
    }
});

//OPTIMIZAR IMAGENES
exports.onFinalizeOptimizeImage = functions.storage
    .object()
    .onFinalize(async object => {
        const fileBucket = object.bucket; // The Storage bucket that contains the file.
        const filePath = object.name; // File path in the bucket.
        const contentType = object.contentType; // File content type.
        const metageneration = object.metageneration; // Number of times metadata has been generated. New objects have a value of 1.
        console.log(`**************FILEBUCKET: ${fileBucket} filePath: ${filePath} contentType: ${contentType} Y metageneration: ${metageneration}`);

        // Exit if this is triggered on a file that is not an image.
        if (!contentType.startsWith('image/')) {
            return console.log('This is not an image.');
        }

        // Get the file name.
        const fileName = path.basename(filePath);
        console.log(`*************FILE NAME:${fileName}`)
        // Exit if the image is already a thumbnail.
        //or i can use if fileName.includes(_thumb..)
        if (fileName.startsWith('thumb_')) {
            return console.log('Already a Thumbnail.');
        }

        // Download file from bucket.
        //OR i can use const bucket = storage.bucket(fileBucket);
        //const file = bucket.file(filePath);
        const bucket = admin.storage().bucket(fileBucket);
        const tempFilePath = path.join(os.tmpdir(), fileName);///tmp/2.png
        console.log(`************** bucket: ${bucket} tempFilePath: ${tempFilePath}`);

        const metadata = {
            contentType: contentType,
        };
        await bucket.file(filePath).download({ destination: tempFilePath });
        console.log('Image downloaded locally to', tempFilePath);
        // Generate a thumbnail using ImageMagick.
        // await spawn('convert', [tempFilePath, '-thumbnail', '200x200>', tempFilePath]);
        // console.log('Thumbnail created at', tempFilePath);


        // We add a 'thumb_' prefix to thumbnails file name. That's where we'll upload the thumbnail.
        const thumbFileName = `thumb_${fileName}`;//thumb_2.png

        const tempThumbFilePath = path.join(os.tmpdir(), thumbFileName);
        const thumbFilePath = path.join(path.dirname(filePath), thumbFileName);
        //const thumbFilePath = path.join(path.dirname(filePath), thumbFileName);
        console.log(`************PRUEBA JOIN....${path.dirname(filePath)}`)
        console.log(`************PRUEBA JOIN....${thumbFileName}`)
        console.log(`************PRUEBA JOIN....${thumbFilePath}`)

        //image==> duirname and  2.png ==.basename ==> 
        // Uploading the thumbnail.

        //GENERATE A THUMBAIL USING SHARP

        // const thumbName = `thumb@$_${fileName}`;
        // const thumbPath = path.join(path.dirname(filePath), thumbName);
        

        await sharp(tempFilePath)
            .resize(200)
            .toFile(tempThumbFilePath);

        // await bucket.upload(tempFilePath, {
        //     destination: thumbFilePath,
        //     metadata: metadata,
        // });

        await bucket.upload(tempThumbFilePath, {
            destination: thumbFilePath,
            metadata: metadata,
        });
        // Once the thumbnail has been uploaded delete the local file to free up disk space.
        return fs.unlinkSync(tempFilePath);

    });






function modif(text) {
  const x = '1234';
  const y = text.replace(x, "cheese").toUpperCase();
  return y;
}


function changeToUpperCase(text) {
    return text.toUpperCase();
  }

function changeToEmojin(text) {
  cantStars = text.match(/[0-9]+/g)[0];
  cantStars = parseInt(cantStars);
  stars = '';
  for (i = 0; i < cantStars; i++) {
      stars = '⭐' + stars;
  }
  return text.replace(/[0-9]+/g, stars);
}

