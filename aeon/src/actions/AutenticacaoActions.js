import { Actions } from 'react-native-router-flux';
import api from '../../../aeon/src/axios';
import { 
    MODIFICA_EMAIL,
    MODIFICA_SENHA,
    MODIFICA_NOME,
    CADASTRO_USUARIO_SUCESSO,
    CADASTRO_USUARIO_ERRO,
    LOGIN_USUARIO_ERRO,
    CADASTRO_EM_ANDAMENTO
} from './types';
import {Alert} from "react-native";

export const modificaEmail = (texto) => {
    return {
        type: MODIFICA_EMAIL,
        payload: texto
    }
};

export const modificaSenha = (texto) => {
    return {
        type: MODIFICA_SENHA,
        payload: texto
    }
}

export const modificaNome = (texto) => {
    return {
        type: MODIFICA_NOME,
        payload: texto
    }
}

export const cadastraUsuario = (form) => {
    return dispatch => {

        dispatch({ type: CADASTRO_EM_ANDAMENTO });

        let formRegister = {
            name: form.nome,
            email: form.email,
            cpf:form.cpf,
            crm:form.crm,
            password: form.senha,
            confirm_password: form.senha,
            picture:null,
            phone:form.telefone,
            speciality: form.especialidade,
            url: 'https://app.julianop.com.br/confirmar_conta'
        };

        api.RegisterUser(formRegister).then(response => {
            cadastroUsuarioSucesso(dispatch)
        }).catch((error) => {
            console.log('response', error.response);
            let msg = "Erro na API";
            if(error.response !== undefined){
                msg = error.response.data.msg
            }

            Alert.alert(
                'Erro ao credenciar',
                msg,
                [
                    {text: 'OK', onPress: () => console.log(error)},
                ],
                {cancelable: false},
            );
            cadastroUsuarioErro(error, dispatch)
        });
    }
};


const cadastroUsuarioSucesso = (dispatch) => {
    dispatch ({ type: CADASTRO_USUARIO_SUCESSO });

    Actions.boasVindas();
};

const cadastroUsuarioErro = (erro, dispatch) => {
    dispatch ({ type: CADASTRO_USUARIO_ERRO, payload: erro.response.data.msg });
};

const loginUsuarioErro = (erro, dispatch) => {
    dispatch (
        {
            type: LOGIN_USUARIO_ERRO,
            payload: erro.response.data.msg
        }
    );
}