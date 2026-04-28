import React from 'react';
import styles from './tables.scss';
import { TableRow, TableCell } from '@carbon/react';

interface TableRowDataProps {
    rowLabelText: string;
    rowLength: {
        firstStage: Array<number>,
        secondStage: Array<number>
    },
    columnKey?: string;
    abnormalValues?: {
        text: string;
        isAbnormal: (v) => boolean;
    },
    data: Array<{
        value: string,
        timeSlot: number;
        stage: Number;
    }>;
}

const TableRowData: React.FC<TableRowDataProps> = ({ rowLabelText, rowLength, data, abnormalValues }) => {
    return (
        <TableRow className={styles.dataRow}>
            <TableCell className={styles.paramLabel}>
                <strong>{rowLabelText}</strong>
            </TableCell>
            <TableCell className={styles.normalRange}>{abnormalValues ? abnormalValues.text : ``}</TableCell>
            {rowLength.firstStage.map((timeSlot) => {
                const value = data?.find(v => v?.timeSlot === timeSlot && v?.stage === 1)?.value;
                return (
                    <TableCell key={`${rowLabelText}-${timeSlot}`} className={styles.dataCell}>
                        <input
                            type="text"
                            placeholder="-"
                            value={value}
                            disabled
                            className={`${styles.input} ${(abnormalValues ? abnormalValues.isAbnormal(value) : false) ? styles.abnormal : ''}`}
                        />
                    </TableCell>
                )
            })}
            <p> </p>
            {rowLength.secondStage.map((timeSlot) => (
                <TableCell key={`${rowLabelText}-${timeSlot}`} className={styles.dataCell}>
                    <input
                        type="text"
                        placeholder="-"
                        // value={timeSlot}
                        disabled
                        className={`${styles.input} ${(abnormalValues ? abnormalValues.isAbnormal("") : false) ? styles.abnormal : ''}`}
                    />
                </TableCell>
            ))}
        </TableRow>
    )
}

export default TableRowData;