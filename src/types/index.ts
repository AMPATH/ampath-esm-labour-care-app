export interface RowValue {
    value: string;
    timeSlot: number;
    stage: Stage;
}

type Stage = 1 | 2;

interface ConceptAnswer {
    uuid: string;
    display: string;
    name: {
        display: string;
        uuid: string;
        name: string;
        locale: string;
        localePreferred: boolean;
        conceptNameType: string;
    };
}

interface ReferenceRange {
    display: string;
    uuid: string;
    hiNormal: number | null;
    hiAbsolute: number | null;
    hiCritical: number | null;
    lowNormal: number | null;
    lowAbsolute: number | null;
    lowCritical: number | null;
}

export interface Obs {
    uuid: string;
    display: string;
    concept: {
        uuid: string;
        display: string;
    };
    obsDatetime: string;
    value: string | number | ConceptAnswer;
    formFieldPath: string;
    formFieldNamespace: string;
    status: string;
    interpretation: string | null;
    referenceRange: ReferenceRange | null;
    voided: boolean;
}

interface EncounterProvider {
    uuid: string;
    provider: {
        uuid: string;
        display: string;
    };
    encounterRole: {
        uuid: string;
        display: string;
    };
    voided: boolean;
}

export interface LabourEncounter {
    uuid: string;
    display: string;
    encounterDatetime: string;
    patient: {
        uuid: string;
        display: string;
    };
    location: {
        uuid: string;
        display: string;
        name: string;
    };
    form: {
        uuid: string;
        display: string;
        name: string;
    };
    encounterType: {
        uuid: string;
        display: string;
        name: string;
    };
    obs: Array<Obs>;
    encounterProviders: Array<EncounterProvider>;
    voided: boolean;
    auditInfo: {
        creator: {
            uuid: string;
            display: string;
        };
        dateCreated: string;
        changedBy: string | null;
        dateChanged: string | null;
    };
}

export interface LabourEncounterResponse {
    results: Array<LabourEncounter>;
}