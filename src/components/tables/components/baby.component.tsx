import React, { useMemo } from "react";
import TableRowData from "../table-row.component";
import { abnormalValues } from "../../utils";
import { type LabourEncounter, type RowValue } from "../../../types";
import { useConfig } from "@openmrs/esm-framework";
import { Config } from "../../../config-schema";
import { getMappedRowValue } from "../../../resource/labour-care.resource";
import styles from "./index.scss";

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

            const setConceptUuid = concepts.labourProgressConceptSetUuid;

            encounters.map((encounter) => {
                results.baselineFHR.push(getMappedRowValue(encounter, concepts.baselineFhrConceptUuid, concepts.labourDurationConceptUuid, concepts.labourStageConceptUuid, { setConceptUuid }));
                results.FHRDeceleration.push(getMappedRowValue(encounter, concepts.fhrDecelerationConceptUuid, concepts.labourDurationConceptUuid, concepts.labourStageConceptUuid, { setConceptUuid, resolve: baby.FHRDeceleration.resolve }));
                results.amnioticFluid.push(getMappedRowValue(encounter, concepts.amnioticFluidConceptUuid, concepts.labourDurationConceptUuid, concepts.labourStageConceptUuid, { setConceptUuid, resolve: baby.amnioticFluid.resolve }));
                results.fetalPosition.push(getMappedRowValue(encounter, concepts.fetalPositionConceptUuid, concepts.labourDurationConceptUuid, concepts.labourStageConceptUuid, { setConceptUuid, resolve: baby.fetalPosition.resolve }));
                results.caput.push(getMappedRowValue(encounter, concepts.caputConceptUuid, concepts.labourDurationConceptUuid, concepts.labourStageConceptUuid, { setConceptUuid, resolve: baby.caput.resolve }));
                results.moulding.push(getMappedRowValue(encounter, concepts.mouldingConceptUuid, concepts.labourDurationConceptUuid, concepts.labourStageConceptUuid, { setConceptUuid, resolve: baby.moulding.resolve }));
            });

            return results as Baby;
        }
        return {} as Baby;
    }, [encounters]);

    return <>
        <h6 className={styles.sectionTitle}>BABY</h6>
        <TableRowData rowLabelText='Baseline FHR' data={mappedData.baselineFHR} abnormalValues={baby.baselineFHR} rowLength={rowLength} innerGrids={{ firstStageGrids: 2, secondStageGrids: 4 }} />
        <TableRowData rowLabelText='FHR Deceleration' data={mappedData.FHRDeceleration} abnormalValues={baby.FHRDeceleration} rowLength={rowLength} innerGrids={{ firstStageGrids: 2, secondStageGrids: 4 }} />
        <TableRowData rowLabelText='Amniotic fluid' data={mappedData.amnioticFluid} abnormalValues={baby.amnioticFluid} rowLength={rowLength} innerGrids={{ secondStageGrids: 2 }} />
        <TableRowData rowLabelText='Fetal position' data={mappedData.fetalPosition} abnormalValues={baby.fetalPosition} rowLength={rowLength} innerGrids={{ secondStageGrids: 2 }} />
        <TableRowData rowLabelText='Caput' data={mappedData.caput} abnormalValues={baby.caput} rowLength={rowLength} innerGrids={{ secondStageGrids: 2 }} />
        <TableRowData rowLabelText='Moulding' data={mappedData.moulding} abnormalValues={baby.moulding} rowLength={rowLength} innerGrids={{ secondStageGrids: 2 }} />
    </>
}

export default Baby;