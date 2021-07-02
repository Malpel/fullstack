import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getSsnOmittedPatients());
});

router.post('/', (req, res) => {
    try {
        const newPatientEntry = toNewPatient(req.body);
        const addedPatient = patientService.addPatient(newPatientEntry);
        
        res.json(addedPatient);
        
    } catch (e) {
        res.status(400).send(e.message);
    }
});

export default router;