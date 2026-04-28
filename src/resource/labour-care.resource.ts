import { openmrsFetch, restBaseUrl, useConfig } from '@openmrs/esm-framework';
import useSWR from 'swr';
import { type LabourEncounter, type Obs, type LabourEncounterResponse } from '../types';
import { Config } from '../config-schema';

export function resolveObsValue(obs: Obs): string {
    if (!obs?.value) return null;
    if (typeof obs.value === 'object' && 'display' in obs.value) {
        return obs.value.display;
    }
    return String(obs.value);
}

export function getObsByConcept(encounter: LabourEncounter, conceptUuid: string): Obs | undefined {
    return encounter?.obs?.find((obs) => obs.concept.uuid === conceptUuid);
}

export function getObsValueByConcept(encounter: LabourEncounter, conceptUuid: string): string | null {
    const obs = getObsByConcept(encounter, conceptUuid);
    return obs ? resolveObsValue(obs) : null;
}

export function getStage(stage: string) {
    if (stage.toUpperCase() === "FIRST STAGE OF LABOR") {
        return 1;
    }
    if (stage.toUpperCase() === "SECOND STAGE") {
        return 2;
    }
    return 0;
}

export function getMappedRowValue(encounter: LabourEncounter, conceptUuid: string, labourDurationConceptUuid: string, labourStageConceptUuid: string, resolve?: (v) => any) {
    let rawValue = getObsValueByConcept(encounter, conceptUuid);

    if (resolve) {
        rawValue = resolve(rawValue ?? "");
    }

    return {
        value: rawValue,
        timeSlot: Number(getObsValueByConcept(encounter, labourDurationConceptUuid)),
        stage: getStage(getObsValueByConcept(encounter, labourStageConceptUuid))
    }
}

export function useLabourEncounter(patientUuid: string) {
    const { encounterTypeUuid } = useConfig<Config>();
    const url = `${restBaseUrl}/encounter?encounterType=${encounterTypeUuid}&patient=${patientUuid}&v=full`;

    const { data, error, isLoading, isValidating, mutate } = useSWR<{ data: LabourEncounterResponse }, Error>(
        patientUuid ? url : null,
        openmrsFetch,
    );

    const encounters = data?.data?.results ?? [];

    const firstEncounter = encounters.length ? encounters[0] : null;

    return {
        encounter: firstEncounter,
        encounters,
        isLoading,
        isError: !!error,
        isValidating,
        mutate,
    };
}