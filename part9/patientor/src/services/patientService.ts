import patients from '../../data/patients';
import { Patient, SsnOmmittedPatient } from '../types';

const getPatients = (): Patient[] => {
    return patients;
};

const getSsnOmmitedPatients = (): SsnOmmittedPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

export default {
    getPatients,
    getSsnOmmitedPatients
};