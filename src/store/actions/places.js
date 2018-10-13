import { AsyncStorage } from 'react-native';
import { SET_PLACES, REMOVE_PLACE,AUTH_LOGIN_USER } from './actionTypes';
import { uiStartLoading,uiStopLoading, authGetToken, authGetUserId, authUserKey } from './index';
import * as firebase from 'firebase';
import _ from 'lodash';
const firebaseConfig = {
    apiKey: "AIzaSyBhUyFsb_fRSct-Aw_plWtNxOfWCY4XPig",
    authDomain: "react-native-1536905661123.firebaseapp.com",
    databaseURL: "https://react-native-1536905661123.firebaseio.com",
    projectId: "react-native-1536905661123",
    storageBucket: "react-native-1536905661123.appspot.com",   
}


const firebaseApp = firebase.initializeApp(firebaseConfig);
const userRef  = firebase.database().ref("users");
export const addPlace = (firstName,image,lastName,birthday,phonenumber) => {
    let authToken
    let authUserId
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
                        console.log("Invalid Token")
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
                            console.log(imageRes)
                        })
                    })
                    // .then(parsedRes => {
                    //     //console.log(parsedRes)
                    //     imageUrl = parsedRes.url;
                    //     let userDetail = userRef.orderByChild("userId").equalTo(authUserId);
                    //     userDetail.on('value',(snap) =>{
                    //         let userData = [];
                    //         snap.forEach((child) => {
                    //             userData.push({
                    //                 firstName: child.val().firstName,
                    //                 lastName: child.val().lastName,
                    //                 image:{
                    //                     uri:child.val().image
                    //                 },
                    //                 key: child.key
                    //             })
                    //         })
                    //         const userUpdatedData = {
                    //             firstName:firstName,
                    //             lastName:lastName,
                    //             birthday:birthday,
                    //             phonenumber:phonenumber,
                    //             userId: authUserId,
                    //             image: imageUrl
                    //         };
                           
                    //         if(userData.length === 0){
                                
                    //             return fetch("https://react-native-1536905661123.firebaseio.com/users.json?auth=" + authToken,{
                    //                 method:"POST",
                    //                 body:JSON.stringify(userUpdatedData)
                    //             })
                    //         }else{
                    //             return firebase.database().ref('users/' + userData[0].key).update(userUpdatedData);
                               
                    //         }
                    //     })
                    // })
                    // .then(parsedRes1 => {
                    //     dispatch(uiStopLoading());
                    //     console.log(parsedRes1);
                    // })
                    // .catch(err => {
                    //     dispatch(uiStopLoading());
                    //     console.warn(err);
                    // });
                })
                .catch(err => {
                    dispatch(uiStopLoading());
                    console.warn(err);
                })
    }
};


export const getPlaces = (filter) => {
    
    return dispatch => {
        dispatch(authUserKey())
            .then(loggedInUserKey => {
                userRef.on('value',(snap) =>{
                    let userData = [];
                    let newModifiedData;
                    let sendRequestData = [];
                    let receiveRequestData = [];
                    let remainUserData = [];
                    snap.forEach((child) => {
                        userKey = child.key;
                        if((filter.userId !== child.val().userId) && (filter.userGender !== child.val().gender)){
                            userData.push({
                                userKey:child.key, 
                            })   
                        }  
                    })
                    let userFriend = userRef.child(loggedInUserKey).child('friendList');
                    userFriend.on('value',(friendSnap) =>{
                        friendSnap.forEach((friendChild) => {
                            
                            for (var friendkey in userData){
                                if(userData[friendkey].userKey === friendChild.val().friend){
                                    userData = _.omit(userData,friendkey);
                                }
                            }
                        })
                    })
                   
                    let userSendRequest = userRef.child(loggedInUserKey).child('requestedUserData');
                    userSendRequest.on('value',(sendRequestSnap) =>{
                        sendRequestSnap.forEach((sendRequestChild)=>{
                            for (var sentRequestkey in userData){
                                if(userData[sentRequestkey].userKey === sendRequestChild.val().requestedUser){
                                    userData = _.omit(userData,sentRequestkey);
                                }
                            }
                        })
                    })
                    
                    let userReceiveRequest = userRef.child(loggedInUserKey).child('requestedByUserData');
                    userReceiveRequest.on('value',(receiveRequestSnap) =>{
                        receiveRequestSnap.forEach((receiveRequestChild)=>{
                            for (var receiveRequestkey in userData){
                                if(userData[receiveRequestkey].userKey === receiveRequestChild.val().requestedById){
                                    userData = _.omit(userData,receiveRequestkey);
                                }
                            }
                        })
                    })
                    
                    for (var key in userData){
                        let remainUser = userRef.orderByKey().equalTo(userData[key].userKey);
                        remainUser.on('value',(remainUserSnap)=>{
                            remainUserSnap.forEach((remainUserChild)=>{
                                remainUserData.push({
                                    firstName: remainUserChild.val().firstName,
                                    lastName: remainUserChild.val().lastName,
                                    image:{
                                        uri:remainUserChild.val().image
                                    },
                                    birthday: remainUserChild.val().birthday,
                                    key: remainUserChild.key,
                                    height:remainUserChild.val().height,
                                    gender:remainUserChild.val().gender,
                                    birthday:remainUserChild.val().birthday,
                                    education:remainUserChild.val().education,
                                    marriedStatus:remainUserChild.val().marriedStatus,
                                    state:remainUserChild.val().state,
                                    city:remainUserChild.val().city,
                                    pincode:remainUserChild.val().pincode,
                                    religion: remainUserChild.val().religion,
                                    motherTounge: remainUserChild.val().motherTounge,
                                    caste: remainUserChild.val().caste,
                                    requestId:""
                                })
                            })
                        })
                        //console.log(remainUserData)
                    }
                    // console.log(userData)
                    // let length = userData.length;
                    // for(let j=0; j<length; j++){
                    //     let remainUser = userRef.orderByKey().equalTo(userData[j].userKey);
                    // }
                    dispatch(setPlaces(remainUserData));
                })
            })
            .catch(() => {
                alert("No Valid Token");
            }) 
    }
}

export const setPlaces = places =>{
    return{
        type: SET_PLACES,
        places:places
    }
}

export const deletePlace = (key) => {
    
    return dispatch=>{
        dispatch(authGetToken())
            .catch(()=>{
                alert("Invalid Token");
            })
            .then(token => {

                dispatch(removePlace(key));
                return fetch("https://react-native-1536905661123.firebaseio.com/users/"+key+".json?auth="+token,{
                    method:"DELETE"
                })
            })            
            .then(res => res.json())
            .then(parsedRes => { 
                Console.log("Deleted")
            })
            .catch(err => {
                alert("Something went wrong");
                console.log(err)
            });
    }
};


export const removePlace = key => {
    return {
        type : REMOVE_PLACE,
        key: key
    }
};


export const setLoginUser = userData => {
    return {
        type : AUTH_LOGIN_USER,
        userData: userData
    }
};

export const getUserLoginData = () => {
    return dispatch =>{
        dispatch(authGetUserId())
            .catch(err => {
                console.log("Invalid User Id")
            })
            .then(authUserId => {
                
                let userDetail = userRef.orderByChild("userId").equalTo(authUserId);
                userDetail.on('value',(snap) =>{
                    let userData = [];
                    snap.forEach((child) => {
                        userData.push({
                            firstName: child.val().firstName,
                            lastName: child.val().lastName,
                            image:{
                                uri:child.val().image
                            },
                            phonenumber: child.val().phonenumber,
                            birthday: child.val().birthday,
                            key: child.key,
                            userId:child.val().userId
                        })
                    })
                    dispatch(setLoginUser(userData))
                })
            })
    }
};


export const addUserDetail = (firstName,lastName,city,state,phonenumber) => {
    let authUserId;
    return dispatch =>{
        dispatch(uiStartLoading());
        dispatch(authGetUserId())
            .catch(err=>{
                console.log(err)
            })
            .then(userId=>{
                console.log(userId)
            })
    }
}