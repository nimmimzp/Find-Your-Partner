import { SET_PLACES } from './actionTypes';
import { uiStartLoading,uiStopLoading} from './index';
export const addPlace = (firstName,image,lastName,birthday,phonenumber) => {
    return  dispatch => {
        dispatch(uiStartLoading());
        
        fetch("https://us-central1-react-native-1536905661123.cloudfunctions.net/storeUserImage",{
            method:"POST",
            body:JSON.stringify({
                image:image.base64
            })
        })
        .catch(err => {
            dispatch(uiStopLoading());
            console.warn(err);
        })
        .then(res=>res.json())
        .then(parsedRes => {
            const userData = {
                firstName:firstName,
                lastName:lastName,
                birthday:birthday,
                phonenumber:phonenumber,
                image:parsedRes.imageUrl
            };
            return fetch("https://react-native-1536905661123.firebaseio.com/users.json",{
                method:"POST",
                body:JSON.stringify(userData)
            })
            .catch(err => {
                dispatch(uiStopLoading());
                console.warn(err);
            })
            .then(res=>res.json())
            .then(parsedRes => {
                dispatch(uiStopLoading());
                console.log(parsedRes);
            });
        });
    
        
    }
};

export const getPlaces = () => {
    return dispatch => {
        fetch("https://react-native-1536905661123.firebaseio.com/users.json")
        .catch(err => {
            alert("Something went wrong");
            console.log(err)
        })
        .then(res => res.json())
        .then(parsedRes => {
            let places = [];
            for(let key in parsedRes){
                places.push({
                    ...parsedRes[key],
                    image:{
                        uri:parsedRes[key].images
                    },
                    id: key
                })
            }
            dispatch(setPlaces(places))
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
    return {
        type: DELETE_PLACE,
        placeKey: key
    };
};
