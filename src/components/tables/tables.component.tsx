import React, { useMemo, useState } from 'react';
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Tag,
    Button,
    Layer,
    Stack,
} from '@carbon/react';
import styles from './tables.scss';
import TableRowData from './table-row.component';
import { abnormalValues, getHoursLabels } from '../utils';
import SupportiveCare from './components/supportive-care.component';
import Baby from './components/baby.component';
import Woman from './components/woman.component';
import LabourProgress from './components/labour-progress.component';
import Medication from './components/medication.component';
import SharedDecisionMaking from './components/shared-decision-making.component';
import Initials from './components/initials';

interface VitalSign {
    time: string;
    hour: number;
    pulse: string;
    systolicBP: string;
    diastolicBP: string;
    temperature: string;
    urine: string;
    value: string;
}

interface PartographProps {
    alertTime?: string;
    firstStageStart?: string;
    secondStageStart?: string;
    vitalSigns?: VitalSign[];
}

export default function Tables({
    alertTime = '0:00',
    firstStageStart = '1',
    secondStageStart = '13',
    vitalSigns = [],
}: PartographProps) {
    const [data, setData] = useState<VitalSign[]>(
        vitalSigns.length > 0
            ? vitalSigns
            : Array.from({ length: 15 }, (_, i) => ({
                time: `${i}:00`,
                hour: i,
                pulse: '',
                systolicBP: '',
                diastolicBP: '',
                temperature: '',
                urine: '',
                value: `${Math.floor(Math.random() * 200)}`,
            }))
    );

    const rowLength = useMemo(() => {
        return {
            firstStage: getHoursLabels(1, 12),
            secondStage: getHoursLabels(1, 3)
        }
    }, []);

    const normalRanges = {
        pulse: '<60, ≤120',
        systolicBP: '<80, ≤140',
        diastolicBP: '≥90',
        temperature: '<35.0, ≥37.5',
        urine: 'P++, A++',
    };

    const isAbnormal = (value: string, type: string): boolean => {
        if (!value) return false;

        switch (type) {
            case 'pulse': {
                const num = parseInt(value);
                return num < 60 || num > 120;
            }
            case 'systolicBP': {
                const num = parseInt(value);
                return num < 80 || num > 140;
            }
            case 'diastolicBP': {
                const num = parseInt(value);
                return num < 90;
            }
            case 'temperature': {
                const num = parseFloat(value);
                return num < 35.0 || num > 37.5;
            }
            case 'urine':
                return !['P++', 'A++'].includes(value);
            default:
                return false;
        }
    };

    const handleInputChange = (index: number, field: string, value: string) => {
        const newData = [...data];
        newData[index] = { ...newData[index], [field]: value };
        setData(newData);
    };

    return (
        <Layer>
            <Stack gap={5} className={styles.partographContainer}>
                {/* Header with Timeline */}
                <div className={styles.header}>
                    <h2>Maternal Monitoring Chart</h2>
                    <div className={styles.timeline}>
                        <div className={styles.timelineLabel}>Alert Time: {alertTime}</div>
                        <div className={styles.timelineLabel}>
                            First Stage (Active): Hours {firstStageStart}-{parseInt(firstStageStart) + 11}
                        </div>
                        <div className={styles.timelineLabel}>
                            Second Stage: Hours {secondStageStart}+
                        </div>
                        <div className={styles.legend}>
                            <Tag type="red" className={styles.legendTag}>
                                Abnormal Value
                            </Tag>
                            <p>Values outside normal ranges are highlighted in red</p>
                        </div>
                    </div>
                </div>

                {/* Alert Legend */}
                {/* <div className={styles.legend}>
                    <Tag type="red" className={styles.legendTag}>
                        Abnormal Value
                    </Tag>
                    <p>Values outside normal ranges are highlighted in red</p>
                </div> */}

                {/* Main Table */}
                <div className={styles.tableWrapper}>
                    <Table size="sm" className={styles.partographTable}>
                        <TableHead>
                            <TableRow>
                                <TableCell className={styles.headerCell} style={{ width: '120px' }}>
                                    <strong>Parameter</strong>
                                </TableCell>
                                <TableCell className={styles.headerCell} style={{ width: '100px' }}>
                                    <strong>Alert</strong>
                                </TableCell>
                                {/* {data.map((_, index) => (
                                    <TableCell key={`header-${index}`} className={styles.timeHeader}>
                                        <div className={styles.timeColumn}>
                                            <div>{index}</div>
                                        </div>
                                    </TableCell>
                                ))} */}
                                {rowLength.firstStage.map((v) => (
                                    <TableCell key={`first-stage-header-${v}`} className={styles.timeHeader}>
                                        <div className={styles.timeColumn}>
                                            <div>{v}</div>
                                        </div>
                                    </TableCell>
                                ))}
                                <p> </p>
                                {rowLength.secondStage.map((v) => (
                                    <TableCell key={`second-stage-header-${v}`} className={styles.timeHeader}>
                                        <div className={styles.timeColumn}>
                                            <div>{v}</div>
                                        </div>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {/* Time Row */}
                            {/* <TableRow className={styles.timeRow}>
                                <TableCell className={styles.paramLabel}>
                                    <strong>Time</strong>
                                </TableCell>
                                <TableCell>-</TableCell>
                                {data.map((item, index) => (
                                    <TableCell key={`time-${index}`} className={styles.dataCell}>
                                        <input
                                            type="time"
                                            className={styles.timeInput}
                                            defaultValue="12:00"
                                        />
                                    </TableCell>
                                ))}
                            </TableRow> */}

                            <SupportiveCare data={[]} rowLength={rowLength} />
                            <Baby data={[]} rowLength={rowLength} />
                            <Woman data={[]} rowLength={rowLength} />
                            <LabourProgress data={[]} rowLength={rowLength} />
                            <Medication data={[]} rowLength={rowLength} />
                            <SharedDecisionMaking data={[]} rowLength={rowLength} />
                            <Initials data={[]} rowLength={rowLength} />

                            {/* <TableRowData rowLabelText='TEST' data={data} abnormalValues={abnormalValues.baby.baselineFHR} rowLength={rowLength}/> */}

                            {/* <TableRow className={styles.dataRow}>
                                <TableCell className={styles.paramLabel}>
                                    <strong>Pulse</strong>
                                </TableCell>
                                <TableCell className={styles.normalRange}>{normalRanges.pulse}</TableCell>
                                {data.map((item, index) => (
                                    <TableCell key={`pulse-${index}`} className={styles.dataCell}>
                                        <input
                                            type="text"
                                            placeholder="-"
                                            value={item.pulse}
                                            onChange={(e) => handleInputChange(index, 'pulse', e.target.value)}
                                            className={`${styles.input} ${isAbnormal(item.pulse, 'pulse') ? styles.abnormal : ''
                                                }`}
                                        />
                                    </TableCell>
                                ))}
                            </TableRow>

                            <TableRow className={styles.dataRow}>
                                <TableCell className={styles.paramLabel}>
                                    <strong>Systolic BP</strong>
                                </TableCell>
                                <TableCell className={styles.normalRange}>{normalRanges.systolicBP}</TableCell>
                                {data.map((item, index) => (
                                    <TableCell key={`systolic-${index}`} className={styles.dataCell}>
                                        <input
                                            type="text"
                                            placeholder="-"
                                            value={item.systolicBP}
                                            onChange={(e) => handleInputChange(index, 'systolicBP', e.target.value)}
                                            className={`${styles.input} ${isAbnormal(item.systolicBP, 'systolicBP') ? styles.abnormal : ''
                                                }`}
                                        />
                                    </TableCell>
                                ))}
                            </TableRow>

                            <TableRow className={styles.dataRow}>
                                <TableCell className={styles.paramLabel}>
                                    <strong>Diastolic BP</strong>
                                </TableCell>
                                <TableCell className={styles.normalRange}>{normalRanges.diastolicBP}</TableCell>
                                {data.map((item, index) => (
                                    <TableCell key={`diastolic-${index}`} className={styles.dataCell}>
                                        <input
                                            type="text"
                                            placeholder="-"
                                            value={item.diastolicBP}
                                            onChange={(e) => handleInputChange(index, 'diastolicBP', e.target.value)}
                                            className={`${styles.input} ${isAbnormal(item.diastolicBP, 'diastolicBP') ? styles.abnormal : ''
                                                }`}
                                        />
                                    </TableCell>
                                ))}
                            </TableRow>

                            <TableRow className={styles.dataRow}>
                                <TableCell className={styles.paramLabel}>
                                    <strong>Temperature °C</strong>
                                </TableCell>
                                <TableCell className={styles.normalRange}>{normalRanges.temperature}</TableCell>
                                {data.map((item, index) => (
                                    <TableCell key={`temp-${index}`} className={styles.dataCell}>
                                        <input
                                            type="text"
                                            placeholder="-"
                                            value={item.temperature}
                                            onChange={(e) => handleInputChange(index, 'temperature', e.target.value)}
                                            className={`${styles.input} ${isAbnormal(item.temperature, 'temperature') ? styles.abnormal : ''
                                                }`}
                                        />
                                    </TableCell>
                                ))}
                            </TableRow>

                            <TableRow className={styles.dataRow}>
                                <TableCell className={styles.paramLabel}>
                                    <strong>Urine</strong>
                                </TableCell>
                                <TableCell className={styles.normalRange}>{normalRanges.urine}</TableCell>
                                {data.map((item, index) => (
                                    <TableCell key={`urine-${index}`} className={styles.dataCell}>
                                        <input
                                            type="text"
                                            placeholder="-"
                                            value={item.urine}
                                            onChange={(e) => handleInputChange(index, 'urine', e.target.value)}
                                            className={`${styles.input} ${isAbnormal(item.urine, 'urine') ? styles.abnormal : ''
                                                }`}
                                        />
                                    </TableCell>
                                ))}
                            </TableRow> */}
                        </TableBody>
                    </Table>
                </div>

                {/* Action Buttons */}
                <div className={styles.actions}>
                    <Button onClick={() => window.print()}>Print Chart</Button>
                    <Button kind="secondary" onClick={() => setData(data.map(d => ({ ...d, pulse: '', systolicBP: '', diastolicBP: '', temperature: '', urine: '' })))}>
                        Clear Data
                    </Button>
                </div>
            </Stack>
        </Layer>
    );
}