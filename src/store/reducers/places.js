import { SET_PLACES } from "../actions/actionTypes";

const initialState = {
 	places: []
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		
		// case DELETE_PLACE:
		// 	return {
		// 		...state,
		// 		places: state.places.filter(place => {
		// 			return place.key !== action.placeKey;
		// 		})
		// 	};
		case SET_PLACES:
			return{
				...state,
				places:action.places
			}
		default:
			return state;
	}
};

export default reducer;
