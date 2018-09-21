import { ADD_PLACE, DELETE_PLACE } from './actionTypes';

export const addPlace = (firstName,image,lastName,birthday,phonenumber) => {
    return  dispatch => {
        const userData = {
            firstName:firstName,
            lastName:lastName,
            birthday:birthday,
            phonenumber:phonenumber
        };
        fetch("https://react-native-1536905661123.firebaseio.com/users.json",{
            method:"POST",
            body:JSON.stringify(userData)
        })
        .catch(err => console.warn(err))
        .then(res=>res.json())
        .then(parsedRes => {
            console.log(parseFloat);
        });
    }
};

export const deletePlace = (key) => {
    return {
        type: DELETE_PLACE,
        placeKey: key
    };
};
