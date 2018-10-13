import { AsyncStorage } from 'react-native';
//import { SET_PLACES, REMOVE_PLACE,AUTH_LOGIN_USER } from './actionTypes';
import { Navigation } from "react-native-navigation";
import { uiStartLoading,uiStopLoading, authGetToken, authGetUserId,authSetLoginUser,authUserKey } from './index';
import startMainTabs,{friendsTabs} from '../../screens/MainTabs/startMainTabs'
import * as firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyBhUyFsb_fRSct-Aw_plWtNxOfWCY4XPig",
    authDomain: "react-native-1536905661123.firebaseapp.com",
    databaseURL: "https://react-native-1536905661123.firebaseio.com",
    projectId: "react-native-1536905661123",
    storageBucket: "react-native-1536905661123.appspot.com",   
}


//const firebaseApp1 = firebase.initializeApp(firebaseConfig);
const userRef  = firebase.database().ref("users");


export const addUserInfo = (updatedUserData,userStateData,userReligionData) => {
    let authUserId;
    let saveUserData;
    let authToken;
    return  dispatch => {   
        dispatch(uiStartLoading());
        dispatch(authGetUserId())
            .catch(err => {
                alert('Invalid User Id')
            })
            .then(userId =>{
                authUserId = userId;
                dispatch(authGetToken())
                    .catch(err => {
                        console.log('Auth Token not found')
                    })
                    .then(authToken => {
                        authToken = authToken;
                        
                        let userDetail = userRef.orderByChild("userId").equalTo(authUserId);
                        userDetail.on('value',(snap) =>{
                            let userData = [];
                            snap.forEach((child) => {
                                userData.push({
                                    firstName: child.val().firstName,
                                    lastName: child.val().lastName,
                                    key: child.key
                                })
                            })
                            saveUserData = {
                                firstName:updatedUserData.firstName,
                                lastName:updatedUserData.lastName,
                                phonenumber:updatedUserData.phonenumber,
                                height:updatedUserData.height,
                                gender:updatedUserData.gender,
                                birthday:updatedUserData.birthday,
                                education:updatedUserData.education,
                                marriedStatus:updatedUserData.marriedStatus,
                                state:userStateData.state,
                                city:userStateData.city,
                                pincode:userStateData.pincode,
                                religion: userReligionData.religion,
                                motherTounge: userReligionData.motherTounge,
                                caste: userReligionData.caste,
                                userId:authUserId
        
                            }
                            if(userData.length === 0){
                        
                                return fetch("https://react-native-1536905661123.firebaseio.com/users.json?auth=" + authToken,{
                                    method:"POST",
                                    body:JSON.stringify(saveUserData)
                                })
                            }else{
                                return firebase.database().ref('users/' + userData[0].key).update(saveUserData);
                                
                            }
                        })
                    })
                    .then(parsedRes => {
                        dispatch(uiStopLoading());
                        Navigation.startSingleScreenApp({
                            screen: {
                                screen: "FYP.UploadProfile",
                                title: "Upload A Profile Picture"
                            },
                            passProps:{
                                userId:authUserId,
                            }
                        });
                    })
            })
            .catch(err => {
                dispatch(uiStopLoading());
                console.warn(err);
            });     
    }
};


export const updateProfile = (image,userId) => {
    

    
    let authToken
    return  dispatch => {
        dispatch(uiStartLoading());
        dispatch(authGetToken())
            .catch(err => {
                alert('Invalid token ')
            })
            .then(token => {
                authToken = token
                fetch("https://us-central1-react-native-1536905661123.cloudfunctions.net/storeImage",{
                    method:"POST",
                    body:JSON.stringify({
                        image:image.base64
                    }),
                    headers:{
                        "Authorization": "Bearer " + token
                    }
                })
                .catch(err => {
                    console.log(err);
                    alert("Something went wrong, please try again!");
                    dispatch(uiStopLoading());
                })
                .then(res => res.json())
                .then(imageRes => {
                    let imageUrl = imageRes.imageUrl;
                    let userDetail = userRef.orderByChild("userId").equalTo(userId);
                    userDetail.on('value',(snap) =>{
                        let userData = [];
                        snap.forEach((child) => {
                            userData.push({
                                key: child.key
                            })
                        })
                        userUpdatedData = {
                            image:imageUrl
                        }
                        return firebase.database().ref('users/' + userData[0].key).update(userUpdatedData);
                    })
                })
                .then(parsedRes =>{
                    dispatch(uiStopLoading());
                    let userDetail = userRef.orderByChild("userId").equalTo(userId);
                    userDetail.on('value',(snap) =>{
                        let userData = [];
                        snap.forEach((child) => {
                            userData.push({
                                firstName: child.val().firstName,
                                lastName: child.val().lastName,
                                phonenumber:child.val().phonenumber,
                                height:child.val().height,
                                gender:child.val().gender,
                                birthday:child.val().birthday,
                                education:child.val().education,
                                marriedStatus:child.val().marriedStatus,
                                state:child.val().state,
                                city:child.val().city,
                                pincode:child.val().pincode,
                                religion: child.val().religion,
                                motherTounge: child.val().motherTounge,
                                caste: child.val().caste,
                                key: child.key
                            })
                        })
                        dispatch(authSetLoginUser(userData));
                        startMainTabs(userData);
                    })
                })               
            })
    }
};



export const updateUser = (userData) => {
    return  dispatch => {   
        dispatch(uiStartLoading());
        dispatch(authGetUserId())
            .catch(err => {
                console.log("Invalid")
            })
            .then(userId => {
                firebase.database().ref('users/' + userData.key).update(userData);
                dispatch(uiStopLoading());
            })
    }
}

export const requestUser = (requestedToDetail,requestByDetail,loggedinUser) => {
    return dispatch => {
        dispatch(authGetUserId())
            .catch(err => {
                console.log('Userid not found');
            })
            .then(userId => {

                var newPostKey1 = firebase.database().ref('users/' + loggedinUser +'/requestedUserData').push().key;
                var updates1 = {};
                updates1['users/' + loggedinUser +'/requestedUserData/'+newPostKey1] = requestedToDetail
                firebase.database().ref().update(updates1);



                var newPostKey2 = firebase.database().ref('users/' + requestedToDetail.requestedUser +'/requestedByUserData').push().key;
                var updates2 = {};
                updates2['users/' + requestedToDetail.requestedUser +'/requestedByUserData/'+newPostKey2] = requestByDetail
                firebase.database().ref().update(updates2);
            })
    }
};

export const allRequestUserSent = () => {
    let authLoggedInUserKey;
    return dispatch => {
        dispatch(authUserKey())
            .catch(err => {
                console.log(err)
            })
            .then(userKey =>{
                authLoggedInUserKey = userKey;
                let requestedUser = [];
                let receivedRequestUserDetail = [];
                let allYourMatched = [];
                //This code get data form the user to whom loggedin user send request
                let userDetail = userRef.child(authLoggedInUserKey).child('requestedUserData');
                userDetail.on('value',(snap) =>{
                    snap.forEach((child) => {
                        let requestedUserKey = child.val().requestedUser;
                        let requestedUserDetail = userRef.orderByKey().equalTo(requestedUserKey);
                        requestedUserDetail.on('value',(snap1)=>{
                            snap1.forEach((child1) => {
                                requestedUser.push({
                                    firstName: child1.val().firstName,
                                    lastName: child1.val().lastName,
                                    image:{
                                        uri:child1.val().image
                                    },
                                    birthday: child1.val().birthday,
                                    key: child1.key,
                                    height:child1.val().height,
                                    gender:child1.val().gender,
                                    birthday:child1.val().birthday,
                                    education:child1.val().education,
                                    marriedStatus:child1.val().marriedStatus,
                                    state:child1.val().state,
                                    city:child1.val().city,
                                    pincode:child1.val().pincode,
                                    religion: child1.val().religion,
                                    motherTounge: child1.val().motherTounge,
                                    caste: child1.val().caste,
                                    requestId:child.key
                                })
                            })
                            
                        })
                    })                    
                })
                //End here

                //User Received request 

                let userReceiveDetail = userRef.child(userKey).child('requestedByUserData');
                userReceiveDetail.on('value',(snap) =>{
                    console.log(snap)
                    snap.forEach((receivedChild) => {
                        let receivedUserKey = receivedChild.val().requestedById;
                        let receivedUserDetail = userRef.orderByKey().equalTo(receivedUserKey);
                        receivedUserDetail.on('value',(snap1)=>{
                            snap1.forEach((child1) => {
                                receivedRequestUserDetail.push({
                                    firstName: child1.val().firstName,
                                    lastName: child1.val().lastName,
                                    image:{
                                        uri:child1.val().image
                                    },
                                    birthday: child1.val().birthday,
                                    key: child1.key,
                                    height:child1.val().height,
                                    gender:child1.val().gender,
                                    birthday:child1.val().birthday,
                                    education:child1.val().education,
                                    marriedStatus:child1.val().marriedStatus,
                                    state:child1.val().state,
                                    city:child1.val().city,
                                    pincode:child1.val().pincode,
                                    religion: child1.val().religion,
                                    motherTounge: child1.val().motherTounge,
                                    caste: child1.val().caste,
                                    requestedById:receivedChild.key
                                })
                            })
                            
                        })
                    })                    
                })
                //console.log(receivedRequestUserDetail)
                //End here

                //all friend of loggedin userhere
                let userFriendDetail = userRef.child(userKey).child('friendList');
                userFriendDetail.on('value',(snap) =>{
                    snap.forEach((friendChild) => {
                        let friendId = friendChild.val().friend
                        console.log(friendId)
                        let friendDetail = userRef.orderByKey().equalTo(friendId);
                        friendDetail.on('value',(snap2)=>{
                            snap2.forEach((child2) => {
                                
                                allYourMatched.push({
                                    firstName: child2.val().firstName,
                                    lastName: child2.val().lastName,
                                    image:{
                                        uri:child2.val().image
                                    },
                                    birthday: child2.val().birthday,
                                    phonenumber: child2.val().phonenumber,
                                    key: child2.key,
                                    height:child2.val().height,
                                    gender:child2.val().gender,
                                    education:child2.val().education,
                                    marriedStatus:child2.val().marriedStatus,
                                    state:child2.val().state,
                                    city:child2.val().city,
                                    pincode:child2.val().pincode,
                                    religion: child2.val().religion,
                                    motherTounge: child2.val().motherTounge,
                                    caste: child2.val().caste
                                })
                            })
                        })
                   })
                    //console.log(allYourMatched)
                })
                friendsTabs(requestedUser,receivedRequestUserDetail,allYourMatched,authLoggedInUserKey);
            })
        
    }
};

export const cancelIntrestRequest = (requestedToDetail,userId) =>{
    firebase.database().ref('users/' + userId +'/requestedUserData/'+requestedToDetail.requestedId).remove();
    
    return dispatch => {
        
        dispatch(authUserKey())
            .catch(err => {
                console.log(err)
            })
            .then (authUserKeyID => {
                let requestUserID = requestedToDetail.requestedUser;
                
                let userDetail = userRef.child(requestUserID).child('requestedByUserData'); 
                userDetail.on('value',(snap) =>{
                   
                    snap.forEach((child) => {
                       
                        if(child.val().requestedById===userId){
                          
                            firebase.database().ref('users/' + requestUserID +'/requestedByUserData/'+child.key).remove();
                        }
                        
                    })
                })
            })
        
    }
}


export const cancelReceivedRequest = (receivedByDetail,userId) => {
    
    firebase.database().ref('users/' + userId +'/requestedByUserData/'+receivedByDetail.requestedById).remove();
    return dispatch => {
        
        dispatch(authUserKey())
            .catch(err => {
                console.log(err)
            })
            .then (authUserKeyID => {
                let sentByUserID = receivedByDetail.sentBy;
                
                let userDetail = userRef.child(sentByUserID).child('requestedUserData'); 
                userDetail.on('value',(snap) =>{
                    
                    snap.forEach((child) => {
                        if(child.val().requestedUser===userId){
                            firebase.database().ref('users/' + sentByUserID +'/requestedByUserData/'+child.key).remove();
                        }
                        
                    })
                })
            })
        
    }
}

export const acceptUserRequest = (receivedByDetail,userId) => {
    return dispatch => {
        dispatch(authGetUserId())
            .catch(err => {
                console.log('Userid not found');
            })
            .then(authuserId => {
                let sentByUserId = receivedByDetail.sentBy;
                console.log(sentByUserId)
                let friendDetail = {
                    friend:receivedByDetail.sentBy
                }
                let friendDetail1 = {
                    friend:userId
                }
                
                var newPostKey1 = firebase.database().ref('users/' + userId +'/friendList').push().key;
                var updates1 = {};
                updates1['users/' + userId +'/friendList/'+newPostKey1] = friendDetail
                firebase.database().ref().update(updates1);


                var newPostKey2 = firebase.database().ref('users/' + sentByUserId +'/friendList').push().key;
                var updates2 = {};
                updates2['users/' + sentByUserId +'/friendList/'+newPostKey2] = friendDetail1
                firebase.database().ref().update(updates2);
                 
                dispatch(cancelReceivedRequest(receivedByDetail,userId))
                
               
            })
    }
    
}

export const getBackToUserProfile = () => {
    console.l
    return dispatch =>{
        dispatch(authUserKey())
            .catch(err => {
                console.log("User Key missing");
            })
            .then(userKey => {
                let userDetail = userRef.orderByKey().equalTo(userKey);
                userDetail.on('value',(snap) =>{
                    let userData = [];
                    snap.forEach((child) => {
                        userData.push({
                            firstName: child.val().firstName,
                            lastName: child.val().lastName,
                            phonenumber:child.val().phonenumber,
                            height:child.val().height,
                            gender:child.val().gender,
                            birthday:child.val().birthday,
                            education:child.val().education,
                            marriedStatus:child.val().marriedStatus,
                            state:child.val().state,
                            city:child.val().city,
                            pincode:child.val().pincode,
                            religion: child.val().religion,
                            motherTounge: child.val().motherTounge,
                            caste: child.val().caste,
                            key: child.key,
                            userId:child.val().userId
                        })
                    })
                    dispatch(authSetLoginUser(userData));
                    startMainTabs(userData);                            
                })
            })
    }
}
