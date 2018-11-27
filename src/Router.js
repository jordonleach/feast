import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import PetList from './components/PetList';
import PetCreate from './components/PetCreate';
import PetProfile from './components/PetProfile';
import PetEdit from './components/PetEdit';

const RouterComponent = () => {
	return (
		<Router>
			<Scene key="root" hideNavBar>

				<Scene key="auth">
					<Scene key="login" component={LoginForm} title="Login" initial />
				</Scene>

				<Scene key="main">
					<Scene 
						rightTitle="Add"
						onRight={() => Actions.petCreate()}
						key="petList" 
						component={PetList} 
						title="Pets" 
						initial
					/>
					<Scene 
						key="petCreate" 
						component={PetCreate} 
						title="Add Pet"
					/>
					<Scene
						key="petProfile"
						component={PetProfile}
						title="Pet" // Dynamically change title to pet's name
					/>
					<Scene
						key="petEdit" 
						component={PetEdit} 
						title="Edit Pet"
					/>
				</Scene>
			</Scene>
		</Router>
	);
};

export default RouterComponent;
