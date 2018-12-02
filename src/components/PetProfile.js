import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Switch } from 'react-native';
import { Actions } from 'react-native-router-flux';
import PetForm from './PetForm';
import { petFeed, petUpdate } from '../actions';
import { Card, CardSection, Button } from './common';

class PetProfile extends Component {
	componentWillMount() {
		_.each(this.props.pet, (value, prop) => {
			this.props.petUpdate({ prop, value });
		});
	}

	onButtonPress() {
		Actions.petEdit({ pet: this.props.pet });
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
						onValueChange={value => this.props.petFeed({ 
							fed: value, 
							uid: this.props.pet.uid 
						})}
					>
					</Switch>
				</CardSection>
				<CardSection>
					<Button onPress={this.onButtonPress.bind(this)}>
						Edit Pet
					</Button>
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
	const { name, fed, uid } = state.petForm;

	return { name, fed, uid };
};


export default connect(mapStateToProps, { petFeed, petUpdate })(PetProfile);