import React, { Component } from 'react';
import { View, TextInput, Button, ScrollView, Alert, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import {
    modificaEmail,
    modificaSenha,
    modificaNome,
    cadastraUsuario
} from '../actions/AutenticacaoActions';
import ReactNative from 'react-native';

class formCadastro extends Component {

    state = {
        form:{
            nome: '',
            email: '',
            cpf: '',
            crm: '',
            senha: '',
            confirmaSenha: '',
            especialidade: '',
            telefone: ''
        },
        rules: {
            nome: [
                { required: true, message: 'Insira o seu nome completo', trigger: 'blur, change' }
            ],
            cpf: [
                { required: true, message: 'Insira o CPF', trigger: 'blur' },
                {
                    validator: (rule, value, callback) => {
                        let strCpf = value.replace(/([~!@#$%^&*()_+=`{}\[\]\-|\\:;'<>,.\/? ])+/g, "");
                        if (strCpf === '') {
                            callback(new Error('Insira o CPF'));
                        }else{
                            if(!checkCpf(strCpf)){
                                callback(new Error('CPF inválido'));
                            }
                            callback();
                        }

                    }
                }
            ],
            gender: [
                { required: true, message: 'Selecione um gênero', trigger: 'change' }
            ],
            uf: [
                { required: true, message: 'Selecione uma unidade federativa', trigger: 'change' }
            ],
            birthDate: [
                { required: true, message: 'Insira a data de nascimento', trigger: 'blur' },
                {
                    validator: (rule, value, callback) => {
                        if (value.length !== 10) {
                            callback(new Error('Data de nascimento inválida. Formato: dd/mm/yyyy'));
                        }
                        else {
                            callback();
                        }
                    }
                }
            ],
            password: [
                {required: true, message: 'Insira uma senha', trigger: 'blur, change'},
                {
                    validator: (rule, value, callback) => {
                        if (value === '') {
                            callback(new Error('Insira uma senha'));
                        }
                        else if (value.length < 8) {
                            callback(new Error('A senha deve conter no mínimo 8 caracteres'));
                        }
                        else if (value.length > 30) {
                            callback(new Error('A senha deve conter no máximo 30 caracteres'));
                        }
                        else {
                            if (this.state.form.checkPassword !== '') {
                                this.refs.form.validateField('checkPassword');
                            }
                            callback();
                        }
                    }
                }
            ],
            checkPassword: [
                {required: true, message: 'Insira a senha novamente', trigger: 'blur, change'},
                {
                    validator: (rule, value, callback) => {
                        if (value === '') {
                            callback(new Error('Insira a senha novamente'));
                        } else if (value !== this.state.form.password) {
                            callback(new Error('As senhas não conferem'));
                        } else {
                            callback();
                        }
                    }
                }
            ]
        }
    };

    onChange(key, value) {
        this.setState({
            form: Object.assign({}, this.state.form, { [key]: value })
        });
    }

    showErrorAPI(msg){
        Alert.alert(
            'Erro ao credenciar',
            'My Alert Msg',
            [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
        );
    }

    _cadastraUsuario() {
        this.props.cadastraUsuario(this.state.form);
    }

    renderBtnCadastro() {
        if(this.props.loading_cadastro) {
            return (
                <ActivityIndicator size="large" />
            )
        }
        return (
            <Button title="Cadastrar" color="#115E54" onPress={() => this._cadastraUsuario()} />
        )
    }

    inputFocused (refName) {
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
                        <TextInput
                            value={this.state.form.nome}
                            placeholder="Nome"
                            style={{ fontSize: 20, height: 45 }}
                            ref='username'
                            onFocus={this.inputFocused.bind(this, 'username')}
                            onChangeText={this.onChange.bind(this, 'nome')}
                        />
                        <TextInput
                            value={this.state.form.email}
                            placeholder="E-mail"
                            style={{ fontSize: 20, height: 45 }}
                            onChangeText={this.onChange.bind(this, 'email')}
                        />
                        <TextInput
                            value={this.state.form.cpf}
                            placeholder="CPF"
                            style={{ fontSize: 20, height: 45 }}
                            keyboardType='numeric'
                            onChangeText={this.onChange.bind(this, 'cpf')}
                        />
                        <TextInput
                            value={this.state.form.crm}
                            placeholder="CRM"
                            style={{ fontSize: 20, height: 45 }}
                            keyboardType='numeric'
                            onChangeText={this.onChange.bind(this, 'crm')}
                        />
                        <TextInput
                            secureTextEntry
                            value={this.state.form.senha}
                            placeholder="Senha"
                            style={{ fontSize: 20, height: 45 }}
                            onChangeText={this.onChange.bind(this, 'senha')}
                        />
                        <TextInput
                            secureTextEntry
                            value={this.state.form.confirmaSenha}
                            placeholder="Confirmação de Senha"
                            style={{ fontSize: 20, height: 45 }}
                            onChangeText={this.onChange.bind(this, 'confirmaSenha')}
                        />
                        <TextInput
                            value={this.state.form.especialidade}
                            placeholder="Especialidade"
                            style={{ fontSize: 20, height: 45 }}
                            onChangeText={this.onChange.bind(this, 'especialidade')}
                        />
                        <TextInput
                            value={this.state.form.telefone}
                            placeholder="Telefone"
                            style={{ fontSize: 20, height: 45 }}
                            keyboardType='numeric'
                            ref='phone'
                            onFocus={this.inputFocused.bind(this, 'phone')}
                            onChangeText={this.onChange.bind(this, 'telefone')}
                        />
                        <Text style={{ color: '#ff0000', fontSize: 18}}>{this.props.erroCadastro}</Text>
                    </View>
                    <View style={{ flex: 1, paddingTop: 30}}>
                        {this.renderBtnCadastro()}
                    </View>

                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = state => {
    return (
        {
            nome: state.AutenticacaoReducer.nome,
            email: state.AutenticacaoReducer.email,
            senha: state.AutenticacaoReducer.senha,
            erroCadastro: state.AutenticacaoReducer.erroCadastro,
            loading_cadastro: state.AutenticacaoReducer.loading_cadastro
        }
    );
};

export default connect(
    mapStateToProps,
    {
        modificaEmail,
        modificaSenha,
        modificaNome,
        cadastraUsuario
    }
)(formCadastro);