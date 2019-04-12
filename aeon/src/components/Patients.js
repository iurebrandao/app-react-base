import React, { Component } from 'react';
import {
	ActivityIndicator,
	Alert,
	ScrollView,
	View,
	StyleSheet, RefreshControl
} from 'react-native';
import api from '../axios';
import moment from 'moment';
import ItensPatients from "../containers/ItensPatients";
import ActionButton from 'react-native-action-button';
import {Actions} from 'react-native-router-flux';
import {connect} from "react-redux";

class Patients extends Component {

	state = {
		loading: true,
		patientsList: [],
		refreshing: false
	};

	componentWillMount() {
		if (this.props.index === 1) {
			this.getPatientsList();
		}
	}

	getPatientsList = () =>{
		api.GetListPatients().then(response => {
			this.setPatientsList(response.data.patients);
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

	setPatientsList = (list) =>{
		this.setState({patientsList: list, loading: false, refreshing: false});
	};

	_onRefresh = () => {
		this.setState({refreshing: true});
		this.getPatientsList();
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
						{ this.state.patientsList.map(item => (
							<ItensPatients key={item.id}
										   id={item.id}
										   action={item.action}
										   name={item.name}
										   picture={item.picture}
										   date={moment(item.birth_date).format('DD/MM/YYYY')}
										   causeHospitalization={item.cause_hospitalization}
										   medic={item.medic}
							/>
						))}
					</ScrollView>
					<ActionButton buttonColor="rgba(54,221,140, 1)" onPress={() => Actions.adicionarPaciente()}/>
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

export default connect(mapStateToProps, null)(Patients);