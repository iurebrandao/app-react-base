import React, { Component } from 'react';
import {View, TextInput, Button, Text, Alert, ActivityIndicator, StyleSheet, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import moment from 'moment';
import { connect } from 'react-redux';
import api from "../../axios";

class EditarPaciente extends Component {

    state={
        patient: {},
        loading: true,
        loadingFaleceu: false,
        loadingDeletar: false,
        loadingAlta: false
    };

    componentDidMount(){
        this.getPatientInfo(this.props.idPaciente);
    }

    getPatientInfo(id){
        console.log('idPaciente:',id);
        api.GetPatient(id).then(response => {
            let patient = response.data;
            // patient.birthDate = moment(patient.birthdate).format("DD/MM/YYYY");
            // console.log(patient);
            this.setState({patient: patient, loading: false});
        }).catch((err) => {
            this.setState({loading: false});
            Alert.alert(
                'Falha ao recuperar os dados do perfil',
                error.response.data.msg,
                [ {text: 'OK', onPress: () => console.log(error)}, ],
                {cancelable: false},
            );
        });
    }

    pacienteFaleceu(){
        this.setState({loadingFaleceu: true});

        let obj ={
            patient_id: this.props.idPaciente
        };

        api.DiedPatient(obj).then(response => {
            this.setState({loadingFaleceu: false});
            Alert.alert(
                'Paciente',
                'Paciente alterado para falecido com sucesso!',
                [
                    {text: 'OK', onPress: () => Actions.principal()},
                ],
                {cancelable: false},
            );
            this.setState({
                form: Object.assign({}, this.state.form, { ['name']: '' })
            });
        }).catch((error) => {
            this.setState({loadingFaleceu: false});
            console.log(error.response);
            Alert.alert(
                'Falha ao editar o paciente',
                error.response.data.msg,
                [
                    {text: 'OK', onPress: () => console.log(error)},
                ],
                {cancelable: false},
            );
        });
    }

    deletarPaciente(){
        this.setState({loadingDeletar: true});

        api.DeletePatient(this.props.idPaciente).then(response => {
            this.setState({loadingDeletar: false});
            Alert.alert(
                'Paciente',
                'Paciente deletado com sucesso!',
                [
                    {text: 'OK', onPress: () => Actions.principal()},
                ],
                {cancelable: false},
            );
            this.setState({
                form: Object.assign({}, this.state.form, { ['name']: '' })
            });
        }).catch((error) => {
            this.setState({loadingDeletar: false});
            console.log(error.response);
            Alert.alert(
                'Falha ao excluir o paciente',
                error.response.data.msg,
                [
                    {text: 'OK', onPress: () => console.log(error)},
                ],
                {cancelable: false},
            );
        });
    }

    altaPaciente(){
        this.setState({loadingAlta: true});

        let obj ={
            patient_id: this.props.idPaciente
        };

        api.DischargePatient(obj).then(response => {
            this.setState({loadingAlta: false});
            Alert.alert(
                'Paciente',
                'Paciente recebeu alta com sucesso!',
                [
                    {text: 'OK', onPress: () => Actions.principal()},
                ],
                {cancelable: false},
            );
            this.setState({
                form: Object.assign({}, this.state.form, { ['name']: '' })
            });
        }).catch((error) => {
            this.setState({loadingAlta: false});
            console.log(error.response);
            Alert.alert(
                'Falha ao editar o paciente',
                error.response.data.msg,
                [
                    {text: 'OK', onPress: () => console.log(error)},
                ],
                {cancelable: false},
            );
        });
    }

    confirmarFaleceu(){
        Alert.alert(
            'Paciente Faleceu',
            'Tem certeza que deseja alterar o paciente para falecido?',
            [
                {text: 'Sim', onPress: () => this.pacienteFaleceu()},
                {text: 'Não', onPress: () => console.log('cancelou')},
            ],
            {cancelable: true},
        );
    }

    confirmarAlta(){
        Alert.alert(
            'Alta para o paciente',
            'Tem certeza que deseja dar alta para o paciente?',
            [
                {text: 'Sim', onPress: () => this.altaPaciente()},
                {text: 'Não', onPress: () => console.log('cancelou')},
            ],
            {cancelable: true},
        );
    }

    confirmarDeletar(){
        Alert.alert(
            'Deletar Paciente',
            'Tem certeza que deseja deletar o paciente?',
            [
                {text: 'Sim', onPress: () => this.deletarPaciente()},
                {text: 'Não', onPress: () => console.log('cancelou')},
            ],
            {cancelable: true},
        );
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
                {this.state.loading ?
                    (<ActivityIndicator size="large" />) :
                    (<View style={{ flex: 1 }}>

                        <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingBottom: 10}}>
                            {
                                this.state.patient.picture.toString() !== 'bnVsbA==' ?
                                    (<Image style={{ height: 100, width: 100, borderRadius: 5 }} source={{uri: "data:image/jpeg;base64," + this.state.patient.picture}} />)
                                    :
                                    (<Image style={{ height: 100, width: 100 }} source={require('../../imgs/default_profile.png')} />)
                            }
                        </View>


                        <Text style={styles.textLeft}>
                            Nome:
                            <Text style={styles.text}>{this.state.patient.name}</Text>
                        </Text>
                        <Text style={styles.textLeft}>
                            Data de Nascimento:
                            <Text style={styles.text}>{moment(this.state.patient.birth_date).format('DD/MM/YYYY')}</Text>
                        </Text>
                        <Text style={styles.textLeft}>
                            Médico Responsável:
                            <Text style={styles.text}>{this.state.patient.medic.name}</Text>
                        </Text>
                        <Text style={styles.textLeft}>
                            Hospital:
                            <Text style={styles.text}>{this.state.patient.hospital}</Text>
                        </Text>

                        <View style={styles.button}>
                        {
                            this.state.loadingAlta ?
                                (<ActivityIndicator size="large" />) :
                                (<Button
                                    title="Dar Alta"
                                    color="#115E54"
                                    onPress={() => this.confirmarAlta() }
                                />)
                        }
                        </View>
                        <View style={styles.button}>

                        {
                            this.state.loadingFaleceu ?
                                (<ActivityIndicator size="large" />) :
                                (<Button
                                    title="Paciente Faleceu"
                                    color="#115E54"
                                    onPress={() => this.confirmarFaleceu() }
                                />)
                        }

                        </View>
                        <View style={styles.button}>
                        {
                            this.state.loadingDeletar ?
                                (<ActivityIndicator size="large" />) :
                                (<Button
                                    title="Deletar Paciente"
                                    color="#ff3860"
                                    onPress={() => this.confirmarDeletar() }
                                />)
                        }
                        </View>

                    </View>)
                }

            </View>
        )
    }
}

const styles = StyleSheet.create({

    textLeft:{
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 10
    },
    text: {
        fontWeight: 'normal',
        paddingLeft: 10
    },
    button:{
        marginTop: 15,
        marginBottom: 20
    }
});

const mapStateToProps = state => (
    {
    }
);

export default connect(mapStateToProps, {})(EditarPaciente);
