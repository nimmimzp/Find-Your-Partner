import { SET_PLACES, REMOVE_PLACE } from './actionTypes';
import { uiStartLoading,uiStopLoading, authGetToken } from './index';

export const addPlace = (firstName,image,lastName,birthday,phonenumber) => {
    return  dispatch => {
        let authToken;
        dispatch(uiStartLoading());
        dispatch(authGetToken())
            .catch(()=>{
                alert("Invalid Token");
            })
            .then(token => {
                authToken = token
                console.log(authToken)
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
            .then(res=>res.json())
            .then(parsedRes => {
                console.log(parsedRes);
                const userData = {
                    firstName:firstName,
                    lastName:lastName,
                    birthday:birthday,
                    phonenumber:phonenumber,
                    image:parsedRes.imageUrl
                };
                return fetch("https://react-native-1536905661123.firebaseio.com/users.json?auth=" + authToken,{
                    method:"POST",
                    body:JSON.stringify(userData)
                })
                
                .then(res=>res.json())
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
            });
    
        
    }
};

export const getPlaces = () => {
    return dispatch => {
        dispatch(authGetToken())
            .then(token => {
                return fetch("https://react-native-1536905661123.firebaseio.com/users.json?auth="+token)
            })
            .catch(() => {
                alert("No Valid Token");
            })
            .then(res => res.json())
            .then(parsedRes => {
                let places = [];
                for(let key in parsedRes){
                    places.push({
                        ...parsedRes[key],
                        image:{
                            uri:parsedRes[key].image
                        },
                        key: key
                    })
                }
                dispatch(setPlaces(places))
            })
            .catch(err => {
                alert("Something went wrong");
                console.log(err)
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
}