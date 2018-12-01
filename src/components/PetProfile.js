import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Switch } from 'react-native';
import PetForm from './PetForm';
import { petFeed, petUpdate } from '../actions';
import { Card, CardSection } from './common';

class PetProfile extends Component {
	componentWillMount() {
		_.each(this.props.pets, (value, prop) => {
			this.props.petUpdate({ prop, value });
		});
	}

	// onSwitchPress() {
	// 	const { value, fed, uid } = this.props;

	// 	this.props.petFeed({ fed: this.props.pet.fed, uid: this.props.pet.uid});
	// }

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
						// onValueChange={this.onSwitchPress.bind(this)}
					>
					</Switch>
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