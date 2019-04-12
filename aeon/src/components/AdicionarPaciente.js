import React, { Component } from 'react';
import { View, TextInput, Button, ScrollView, Alert, Text, ActivityIndicator, Picker, Image } from 'react-native';
import moment from 'moment';
import ReactNative from 'react-native';
import api from '../axios';
import ImagePicker from 'react-native-image-picker';

class AdicionarPaciente extends Component {

    state = {
        form:{
            name: '',
            birthdate:'',
            cause_hospitalization:'',
            picture:'bnVsbA==',
            user_id: null,
            hospital_id: null
        },
        filePath: {},
        loadingCadastro: false,
        listHospitals: [],
        listMedics: []
    };

    onChange(key, value) {
        this.setState({
            form: Object.assign({}, this.state.form, { [key]: value })
        });
    }

    componentWillMount(){
        this.getHospitais();
        this.getMedicos();
    }

    getHospitais(){
        api.GetListHospitals().then(response => {
            console.log(response.data.hospitals);
            this.setState({listHospitals: response.data.hospitals});
        }).catch((err) => {
            Alert.alert(
                'Falha ao recuperar os hospitais',
                error.response.data.msg,
                [
                    {text: 'OK', onPress: () => console.log(error)},
                ],
                {cancelable: false},
            );
        });
    }

    getMedicos(){
        api.GetListMedics().then(response => {
            this.setState({listMedics: response.data.users});
        }).catch((err) => {
            Alert.alert(
                'Falha ao recuperar os hospitais',
                error.response.data.msg,
                [
                    {text: 'OK', onPress: () => console.log(error)},
                ],
                {cancelable: false},
            );
        });
    }

    cadastraPaciente() {
        let data = Object.assign({}, this.state.form);

        this.setState({loadingCadastro: true});

        if(!data.user_id && this.state.listMedics.length > 0){
            data.user_id = this.state.listMedics[0].id;
        }

        if(!data.hospital_id && this.state.listHospitals.length > 0){
            data.hospital_id = this.state.listHospitals[0].id;
        }

        if ( data.picture == null) {
            data.picture = "bnVsbA==";
        }

        api.AddPaciente(data).then(response => {
            this.setState({loadingCadastro: false});
            Alert.alert(
                'Paciente adicionado',
                'Paciente adicionado com sucesso!',
                [
                    {text: 'OK', onPress: () => console.log(response.data)},
                ],
                {cancelable: false},
            );
            let formClean ={
                name: '',
                nomeMedico:'',
                birthdate:'',
                cause_hospitalization:'',
                picture:null,
                user_id: null,
                hospital_id: null
            };
            this.setState({
                form: Object.assign({}, this.state.form, { formClean })
            });
        }).catch((error) => {
            this.setState({loadingCadastro: false});
            Alert.alert(
                'Falha ao cadastrar paciente',
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


    render() {
        return (
            <ScrollView ref='scrollView' style={{paddingTop: 70}}>
                <View style={{flex: 1, padding: 10}}>
                    <View style={{ flex: 4, justifyContent: 'center' }}>
                        <TextInput
                            value={this.state.form.name}
                            placeholder="Nome"
                            style={{ fontSize: 20, height: 45 }}
                            ref='name'
                            onFocus={this.inputFocused.bind(this, 'name')}
                            onChangeText={this.onChange.bind(this, 'name')}
                        />

                        <Text style={{paddingTop: 10, paddingLeft: 5, fontSize: 18, fontWeight: 'bold'}}>Médico Responsável:</Text>
                        <Picker
                            selectedValue={this.state.form.user_id}
                            style={{height: 50, width: 300}}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({
                                    form: Object.assign({}, this.state.form, { ['user_id']: itemValue })
                                })
                            }>
                            { this.state.listMedics.map(item => (
                                <Picker.Item key={item.id}
                                             label={item.name}
                                             value={item.id}
                                />
                            ))}
                        </Picker>

                        <TextInput
                            value={this.state.form.birthdate}
                            placeholder="Data de Nascimento (DD-MM-YYYY)"
                            style={{ fontSize: 20, height: 45 }}
                            onChangeText={this.onChange.bind(this, 'birthdate')}
                        />


                        <TextInput
                            value={this.state.form.cause_hospitalization}
                            placeholder="Causa da Internação"
                            style={{ fontSize: 20, height: 45 }}
                            onChangeText={this.onChange.bind(this, 'cause_hospitalization')}
                        />
                        <Text style={{paddingTop: 10, paddingLeft: 5, fontSize: 18, fontWeight: 'bold'}}>Hospital:</Text>
                        <Picker
                            selectedValue={this.state.form.hospital_id}
                            style={{height: 50, width: 300}}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({
                                    form: Object.assign({}, this.state.form, { ['hospital_id']: itemValue })
                                })
                            }>
                            { this.state.listHospitals.map(item => (
                                <Picker.Item key={item.id}
                                             label={item.name}
                                             value={item.id}
                                />
                            ))}
                        </Picker>
                    </View>


                    <Button title="Escolha uma foto do paciente" onPress={this.chooseFile.bind(this)} />

                    <View style={{alignItems: 'center', flex: 1, paddingTop: 5}}>
                        <Image
                            source={{ uri: this.state.filePath.uri }}
                            style={{ width: 100, height: 100, borderRadius: 5 }}
                        />
                    </View>

                    <View style={{ flex: 1, paddingTop: 30}}>
                        {this.state.loadingCadastro ?
                            (<ActivityIndicator size="large" />) :
                            (<Button title="Cadastrar Paciente" color="#115E54" onPress={() => this.cadastraPaciente()} />)
                        }
                    </View>

                </View>
            </ScrollView>
        );
    }
}



export default AdicionarPaciente;