import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import { petsFetch } from '../actions';
import ListItem from './ListItem';

class PetsList extends Component {
	componentWillMount() {
		this.props.petsFetch();

		this.createDataSource(this.props);
	}

	componentWillReceiveProps(nextProps) {
		// nextProps are the next set of props that this component
		// will be rendered with
		// this.props is still the old set of props

		this.createDataSource(nextProps);
	}

	createDataSource({ pets }) {
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});

		this.dataSource = ds.cloneWithRows(pets);
	}

	renderRow(pet) {
		return <ListItem pet={pet} />;
	}

	render() {
		return (
			<ListView
				style={styles.listContainer}
				enableEmptySections
				dataSource={this.dataSource}
				renderRow={this.renderRow}
			/>
		);
	}
}

const styles = {
	listContainer: {
		margin: 10,
		padding: 5
	}
}

const mapStateToProps = state => {
	// Convert list of pets from an object to an array
	const pets = _.map(state.pets, (val, uid) => {
		return { ...val, uid }; // { name: 'S', id: 'i12li3' };
	});

	return { pets };
};

export default connect(mapStateToProps, { petsFetch })(PetsList);
