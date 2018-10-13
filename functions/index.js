const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require("cors")({origin: true});
const UUID = require("uuid-v4");
const fs = require("fs");
const gcconfig= {
    projectId: "react-native-1536905661123",
    keyFilename: "find-your-partner.json"
}
const {Storage} = require("@google-cloud/storage");
const gcs = new Storage(gcconfig);

admin.initializeApp({
    credential: admin.credential.cert(require("./find-your-partner.json"))
})
//const gcs = require("@google-cloud/storage")(gcconfig);
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.storeImage = functions.https.onRequest((request, response) => {
    cors(request,response,()=>{
        if(!request.headers.authorization ||  !request.headers.authorization.startsWith("Bearer ")){
            console.log("No token present");
            response.status(403).json({error : "No token found"});
            return;
        }
        let idToken = request.headers.authorization.split("Bearer ")[1];
        admin.auth().verifyIdToken(idToken)
            .then(decodedToken => {
                
                const body = JSON.parse(request.body);
                fs.writeFileSync("/tmp/uploaded-image.jpg", body.image, "base64",err=>{
                    console.log(err);
                    return response.status(501).json({error:err})
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
                        return response.status(201).json({
                            imageUrl:
                              "https://firebasestorage.googleapis.com/v0/b/" +
                              bucket.name +
                              "/o/" +
                              encodeURIComponent(file.name) +
                              "?alt=media&token=" +
                              uuid
                          });
                    }else{
                        console.log(err);
                        return response.status(500).json({error: err});
                    }
                });
            })
            .catch(err => {
                console.log('Invalid Token');
                return response.status(403).json({error: "Unauthorized"});
            });
        
    });
});

