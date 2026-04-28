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
import LabourCareSummary from '../summary/labour-summary.component';
import { usePatient } from '@openmrs/esm-framework';
import { useLabourEncounter } from '../../resource/labour-care.resource';

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

    const { patientUuid } = usePatient();
    const { encounters } = useLabourEncounter(patientUuid);

    if (!encounters) return null;


    return (
        <Layer>
            <Stack gap={5} className={styles.partographContainer}>
                {/* Header with Timeline */}
                <div className={styles.header}>
                    <h2>Maternal Monitoring Chart</h2>
                    <LabourCareSummary />
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
                            <SupportiveCare rowLength={rowLength} encounters={encounters} />
                            <Baby rowLength={rowLength} encounters={encounters} />
                            <Woman rowLength={rowLength} encounters={encounters} />
                            <LabourProgress rowLength={rowLength} encounters={encounters}/>
                            <Medication rowLength={rowLength} encounters={encounters}/>
                            <SharedDecisionMaking rowLength={rowLength} encounters={encounters} />
                            <Initials rowLength={rowLength} encounters={encounters}/>
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