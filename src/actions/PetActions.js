import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { 
	PET_UPDATE,
	PET_CREATE,
	PET_FEED_BREAKFAST,
	PET_FEED_DINNER,
	PETS_FETCH_SUCCESS,
	PET_SAVE_SUCCESS
} from './types';


export const petUpdate = ({ prop, value, uid }) => {
	return {
		type: PET_UPDATE,
		payload: { prop, value }
	};
};

export const petCreate = ({ name, fedBreakfast, fedDinner }) => {
	const { currentUser } = firebase.auth();

	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/pets`)
		.push({ name, fedBreakfast, fedDinner })
		.then(() => {
			dispatch({ type: PET_CREATE });
			Actions.pop();
		});
	};
};

export const petsFetch = () => {
	const { currentUser } = firebase.auth();

	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/pets`)
			.on('value', snapshot => {
				dispatch({ type: PETS_FETCH_SUCCESS, payload: snapshot.val() });
			});
	};
};

export const petSave = ({ name, uid }) => {
	const { currentUser } = firebase.auth();

	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/pets/${uid}`)
			.set({ name })
			.then(() => {
				dispatch({ type: PET_SAVE_SUCCESS });
				Actions.pop();
			});
	};
};

export const petDelete = ({ uid }) => {
	const { currentUser } = firebase.auth();

	return () => {
		firebase.database().ref(`/users/${currentUser.uid}/pets/${uid}`)
			.remove()
			.then(() => {
				Actions.pop();
			});
	};
};

export const petProfile = ({ uid }) => {
	const { currentUser } = firebase.auth();

	return () => {
		firebase.database().ref(`/users/${currentUser.uid}/pets/${uid}`);
	};
};

export const petFeedBreakfast = ({ fedBreakfast, uid }) => {
	const { currentUser } = firebase.auth();

	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/pets/${uid}`)
			.update({ fedBreakfast })
			.then(() => {
				dispatch({ 
					type: PET_FEED_BREAKFAST, 
					payload: { prop: 'fedBreakfast', value: fedBreakfast } });
			});
	};
};

export const petFeedDinner = ({ fedDinner, uid }) => {
	const { currentUser } = firebase.auth();

	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/pets/${uid}`)
			.update({ fedDinner })
			.then(() => {
				dispatch({ 
					type: PET_FEED_DINNER, 
					payload: { prop: 'fedDinner', value: fedDinner } });
			});
	};
};