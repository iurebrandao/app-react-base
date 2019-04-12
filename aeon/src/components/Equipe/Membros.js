import React, { Component } from 'react';
import {
	ActivityIndicator,
	Alert,
	ScrollView,
	View,
	StyleSheet,
	Text, RefreshControl
} from 'react-native';
import api from '../../axios';
import moment from 'moment';
import ActionButton from 'react-native-action-button';
import {Actions} from 'react-native-router-flux';
import {connect} from "react-redux";
import ItensMedics from "../../containers/ItensMedics";


class Membros extends Component {

	state = {
		loading: true,
		medicsList: [],
		refreshing: false
	};

	componentWillMount() {
		this.getMedicsList(this.props.idEquipe);
	}

	getMedicsList = (id) =>{
		api.GetTeam(id).then(response => {
			if(response.data.medics){
				this.setMedicsList(response.data.medics);
			}
		}).catch((error) => {
			this.setState({loading: false, refreshing: false});
			Alert.alert(
				'Falha ao fazer requisição do pacientes',
				error.response.data.msg,
				[
					{text: 'OK', onPress: () => console.log(error)},
				],
				{cancelable: false},
			);
		});
	};

	setMedicsList = (list) =>{
		this.setState({medicsList: list, loading: false, refreshing: false});
	};

	_onRefresh = () => {
		this.setState({refreshing: true});
		this.getMedicsList(this.props.idEquipe);
	};

	render() {
		return (
			this.state.loading ?
				(<ActivityIndicator size="large" />) :
				(
					<View style={{flex:1, backgroundColor: '#f3f3f3'}}>
						<ScrollView
							style={{ backgroundColor: '#DDD' }}
							refreshControl={
								<RefreshControl
									refreshing={this.state.refreshing}
									onRefresh={this._onRefresh}
								/>
							}
						>
							{ this.state.medicsList.map(item => (
								<ItensMedics key={item.id}
											 name={item.name}
											 picture={item.picture}
											 email={item.email}
											 speciality={item.speciality}
											 phone={item.phone}
								/>
							))}
							{!this.state.medicsList.length > 0 ?
								(<Text style={{fontSize: 25, padding: 10}}>Não há médicos nessa equipe!</Text>) : null
							}
						</ScrollView>

						<ActionButton buttonColor="rgba(54,221,140, 1)" onPress={() => Actions.adicionarMembro({teamId: this.props.idEquipe})}/>
					</View>
				)
		);
	}
}

const styles = StyleSheet.create({
	actionButtonIcon: {
		fontSize: 20,
		height: 22,
		color: 'white',
	},
});

const mapStateToProps = state => (
	{
		index: state.AppReducer.index,
	}
);

export default connect(mapStateToProps, null)(Membros);