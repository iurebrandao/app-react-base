import React, { Component } from 'react';
import {
	ActivityIndicator,
	Alert,
	ScrollView,
	View,
	StyleSheet, RefreshControl
} from 'react-native';
import api from '../axios';
import ItensEquipes from "../containers/ItensEquipes";
import ActionButton from 'react-native-action-button';
import {Actions} from 'react-native-router-flux';
import {connect} from "react-redux";

class Equipes extends Component {

	state = {
		loading: true,
		teamsList: [],
		calledOnce: false,
		refreshing: false
	};

	componentWillMount() {
		if(this.props.index === 2){
			this.getTeamsList();
		}
	}

	getTeamsList = () =>{
		api.GetListTeams().then(response => {
			this.setTeamsList(response.data.teams);
		}).catch((error) => {
			this.setState({loading: false, refreshing: false});
			Alert.alert(
				'Falha ao fazer requisição de equipes',
				error.response.data.msg,
				[
					{text: 'OK', onPress: () => console.log(error)},
				],
				{cancelable: false},
			);
		});
	};

	setTeamsList = (list) =>{
		this.setState({teamsList: list, loading: false, refreshing: false});
	};

	_onRefresh = () => {
		this.setState({refreshing: true});
		this.getTeamsList();
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
						{ this.state.teamsList.map(item => (
							<ItensEquipes key={item.id}
										  id={item.id}
										  name={item.name}
							/>
						))}
					</ScrollView>
					<ActionButton buttonColor="rgba(54,221,140, 1)" title="Nova Equipe" onPress={() => Actions.adicionarEquipe()}>
					</ActionButton>
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

export default connect(mapStateToProps, null)(Equipes);