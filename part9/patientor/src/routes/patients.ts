import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPublicPatients());
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

router.get('/:id/', (req, res) => {
  try {
    res.send(patientService.getPatientById(req.params.id));
  } catch (e) {
    res.status(400).send(e.message)
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    // change?
    const patient = patientService.getPatientById(req.params.id);
    const addedEntry = patientService.addEntryForPatient(patient!, newEntry);
    
    res.json(addedEntry);

  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;