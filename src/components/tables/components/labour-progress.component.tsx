import React, { useMemo } from "react";
import TableRowData from "../table-row.component";
import { abnormalValues } from "../../utils";
import { type LabourEncounter, type RowValue } from "../../../types";
import { useConfig } from "@openmrs/esm-framework";
import { Config } from "../../../config-schema";
import { getMappedRowValue } from "../../../resource/labour-care.resource";

interface LabourProgressProps {
    rowLength: {
        firstStage: Array<number>,
        secondStage: Array<number>
    },
    encounters: LabourEncounter[]
}

interface LabourProgress {
    contractionsPer10Min: Array<RowValue>;
    durationOfContractions: Array<RowValue>;
    cervix: {
        cervix5: Array<RowValue>;
        cervix6: Array<RowValue>;
        cervix7: Array<RowValue>;
        cervix8: Array<RowValue>;
        cervix9: Array<RowValue>;
        cervix10: Array<RowValue>;
    },
    descent: {
        cervix0: Array<RowValue>;
        cervix1: Array<RowValue>;
        cervix2: Array<RowValue>;
        cervix3: Array<RowValue>;
        cervix4: Array<RowValue>;
        cervix5: Array<RowValue>;
    },
}

const LabourProgress: React.FC<LabourProgressProps> = ({ encounters, rowLength }) => {
    const { concepts } = useConfig<Config>();
    const labourProgress = abnormalValues.labourProgress;
    const mappedData = useMemo<LabourProgress>(() => {
        if (encounters) {
            let results = {
                contractionsPer10Min: [],
                durationOfContractions: [],
                cervix: {
                    cervix5: [],
                    cervix6: [],
                    cervix7: [],
                    cervix8: [],
                    cervix9: [],
                    cervix10: [],
                },
                descent: {
                    cervix0: [],
                    cervix1: [],
                    cervix2: [],
                    cervix3: [],
                    cervix4: [],
                    cervix5: [],
                }
            }

            encounters.map((encounter) => {
                // contractions per 10 min
                results.contractionsPer10Min.push(getMappedRowValue(encounter, concepts.contractionsPerTenMinConceptUuid, concepts.labourDurationConceptUuid, concepts.labourStageConceptUuid));
                // duration of contractions
                results.durationOfContractions.push(getMappedRowValue(encounter, concepts.contractionDurationConceptUuid, concepts.labourDurationConceptUuid, concepts.labourStageConceptUuid));
                // cervix
                results.cervix.cervix5.push(getMappedRowValue(encounter, concepts.cervicalDilationConceptUuid, concepts.labourDurationConceptUuid, concepts.labourStageConceptUuid));
                results.cervix.cervix5.push(getMappedRowValue(encounter, concepts.cervicalDilationConceptUuid, concepts.labourDurationConceptUuid, concepts.labourStageConceptUuid));
                results.cervix.cervix5.push(getMappedRowValue(encounter, concepts.cervicalDilationConceptUuid, concepts.labourDurationConceptUuid, concepts.labourStageConceptUuid));
                results.cervix.cervix5.push(getMappedRowValue(encounter, concepts.cervicalDilationConceptUuid, concepts.labourDurationConceptUuid, concepts.labourStageConceptUuid));
                results.cervix.cervix5.push(getMappedRowValue(encounter, concepts.cervicalDilationConceptUuid, concepts.labourDurationConceptUuid, concepts.labourStageConceptUuid));
                results.cervix.cervix5.push(getMappedRowValue(encounter, concepts.cervicalDilationConceptUuid, concepts.labourDurationConceptUuid, concepts.labourStageConceptUuid));
                // descent
                results.descent.cervix0.push(getMappedRowValue(encounter, concepts.fetalDescentConceptUuid, concepts.labourDurationConceptUuid, concepts.labourStageConceptUuid));
                results.descent.cervix1.push(getMappedRowValue(encounter, concepts.fetalDescentConceptUuid, concepts.labourDurationConceptUuid, concepts.labourStageConceptUuid));
                results.descent.cervix2.push(getMappedRowValue(encounter, concepts.fetalDescentConceptUuid, concepts.labourDurationConceptUuid, concepts.labourStageConceptUuid));
                results.descent.cervix3.push(getMappedRowValue(encounter, concepts.fetalDescentConceptUuid, concepts.labourDurationConceptUuid, concepts.labourStageConceptUuid));
                results.descent.cervix4.push(getMappedRowValue(encounter, concepts.fetalDescentConceptUuid, concepts.labourDurationConceptUuid, concepts.labourStageConceptUuid));
                results.descent.cervix5.push(getMappedRowValue(encounter, concepts.fetalDescentConceptUuid, concepts.labourDurationConceptUuid, concepts.labourStageConceptUuid));
            });

            return results as LabourProgress;
        }
        return {
            cervix: {},
            descent: {}
        } as LabourProgress;
    }, [encounters]);

    return <>
        <h6>LABOUR PROGRESS</h6>
        <TableRowData rowLabelText='Contractions per 10 min' data={mappedData.contractionsPer10Min} abnormalValues={labourProgress.contractionsPer10Min} rowLength={rowLength} />
        <TableRowData rowLabelText='Duration of contractions' data={mappedData.durationOfContractions} abnormalValues={labourProgress.durationOfContractions} rowLength={rowLength} />
        <p>Cervix [Plot X]</p>
        <TableRowData rowLabelText='10' data={mappedData.cervix.cervix10} rowLength={rowLength} />
        <TableRowData rowLabelText='9' data={mappedData.cervix.cervix9} abnormalValues={labourProgress.cervix.cervix9} rowLength={rowLength} />
        <TableRowData rowLabelText='8' data={mappedData.cervix.cervix8} abnormalValues={labourProgress.cervix.cervix8} rowLength={rowLength} />
        <TableRowData rowLabelText='7' data={mappedData.cervix.cervix7} abnormalValues={labourProgress.cervix.cervix7} rowLength={rowLength} />
        <TableRowData rowLabelText='6' data={mappedData.cervix.cervix6} abnormalValues={labourProgress.cervix.cervix6} rowLength={rowLength} />
        <TableRowData rowLabelText='5' data={mappedData.cervix.cervix5} abnormalValues={labourProgress.cervix.cervix5} rowLength={rowLength} />
        <p>Descent [Plot O]</p>
        <TableRowData rowLabelText='5' data={mappedData.descent.cervix5} rowLength={rowLength} />
        <TableRowData rowLabelText='4' data={mappedData.descent.cervix4} rowLength={rowLength} />
        <TableRowData rowLabelText='3' data={mappedData.descent.cervix3} rowLength={rowLength} />
        <TableRowData rowLabelText='2' data={mappedData.descent.cervix2} rowLength={rowLength} />
        <TableRowData rowLabelText='1' data={mappedData.descent.cervix1} rowLength={rowLength} />
        <TableRowData rowLabelText='0' data={mappedData.descent.cervix0} rowLength={rowLength} />
    </>
}

export default LabourProgress;