import { TRY_AUTH } from './actionTypes';

export const tryAuth = (authData) => {
    return dispatch => {
        const userData = {
            email:authData.email,
            password:authData.password
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