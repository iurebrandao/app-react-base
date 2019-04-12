import React, { Component } from 'react';
import { View, TextInput, Button, ScrollView, Alert, Text, ActivityIndicator, Picker } from 'react-native';
import moment from 'moment';
import ReactNative from 'react-native';
import api from '../../axios';

class AdicionarLembrete extends Component {

    state = {
        form:{
            message:'',
            patient_id: null,
            date: moment().format('DD-MM-YYYY HH:MM:SS'),
            Na: '',
            k: '',
            CI: '',
            Co2: '',
            Bun: '',
            Creat: '',
            wcb: '',
            Hgb: '',
            Plt: ''
        },
        loadingCadastro: false,
        listHospitals: [],
        listMedics: []
    };

    onChange(key, value) {
        this.setState({
            form: Object.assign({}, this.state.form, { [key]: value })
        });
    }

    cadastraLembrete() {
        this.setState({loadingCadastro: true});
        let form = Object.assign({}, this.state.form);
        form.patient_id = this.props.idPaciente;

        api.AddReminder(form).then(response => {
            this.setState({loadingCadastro: false});
            Alert.alert(
                'Lembrete adicionado',
                'Lembrete adicionado com sucesso!',
                [
                    {text: 'OK', onPress: () => console.log(response.data)},
                ],
                {cancelable: false},
            );
        }).catch((error) => {
            this.setState({loadingCadastro: false});
            Alert.alert(
                'Falha ao adicionar lembrete',
                error.response.data.msg,
                [
                    {text: 'OK', onPress: () => console.log('error,',error.response)},
                ],
                {cancelable: false},
            );
        });
    }

    inputFocused (refName){
        setTimeout(() => {
            let scrollResponder = this.refs.scrollView.getScrollResponder();
            scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
                ReactNative.findNodeHandle(this.refs[refName]),
                110, //additionalOffset
                true
            );
        }, 50);
    }

    render() {
        return (
            <ScrollView ref='scrollView' style={{paddingTop: 70}}>
                <View style={{flex: 1, padding: 10}}>
                    <View style={{ flex: 4, justifyContent: 'center' }}>
                        <Text style={{fontSize: 20}}>Data: {this.state.form.date}</Text>
                        <Text style={{fontSize: 20}}>Lembrete:</Text>
                        <TextInput
                            value={this.state.form.message}
                            placeholder="Escreva seu lembrete aqui"
                            style={{ fontSize: 20}}
                            multiline={true}
                            numberOfLines={3}
                            ref='message'
                            onFocus={this.inputFocused.bind(this, 'message')}
                            onChangeText={this.onChange.bind(this, 'message')}
                        />

                        <TextInput
                            value={this.state.form.k}
                            placeholder="K"
                            style={{ fontSize: 20, height: 45 }}
                            keyboardType='numeric'
                            onChangeText={this.onChange.bind(this, 'k')}
                        />

                        <TextInput
                            value={this.state.form.CI}
                            placeholder="CI"
                            style={{ fontSize: 20, height: 45 }}
                            keyboardType='numeric'
                            onChangeText={this.onChange.bind(this, 'CI')}
                        />

                        <TextInput
                            value={this.state.form.Co2}
                            placeholder="Co2"
                            style={{ fontSize: 20, height: 45 }}
                            keyboardType='numeric'
                            onChangeText={this.onChange.bind(this, 'Co2')}
                        />

                        <TextInput
                            value={this.state.form.Bun}
                            placeholder="Bun"
                            style={{ fontSize: 20, height: 45 }}
                            keyboardType='numeric'
                            onChangeText={this.onChange.bind(this, 'Bun')}
                        />

                        <TextInput
                            value={this.state.form.Creat}
                            placeholder="Creat"
                            style={{ fontSize: 20, height: 45 }}
                            keyboardType='numeric'
                            onChangeText={this.onChange.bind(this, 'Creat')}
                        />

                        <TextInput
                            value={this.state.form.wcb}
                            placeholder="wcb"
                            style={{ fontSize: 20, height: 45 }}
                            keyboardType='numeric'
                            onChangeText={this.onChange.bind(this, 'wcb')}
                        />

                        <TextInput
                            value={this.state.form.Hgb}
                            placeholder="Hgb"
                            style={{ fontSize: 20, height: 45 }}
                            keyboardType='numeric'
                            onChangeText={this.onChange.bind(this, 'Hgb')}
                        />

                        <TextInput
                            value={this.state.form.Plt}
                            placeholder="Plt"
                            style={{ fontSize: 20, height: 45 }}
                            keyboardType='numeric'
                            onChangeText={this.onChange.bind(this, 'Plt')}
                        />

                    </View>

                    <View style={{ flex: 1, paddingTop: 30}}>
                        {this.state.loadingCadastro ?
                            (<ActivityIndicator size="large" />) :
                            (<Button title="Cadastrar Lembrete" color="#115E54" onPress={() => this.cadastraLembrete()} />)
                        }
                    </View>

                </View>
            </ScrollView>
        );
    }
}

export default AdicionarLembrete;