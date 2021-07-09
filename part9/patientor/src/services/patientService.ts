import patients from '../../data/patients';
import { Patient, PublicPatient, newPatient, EntryWithoutId } from '../types';
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

const addPatient = (patient: newPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient
  };

  patients.push(newPatient);

  return newPatient;
};

const getPatientById = (patientId: string): Patient | undefined => {
  const patient = patients.find(p => p.id === patientId);
  return patient;
};

const addEntryForPatient = (patient: Patient, entry: EntryWithoutId): Patient => {
  const nentry = {
    id: uuid(),
    ...entry
  };

  patient.entries.push(nentry);

  return patient;
};

export default {
  getPatients,
  getPublicPatients,
  addPatient,
  getPatientById,
  addEntryForPatient
};