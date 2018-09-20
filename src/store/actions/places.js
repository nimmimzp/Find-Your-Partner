import { ADD_PLACE, DELETE_PLACE } from './actionTypes';

export const addPlace = (firstName,image,lastName,birthday) => {
    return {
        type: ADD_PLACE,
        firstName: firstName,
        image : image,
        lastName: lastName,
        birthday: birthday
    };
};

export const deletePlace = (key) => {
    return {
        type: DELETE_PLACE,
        placeKey: key
    };
};
