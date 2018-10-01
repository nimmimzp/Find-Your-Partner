import { AsyncStorage } from 'react-native';
import { SET_PLACES, REMOVE_PLACE,AUTH_LOGIN_USER } from './actionTypes';
import { uiStartLoading,uiStopLoading, authGetToken, authGetUserId } from './index';
import * as firebase from 'firebase';

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
                        return fetch("https://us-central1-react-native-1536905661123.cloudfunctions.net/storeUserImage",{
                            method:"POST",
                            body:JSON.stringify({
                                image:image.base64
                            }),
                            headers:{
                                "Authorization": "Bearer " + token
                            }
                        })
                    })
                    .then(parsedRes => {
                       
                        imageUrl = parsedRes.url;
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
                                    key: child.key
                                })
                            })
                            const userUpdatedData = {
                                firstName:firstName,
                                lastName:lastName,
                                birthday:birthday,
                                phonenumber:phonenumber,
                                userId: authUserId,
                                image: imageUrl
                            };
                           
                            if(userData.length === 0){
                                
                                return fetch("https://react-native-1536905661123.firebaseio.com/users.json?auth=" + authToken,{
                                    method:"POST",
                                    body:JSON.stringify(userUpdatedData)
                                })
                            }else{
                                return firebase.database().ref('users/' + userData[0].key).update(userUpdatedData);
                               
                            }
                        })
                    })
                    .then(parsedRes => {
                        dispatch(uiStopLoading());
                        console.log(parsedRes);
                    })
                    .catch(err => {
                        dispatch(uiStopLoading());
                        console.warn(err);
                    });
                })
                .catch(err => {
                    dispatch(uiStopLoading());
                    console.warn(err);
                })
    }
};

export const getPlaces = () => {
    return dispatch => {
        dispatch(authGetToken())
            .then(token => {
                userRef.on('value',(snap) =>{
                    let userData = [];
                    snap.forEach((child) => {
                        userData.push({
                            firstName: child.val().firstName,
                            lastName: child.val().lastName,
                            image:{
                                uri:child.val().image
                            },
                            key: child.key
                        })
                    })
                    dispatch(setPlaces(userData));
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