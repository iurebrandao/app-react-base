import React, { Component } from 'react';
import {
	ActivityIndicator,
	Alert,
	ScrollView,
	RefreshControl
} from 'react-native';
import api from '../axios';
import Itens from '../containers/Itens';
import moment from 'moment';
import {connect} from "react-redux";

class Feed extends Component {

	state = {
		loading: true,
		feedList: [],
		calledOnce: false,
		refreshing: false
	};

	componentWillMount() {
		if(this.props.index === 0){
			this.getFeedList();
		}
	}

	getFeedList = () =>{
		api.Feed().then(response => {
			this.setFeedList(response.data.feed);
		}).catch((error) => {
			this.setState({loading: false, refreshing: false});
			Alert.alert(
				'Falha ao fazer requisição do feed',
				error.response.data.msg,
				[
					{text: 'OK', onPress: () => console.log(error)},
				],
				{cancelable: false},
			);
		});
	};

	setFeedList = (list) =>{
		this.setState({feedList: list, loading: false, refreshing: false});
	};

	_onRefresh = () => {
		this.setState({refreshing: true});
		this.getFeedList();
	};

	render() {
		return (
			this.state.loading ?
				(<ActivityIndicator size="large" />) :
				(<ScrollView
					style={{ backgroundColor: '#DDD' }}
					refreshControl={
						<RefreshControl
							refreshing={this.state.refreshing}
							onRefresh={this._onRefresh}
						/>
					}
				>
					{ this.state.feedList.map(item => {
						return (
							<Itens key={item.timestamp}
								   id={item.patient.id}
								   active={item.patient.active}
								   action={item.action}
								   name={item.patient.name}
								   picture={item.patient.picture}
								   date={moment(item.timestamp).format('DD/MM/YYYY')}
								   type={item.type}
							/>
						)
					})}
				</ScrollView>)
		);
	}
}

const mapStateToProps = state => (
	{
		index: state.AppReducer.index,
	}
);

export default connect(mapStateToProps, null)(Feed);
