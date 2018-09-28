import { SET_PLACES,REMOVE_PLACE,AUTH_LOGIN_USER } from "../actions/actionTypes";

const initialState = {
	 places: [],
	 userData: []
};

const reducer = (state = initialState, action) => {
	
	switch (action.type) {
		
		case REMOVE_PLACE:
			return {
				...state,
				places: state.places.filter(place => {
					return place.key !== action.key;
				})
			};
		case SET_PLACES:
			return{
				...state,
				places:action.places
			}
		case AUTH_LOGIN_USER:
			return{
				...state,
				userData:action.userData
			}
		default:
			return state;
	}
};

export default reducer;
