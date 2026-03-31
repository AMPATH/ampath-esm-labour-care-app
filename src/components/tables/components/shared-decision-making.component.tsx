import React, { useMemo } from "react";
import TableRowData from "../table-row.component";
import { type RowValue } from "../../../types";

interface SharedDecisionMakingProps {
    data: Array<{}>;
    rowLength: {
        firstStage: Array<number>,
        secondStage: Array<number>
    }
}

interface SharedDecisionMaking {
    assessment: Array<RowValue>;
    plan: Array<RowValue>;
}

const SharedDecisionMaking: React.FC<SharedDecisionMakingProps> = ({ data, rowLength }) => {
    const mappedData = useMemo<SharedDecisionMaking>(() => {
        return {} as SharedDecisionMaking;
    }, [data]);

    return <>
        <h6>SHARED-DECISION-MAKING</h6>
        <TableRowData rowLabelText='ASSESSMENT' data={mappedData.assessment} rowLength={rowLength} />
        <TableRowData rowLabelText='PLAN' data={mappedData.plan} rowLength={rowLength} />
    </>
}

export default SharedDecisionMaking;