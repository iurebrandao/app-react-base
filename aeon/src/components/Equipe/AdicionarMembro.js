import React, { Component } from 'react';
import {View, TextInput, Button, Text, Alert, ActivityIndicator, Picker} from 'react-native';
import { connect } from 'react-redux';
import api from "../../axios";

class AdicionarMembro extends Component {

    state={
        form:{
            email: null
        },
        listMedics: [],
        loading: false
    };

    componentDidMount(){
        this.getMedicsList();
    }

    getMedicsList = () =>{
        api.GetListMedics().then(response => {
            this.setMedicsList(response.data.users);
        }).catch((error) => {
            this.setState({loading: false});
            Alert.alert(
                'Falha ao fazer requisição de médicos',
                error.response.data.msg,
                [
                    {text: 'OK', onPress: () => console.log(error)},
                ],
                {cancelable: false},
            );
        });
    };

    setMedicsList = (list) =>{
        this.setState({listMedics: list});
    };

    adicionaMedico(){
        this.setState({loading: true});

        let data={
            team_id: this.props.teamId,
            email: this.state.form.email
        };

        if(!data.email && this.state.listMedics.length > 0){
            data.email = this.state.listMedics[0].email;
        }

        api.AddMedicTeam(data).then(response => {
            this.setState({loading: false});
            Alert.alert(
                'Membro adicionado',
                'Membro adicionado a equipe com sucesso!',
                [
                    {text: 'OK', onPress: () => console.log(response.data)},
                ],
                {cancelable: false},
            );
        }).catch((error) => {
            this.setState({loading: false});
            console.log(error.response);
            Alert.alert(
                'Falha ao adicionar membro',
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
                        <Text style={{paddingTop: 10, paddingLeft: 5, fontSize: 18, fontWeight: 'bold'}}>Membro:</Text>
                        <Picker
                            selectedValue={this.state.form.email}
                            style={{height: 50, width: 300}}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({
                                    form: Object.assign({}, this.state.form, { ['email']: itemValue })
                                })
                            }>
                            { this.state.listMedics.map(item => (
                                <Picker.Item key={item.id}
                                             label={item.name}
                                             value={item.email}
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
                                    onPress={() => this.adicionaMedico() }
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

export default connect(mapStateToProps, {})(AdicionarMembro);
