import React, { useMemo, useState } from "react";
import TableRowData from "../table-row.component";
import { abnormalValues } from "../../utils";
import { TableCell, TableRow } from "@carbon/react";
import { type LabourEncounter, type RowValue } from "../../../types";
import { useConfig } from "@openmrs/esm-framework";
import { Config } from "../../../config-schema";
import { getMappedRowValue, getObsValueByConcept } from "../../../resource/labour-care.resource";

interface SupportiveCareProps {
    rowLength: {
        firstStage: Array<number>,
        secondStage: Array<number>
    },
    encounters: LabourEncounter[]
}

interface SupportiveCare {
    companion: Array<RowValue>;
    painRelief: Array<RowValue>;
    oralFluid: Array<RowValue>;
    posture: Array<RowValue>;
}

const SupportiveCare: React.FC<SupportiveCareProps> = ({ rowLength, encounters }) => {
    const { concepts } = useConfig<Config>();
    const supportiveCare = abnormalValues.supportiveCare;

    const mappedData = useMemo<SupportiveCare>(() => {
        if (encounters) {
            let results = {
                companion: [],
                painRelief: [],
                oralFluid: [],
                posture: [],
            }

            encounters.map((encounter) => {
                results.companion.push(getMappedRowValue(encounter, concepts.companionConceptUuid, concepts.labourDurationConceptUuid, concepts.labourStageConceptUuid, supportiveCare.companion.resolve));
                results.painRelief.push(getMappedRowValue(encounter, concepts.painReliefConceptUuid, concepts.labourDurationConceptUuid, concepts.labourStageConceptUuid, supportiveCare.painRelief.resolve));
                results.oralFluid.push(getMappedRowValue(encounter, concepts.oralFluidsConceptUuid, concepts.labourDurationConceptUuid, concepts.labourStageConceptUuid, supportiveCare.oralFluid.resolve));
                results.posture.push(getMappedRowValue(encounter, concepts.postureConceptUuid, concepts.labourDurationConceptUuid, concepts.labourStageConceptUuid, supportiveCare.posture.resolve));
            });

            return results as SupportiveCare;
        }
        return {} as SupportiveCare;
    }, [encounters]);

    return <>
        <h6>Supportive care</h6>
        <TableRowData rowLabelText='Companion' data={mappedData.companion} abnormalValues={supportiveCare.companion} rowLength={rowLength} />
        <TableRowData rowLabelText='Pain relief' data={mappedData.painRelief} abnormalValues={supportiveCare.painRelief} rowLength={rowLength} />
        <TableRowData rowLabelText='Oral fluid' data={mappedData.oralFluid} abnormalValues={supportiveCare.oralFluid} rowLength={rowLength} />
        <TableRowData rowLabelText='Posture' data={mappedData.posture} abnormalValues={supportiveCare.posture} rowLength={rowLength} />
    </>
}

export default SupportiveCare;