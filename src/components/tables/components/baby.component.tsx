import React, { useMemo } from "react";
import TableRowData from "../table-row.component";
import { abnormalValues } from "../../utils";
import { type RowValue } from "../../../types";

interface BabyProps {
    data: Array<{}>;
    rowLength: {
        firstStage: Array<number>,
        secondStage: Array<number>
    }
}

interface Baby {
    baselineFHR: Array<RowValue>;
    FHRDeceleration: Array<RowValue>;
    amnioticFluid: Array<RowValue>;
    fetalPosition: Array<RowValue>;
    caput: Array<RowValue>;
    moulding: Array<RowValue>;
}

const Baby: React.FC<BabyProps> = ({ data, rowLength }) => {
    const baby = abnormalValues.baby;
    const mappedData = useMemo<Baby>(() => {
        return {} as Baby;
    }, [data]);

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