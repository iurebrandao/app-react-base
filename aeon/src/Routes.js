import React from 'react';
import { Router, Scene } from 'react-native-router-flux';

import FormLogin from './components/FormLogin';
import FormCadastro from './components/FormCadastro';
import BoasVindas from './components/BoasVindas';
import Principal from './components/Principal';
import AdicionarEquipe from './components/AdicionarEquipe';
import AdicionarPaciente from './components/AdicionarPaciente'
import EditarPerfil from "./components/EditarPerfil";
import Detail from "./components/Equipe/Detail";
import AddPaciente from "./components/Equipe/AddPaciente";
import DetailPaciente from "./components/Paciente/DetailPaciente";
import AdicionarLembrete from "./components/Paciente/AdicionarLembrete";
import AdicionarMembro from "./components/Equipe/AdicionarMembro";

export default props => (
    <Router navigationBarStyle={{ backgroundColor: '#115E54' }} titleStyle={{ color: '#fff' }}>
        <Scene key='formLogin' component={FormLogin} title="Login" hideNavBar={true} />
        <Scene key='formCadastro' component={FormCadastro} title="Cadastro"  hideNavBar={false} />
        <Scene key='boasVindas' component={BoasVindas} title="Bem-Vindo" hideNavBar={true} />
        <Scene key='principal' component={Principal} title="Principal" hideNavBar={true} />
        <Scene key='adicionarEquipe' component={AdicionarEquipe} title="Adicionar Equipe" hideNavBar={false} />
        <Scene key='adicionarPaciente' component={AdicionarPaciente} title="Adicionar Paciente" hideNavBar={false} />
        <Scene key='editarPerfil' component={EditarPerfil} title="Editar Perfil" hideNavBar={false} />
        <Scene key='detailEquipe' component={Detail} title="Equipe" hideNavBar={false} />
        <Scene key='addPaciente' component={AddPaciente} title="Adicionar Paciente na Equipe" hideNavBar={false} />
        <Scene key='detailPaciente' component={DetailPaciente} title="Paciente" hideNavBar={false} />
        <Scene key='adicionarLembrete' component={AdicionarLembrete} title="Adicionar Lembrete" hideNavBar={false} />
        <Scene key='adicionarMembro' component={AdicionarMembro} title="Adicionar Membro" hideNavBar={false} />
    </Router>
);