import React from 'react';
import styles from './labour-care-tables.scss';
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
        isAbnormal: (v, timeSlot?) => boolean;
    },
    innerGrids?: {
        firstStageGrids?: number;
        secondStageGrids?: number;
    };
    data: Array<{
        value: string,
        timeSlot: number;
        stage: Number;
    }>;
}

const TableRowData: React.FC<TableRowDataProps> = ({ rowLabelText, rowLength, data, abnormalValues, innerGrids }) => {
    const getGrids = (timeSlot: number, noGrids: number) => {
        let grid = 1;
        let endGrid = timeSlot;

        // Generate other grids
        let slot = grid / noGrids;
        let otherGrids = noGrids - 1;

        let grids = Array.from({ length: otherGrids }, (_, i) => timeSlot - slot * (i + 1));
        grids.push(endGrid)
        return grids.sort((a, b) => a - b);
    }

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
                        {
                            innerGrids?.firstStageGrids ?
                                (<div className={styles.innerGrid} style={{ '--inner-grids': innerGrids.firstStageGrids } as React.CSSProperties}>
                                    {
                                        getGrids(timeSlot, innerGrids.firstStageGrids).map((innerGrid) => {
                                            const gridValue = data?.find(v => v?.timeSlot === innerGrid && v?.stage === 1)?.value;
                                            return <div className={`${styles.innerCell} ${abnormalValues?.isAbnormal(gridValue, timeSlot) ? styles.abnormal : ''}`}>
                                                {gridValue ?? '-'}
                                            </div>
                                        })
                                    }
                                </div>)
                                :
                                <input
                                    type="text"
                                    placeholder="-"
                                    value={value}
                                    disabled
                                    className={`${styles.input} ${(abnormalValues ? abnormalValues.isAbnormal(value, timeSlot) : false) ? styles.abnormal : ''}`}
                                />
                        }
                    </TableCell>
                )
            })}
            <p> </p>
            {rowLength.secondStage.map((timeSlot) => {
                const value = data?.find(v => v?.timeSlot === timeSlot && v?.stage === 2)?.value;
                return (
                    <TableCell key={`${rowLabelText}-${timeSlot}`} className={styles.dataCell}>
                        {
                            innerGrids?.secondStageGrids ?
                                (<div className={styles.innerGrid} style={{ '--inner-grids': innerGrids.secondStageGrids } as React.CSSProperties}>
                                    {
                                        getGrids(timeSlot, innerGrids.secondStageGrids).map((innerGrid) => {
                                            const gridValue = data?.find(v => v?.timeSlot === innerGrid && v?.stage === 2)?.value;
                                            return <div className={`${styles.innerCell} ${abnormalValues?.isAbnormal(gridValue, timeSlot) ? styles.abnormal : ''}`}>
                                                {gridValue ?? '-'}
                                            </div>
                                        })
                                    }
                                </div>)
                                :
                                <input
                                    type="text"
                                    placeholder="-"
                                    value={value}
                                    disabled
                                    className={`${styles.input} ${(abnormalValues ? abnormalValues.isAbnormal(value, timeSlot) : false) ? styles.abnormal : ''}`}
                                />
                        }
                    </TableCell>
                )
            }
            )}
        </TableRow>
    )
}

export default TableRowData;