import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { petUpdate } from '../actions';
import { CardSection, Input } from './common';

class PetForm extends Component {
	render() {
		return (
			<View>
				<CardSection>
					<Input
						label="Name"
						placeholder="Cooper"
						value={this.props.name}
						onChangeText={value => this.props.petUpdate({ prop: 'name', value })}
					/>
				</CardSection>
			</View>
		);
	}
}

const styles = {
	pickerLabelStyle: {
		fontSize: 18,
		paddingLeft: 20
	}
};

const mapStateToProps = (state) => {
	const { name } = state.petForm;

	return { name };
};

export default connect(mapStateToProps, { petUpdate })(PetForm);