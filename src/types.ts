export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export enum Type {
    Hospital = 'Hospital',
    HealthCheck = 'HealthCheck',
    OccupationalHealthCare = 'OccupationalHealthCare'
}

export interface DiagnoseEntry {
    code: string;
    name: string;
    latin?: string;
}

export enum HealthCheckRating {
    Healthy = '0',
    LowRisk = '1',
    HighRisk = '2',
    CriticalRisk = '3'
}

export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
  
    diagnosisCodes?: Array<DiagnoseEntry['code']>;
}
  
export interface HealthCheckEntry extends BaseEntry {
    type: Type.HealthCheck;
    healthCheckRating: HealthCheckRating;
}

export interface SickLeave {
    startDate: string;
    endDate: string;
}

export interface OccupationalHealthCareEntry extends BaseEntry {
    type: Type.OccupationalHealthCare;
    employerName: string;
    sickLeave: SickLeave;
}

export interface Discharge {
    date: string;
    criteria: string;
}

export interface HospitalEntry extends BaseEntry {
    type: Type.Hospital;
    discharge: Discharge;
}

export type Entry = 
    | OccupationalHealthCareEntry 
    | HospitalEntry 
    | HealthCheckEntry;

export interface PatientEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[]
}

export type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type NewPatientEntry = UnionOmit<PatientEntry, 'id'>;

export type NonSensitivePatientEntry = UnionOmit<PatientEntry, 'ssn' | 'entries'>;

export type NewEntry = UnionOmit<Entry, 'id'>