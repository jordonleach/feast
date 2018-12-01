import React, { Component } from 'react';
import { connect } from 'react-redux';
import { petUpdate, petCreate } from '../actions';
import { Card, CardSection, Button } from './common';
import PetForm from './PetForm';

class PetCreate extends Component {
	onButtonPress() {
		const { name, fed } = this.props;

		this.props.petCreate({ name, fed });
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
	const { name, fed } = state.petForm;

	return { name, fed };
};

export default connect(mapStateToProps, { 
	petUpdate, petCreate 
})(PetCreate);
