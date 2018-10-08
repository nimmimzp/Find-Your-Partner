import {AUTH_REMOVE_TOKEN,AUTH_SET_TOKEN,AUTH_SET_USERID} from '../actions/actionTypes';

const initialState = {
    token: null
};

const reducer = (state = initialState, action) => {
   switch (action.type) {
        case AUTH_SET_TOKEN:
            return {
                ...state,
                token: action.token
                
            }
        case AUTH_SET_USERID:
            return {
                ...state,
                userId:  action.userId
            }
        case AUTH_REMOVE_TOKEN:
            return {
                ...state,
                token:null
            }
        default:
           return state;
    }
};

export default reducer;