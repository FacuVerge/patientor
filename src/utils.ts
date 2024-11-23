import { DiagnoseEntry, Discharge, Entry, Gender, HealthCheckRating, NewEntry, NewPatientEntry, SickLeave, Type } from './types';

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
    }

    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object && 'entries' in object)  {
        const newEntry: NewPatientEntry = {
            name: parseString(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseString(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseString(object.occupation),
            entries: parseEntries(object.entries)
        }
        return newEntry;
    }

    throw new Error('Incorrect data: some fields are missing');
};

const parseString = (string: unknown): string => {
    if (!string || !isString(string)) {
        throw new Error('Incorrect or missing string: ' + string);
    }
    return string;
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};
  
const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
    if (!healthCheckRating || !isString(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
        throw new Error('Incorrect or missing healthCheckRating: ' + healthCheckRating);
    }
    return healthCheckRating;
};

const isHealthCheckRating = (param: string): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).map(v => v.toString()).includes(param);
};

const parseEntries = (entries: unknown): Entry[] => {
    if (!entries || !Array.isArray(entries)) {
      throw new Error('Missing Entries');
    }
    
    return entries.map(entry => entry as Entry);
};

const parseDiagnosisCodes = (object: unknown): Array<DiagnoseEntry['code']> =>  {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
      return [] as Array<DiagnoseEntry['code']>;
    }
  
    return object.diagnosisCodes as Array<DiagnoseEntry['code']>;
};

const parseDischarge = (discharge: unknown): Discharge =>  { 
    if (!discharge || typeof discharge !== 'object' || !('date' in discharge) || !('criteria' in discharge)) {
        throw new Error('Incorrect or missing discharge: ' + discharge);
    }
    return discharge as Discharge;
}

const parseSickLeave = (sickLeave: unknown): SickLeave =>  { 
    if (!sickLeave || typeof sickLeave !== 'object' || !('startDate' in sickLeave) || !('endDate' in sickLeave)) {
        throw new Error('Incorrect or missing sickLeave: ' + sickLeave);
    }
    return sickLeave as SickLeave;
}

export const toNewEntry = (object: unknown): NewEntry => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
    }

    if ('description' in object && 'specialist' in object && 'type' in object && 'date' in object)  {
        switch(object.type) {
            case Type.HealthCheck:
                if('healthCheckRating' in object) {
                    return {
                        description: parseString(object.description),
                        date: parseDate(object.date),
                        specialist: parseString(object.specialist),
                        type: Type.HealthCheck,
                        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
                        diagnosisCodes: parseDiagnosisCodes(object)
                    }
                }
                break;
            case Type.Hospital:
                if('discharge' in object) {
                    return {
                        description: parseString(object.description),
                        date: parseDate(object.date),
                        specialist: parseString(object.specialist),
                        type: Type.Hospital,
                        discharge: parseDischarge(object.discharge),
                        diagnosisCodes: parseDiagnosisCodes(object)
                    }
                }
                break;
            case Type.OccupationalHealthCare:
                if('employerName' in object && 'sickLeave' in object) {
                    return {
                        description: parseString(object.description),
                        date: parseDate(object.date),
                        specialist: parseString(object.specialist),
                        type: Type.OccupationalHealthCare,
                        employerName: parseString(object.employerName),
                        sickLeave: parseSickLeave(object.sickLeave),
                        diagnosisCodes: parseDiagnosisCodes(object)
                    }
                }
                break;
            default:
                break;
        }
    }
                    
    throw new Error('Incorrect data: some fields are missing');
};
                
