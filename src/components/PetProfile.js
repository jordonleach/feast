import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Switch } from 'react-native';
import PetForm from './PetForm';
import { petFeast } from '../actions';
import { Card, CardSection, Button } from './common';

class PetProfile extends Component {
	componentWillMount() {
		_.each(this.props.pet, (value, prop) => {
			this.props.petFeast({ prop, value });
		});
	}

	onSwitchPress() {
		const { name, fed } = this.props;
		console.log(name, fed);
	}

	render() {
		return (
			<Card>
				<CardSection style={styles.cardSectionStyle}>
					<View>
						<Text>
							{this.props.pet.name}
						</Text>
					</View>
					<Switch
						value={this.props.fed}
						// onValueChange={this.onSwitchPress.bind(this)}
						onValueChange={value => this.props.petFeast({ prop: 'fed', value })}
					/>
				</CardSection>

			</Card>
		);
	}
}

const styles = {
	cardSectionStyle: {
		justifyContent: 'space-between'
	}
}

const mapStateToProps = (state) => {
	const { name, fed } = state.petForm;

	return { name, fed };
};

export default connect(mapStateToProps, { 
	petFeast
})(PetProfile);