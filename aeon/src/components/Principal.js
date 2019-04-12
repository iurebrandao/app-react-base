import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { TabViewAnimated, SceneMap } from 'react-native-tab-view';

import TabBarMenu from './TabBarMenu';
import Feed from './Feed';
import Patients from './Patients';
import Equipes from './Equipes';
import {connect} from "react-redux";
import {setIndexTabMenu} from "../actions/AppActions";

class Principal extends Component {
  state = {
    index: 0,
    routes: [
      { key: '1', title: 'Feed' },
      { key: '2', title: 'Pacientes' },
      { key: '3', title: 'Equipes' }
    ],
  };

  _handleChangeTab = (index) => {
    this.props.setIndexTabMenu(index);
    this.setState({ index });
  };

  _renderHeader = props => <TabBarMenu {...props} />;

  _renderScene = SceneMap({
    '1': Feed,
    '2': Patients,
    '3': Equipes
  });


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


export default connect(null, { setIndexTabMenu  })(Principal);