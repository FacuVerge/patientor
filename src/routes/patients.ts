import express from 'express';
import patientsService from '../services/patientsService';
import { toNewPatientEntry, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientsService.getNonSensitiveEntries());
})

router.get('/:id', (req, res) => {
    res.send(patientsService.findById(req.params.id));
})

router.post('/', (req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body);
        const addedEntry = patientsService.addPatient(newPatientEntry);    
        res.json(addedEntry);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

router.post('/:id/entries', (req, res) => {
    try {
        const patient = patientsService.findById(req.params.id);
        if(patient) { 
            const newPatientEntry = toNewEntry(req.body);
            const addedEntry = patientsService.addPatientEntry(patient, newPatientEntry);    
            res.json(addedEntry);
        }else{
            let errorMessage = 'Missing patient with id ' + req.params.id;
            res.status(400).send(errorMessage);
        }
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;