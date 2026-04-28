import React, { useMemo } from "react";
import TableRowData from "../table-row.component";
import { LabourEncounter, type RowValue } from "../../../types";
import { getMappedRowValue } from "../../../resource/labour-care.resource";
import { useConfig } from "@openmrs/esm-framework";
import { Config } from "../../../config-schema";

interface MedicationProps {
    rowLength: {
        firstStage: Array<number>,
        secondStage: Array<number>
    },
    encounters: LabourEncounter[]
}

interface Medication {
    oxytocin: Array<RowValue>;
    medicine: Array<RowValue>;
    ivFluids: Array<RowValue>;
}

const Medication: React.FC<MedicationProps> = ({ encounters, rowLength }) => {
    const { concepts } = useConfig<Config>();
    const mappedData = useMemo<Medication>(() => {
        if (encounters) {
            let results = {
                oxytocin: [],
                medicine: [],
                ivFluids: [],
            }

            encounters.map((encounter) => {
                results.oxytocin.push(getMappedRowValue(encounter, concepts.oxytocinAdministeredConceptUuid, concepts.labourDurationConceptUuid, concepts.labourStageConceptUuid));
                results.medicine.push(getMappedRowValue(encounter, concepts.medicationConceptUuid, concepts.labourDurationConceptUuid, concepts.labourStageConceptUuid));
                results.ivFluids.push(getMappedRowValue(encounter, concepts.ivFluidsAdministeredConceptUuid, concepts.labourDurationConceptUuid, concepts.labourStageConceptUuid));
            });

            return results as Medication;
        }
        return {} as Medication;
    }, [encounters]);

    return <>
        <h6>MEDICATION</h6>
        <TableRowData rowLabelText='Oxytocin (U/L, drops/min)' data={mappedData.oxytocin} rowLength={rowLength} />
        <TableRowData rowLabelText='Medicine' data={mappedData.medicine} rowLength={rowLength} />
        <TableRowData rowLabelText='IV fluids' data={mappedData.ivFluids} rowLength={rowLength} />
    </>
}

export default Medication;