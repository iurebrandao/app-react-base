import React, { Component } from 'react';
import {
	Text,
	View,
	Image,
	StyleSheet,
	TouchableOpacity
} from 'react-native';
import {Actions} from "react-native-router-flux";

export default class ItensPatients extends Component {

	render() {
		return (
			<TouchableOpacity style={styles.item} onPress={() => Actions.detailPaciente({idPaciente: this.props.id})}>

				<View style={styles.foto}>

					{this.props.picture.toString() !== 'bnVsbA==' ?
						(<Image style={{ height: 100, width: 100 }} source={{uri: "data:image/jpeg;base64," + this.props.picture}} />)
						:
						(<Image style={{ height: 100, width: 100 }} source={require('../imgs/default_profile.png')} />)
					}
				</View>


				<View style={styles.destalhesItem}>

					<Text style={styles.txtTitulo}>{this.props.name}</Text>
					<Text style={styles.txtDetalhes}>Data de Nascimento: {this.props.date}</Text>
					<Text style={styles.txtDetalhes}>Causa da internação: {this.props.causeHospitalization}</Text>
					<Text style={styles.txtDetalhes}>Médico responsável: {this.props.medic}</Text>

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
		marginBottom: 5
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
