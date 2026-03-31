import React, { useMemo } from "react";
import TableRowData from "../table-row.component";
import { abnormalValues } from "../../utils";
import { type RowValue } from "../../../types";

interface LabourProgressProps {
    data: Array<{}>;
    rowLength: {
        firstStage: Array<number>,
        secondStage: Array<number>
    }
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

const LabourProgress: React.FC<LabourProgressProps> = ({ data, rowLength }) => {
    const labourProgress = abnormalValues.labourProgress;
    const mappedData = useMemo<LabourProgress>(() => {
        return {
            cervix: {},
            descent: {}
        } as LabourProgress;
    }, [data]);

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