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
                dispatch(authSetToken(parsedRes.idToken));
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
                AsyncStorage.getItem("fyp:auth:token")
                    .catch(err => {
                        reject();
                    })
                    .then(tokenFromStorage => {
                        dispatch(authSetToken(tokenFromStorage));
                        resolve(tokenFromStorage)
                    })
                
            }else{
                resolve(token);
            }
        });
        return promise;
    }
};

export const authStoreTken = token => {
    return dispatch => {
        dispatch(authSetToken(token));
        AsyncStorage.setItem("fyp:auth:token",token);
    }
}