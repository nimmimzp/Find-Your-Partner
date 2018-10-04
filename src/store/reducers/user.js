import { SET_PLACES,REMOVE_PLACE,AUTH_LOGIN_USER, SET_USER_INFO } from "../actions/actionTypes";

const initialState = {
	places: [],
	userData: [],
	loginUser:[]
};

const reducer = (state = initialState, action) => {
	
	switch (action.type) {
		case SET_USER_INFO:
		return{
			...state,
			loginUser:action.loginUserInfo
		}
		default:
			return state;
	}
};

export default reducer;
