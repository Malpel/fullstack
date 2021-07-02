import patients from '../../data/patients';
import { Patient, SsnOmittedPatient, newPatient } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
    return patients;
};

const getSsnOmittedPatients = (): SsnOmittedPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (entry: newPatient): Patient => {
    const  newPatientEntry = {
        id: uuid(),
        ...entry
    };

    patients.push(newPatientEntry);

    return newPatientEntry;
};

export default {
    getPatients,
    getSsnOmittedPatients,
    addPatient
};