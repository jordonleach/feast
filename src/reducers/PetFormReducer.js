import firebase from 'firebase';
import petProfile from '../actions/PetActions';
import {
	PET_UPDATE,
	PET_FEED_BREAKFAST,
	PET_FEED_DINNER,
	PET_CREATE,
	PET_SAVE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
	name: '',
	fedBreakfast: '',
	fedDinner: ''
};

export default (state = INITIAL_STATE, action) => {
	console.log(action);

	switch (action.type) {
		case PET_UPDATE:
			/* This is NOT returning an array, this is called 'Key Interpolation', 
			it determines what prop to use at runtime */
			return { ...state, [action.payload.prop]: action.payload.value };
		case PET_FEED_BREAKFAST:
			return { ...state, [action.payload.prop]: action.payload.value };
		case PET_FEED_DINNER:
			return { ...state, [action.payload.prop]: action.payload.value };
		case PET_CREATE:
			return INITIAL_STATE;
		case PET_SAVE_SUCCESS:
			return INITIAL_STATE;
		default:
			return state;
	}
};
