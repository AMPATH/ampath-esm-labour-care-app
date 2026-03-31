import React, { useMemo } from "react";
import TableRowData from "../table-row.component";
import { type RowValue } from "../../../types";

interface MedicationProps {
    data: Array<{}>;
    rowLength: {
        firstStage: Array<number>,
        secondStage: Array<number>
    }
}

interface Medication {
    oxytocin: Array<RowValue>;
    medicine: Array<RowValue>;
    ivFluids: Array<RowValue>;
}

const Medication: React.FC<MedicationProps> = ({ data, rowLength }) => {
    const mappedData = useMemo<Medication>(() => {
        return {} as Medication;
    }, [data]);

    return <>
        <h6>MEDICATION</h6>
        <TableRowData rowLabelText='Oxytocin (U/L, drops/min)' data={mappedData.oxytocin} rowLength={rowLength} />
        <TableRowData rowLabelText='Medicine' data={mappedData.medicine} rowLength={rowLength} />
        <TableRowData rowLabelText='IV fluids' data={mappedData.ivFluids} rowLength={rowLength} />
    </>
}

export default Medication;