import axios from 'axios';
import { AsyncStorage} from 'react-native';


const instance = axios.create({
    baseURL: 'https://api.julianop.com.br/api/',
    headers: {
        'Content-Type': 'application/json',
    }
});

instance.interceptors.request.use(async config => {
    try {
        const token = await AsyncStorage.getItem('Token');
        if (token !== null) {
            config.headers.Authorization = `Bearer ${token}`
                .replace(/(^\")|(\"$)/g, '')
        }
        return config
    } catch (error) {
        return null
    }

}, err => {
    return Promise.reject(err)
});

export default{
    Login(data) {
        return instance.post('auth/login', data);
    },
    RegisterUser(data){
        return instance.post('user', data);
    },
    Logout(){
        return instance.get('autenticacao/logout/');
    },
    Feed(data){
        return instance.get('feed')
    },
    GetListPatients(){
        return instance.get('patient/list_patients');
    },
    GetListPatientsById(id){
        return instance.get('team?id='+id);
    },
    GetListTeams(){
        return instance.get('team/list_teams');
    },
    AddTeam(data){
        return instance.post('team', data)
    },
    AddPaciente(data){
        return instance.post('patient', data)
    },
    GetListMedics(){
        return instance.get('user/list_users',)
    },
    GetListHospitals(){
        return instance.get('hospital/list_hospitals',)
    },
    CheckToken(){
        return instance.get('auth/login')
    },
    GetUser(){
        return instance.get('user')
    },
    UpdateUser(data){
        return instance.put('user', data)
    },
    SendEmailPasswordChange(data) {
        return instance.post('user/request_reset_password', data)
    },
    AddPatientTeam(data){
        return instance.post('team/add_patient', data)
    },
    GetTeam(id){
        return instance.get('team?id='+id)
    },
    EditTeam(data){
        return instance.put('team', data)
    },
    DeleteTeam(id){
        return instance.delete('team?id='+id)
    },
    GetPatient(id){
        return instance.get('patient?id=' + id)
    },
    DiedPatient(data){
        return instance.post('patient/died', data)
    },
    DeletePatient(id){
        return instance.delete('patient?id='+id)
    },
    DischargePatient(data){
        return instance.post('patient/leaves_hospital', data)
    },
    GetListReminders(id){
        return instance.get('reminder/list_reminders?patient_id=' + id)
    },
    AddReminder(data){
        return instance.post('reminder', data)
    },
    AddMedicTeam(data){
        return instance.post('team/add_medic', data)
    },
}