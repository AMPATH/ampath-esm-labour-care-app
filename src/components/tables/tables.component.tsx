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
import { useConfig, usePatient } from '@openmrs/esm-framework';
import { getMappedRowValue, useLabourEncounter } from '../../resource/labour-care.resource';
import { Config } from '../../config-schema';
import dayjs from 'dayjs';

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

    const { concepts } = useConfig<Config>();
    const mappedProgressTime = useMemo(() => {
        if (encounters) {
            let progressTime = [];

            const setConceptUuid = concepts.labourProgressConceptSetUuid;

            encounters.map((encounter) => {
                progressTime.push(getMappedRowValue(encounter, concepts.progressTimeConceptUuid, concepts.labourDurationConceptUuid, concepts.labourStageConceptUuid, { setConceptUuid }));
            });

            return progressTime;
        }
        return [];
    }, [encounters]);

    return (
        <Layer>
            <Stack gap={5} className={styles.partographContainer}>
                {/* Header with Timeline */}
                <div className={styles.header}>
                    <LabourCareSummary />
                    <div className={styles.timeline}>
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
                                <TableCell></TableCell>
                                <TableCell><strong>Time</strong></TableCell>
                                {rowLength.firstStage.map((v) => {
                                    const progressTime = mappedProgressTime?.find(x => x.timeSlot == v && x.stage == 1)?.value;
                                    const time = progressTime ? dayjs(progressTime).format('hh:mm a') : "";
                                    return (
                                        <TableCell key={`first-stage-time-header-${v}`} className={styles.headerCell}>
                                            <div className={styles.timeColumn}>
                                                <div>{time}</div>
                                            </div>
                                        </TableCell>
                                    )
                                })}
                                <p> </p>
                                {rowLength.secondStage.map((v) => {
                                    const progressTime = mappedProgressTime?.find(x => x.timeSlot == v && x.stage == 2)?.value;
                                    const time = progressTime ? dayjs(progressTime).format('hh:mm a') : "";
                                    return (
                                        <TableCell key={`second-stage-time-header-${v}`} className={styles.headerCell}>
                                            <div className={styles.timeColumn}>
                                                <div>{time}</div>
                                            </div>
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                            <TableRow>
                                <TableCell className={styles.headerCell} style={{ width: '120px' }}></TableCell>
                                <TableCell className={styles.headerCell} style={{ width: '100px' }}>
                                    <strong>Hours</strong>
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
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell><strong>Alert</strong></TableCell>
                                <TableCell className={styles.headerCell} colSpan={12}>
                                    <div className={styles.timelineLabel}>
                                        First Stage (Active): Hours {firstStageStart}-{parseInt(firstStageStart) + 11}
                                    </div>
                                </TableCell>
                                <p> </p>

                                <TableCell className={styles.headerCell} colSpan={3}>
                                    <div className={styles.timelineLabel}>
                                        Second Stage: Hours {secondStageStart}+
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            <SupportiveCare rowLength={rowLength} encounters={encounters} />
                            <Baby rowLength={rowLength} encounters={encounters} />
                            <Woman rowLength={rowLength} encounters={encounters} />
                            <LabourProgress rowLength={rowLength} encounters={encounters} />
                            <Medication rowLength={rowLength} encounters={encounters} />
                            <SharedDecisionMaking rowLength={rowLength} encounters={encounters} />
                            <Initials rowLength={rowLength} encounters={encounters} />
                        </TableBody>
                    </Table>
                </div>

                {/* Action Buttons */}
                {/* <div className={styles.actions}>
                    <Button onClick={() => window.print()}>Print Chart</Button>
                    <Button kind="secondary" onClick={() => setData(data.map(d => ({ ...d, pulse: '', systolicBP: '', diastolicBP: '', temperature: '', urine: '' })))}>
                        Clear Data
                    </Button>
                </div> */}
            </Stack>
        </Layer>
    );
}