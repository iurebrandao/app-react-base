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
import ActionButton from 'react-native-action-button';
import {Actions} from 'react-native-router-flux';
import {connect} from "react-redux";
import ItensLembretes from "../../containers/ItensLembretes";

class Lembretes extends Component {

	state = {
		loading: true,
		lembretesList: [],
		refreshing: false
	};

	componentWillMount() {
		this.getLembretes(this.props.idPaciente);
	}

	getLembretes = (id) =>{
		api.GetListReminders(id).then(response => {
			this.setState({lembretesList: response.data.reminders, loading: false, refreshing: false});
		}).catch((error) => {
			this.setState({loading: false, refreshing: false});
			Alert.alert(
				'Falha ao fazer requisição dos lembretes',
				error.response.data.msg,
				[
					{text: 'OK', onPress: () => console.log(error)},
				],
				{cancelable: false},
			);
		});
	};

	_onRefresh = () => {
		this.setState({refreshing: true});
		this.getLembretes(this.props.idPaciente);
	};

	render() {
		return (
			<View style={{ flex: 1}}>
			{
				this.state.loading ?
					(<ActivityIndicator size="large"/>): (<View style={{flex:1, backgroundColor: '#f3f3f3'}}>
						<ScrollView
							style={{ backgroundColor: '#DDD' }}
							refreshControl={
								<RefreshControl
									refreshing={this.state.refreshing}
									onRefresh={this._onRefresh}
								/>
							}
						>
							{ this.state.lembretesList.map(item => (
								<ItensLembretes key={item.id}
												id={item.id}
												message={item.message}
												date={item.date}
								/>
							))}
							{!this.state.lembretesList.length > 0 ?
								(<Text style={{padding: 10, fontSize: 20}}> Não há lembretes para esse paciente</Text>) : null}
						</ScrollView>
						<ActionButton buttonColor="rgba(54,221,140, 1)" onPress={() => Actions.adicionarLembrete({idPaciente: this.props.idPaciente})}/>
					</View>)
			}
			</View>
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

export default connect(mapStateToProps, null)(Lembretes);