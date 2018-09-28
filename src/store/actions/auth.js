import { AsyncStorage } from 'react-native';
import { Navigation } from "react-native-navigation";
import { TRY_AUTH, AUTH_SET_TOKEN, AUTH_SET_USERID } from './actionTypes';
import {uiStartLoading,uiStopLoading} from './index';
import startMainTabs from '../../screens/MainTabs/startMainTabs'
//import { Promise } from 'winjs';
export const tryAuth = (authData,authMode) => {
    return dispatch => {
        dispatch(uiStartLoading());
        const apiKey = "AIzaSyBhUyFsb_fRSct-Aw_plWtNxOfWCY4XPig";
        let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key="+ apiKey;
        if(authMode === "signup"){
            url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key="+apiKey;
        }

        fetch(url,{
            method: "POST",
            body :JSON.stringify({
                email:authData.email,
                password:authData.password,
                returnSecureToken:true
            }),
            headers:{
                "Content-Type": "application/json"
            }
        })
        
        .then(res=>res.json())
        .then(parsedRes => {
            dispatch(uiStopLoading());
            if(!parsedRes.idToken){
                alert('Soory, Authentication faild')
            }else{
                dispatch(authStoreToken(parsedRes.idToken,parsedRes.expiresIn,parsedRes.localId));
                if(authMode === "signup"){
                    Navigation.startSingleScreenApp({
                        screen: {
                            screen: "FYP.FirstScreen",
                            title: "Add Your Basic Info"
                        }
                    });
                }else{
                    Navigation.startSingleScreenApp({
                        screen: {
                            screen: "FYP.FirstScreen",
                            title: "Add Your Basic Info"
                        }
                    });
                    //startMainTabs();
                }
                
            }
        })
        .catch(err => {
            dispatch(uiStopLoading());
            console.log(err)
            alert("Authentication failed")

        });
    }
};

export const authSetToken = token => {
   
    return {
        type: AUTH_SET_TOKEN,
        token : token
    }
};

export const authSetUserId = userId =>{
    return{
        type: AUTH_SET_USERID,
        userId: userId
    }
};


export const authGetToken = () => {
    
    return (dispatch,getState) => {
        const promise = new Promise((resolve,reject)=> {
            const token  =  getState().auth.token
           
            if(!token){
                let authTokenFromStorage;
                AsyncStorage.getItem("fyp:auth:token")
                    .catch(err => reject())
                    .then(tokenFromStorage => {
                        authTokenFromStorage = tokenFromStorage;
                        if(!tokenFromStorage){
                            reject();
                            return;
                        }
                        return AsyncStorage.getItem("fyp:auth:expiryDate");
                      
                    })
                    .then(expiryDate => {
                        const paredExpiryDate = new Date(parseInt(expiryDate));
                        const now = new Date();
                        if(paredExpiryDate > now) {
                            dispatch(authSetToken(authTokenFromStorage));
                            resolve(authTokenFromStorage);
                        }else{
                            reject();
                        }
                       
                    })
                    .catch(err =>  reject());
                    
            }else{
                resolve(token);
            }
        });
        promise.catch(err =>{
            dispatch(authClearStorage())
        } )
        return promise;
    }
};

export const authStoreToken = (token,expiresIn,userId) => {
    return dispatch => {
        dispatch(authSetUserId(userId));
        dispatch(authSetToken(token));
        const now = new Date();
        const expiryDate = now.getTime()+expiresIn*1000
        AsyncStorage.setItem("fyp:auth:token",token);
        AsyncStorage.setItem("fyp:auth:expiryDate",expiryDate.toString());
        AsyncStorage.setItem("fyp:auth:userId",userId);
    }
}

export const authAutoSignedIn = ()  => {
    
    return dispatch => {
        dispatch(authGetToken())
            .then(token => {
                startMainTabs();
            })
            .catch(err => console.log("Failed to get token"));
    }
};

export const authClearStorage = () => {
    return dispatch => {
        AsyncStorage.removeItem("fyp:auth:token");
        AsyncStorage.removeItem("fyp:auth:expiryDate");;
    }
};

export const authGetUserId = () => {
    return (dispatch,getState) => {
        const promise = new Promise((resolve,reject)=> {
            const userId  =  getState().auth.userId
           
            if(!userId){
                let authuserIdFromStorage;
                AsyncStorage.getItem("fyp:auth:userId")
                    .catch(err => reject())
                    .then(userIdFromStorage => {
                        authuserIdFromStorage = userIdFromStorage;
                        if(!userIdFromStorage){
                            reject();
                            return;
                        }
                        dispatch(authSetUserId(authuserIdFromStorage));
                        resolve(authuserIdFromStorage);
                      
                    })
                    .catch(err =>  reject());
                    
            }else{
                resolve(userId);
            }
        });
        promise.catch(err =>{
            dispatch(authClearStorage())
        } )
        return promise;
    }
};