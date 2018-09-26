import { AsyncStorage } from 'react-native';
import { TRY_AUTH, AUTH_SET_TOKEN } from './actionTypes';
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
                console.log('Soory, Authentication faild')
            }else{
                dispatch(authStoreToken(parsedRes.idToken,parsedRes.expiresIn));
                startMainTabs();
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

export const authStoreToken = (token,expiresIn) => {
    return dispatch => {
        dispatch(authSetToken(token));
        const now = new Date();
        const expiryDate = now.getTime()+expiresIn*1000
        AsyncStorage.setItem("fyp:auth:token",token);
        AsyncStorage.setItem("fyp:auth:expiryDate",expiryDate.toString());
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
}