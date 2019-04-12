import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { TabViewAnimated, SceneMap } from 'react-native-tab-view';

import TabBarMenu from '../TabBarMenu';
import Pacientes from './Pacientes';
import EditarEquipe from './EditarEquipe';
import {connect} from "react-redux";
import {setIndexTabMenu} from "../../actions/AppActions";
import Membros from "./Membros";

class Detail extends Component {
  state = {
    index: 0,
    routes: [
      { key: '1', title: 'Pacientes' },
      { key: '2', title: 'Membros' },
      { key: '3', title: 'Config.' },
    ],
  };

  componentDidMount(){
    console.log('id equipe:', this.props.idEquipe);
  }

  _handleChangeTab = (index) => {
    // this.props.setIndexTabMenu(index);
    this.setState({ index });
  };

  _renderHeader = props => <TabBarMenu {...props} />;

  _renderScene = ({ route }) => {
    switch (route.key) {
      case '1':
        return <Pacientes idEquipe={this.props.idEquipe}/>;
      case '2':
        return <Membros idEquipe={this.props.idEquipe}/>;
      case '3':
        return <EditarEquipe idEquipe={this.props.idEquipe}/>;
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