import React from 'react';
import {View, Text, StatusBar, Image, TouchableHighlight, AsyncStorage} from 'react-native';
import { TabBar } from 'react-native-tab-view';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { habilitaInclusaoContato } from '../actions/AppActions';

const TabBarMenu = props => (
    <View style={{ backgroundColor: "#115E54", elevation: 4, marginBottom: 6 }}>

        <StatusBar backgroundColor="#114D44" />
        
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ height: 50, justifyContent: 'center' }}>
                <Text style={{ color: "#fff", fontSize: 20, marginLeft: 20 }}>Aeon Data</Text>
            </View>

            <View style={{ flexDirection: 'row', marginRight: 20 }}>
                <View style={{ justifyContent: 'center', width: 50, alignItems: 'center' }}>
                    <TouchableHighlight
                        onPress={() => { Actions.editarPerfil()}}
                        underlayColor="#114D44"
                    >
                        <Image source={require('../imgs/edit.png')} />
                    </TouchableHighlight>
                </View>
                <View style={{ justifyContent: 'center' }}>
                    <TouchableHighlight onPress={async () => {
                        Actions.formLogin();
                        await AsyncStorage.setItem('Token', '');
                    }}>
                        <Text style={{ fontSize: 20, color: '#fff' }}>Sair</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>

        <TabBar {...props} style={{ backgroundColor: "#115E54", elevation: 0 }} />
    </View>
);

export default connect(null, { habilitaInclusaoContato })(TabBarMenu);
