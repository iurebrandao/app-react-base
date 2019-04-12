import React, { Component } from 'react';
import {View, TextInput, Button, Text, Alert, ActivityIndicator, Picker} from 'react-native';
import { connect } from 'react-redux';
import api from "../../axios";

class AdicionarEquipe extends Component {

    state={
        form:{
            patient_id: null
        },
        listPatients: [],
        loading: false
    };

    componentDidMount(){
        this.getPatientsList();
    }

    getPatientsList = () =>{
        api.GetListPatients().then(response => {
            this.setPatientsList(response.data.patients);
        }).catch((error) => {
            this.setState({loading: false});
            Alert.alert(
                'Falha ao fazer requisição de pacientes',
                error.response.data.msg,
                [
                    {text: 'OK', onPress: () => console.log(error)},
                ],
                {cancelable: false},
            );
        });
    };

    setPatientsList = (list) =>{
        this.setState({listPatients: list});
    };

    adicionaPaciente(){
        this.setState({loading: true});

        let data ={
            team_id: this.props.teamId,
            patient_id: this.state.form.patient_id
        };

        if(!data.patient_id && this.state.listPatients.length > 0){
            data.patient_id = this.state.listPatients[0].id;
        }

        api.AddPatientTeam(data).then(response => {
            this.setState({loading: false});
            Alert.alert(
                'Paciente adicionado',
                'Paciente adicionado a equipe com sucesso!',
                [
                    {text: 'OK', onPress: () => console.log(response.data)},
                ],
                {cancelable: false},
            );
        }).catch((error) => {
            this.setState({loading: false});
            console.log(error.response);
            Alert.alert(
                'Falha ao adicionar paciente',
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
                        <Text style={{paddingTop: 10, paddingLeft: 5, fontSize: 18, fontWeight: 'bold'}}>Paciente:</Text>
                        <Picker
                            selectedValue={this.state.form.patient_id}
                            style={{height: 50, width: 300}}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({
                                    form: Object.assign({}, this.state.form, { ['patient_id']: itemValue })
                                })
                            }>
                            { this.state.listPatients.map(item => (
                                <Picker.Item key={item.id}
                                             label={item.name}
                                             value={item.id}
                                />
                            ))}
                        </Picker>
                    </View>

                    <View style={{ flex: 1 }}>
                        {
                            this.state.loading ?
                                (<ActivityIndicator size="large" />) :
                                ( <Button
                                    title="Adicionar"
                                    color="#115E54"
                                    onPress={() => this.adicionaPaciente() }
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
