import React, { useMemo } from "react";
import TableRowData from "../table-row.component";
import { type RowValue } from "../../../types";

interface InitialsProps {
    data: Array<{}>;
    rowLength: {
        firstStage: Array<number>,
        secondStage: Array<number>
    }
}

interface Initials {
    initials: Array<RowValue>;
}

const Initials: React.FC<InitialsProps> = ({ data, rowLength }) => {
    const mappedData = useMemo<Initials>(() => {
        return {} as Initials;
    }, [data]);

    return <>
        <h6>INITIALS</h6>
        <TableRowData rowLabelText='INITIALS' data={mappedData.initials} rowLength={rowLength} />
    </>
}

export default Initials;