import React, { Component } from 'react';
import {View, Text, TextInput, Button, TouchableHighlight, Image, ActivityIndicator, Alert, AsyncStorage, Modal, StyleSheet} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { modificaEmail, modificaSenha, loginUsuarioSucesso, loginUsuarioErro } from '../actions/AutenticacaoActions';
import api from "../axios";

class formLogin extends Component {

    state={
        loading: false,
        modalVisible: false,
        form:{
            email: ''
        },
        loadindRecovery: false
    };


    componentWillMount(){
        this.checkLogin();
    }

    async checkLogin() {
        try {
            const token = await AsyncStorage.getItem('Token');
            if (token !== null) {
                api.CheckToken().then(response => {
                    console.log('token válido');
                    Actions.principal();
                }).catch(async ({error}) => {
                    console.log('token inválido', error);
                    await AsyncStorage.setItem('Token', '');
                });
            }
        } catch (error) {
            return null
        }
    }

    _autenticarUsuario() {
        const { email, senha } = this.props;

        let form = {
            email: email,
            password: senha
        };

        this.setState({loading: true});

        api.Login(form).then(response => {
            this.loginCorreto(response);
        }).catch((error) => {
            this.setState({loading: false});
            Alert.alert(
                'Falha ao fazer login',
                error.response.data.msg,
                [
                    {text: 'OK', onPress: () => console.log(error)},
                ],
                {cancelable: false},
            );
            this.props.loginUsuarioErro(error);
        });
    }

    storeToken = async (token) => {
        try {
            await AsyncStorage.setItem('Token', token);
        } catch (error) {
            console.log('deu erro ao guardar o token', token);
        }
    };

    loginCorreto (response) {
        this.setState({loading: false});
        this.storeToken(response.data.token);
        Actions.principal();
    }


    renderBtnAcessar() {
        if(this.state.loading) {
            return (
                <ActivityIndicator size="large" />
            )
        }
        return (
            // TODO: Retornar a função correta
            <Button title="Acessar" color='#115E54' onPress={() => this._autenticarUsuario()} />
        )
    }

    onChange(key, value) {
        this.setState({
            form: Object.assign({}, this.state.form, { [key]: value })
        });
    }

    recuperarSenha(){
        this.setState({loadindRecovery: true});
        let data = this.state.form;
        data['url'] = 'https://app.julianop.com.br/redefinir_senha';

        api.SendEmailPasswordChange(data).then(response => {
            this.setState({loadindRecovery: false});
            Alert.alert(
                'Recuperação de senha',
                'Um e-mail foi enviado para você recuperar sua senha',
                [
                    {text: 'OK', onPress: () => this.setState({modalVisible: false})},
                ],
                {cancelable: false},
            );
        }).catch((error) => {
            this.setState({loadindRecovery: false});
            console.log(error.response);
            Alert.alert(
                'Falha ao recuperar senha',
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
            <View style={{ flex: 1}} >
                <View style={{ flex: 1, padding: 10 }}>
                    <Modal animationType = {"slide"} transparent = {false}
                           visible = {this.state.modalVisible}
                           onRequestClose = {() => { console.log("Modal has been closed.") } }>

                        <TouchableHighlight onPress = {() => {this.setState({modalVisible: false})} }>
                            <Text style = {styles.text}> X </Text>
                        </TouchableHighlight>

                        <View style = {styles.modal}>

                            <Text style = {styles.text2}>E-mail para recuperação de senha</Text>

                            <TextInput
                                placeholder='E-mail'
                                style={{ fontSize: 20, marginBottom: 20 }}
                                onChangeText={this.onChange.bind(this, 'email')}
                                value={this.state.form.email}
                            />

                            {this.state.loadindRecovery ?
                                (<ActivityIndicator size="large" />) :
                                (
                                    <Button
                                        title="Confirmar"
                                        color="#115E54"
                                        onPress={() => this.recuperarSenha() }
                                    />
                                )
                            }

                        </View>
                    </Modal>

                    <View style={{ flex: 1, padding:30, marginTop: 10}}>
                        <Image style={{ flex: 1, width: null }} source={require('../imgs/logo_aeon.png')}></Image>
                    </View>

                    <View style={{ flex: 2, paddingTop: 25}}>
                        <TextInput
                            value={this.props.email}
                            style={{ fontSize: 20, height: 45 }}
                            placeholder='E-mail'
                            onChangeText={texto => this.props.modificaEmail(texto) }
                        />
                        <TextInput
                            secureTextEntry
                            value={this.props.senha}
                            style={{ fontSize: 20, height: 45 }}
                            placeholder='Senha'
                            onChangeText={texto => this.props.modificaSenha(texto) }
                        />
                        <Text style={{ color: '#ff0000', fontSize: 18 }}>
                            {this.props.erroLogin}
                        </Text>
                        <TouchableHighlight onPress={() => Actions.formCadastro() } style={{ paddingTop: 20 }}>
                            <Text style={{ fontSize: 20, color: '#4f81be' }}>Ainda não tem cadastro? Cadastre-se</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={{ flex: 2}}>
                        {this.renderBtnAcessar()}

                        <TouchableHighlight style={{ padding: 20, alignItems: 'center' }} onPress={() => {this.setState({modalVisible: true})}}>
                            <Text style={{ fontSize: 20  }}>Esqueci minha senha</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create ({
    container: {
        alignItems: 'center',
        backgroundColor: '#eff9eb',
    },
    modal: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 20
    },
    text: {
        textAlign: 'right',
        color: '#115E54',
        marginRight: 5,
        fontSize: 30
    },
    text2: {
        marginTop: 10,
        marginBottom: 50,
        fontSize: 20,
        fontWeight: 'bold'
    }
});

const mapStateToProps = state => (
    {
        email: state.AutenticacaoReducer.email,
        senha: state.AutenticacaoReducer.senha,
        erroLogin: state.AutenticacaoReducer.erroLogin,
        loading_login: state.AutenticacaoReducer.loading_login
    }
);


export default connect(mapStateToProps, { modificaEmail, modificaSenha, loginUsuarioSucesso, loginUsuarioErro })(formLogin);