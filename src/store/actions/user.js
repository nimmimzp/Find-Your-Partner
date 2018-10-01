import { AsyncStorage } from 'react-native';
import { SET_PLACES, REMOVE_PLACE,AUTH_LOGIN_USER } from './actionTypes';
import { Navigation } from "react-native-navigation";
import { uiStartLoading,uiStopLoading, authGetToken, authGetUserId } from './index';
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


export const addUserInfo = (updatedUserData) => {
    console.log(updatedUserData)
    let authUserId;
    return  dispatch => {   
        dispatch(uiStartLoading());
        dispatch(authGetUserId())
            .catch(err => {
                alert('Invalid User Id')
            })
            .then(userId =>{
                console.log(userId)
                authUserId = userId;
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
                    updatedUserData.userId=authUserId

                   
                    if(userData.length === 0){
                        
                        return fetch("https://react-native-1536905661123.firebaseio.com/users.json?auth=" + authToken,{
                            method:"POST",
                            body:JSON.stringify(updatedUserData)
                        })
                    }else{
                        return firebase.database().ref('users/' + userData[0].key).update(updatedUserData);
                        
                    }
                        })
                    })
                    .then(parsedRes => {
                        Navigation.startSingleScreenApp({
                            screen: {
                                screen: "FYP.ProfileScreen",
                                title: "Profile"
                            },
                            passProps:{
                                userData:updatedUserData
                            }
                        });
                    })
                    .catch(err => {
                        dispatch(uiStopLoading());
                        console.warn(err);
                    });     
    }
};