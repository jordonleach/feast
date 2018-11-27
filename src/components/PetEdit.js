import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import PetForm from './PetForm';
import { petUpdate, petSave, petDelete } from '../actions';
import { Card, CardSection, Button, Confirm } from './common';

class PetEdit extends Component {
	state = { showModal: false };
	componentWillMount() {
		_.each(this.props.pet, (value, prop) => {
			this.props.petUpdate({ prop, value });
		});
	}

	onButtonPress() {
		const { name } = this.props;

		this.props.petSave({ name, uid: this.props.pet.uid });
	}

	// Text the person their shift (not for use with pets)
	// onTextPress() {
	// 	const { phone, shift } = this.props;

	// 	Communications.text(phone, `Your upcoming shift is on ${shift}`);
	// }

	onAccept() {
		const { uid } = this.props;

		this.props.petDelete({ uid: this.props.pet.uid });
	}

	onDecline() {
		this.setState({ showModal: false });
	}

	render() {
		return (
			<Card>
				<PetForm />

				<CardSection>
					<Button onPress={this.onButtonPress.bind(this)}>
						Save Changes
					</Button>
				</CardSection>

				<CardSection>
					<Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
						Delete Pet
					</Button>
				</CardSection>

				<Confirm
					visible={this.state.showModal}
					onAccept={this.onAccept.bind(this)}
					onDecline={this.onDecline.bind(this)}
				>
					Are you sure you want to delete this?
				</Confirm>
			</Card>
		);
	}
}

const mapStateToProps = (state) => {
	const { name } = state.petForm;

	return { name };
};

export default connect(mapStateToProps, { 
	petUpdate, petSave, petDelete 
})(PetEdit);