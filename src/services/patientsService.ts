import patientsData from '../../data/patients'

import { NonSensitivePatientEntry, PatientEntry } from '../types';
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

const addEntry = () => {
    return null;
};

export default {
    getEntries,
    addEntry,
    getNonSensitiveEntries
};