import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Switch, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import PetForm from './PetForm';
import { petFeedBreakfast, petFeedDinner, petUpdate } from '../actions';
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
				<CardSection style={styles.profileStyle}>
					<View style={styles.profileStyle}>
						<Image 
							source={{uri: 'https://facebook.github.io/react/logo-og.png'}}
							style={styles.imageStyle} />
						<Text style={styles.cardText}>
							{this.props.pet.name}
						</Text>
					</View>
				</CardSection>
				<CardSection style={styles.cardSectionStyle}>
					<Text style={styles.fedText}>
						Breakfast
					</Text>
					<Switch
						value={this.props.fedBreakfast}
						onValueChange={value => this.props.petFeedBreakfast({ 
							fedBreakfast: value, 
							uid: this.props.pet.uid 
						})}
					>
					</Switch>
					<Text style={styles.fedText}>
						Dinner
					</Text>
					<Switch
						value={this.props.fedDinner}
						onValueChange={value => this.props.petFeedDinner({ 
							fedDinner: value, 
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
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	profileStyle: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	cardText: {
		fontSize: 18,
		fontWeight: '500',
		paddingTop: 10,
		paddingBottom: 10
	},
	imageStyle: {
		width: 150,
		height: 150,
		borderRadius: 50
	},
	fedSwitches: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center'
	}
}

const mapStateToProps = (state) => {
	const { name, fedBreakfast, fedDinner, uid } = state.petForm;

	return { name, fedBreakfast, fedDinner, uid };
};


export default connect(mapStateToProps, { 
	petFeedBreakfast, 
	petFeedDinner, 
	petUpdate 
})(PetProfile);