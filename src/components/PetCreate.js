import React, { Component } from 'react';
import { connect } from 'react-redux';
import { petUpdate, petCreate } from '../actions';
import { Card, CardSection, Button } from './common';
import PetForm from './PetForm';

class PetCreate extends Component {
	onButtonPress() {
		const { name } = this.props;

		this.props.petCreate({ name });
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
	const { name } = state.petForm;

	return { name };
};

export default connect(mapStateToProps, { 
	petUpdate, petCreate 
})(PetCreate);
