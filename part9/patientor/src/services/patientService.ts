import patients from '../../data/patients';
import { Patient, PublicPatient, newPatient } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  return patients;
};

const getPublicPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: newPatient): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatientEntry);

  return newPatientEntry;
};

const getPatientById = (patientId: string): Patient | undefined => {
  const patient = patients.find(p => p.id === patientId);
  return patient;
};

export default {
  getPatients,
  getPublicPatients,
  addPatient,
  getPatientById
};