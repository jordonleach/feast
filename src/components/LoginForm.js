import React, { Component } from 'react';
import { StyleSheet, View, Text, ImageBackground, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Input } from 'react-native-elements';
import { Font } from 'expo';

import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Button, Spinner } from './common';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class LoginForm extends Component {
	onEmailChange(text) {
		this.props.emailChanged(text);
	}

	onPasswordChange(text) {
		this.props.passwordChanged(text);
	}

	onButtonPress() {
		const { email, password } = this.props;

		this.props.loginUser({ email, password });
	}

	renderError() {
		if (this.props.error) {
			return (
				<View style={{ backgroundColor: 'white' }}>
					<Text style={styles.errorTextStyle}>
						{this.props.error}
					</Text>
				</View>
			);
		}
	}

	renderButton() {
		if (this.props.loading) {
			return <Spinner size="large" />;
		}

		return (
			<Button onPress={this.onButtonPress.bind(this)}>
				Login
			</Button>
		);
	}

	render() {
		return (
			<View style={styles.container}>
				<ImageBackground
					style={styles.bgImage}
				>
					<Card>
						<CardSection>
							<Input
								label="Email"
								placeholder="email@gmail.com"
								// Because it is a callback and referencing this, we need to use bind
								onChangeText={this.onEmailChange.bind(this)}
								value={this.props.email}
								keyboardType="email-address"
							/>																						
						</CardSection>

						<CardSection>
							<Input
								secureTextEntry
								label="Password"
								placeholder="password"
								onChangeText={this.onPasswordChange.bind(this)}
								value={this.props.password}
							/>
						</CardSection>

						{this.renderError()}

						<CardSection>
							{this.renderButton()}
						</CardSection>
					</Card> 
				</ImageBackground>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
    flex: 1
  },
  bgImage: {
  	backgroundColor: '#7A9BC5',
    flex: 1,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
	errorTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'red'
	}
});

const mapStateToProps = ({ auth }) => {
	const { email, password, error, loading } = auth;

	return { email, password, error, loading };
};

export default connect(mapStateToProps, { 
	emailChanged, passwordChanged, loginUser 
})(LoginForm);

