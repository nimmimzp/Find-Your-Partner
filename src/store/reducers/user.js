import { SET_PLACES,REMOVE_PLACE,AUTH_LOGIN_USER } from "../actions/actionTypes";

const initialState = {
	 places: [],
	 userData: []
};

const reducer = (state = initialState, action) => {
	
	switch (action.type) {
		
		default:
			return state;
	}
};

export default reducer;
