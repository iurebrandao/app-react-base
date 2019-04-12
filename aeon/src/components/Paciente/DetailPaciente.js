import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { TabViewAnimated, SceneMap } from 'react-native-tab-view';
import TabBarMenu from '../TabBarMenu';
import EditarPaciente from './EditarPaciente';
import {connect} from "react-redux";
import {setIndexTabMenu} from "../../actions/AppActions";
import Lembretes from "./Lembretes";

class Detail extends Component {
  state = {
    index: 0,
    routes: [
      { key: '1', title: 'Perfil' },
      { key: '2', title: 'Lembretes' },
    ],
  };


  componentDidMount(){
    console.log('id paciente:', this.props.idPaciente);
    //TODO: Fazer tela de dados de saúde
  }

  _handleChangeTab = (index) => {
    // this.props.setIndexTabMenu(index);
    this.setState({ index });
  };

  _renderHeader = props => <TabBarMenu {...props} />;

  _renderScene = ({ route }) => {
    switch (route.key) {
      case '1':
        return <EditarPaciente idPaciente={this.props.idPaciente}/>;
      case '2':
        return <Lembretes idPaciente={this.props.idPaciente}/>;
      default:
        return null;
    }
  };

  render() {
    return (
      <TabViewAnimated
        key={this.state.index}
        style={styles.container}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onRequestChangeTab={this._handleChangeTab}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


export default connect(null, { setIndexTabMenu  })(Detail);