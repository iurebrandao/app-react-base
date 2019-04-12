import React, { Component } from 'react';
import {View, TextInput, Button, Text, Alert, ActivityIndicator} from 'react-native';
import {Actions} from "react-native-router-flux";
import { connect } from 'react-redux';
import api from "../../axios";

class EditarEquipe extends Component {

    state={
        form:{
            name: ''
        },
        loading: false,
        loadingEditName: false,
        loadingDelete: false
    };

    onChange(key, value) {
        this.setState({
            form: Object.assign({}, this.state.form, { [key]: value })
        });
    }

    componentDidMount(){
        this.getEquipe();
    }

    getEquipe(){
        this.setState({loading: true});

        api.GetTeam(this.props.idEquipe).then(response => {

            this.setState({
                form: Object.assign({}, this.state.form, { ['name']: response.data.name })
            });
            this.setState({loading: false});
        }).catch((error) => {
            this.setState({loading: false});
            console.log(error.response);
            Alert.alert(
                'Falha ao recuperar os dados da equipe',
                error.response.data.msg,
                [
                    {text: 'OK', onPress: () => console.log(error)},
                ],
                {cancelable: false},
            );
        });
    }


    editarEquipe(){
        this.setState({loadingEdit: true});
        let data = {
            id: this.props.idEquipe,
            name: this.state.form.name
        };

        api.EditTeam(data).then(response => {
            this.setState({loadingEdit: false});
            Alert.alert(
                'Equipe editada',
                'Nome da equipe alterado com sucesso!',
                [
                    {text: 'OK', onPress: () => console.log(response.data)},
                ],
                {cancelable: false},
            );
        }).catch((error) => {
            this.setState({loadingEdit: false});
            console.log(error.response);
            Alert.alert(
                'Falha ao editar nome da equipe',
                error.response.data.msg,
                [
                    {text: 'OK', onPress: () => console.log(error)},
                ],
                {cancelable: false},
            );
        });
    }

    confirmarDeletarEquipe(){
        Alert.alert(
            'Deletar Equipe',
            'Tem certeza que deseja deletar essa equipe?',
            [
                {text: 'Sim', onPress: () => this.deletarEquipe()},
                {text: 'Não', onPress: () => console.log('cancelou')},
            ],
            {cancelable: true},
        );
    }

    deletarEquipe(){
        this.setState({loadingDelete: true});

        api.DeleteTeam(this.props.idEquipe).then(response => {
            this.setState({loadingEdit: false});
            Alert.alert(
                'Equipe apagada',
                'Equipe apagada com sucesso!',
                [
                    {text: 'OK', onPress: () => Actions.principal()},
                ],
                {cancelable: false},
            );
        }).catch((error) => {
            this.setState({loadingDelete: false});
            console.log(error.response);
            Alert.alert(
                'Falha ao apagar equipe',
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
            <View style={{ flex: 1, padding: 10 }}>
                {this.state.loading ?
                    (<ActivityIndicator size="large"/>) :
                    (<View style={{ flex: 1 }}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={{fontSize: 20, }}>Nome da Equipe:</Text>
                            <TextInput
                                placeholder='Nome da equipe'
                                style={{ fontSize: 20, height: 45, marginBottom: 30 }}
                                onChangeText={this.onChange.bind(this, 'name')}
                                value={this.state.form.name}
                            />
                            {
                                this.state.loadingEditName ?
                                    (<ActivityIndicator size="large" />) :
                                    ( <Button
                                        title="Editar"
                                        color="#115E54"
                                        onPress={() => this.editarEquipe() }
                                    />)
                            }
                        </View>


                        <View style={{ flex: 1, marginTop: 20 }}>
                            {
                                this.state.loadingDelete ?
                                    (<ActivityIndicator size="large" />) :
                                    ( <Button
                                        title="Apagar Equipe"
                                        color="#ff3860"
                                        onPress={() => this.confirmarDeletarEquipe() }
                                    />)
                            }

                        </View>
                    </View>)
                }
            </View>
        )
    }
}

const mapStateToProps = state => (
    {
    }
);

export default connect(mapStateToProps, {})(EditarEquipe);
