import diagnoseData from '../../data/diagnoses'

import { DiagnoseEntry } from '../types';
const diagnoses: DiagnoseEntry[] = diagnoseData as DiagnoseEntry[];

const getEntries = () => {
    return diagnoses;
};

const addEntry = () => {
    return null;
};

export default {
    getEntries,
    addEntry
};