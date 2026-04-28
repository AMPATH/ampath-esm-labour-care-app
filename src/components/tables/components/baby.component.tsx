import React, { useMemo } from "react";
import TableRowData from "../table-row.component";
import { abnormalValues } from "../../utils";
import { type LabourEncounter, type RowValue } from "../../../types";
import { useConfig } from "@openmrs/esm-framework";
import { Config } from "../../../config-schema";
import { getMappedRowValue } from "../../../resource/labour-care.resource";

interface BabyProps {
    rowLength: {
        firstStage: Array<number>,
        secondStage: Array<number>
    },
    encounters: LabourEncounter[]
}

interface Baby {
    baselineFHR: Array<RowValue>;
    FHRDeceleration: Array<RowValue>;
    amnioticFluid: Array<RowValue>;
    fetalPosition: Array<RowValue>;
    caput: Array<RowValue>;
    moulding: Array<RowValue>;
}

const Baby: React.FC<BabyProps> = ({ encounters, rowLength }) => {
    const { concepts } = useConfig<Config>();
    const baby = abnormalValues.baby;
    const mappedData = useMemo<Baby>(() => {
        if (encounters) {
            let results = {
                baselineFHR: [],
                FHRDeceleration: [],
                amnioticFluid: [],
                fetalPosition: [],
                caput: [],
                moulding: [],
            }

            encounters.map((encounter) => {
                results.baselineFHR.push(getMappedRowValue(encounter, concepts.baselineFhrConceptUuid, concepts.labourDurationConceptUuid, concepts.labourStageConceptUuid));
                results.FHRDeceleration.push(getMappedRowValue(encounter, concepts.fhrDecelerationConceptUuid, concepts.labourDurationConceptUuid, concepts.labourStageConceptUuid));
                results.amnioticFluid.push(getMappedRowValue(encounter, concepts.amnioticFluidConceptUuid, concepts.labourDurationConceptUuid, concepts.labourStageConceptUuid));
                results.fetalPosition.push(getMappedRowValue(encounter, concepts.fetalPositionConceptUuid, concepts.labourDurationConceptUuid, concepts.labourStageConceptUuid));
                results.caput.push(getMappedRowValue(encounter, concepts.caputConceptUuid, concepts.labourDurationConceptUuid, concepts.labourStageConceptUuid));
                results.moulding.push(getMappedRowValue(encounter, concepts.mouldingConceptUuid, concepts.labourDurationConceptUuid, concepts.labourStageConceptUuid));
            });

            return results as Baby;
        }
        return {} as Baby;
    }, [encounters]);

    return <>
        <h6>BABY</h6>
        <TableRowData rowLabelText='Baseline FHR' data={mappedData.baselineFHR} abnormalValues={baby.baselineFHR} rowLength={rowLength} />
        <TableRowData rowLabelText='FHR Deceleration' data={mappedData.FHRDeceleration} abnormalValues={baby.FHRDeceleration} rowLength={rowLength} />
        <TableRowData rowLabelText='Amniotic fluid' data={mappedData.amnioticFluid} abnormalValues={baby.amnioticFluid} rowLength={rowLength} />
        <TableRowData rowLabelText='Fetal position' data={mappedData.fetalPosition} abnormalValues={baby.fetalPosition} rowLength={rowLength} />
        <TableRowData rowLabelText='Caput' data={mappedData.caput} abnormalValues={baby.caput} rowLength={rowLength} />
        <TableRowData rowLabelText='Moulding' data={mappedData.moulding} abnormalValues={baby.moulding} rowLength={rowLength} />
    </>
}

export default Baby;