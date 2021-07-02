import { Gender, newPatient } from "./types";

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }: Fields): newPatient => {
    const patient: newPatient = {
        name: parseString(name),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        ssn: parseString(ssn),
        gender: parseGender(gender),
        occupation: parseString(occupation)
    };

    return patient; 
};

export default toNewPatient;

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