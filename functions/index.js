const functions = require('firebase-functions');
const cors = require("cors")({origin: true});
const UUID = require("uuid-v4");
const fs = require("fs");
const gcconfig= {
    projectId: "react-native-1536905661123",
    keyFilename: "find-your-partner.json"
}
const {Storage} = require("@google-cloud/storage");
const gcs = new Storage(gcconfig);
//const gcs = require("@google-cloud/storage")(gcconfig);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.storeUserImage = functions.https.onRequest((request, response) => {
    cors(request,response,()=>{
        const body = JSON.parse(request.body);
        fs.writeFileSync("/tmp/uploaded-image.jpg", body.image, "base64",err=>{
            console.log(err);
            return response.status(500).json({error:err})
        });
        const uuid = UUID();//Math.random();//;
        const bucket = gcs.bucket("react-native-1536905661123.appspot.com");
        bucket.upload("/tmp/uploaded-image.jpg",{
            uploadType:"media",
            destination:"/users/" + uuid + ".jpg",
            metadata:{
                metadata: {
                    contentType: "image/jpeg",
                    firebaseStorageDownloadTokens: uuid
                }
               
            }
        },(err,file)=>{
            if(!err){
                response.status(201).json({
                    imageUrl: "https://firebasestorage.googleapis.com/v0/b/"+
                    bucket.name+
                    "/o/" +
                    encodeURIComponent(file.name) +
                    "?alt=media&token=" +
                    uuid
                });
            }else{
                console.log(err);
                response.status(500).json({error: err});
            }
        });
    });
});
