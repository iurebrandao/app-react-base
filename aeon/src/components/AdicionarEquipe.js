import React, { Component } from 'react';
import {View, TextInput, Button, Text, Alert, ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';
import api from "../axios";

class AdicionarEquipe extends Component {

    state={
        form:{
            name: ''
        },
        loading: false
    };

    onChange(key, value) {
        this.setState({
            form: Object.assign({}, this.state.form, { [key]: value })
        });
    }

    adicionaEquipe(){
        this.setState({loading: true});

        api.AddTeam(this.state.form).then(response => {
            this.setState({loading: false});
            Alert.alert(
                'Equipe adicionada',
                'Equipe adicionada com sucesso!',
                [
                    {text: 'OK', onPress: () => console.log(response.data)},
                ],
                {cancelable: false},
            );
            this.setState({
                form: Object.assign({}, this.state.form, { ['name']: '' })
            });
        }).catch((error) => {
            this.setState({loading: false});
            console.log(error.response);
            Alert.alert(
                'Falha ao adicionar equipe',
                error.response.data.msg,
                [
                    {text: 'OK', onPress: () => console.log(error)},
                ],
                {cancelable: false},
            );
        });
    }


    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <TextInput
                            placeholder='Nome da equipe'
                            style={{ fontSize: 20, height: 45 }}
                            onChangeText={this.onChange.bind(this, 'name')}
                            value={this.state.form.name}
                        />
                    </View>

                    <View style={{ flex: 1 }}>
                        {
                            this.state.loading ?
                                (<ActivityIndicator size="large" />) :
                                ( <Button
                                    title="Adicionar"
                                    color="#115E54"
                                    onPress={() => this.adicionaEquipe() }
                                />)
                        }

                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => (
    {
    }
);

export default connect(mapStateToProps, {})(AdicionarEquipe);
