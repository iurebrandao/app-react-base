import React, { Component } from 'react';
import {
	Text,
	View,
	Image,
	StyleSheet,
	TouchableHighlight,
	TouchableOpacity
} from 'react-native';
import {Actions} from "react-native-router-flux";

export default class ItensEquipes extends Component {

	render() {
		return (
			<TouchableOpacity style={styles.item} onPress={() => Actions.detailEquipe({idEquipe: this.props.id})}>

				<View style={styles.foto}>
					<Image style={{ height: 100, width: 100 }} source={require('../imgs/equipes.png')} />
				</View>

				<View style={styles.destalhesItem}>
					<Text style={styles.txtTitulo}>{this.props.name}</Text>
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
		fontSize: 25,
		marginTop: 30,
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
