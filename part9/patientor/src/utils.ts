import { Gender, newPatient, Entry, EntryWithoutId } from "./types";

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }: Fields): newPatient => {
  const patient: newPatient = {
    name: parseString(name),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseString(ssn),
    gender: parseGender(gender),
    occupation: parseString(occupation),
    entries: []
  };

  return patient;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string';
};

const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error('Malformed or missing information: ' + text);
  }

  return text;
};

const isDate = (dateOfBirth: string): boolean => {
  return Boolean(Date.parse(dateOfBirth));
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Malformed or missing date: ' + dateOfBirth);
  }

  return dateOfBirth;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Malformed or missing information: ' + gender);
  }

  return gender;
};

// Could not get anything else working
export const toNewEntry = (entry: Entry): EntryWithoutId => {
  switch (entry.type) {
    case "HealthCheck":
      const healthCheckEntry: EntryWithoutId = {
        description: parseString(entry.description),
        date: parseDateOfBirth(entry.date),
        specialist: parseString(entry.specialist),
        diagnosisCodes: entry.diagnosisCodes,
        type: entry.type,
        healthCheckRating: entry.healthCheckRating
      }

      return healthCheckEntry;

    case "Hospital":
      const hospitalEntry: EntryWithoutId = {
        description: parseString(entry.description),
        date: parseDateOfBirth(entry.date),
        specialist: parseString(entry.specialist),
        diagnosisCodes: entry.diagnosisCodes,
        type: entry.type,
        discharge: entry.discharge
      }

      return hospitalEntry;

    default:
      const nentry: EntryWithoutId = {
        description: parseString(entry.description),
        date: parseDateOfBirth(entry.date),
        specialist: parseString(entry.specialist),
        diagnosisCodes: entry.diagnosisCodes,
        type: entry.type,
        employerName: entry.employerName,
        sickLeave: entry.sickLeave
      }

      return nentry
  }
};
