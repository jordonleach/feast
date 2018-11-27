import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import PetFormReducer from './PetFormReducer';
import PetReducer from './PetReducer';

export default combineReducers({
	auth: AuthReducer,
	petForm: PetFormReducer,
	pets: PetReducer
});
