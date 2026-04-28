import React, { useMemo } from "react";
import TableRowData from "../table-row.component";
import { type LabourEncounter, type RowValue } from "../../../types";
import { getMappedRowValue } from "../../../resource/labour-care.resource";
import { useConfig } from "@openmrs/esm-framework";
import { Config } from "../../../config-schema";

interface SharedDecisionMakingProps {
    rowLength: {
        firstStage: Array<number>,
        secondStage: Array<number>
    },
    encounters: LabourEncounter[]
}

interface SharedDecisionMaking {
    assessment: Array<RowValue>;
    plan: Array<RowValue>;
}

const SharedDecisionMaking: React.FC<SharedDecisionMakingProps> = ({ encounters, rowLength }) => {
    const { concepts } = useConfig<Config>();
    const mappedData = useMemo<SharedDecisionMaking>(() => {
        if (encounters) {
            let results = {
                assessment: [],
                plan: [],
            }

            encounters.map((encounter) => {
                results.assessment.push(getMappedRowValue(encounter, concepts.assessmentNotesConceptUuid, concepts.labourDurationConceptUuid, concepts.labourStageConceptUuid));
                results.plan.push(getMappedRowValue(encounter, concepts.planNotesConceptUuid, concepts.labourDurationConceptUuid, concepts.labourStageConceptUuid));
            });

            return results as SharedDecisionMaking;
        }
        return {} as SharedDecisionMaking;
    }, [encounters]);

    return <>
        <h6>SHARED-DECISION-MAKING</h6>
        <TableRowData rowLabelText='ASSESSMENT' data={mappedData.assessment} rowLength={rowLength} />
        <TableRowData rowLabelText='PLAN' data={mappedData.plan} rowLength={rowLength} />
    </>
}

export default SharedDecisionMaking;