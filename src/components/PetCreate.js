import React, { Component } from 'react';
import { connect } from 'react-redux';
import { petUpdate, petCreate } from '../actions';
import { Card, CardSection, Button } from './common';
import PetForm from './PetForm';

class PetCreate extends Component {
	onButtonPress() {
		const { name, fedBreakfast, fedDinner } = this.props;

		this.props.petCreate({ name, fedBreakfast, fedDinner });
	}

	render() {
		return (
			<Card>
				<PetForm {...this.props} />
				<CardSection>
					<Button onPress={this.onButtonPress.bind(this)}>
						Create
					</Button>
				</CardSection>
			</Card>
		);
	}
}


const mapStateToProps = (state) => {
	const { name, fedBreakfast, fedDinner } = state.petForm;

	return { name, fedBreakfast, fedDinner };
};

export default connect(mapStateToProps, { 
	petUpdate, petCreate 
})(PetCreate);
