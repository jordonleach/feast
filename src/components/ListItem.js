import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';

class ListItem extends Component {
	onRowPress() {
		Actions.petProfile({ pet: this.props.pet });
	}

	render() {
		const { name } = this.props.pet;

		return (
			<TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
				<View>
					<CardSection style={styles.cardStyle}>
						<Image 
							source={{uri: 'https://facebook.github.io/react/logo-og.png'}}
							style={styles.imageStyle} />
						<Text style={styles.titleStyle}>
							{name}
						</Text>
					</CardSection>
				</View>
			</TouchableWithoutFeedback>			
		);
	}
}

const styles = {
	cardStyle: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 10
	},
	titleStyle: {
		fontSize: 18
	},
	imageStyle: {
		width: 100,
		height: 100,
		borderRadius: 50
	}
};

export default ListItem;