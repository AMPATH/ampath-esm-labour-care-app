import React, { useMemo } from "react";
import TableRowData from "../table-row.component";
import { abnormalValues } from "../../utils";
import { type LabourEncounter, type RowValue } from "../../../types";
import { getMappedRowValue } from "../../../resource/labour-care.resource";
import { useConfig } from "@openmrs/esm-framework";
import { Config } from "../../../config-schema";

interface WomanProps {
    rowLength: {
        firstStage: Array<number>,
        secondStage: Array<number>
    },
    encounters: LabourEncounter[]
}

interface Woman {
    pulse: Array<RowValue>;
    systolicBP: Array<RowValue>;
    diastolicBP: Array<RowValue>;
    temperature: Array<RowValue>;
    urine: Array<RowValue>;
}

const Woman: React.FC<WomanProps> = ({ encounters, rowLength }) => {
    const { concepts } = useConfig<Config>();
    const woman = abnormalValues.woman;
    const mappedData = useMemo<Woman>(() => {
        if (encounters) {
            let results = {
                pulse: [],
                systolicBP: [],
                diastolicBP: [],
                temperature: [],
                urine: []
            }

            encounters.map((encounter) => {
                results.pulse.push(getMappedRowValue(encounter, concepts.pulseConceptUuid, concepts.labourDurationConceptUuid, concepts.labourStageConceptUuid));
                results.systolicBP.push(getMappedRowValue(encounter, concepts.systolicBpConceptUuid, concepts.labourDurationConceptUuid, concepts.labourStageConceptUuid));
                results.diastolicBP.push(getMappedRowValue(encounter, concepts.diastolicBpConceptUuid, concepts.labourDurationConceptUuid, concepts.labourStageConceptUuid));
                results.temperature.push(getMappedRowValue(encounter, concepts.temperatureConceptUuid, concepts.labourDurationConceptUuid, concepts.labourStageConceptUuid));
                results.urine.push(getMappedRowValue(encounter, concepts.urineProteinConceptUuid, concepts.labourDurationConceptUuid, concepts.labourStageConceptUuid));
            });

            return results as Woman;
        }
        return {} as Woman;
    }, [encounters]);

    return <>
        <h6>WOMAN</h6>
        <TableRowData rowLabelText='Pulse' data={mappedData.pulse} abnormalValues={woman.pulse} rowLength={rowLength} />
        <TableRowData rowLabelText='Systolic BP' data={mappedData.systolicBP} abnormalValues={woman.systolicBP} rowLength={rowLength} />
        <TableRowData rowLabelText='Diastolic BP' data={mappedData.diastolicBP} abnormalValues={woman.diastolicBP} rowLength={rowLength} />
        <TableRowData rowLabelText='Temperature ' data={mappedData.temperature} abnormalValues={woman.temperature} rowLength={rowLength} />
        <TableRowData rowLabelText='Urine' data={mappedData.urine} abnormalValues={woman.urine} rowLength={rowLength} />
    </>
}

export default Woman;