import React, { Component } from 'react';
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity
} from 'react-native';
import moment from 'moment';

export default class ItensLembretes extends Component {

	render() {
		return (
			<TouchableOpacity style={styles.item}>

				<View style={styles.destalhesItem}>
					<Text style={styles.txtTitulo}>{this.props.message}</Text>
					<Text style={styles.txtDetalhes}>Data: {moment(this.props.date).format('DD/MM/YYYY, hh:mm:ss')}</Text>
				</View>

			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	item: {
		backgroundColor: '#FFF',
		borderWidth: 0.5,
		borderColor: '#999',
		margin: 10,
		padding: 10,
		flexDirection: 'row'
	},
	foto: {
		width: 102,
		height: 102
	},
	destalhesItem: {
		marginLeft: 20,
		flex: 1
	},
	txtTitulo: {
		fontSize: 18,
		marginBottom: 5,
		fontWeight: 'bold'
	},
	txtValor: {
		fontSize: 16,
		fontWeight: 'bold'
	},
	txtDetalhes: {
		marginTop: 5,
		fontSize: 16,
	}

});
