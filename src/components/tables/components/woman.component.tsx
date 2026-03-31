import React, { useMemo } from "react";
import TableRowData from "../table-row.component";
import { abnormalValues } from "../../utils";
import { type RowValue } from "../../../types";

interface WomanProps {
    data: Array<{}>;
    rowLength: {
        firstStage: Array<number>,
        secondStage: Array<number>
    }
}

interface Woman {
    pulse: Array<RowValue>;
    systolicBP: Array<RowValue>;
    diastolicBP: Array<RowValue>;
    temperature: Array<RowValue>;
    urine: Array<RowValue>;
}

const Woman: React.FC<WomanProps> = ({ data, rowLength }) => {
    const woman = abnormalValues.woman;
    const mappedData = useMemo<Woman>(() => {
        return {} as Woman;
    }, [data]);

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