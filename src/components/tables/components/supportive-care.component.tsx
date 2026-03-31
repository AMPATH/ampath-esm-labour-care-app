import React, { useMemo, useState } from "react";
import TableRowData from "../table-row.component";
import { abnormalValues } from "../../utils";
import { TableCell, TableRow } from "@carbon/react";
import { type RowValue } from "../../../types";

interface SupportiveCareProps {
    data: Array<{}>;
    rowLength: {
        firstStage: Array<number>,
        secondStage: Array<number>
    }
}

interface SupportiveCare {
    companion: Array<RowValue>;
    painRelief: Array<RowValue>;
    oralFluid: Array<RowValue>;
    posture: Array<RowValue>;
}

const SupportiveCare: React.FC<SupportiveCareProps> = ({ data, rowLength }) => {
    const supportiveCare = abnormalValues.supportiveCare;
    const mappedData = useMemo<SupportiveCare>(() => {
        console.log(rowLength);
        return {} as SupportiveCare;
    }, [data]);

    return <>
        <h6>Supportive care</h6>
        <TableRowData rowLabelText='Companion' data={mappedData.companion} abnormalValues={supportiveCare.companion} rowLength={rowLength}/>
        <TableRowData rowLabelText='Pain relief' data={mappedData.painRelief} abnormalValues={supportiveCare.painRelief} rowLength={rowLength}/>
        <TableRowData rowLabelText='Oral fluid' data={mappedData.oralFluid} abnormalValues={supportiveCare.oralFluid} rowLength={rowLength}/>
        <TableRowData rowLabelText='Posture' data={mappedData.posture} abnormalValues={supportiveCare.posture} rowLength={rowLength}/>
    </>
}

export default SupportiveCare;