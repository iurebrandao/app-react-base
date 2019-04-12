import React, { Component } from 'react';
import {
    View,
    TextInput,
    Button,
    ScrollView,
    Alert,
    Text,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    RefreshControl
} from 'react-native';
import { connect } from 'react-redux';
import {
    modificaEmail,
    modificaSenha,
    modificaNome,
    cadastraUsuario
} from '../actions/AutenticacaoActions';
import ReactNative from 'react-native';
import api from "../axios";
import ImagePicker from "react-native-image-picker";

class formCadastro extends Component {

    state = {
        form:{
            name: '',
            email: '',
            cpf: '',
            crm: '',
            speciality: '',
            phone: '',
            picture: 'bnVsbA=='
        },
        filePath: {},
        loading: true,
        loadingUpdate: false,
        refreshing: false
    };

    componentDidMount(){
        this.getUserInfo();
    }

    getUserInfo(){
        api.GetUser().then(response => {
            let form = response.data;
            console.log(response.data);
            console.log('filepath', this.state.filePath);
            this.setState({form: form, loading: false, refreshing: false});
        }).catch((err) => {
            this.setState({loading: false, refreshing: false});
            Alert.alert(
                'Falha ao recuperar os dados do perfil',
                error.response.data.msg,
                [
                    {text: 'OK', onPress: () => console.log(error)},
                ],
                {cancelable: false},
            );
        });
    }

    onChange(key, value) {
        this.setState({
            form: Object.assign({}, this.state.form, { [key]: value })
        });
    }

    editarUsuario() {
        this.setState({loadingUpdate: true});
        api.UpdateUser(this.state.form).then(response => {
            this.setState({loadingUpdate: false});
            Alert.alert(
                'Perfil editado',
                'Perfil editado com sucesso',
                [
                    {text: 'OK', onPress: () => console.log(response.data)},
                ],
                {cancelable: false},
            );
        }).catch((err) => {
            this.setState({loadingUpdate: false});
            Alert.alert(
                'Falha ao atualizar os dados',
                error.response.data.msg,
                [
                    {text: 'OK', onPress: () => console.log(error)},
                ],
                {cancelable: false},
            );
        });
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

    chooseFile = () => {

        let options = {
            title: 'Selecionar Imagem',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            takePhotoButtonTitle: 'Tirar Foto',
            chooseFromLibraryButtonTitle: 'Escolher da Galeria'
        };

        ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }else {
                let source = response;
                this.setState({
                    form: Object.assign({}, this.state.form, { ['picture']: response.data })
                });
                this.setState({
                    filePath: source,
                });
            }
        });
    };

    _onRefresh = () => {
        this.setState({refreshing: true});
        this.getUserInfo();
    };

    render() {
        return (
            <ScrollView ref='scrollView' style={{paddingTop: 70}}>
                {this.state.loading ?
                    (<ActivityIndicator size="large" />):
                    (
                        <View style={{flex: 1, padding: 10}}>

                            <TouchableOpacity style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: 5}} onPress={this.chooseFile.bind(this)}>
                                {
                                    Object.keys(this.state.filePath).length !== 0 ?
                                        (
                                            <Image
                                                source={{ uri: this.state.filePath.uri }}
                                                style={{ width: 150, height: 150, borderRadius: 5 }}
                                            />
                                        ) :
                                        (
                                            this.state.form.picture.toString() !== 'bnVsbA==' ?
                                                (<Image style={{ height: 150, width: 150, borderRadius: 5 }} source={{uri: "data:image/jpeg;base64," + this.state.form.picture}} />)
                                                :
                                                (<Image style={{ height: 150, width: 150 }} source={require('../imgs/default_profile.png')} />)
                                        )
                                }
                                <Text> Clique na imagem para escolher uma nova</Text>
                            </TouchableOpacity>

                            <View style={{ flex: 4, justifyContent: 'center' }}>
                                <TextInput
                                    value={this.state.form.name}
                                    placeholder="Nome"
                                    style={{ fontSize: 20, height: 45 }}
                                    ref='name'
                                    onFocus={this.inputFocused.bind(this, 'name')}
                                    onChangeText={this.onChange.bind(this, 'name')}
                                />
                                <TextInput
                                    value={this.state.form.email}
                                    placeholder="E-mail"
                                    editable={false}
                                    style={{ fontSize: 20, height: 45 }}
                                    onChangeText={this.onChange.bind(this, 'email')}
                                />
                                <TextInput
                                    value={this.state.form.cpf}
                                    placeholder="CPF"
                                    editable={false}
                                    style={{ fontSize: 20, height: 45 }}
                                    keyboardType='numeric'
                                    onChangeText={this.onChange.bind(this, 'cpf')}
                                />
                                <TextInput
                                    value={this.state.form.crm}
                                    placeholder="CRM"
                                    editable={false}
                                    style={{ fontSize: 20, height: 45 }}
                                    keyboardType='numeric'
                                    onChangeText={this.onChange.bind(this, 'crm')}
                                />
                                <TextInput
                                    value={this.state.form.speciality}
                                    placeholder="Especialidade"
                                    style={{ fontSize: 20, height: 45 }}
                                    onChangeText={this.onChange.bind(this, 'speciality')}
                                />
                                <TextInput
                                    value={this.state.form.phone}
                                    placeholder="Telefone"
                                    style={{ fontSize: 20, height: 45 }}
                                    keyboardType='numeric'
                                    ref='phone'
                                    onFocus={this.inputFocused.bind(this, 'phone')}
                                    onChangeText={this.onChange.bind(this, 'phone')}
                                />
                                <Text style={{ color: '#ff0000', fontSize: 18}}>{this.props.erroCadastro}</Text>
                            </View>
                            <View style={{ flex: 1, paddingTop: 30}}>
                                {this.state.loadingUpdate ?
                                    ( <ActivityIndicator size="large" />) :
                                    (<Button title="Salvar Alterações" color="#115E54" onPress={() => this.editarUsuario()} />)
                                }
                            </View>
                        </View>
                    )
                }

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