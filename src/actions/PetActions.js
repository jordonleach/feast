import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { 
	PET_UPDATE,
	PET_CREATE,
	PET_FEED,
	PETS_FETCH_SUCCESS,
	PET_FEAST_FETCH,
	PET_SAVE_SUCCESS
} from './types';


export const petUpdate = ({ prop, value }) => {
	return {
		type: PET_UPDATE,
		payload: { prop, value }
	};
};

export const petCreate = ({ name, fed }) => {
	const { currentUser } = firebase.auth();

	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/pets`)
		.push({ name, fed })
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

export const petFeed = ({ fed, uid }) => {
	const { currentUser } = firebase.auth();

	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/pets/${uid}`)
			.update({ fed })
			.then(() => {
				dispatch({ type: PET_FEED, payload: { prop: 'fed', value: fed } });
				console.log(fed, uid);
			});
	};
};
