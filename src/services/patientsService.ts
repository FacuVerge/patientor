import patientsData from '../../data/patients'
import { v1 as uuid } from 'uuid'
import { Entry, NewEntry, NewPatientEntry, NonSensitivePatientEntry, PatientEntry } from '../types';

const patients: PatientEntry[] = patientsData as PatientEntry[];

const getEntries = () => {
    return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {  
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => (
        {    
            id,    
            name,    
            dateOfBirth,    
            gender, 
            occupation 
        }
    ));
};

const addPatient = ( entry: NewPatientEntry ): PatientEntry => {  
    const newPatientEntry = {
        id : uuid(),
        ...entry  
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
};

const addPatientEntry = ( patient: PatientEntry, entry: NewEntry ): Entry => {  
    const newPatientEntry = {
        id : uuid(),
        ...entry  
    };

    patient.entries.push(newPatientEntry);
    return newPatientEntry;
};

const findById = (id: string): PatientEntry | undefined => {
    const entry = patients.find(d => d.id === id);
    return entry;
};

export default {
    getEntries,
    addPatient,
    getNonSensitiveEntries,
    findById,
    addPatientEntry
};