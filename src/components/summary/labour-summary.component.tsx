import { useLabourEncounter, getObsValueByConcept } from '../../resource/labour-care.resource';
import { useConfig, usePatient } from '@openmrs/esm-framework';
import type { Config } from '../../config-schema';
import React from 'react';
import styles from './labour-summary.scss';
import { Layer, Row } from '@carbon/react';
import dayjs from 'dayjs';

const LabourCareSummary: React.FC = () => {
    const { concepts } = useConfig<Config>();
    const { patientUuid } = usePatient();
    const { encounter } = useLabourEncounter(patientUuid);

    if (!encounter) return null;

    const name = encounter.patient.display;
    const parity = getObsValueByConcept(encounter, concepts.parityConceptUuid);
    const labourOnset = getObsValueByConcept(encounter, concepts.labourOnsetConceptUuid);
    const activeLabourDiagnosisDate = dayjs(getObsValueByConcept(encounter, concepts.activeLabourDatetimeConceptUuid)).format("DD/MM/YYYY");
    const rupturedMembraneDatetime = getObsValueByConcept(encounter, concepts.rupturedMembranesDatetimeConceptUuid);
    const riskFactors = getObsValueByConcept(encounter, concepts.riskFactorsConceptUuid);
    const gravida = getObsValueByConcept(encounter, concepts.gravidaConceptUuid);
    const inpatientNumber = "";

    return (
        <Layer>
            <Row className={styles.summaryRow}>
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Parity:</strong> {parity}</p>
                <p><strong>Labour onset:</strong> {labourOnset}</p>
                <p><strong>Active labour diagnosis Date:</strong> {activeLabourDiagnosisDate}</p>
            </Row>

            <Row className={styles.summaryRow}>
                <p><strong>Ruptured membranes</strong> [<strong>Date:</strong> {rupturedMembraneDatetime} Time: ]</p>
                <p><strong>Risk factors:</strong> {riskFactors}</p>
                <p><strong>Gravida:</strong> {gravida}</p>
                <p><strong>IP (inpatient number):</strong> {inpatientNumber}</p>
            </Row>
        </Layer>
    );
};

export default LabourCareSummary;