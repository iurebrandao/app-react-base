import React, { Component } from 'react';
import {
	Text,
	View,
	Image,
	StyleSheet,
	TouchableOpacity,
	Alert
} from 'react-native';
import {Actions} from "react-native-router-flux";

export default class Itens extends Component {

	redirect(){
		let msg = 'Paciente ' + this.props.name;

		if( (this.props.action === 'Registrado' || this.props.action === 'Transferido' || this.props.type === 'Lembrete') && this.props.active ){
			Actions.detailPaciente({idPaciente: this.props.id});
		}
		else if(!this.props.active && this.props.action === 'Registrado'){
			Alert.alert(
				'Paciente',
				msg + ' não está mais registrado no sistema',
				[
					{text: 'OK', onPress: () => console.log('OK Pressed')},
				],
				{cancelable: false},
			);
		}
		else{
			this.props.action === 'Recebeu Alta' ? msg += ' recebeu alta' : msg += ' faleceu';
			Alert.alert(
				'Paciente',
				msg,
				[
					{text: 'OK', onPress: () => console.log('OK Pressed')},
				],
				{cancelable: false},
			);
		}
	}


	render() {
		return (
			<TouchableOpacity style={styles.item} onPress={() => this.redirect()}>
				<View style={styles.foto}>
					{
						this.props.type==='Lembrete' ?
							(
								<Image style={{ height: 100, width: 100 }} source={require('../imgs/reminder.png')} />
							) :
							(
								this.props.picture.toString() !== 'bnVsbA==' ?
									(<Image style={{ height: 100, width: 100 }} source={{uri: "data:image/jpeg;base64," + this.props.picture}} />)
									:
									(<Image style={{ height: 100, width: 100 }} source={require('../imgs/default_profile.png')} />)
							)
					}
				</View>


				{this.props.type === 'Lembrete' ?
					(
						<View style={styles.destalhesItem}>
							<Text style={styles.txtTitulo}>Novo lembrete de {this.props.name} adicionado.</Text>
						</View>
					):
					(
						<View style={styles.destalhesItem}>
							{this.props.action === 'Registrado' ?
								(<Text style={styles.txtTitulo}>Paciente {this.props.name} adicionado.</Text>) : null
							}

							{this.props.action === 'Recebeu Alta' ?
								(<Text style={styles.txtTitulo}>Paciente {this.props.name} recebeu alta.</Text>) : null
							}

							{this.props.action === 'Faleceu' ?
								(<Text style={styles.txtTitulo}>Paciente {this.props.name} faleceu.</Text>) : null
							}

							{this.props.action === 'Transferido' ?
								(<Text style={styles.txtTitulo}>Paciente {this.props.name} foi transferido.</Text>) : null
							}
							<Text style={styles.txtDetalhes}>{this.props.date}</Text>

						</View>
					)
				}
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
		textAlign: 'right',
		bottom: 0
	}

});
