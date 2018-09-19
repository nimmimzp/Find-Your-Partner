import { ADD_PLACE, DELETE_PLACE } from './actionTypes';

export const addPlace = (firstName,image,lastName) => {
    return {
        type: ADD_PLACE,
        firstName: firstName,
        image : image,
        lastName: lastName
    };
};

export const deletePlace = (key) => {
    return {
        type: DELETE_PLACE,
        placeKey: key
    };
};
