import { useLabourEncounter, getObsValueByConcept } from '../../resource/labour-care.resource';
import { useConfig, usePatient } from '@openmrs/esm-framework';
import type { Config } from '../../config-schema';
import React from 'react';

const LabourCareSummary: React.FC = () => {
    const { concepts } = useConfig<Config>();
    const { patientUuid } = usePatient();
    const { encounter } = useLabourEncounter(patientUuid);

    if (!encounter) return null;

    const name = encounter.patient.display;
    const parity = getObsValueByConcept(encounter, concepts.parityConceptUuid);
    const labourOnset = getObsValueByConcept(encounter, concepts.labourOnsetConceptUuid);
    const activeLabourDiagnosisDate = getObsValueByConcept(encounter, concepts.activeLabourDatetimeConceptUuid);
    const rupturedMembraneDatetime = getObsValueByConcept(encounter, concepts.rupturedMembranesDatetimeConceptUuid);
    const riskFactors = getObsValueByConcept(encounter, concepts.riskFactorsConceptUuid);
    const gravida = getObsValueByConcept(encounter, concepts.gravidaConceptUuid);
    const inpatientNumber = "";

    return (
        <div>
            <p>Name: {name}</p>
            <p>Parity: {parity}</p>
            <p>Labour onset: {labourOnset}</p>
            <p>Active labour diagnosis Date: {activeLabourDiagnosisDate}</p>

            <p>Ruptured membranes [Date: {rupturedMembraneDatetime} Time: ]</p>
            <p>Risk factors: {riskFactors}</p>
            <p>Gravida: {gravida}</p>
            <p>IP (inpatient number): {inpatientNumber}</p>
        </div>
    );
};

export default LabourCareSummary;