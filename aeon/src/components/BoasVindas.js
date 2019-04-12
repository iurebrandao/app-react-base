import React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default props => (
    <View style={{ flex: 1, padding: 15 }}>
        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, }}>Cadastrado feito com sucesso!</Text>
            <Text style={{ fontSize: 20, paddingTop: 10 }}>Confirme sua conta através do e-mail enviado para você</Text>
            <View style={{ flex: 1, padding:30}}>
                <Image style={{ flex: 1, width: null }} source={require('../imgs/logo_aeon.png')}/>
            </View>
        </View>
        <View style={{ flex: 1 }}>
            <Button title="Fazer Login" onPress={() => Actions.formLogin() } />
        </View>
    </View>
);
