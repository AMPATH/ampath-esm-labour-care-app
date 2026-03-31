// LabourCareGuide.jsx
import React, { useState } from 'react';
import {
    TextInput,
    Select,
    SelectItem,
    Button,
    Grid,
    Column,
    Form,
    FormGroup,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    DataTable,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    TableCell,
    Checkbox,
    NumberInput,
    DatePicker,
    DatePickerInput,
    TimePicker,
    TimePickerSelect,
} from '@carbon/react';
import {
    Save,
    DocumentExport,
} from '@carbon/icons-react';
import './care.scss';

const LabourCareGuide = () => {
    const [formData, setFormData] = useState({
        name: '',
        parity: '',
        labourOnset: '',
        activeLaborDiagnosis: '',
        rupturedMembranes: {
            date: '',
            time: '',
        },
        riskFactors: '',
        gravida: '',
        ipInpatient: '',
    });

    const [observations, setObservations] = useState({
        supportiveCare: {},
        baby: {},
        woman: {},
    });

    const [timePoints, setTimePoints] = useState(Array(15).fill(null));

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleNestedChange = (category, field, value) => {
        setFormData(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [field]: value,
            },
        }));
    };

    const handleObservationChange = (category, timePoint, value) => {
        setObservations(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [timePoint]: value,
            },
        }));
    };

    const handleSave = () => {
        console.log('Saving data:', { formData, observations });
        // API call would go here
    };

    const handleExport = () => {
        console.log('Exporting data...');
        // Export functionality
    };

    const supportiveCareParms = [
        { id: 'companion', label: 'Companion', baseline: 'N' },
        { id: 'painRelief', label: 'Pain relief', baseline: 'N' },
        { id: 'oralFluid', label: 'Oral fluid', baseline: 'N' },
        { id: 'posture', label: 'Posture', baseline: 'SP' },
    ];

    const babyParms = [
        { id: 'baselineFhr', label: 'Baseline FHR', baseline: '<110, ≥160' },
        { id: 'fhrDeceleration', label: 'FHR deceleration', baseline: 'L' },
        { id: 'amnioticFluid', label: 'Amniotic fluid', baseline: 'M+++, B' },
        { id: 'fetalPosition', label: 'Fetal position', baseline: 'P, T' },
        { id: 'caput', label: 'Caput', baseline: '+++' },
        { id: 'moulding', label: 'Moulding', baseline: '+++' },
    ];

    const womanParms = [
        { id: 'pulse', label: 'Pulse', baseline: '<60, ≥120' },
        { id: 'systolicBp', label: 'Systolic BP', baseline: '<80, ≥140' },
        { id: 'diastolicBp', label: 'Diastolic BP', baseline: '≥90' },
        { id: 'temperature', label: 'Temperature °C', baseline: '<35.0, ≥37.5' },
        { id: 'urine', label: 'Urine', baseline: 'P++, A++' },
    ];

    return (
        <div className="labour-care-guide">
            <Grid className="labour-guide-header">
                <Column lg={16} md={8} sm={4}>
                    <h1>WHO Labour Care Guide</h1>
                </Column>
            </Grid>

            <Form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                {/* Header Information Section */}
                <div className="section-divider">
                    <h2>Patient Information</h2>
                </div>

                <Grid>
                    <Column lg={4} md={4} sm={4}>
                        <TextInput
                            id="name"
                            labelText="Name"
                            placeholder="Enter patient name"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                        />
                    </Column>
                    <Column lg={3} md={4} sm={4}>
                        <TextInput
                            id="parity"
                            labelText="Parity"
                            placeholder="Enter parity"
                            value={formData.parity}
                            onChange={(e) => handleInputChange('parity', e.target.value)}
                        />
                    </Column>
                    <Column lg={4} md={4} sm={4}>
                        <DatePickerInput
                            id="labour-onset"
                            labelText="Labour Onset"
                            placeholder="mm/dd/yyyy"
                            onChange={(date) => handleInputChange('labourOnset', date)}
                        />
                    </Column>
                    <Column lg={5} md={4} sm={4}>
                        <TextInput
                            id="active-labour-diagnosis"
                            labelText="Active Labour Diagnosis"
                            placeholder="Enter diagnosis"
                            value={formData.activeLaborDiagnosis}
                            onChange={(e) => handleInputChange('activeLaborDiagnosis', e.target.value)}
                        />
                    </Column>
                </Grid>

                {/* Ruptured Membranes Section */}
                <div className="section-divider" style={{ marginTop: '2rem' }}>
                    <h2>Ruptured Membranes</h2>
                </div>

                <Grid>
                    <Column lg={4} md={4} sm={4}>
                        <DatePickerInput
                            id="rupture-date"
                            labelText="Date"
                            placeholder="mm/dd/yyyy"
                            onChange={(date) => handleNestedChange('rupturedMembranes', 'date', date)}
                        />
                    </Column>
                    <Column lg={3} md={4} sm={4}>
                        <TimePicker id="rupture-time" labelText="Time">
                            <TimePickerSelect
                                id="rupture-time-select"
                                onChange={(e) => handleNestedChange('rupturedMembranes', 'time', e.target.value)}
                            />
                        </TimePicker>
                    </Column>
                    <Column lg={4} md={4} sm={4}>
                        <TextInput
                            id="risk-factors"
                            labelText="Risk Factors"
                            placeholder="Enter risk factors"
                            value={formData.riskFactors}
                            onChange={(e) => handleInputChange('riskFactors', e.target.value)}
                        />
                    </Column>
                    <Column lg={3} md={4} sm={4}>
                        <TextInput
                            id="gravida"
                            labelText="Gravida"
                            placeholder="Enter gravida"
                            value={formData.gravida}
                            onChange={(e) => handleInputChange('gravida', e.target.value)}
                        />
                    </Column>
                    <Column lg={2} md={4} sm={4}>
                        <TextInput
                            id="ip-inpatient"
                            labelText="IP (Inpatient)"
                            placeholder="IP #"
                            value={formData.ipInpatient}
                            onChange={(e) => handleInputChange('ipInpatient', e.target.value)}
                        />
                    </Column>
                </Grid>

                {/* Observation Tabs */}
                <div className="section-divider" style={{ marginTop: '2rem' }}>
                    <h2>Observations During Labour</h2>
                </div>

                <Tabs>
                    {/* Supportive Care Tab */}
                    <TabList aria-label="Labour observation tabs">
                        <Tab>Supportive Care</Tab>
                        <Tab>Baby Parameters</Tab>
                        <Tab>Woman Parameters</Tab>
                    </TabList>

                    <TabPanels>
                        {/* Supportive Care Table */}
                        <TabPanel>
                            <div className="observation-table">
                                <TableContainer title="Supportive Care">
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableHeader>Parameter</TableHeader>
                                                <TableHeader>Baseline</TableHeader>
                                                {timePoints.slice(0, 12).map((_, idx) => (
                                                    <TableHeader key={`hour-${idx}`} style={{ textAlign: 'center' }}>
                                                        {idx + 1}h
                                                    </TableHeader>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {supportiveCareParms.map((param) => (
                                                <TableRow key={param.id}>
                                                    <TableCell>{param.label}</TableCell>
                                                    <TableCell>{param.baseline}</TableCell>
                                                    {timePoints.slice(0, 12).map((_, idx) => (
                                                        <TableCell key={`${param.id}-${idx}`} style={{ padding: '0.5rem' }}>
                                                            <TextInput
                                                                id={`${param.id}-${idx}`}
                                                                hideLabel
                                                                labelText=""
                                                                placeholder=""
                                                                size="sm"
                                                                onChange={(e) => handleObservationChange('supportiveCare', `${param.id}-${idx}`, e.target.value)}
                                                            />
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </TabPanel>

                        {/* Baby Parameters Tab */}
                        <TabPanel>
                            <div className="observation-table">
                                <TableContainer title="Baby Parameters">
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableHeader>Parameter</TableHeader>
                                                <TableHeader>Baseline</TableHeader>
                                                {timePoints.slice(0, 12).map((_, idx) => (
                                                    <TableHeader key={`baby-hour-${idx}`} style={{ textAlign: 'center' }}>
                                                        {idx + 1}h
                                                    </TableHeader>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {babyParms.map((param) => (
                                                <TableRow key={param.id}>
                                                    <TableCell>{param.label}</TableCell>
                                                    <TableCell>{param.baseline}</TableCell>
                                                    {timePoints.slice(0, 12).map((_, idx) => (
                                                        <TableCell key={`${param.id}-${idx}`} style={{ padding: '0.5rem' }}>
                                                            <TextInput
                                                                id={`${param.id}-${idx}`}
                                                                hideLabel
                                                                labelText=""
                                                                placeholder=""
                                                                size="sm"
                                                                onChange={(e) => handleObservationChange('baby', `${param.id}-${idx}`, e.target.value)}
                                                            />
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </TabPanel>

                        {/* Woman Parameters Tab */}
                        <TabPanel>
                            <div className="observation-table">
                                <TableContainer title="Woman Parameters">
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableHeader>Parameter</TableHeader>
                                                <TableHeader>Baseline</TableHeader>
                                                {timePoints.slice(0, 12).map((_, idx) => (
                                                    <TableHeader key={`woman-hour-${idx}`} style={{ textAlign: 'center' }}>
                                                        {idx + 1}h
                                                    </TableHeader>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {womanParms.map((param) => (
                                                <TableRow key={param.id}>
                                                    <TableCell>{param.label}</TableCell>
                                                    <TableCell>{param.baseline}</TableCell>
                                                    {timePoints.slice(0, 12).map((_, idx) => (
                                                        <TableCell key={`${param.id}-${idx}`} style={{ padding: '0.5rem' }}>
                                                            <TextInput
                                                                id={`${param.id}-${idx}`}
                                                                hideLabel
                                                                labelText=""
                                                                placeholder=""
                                                                size="sm"
                                                                onChange={(e) => handleObservationChange('woman', `${param.id}-${idx}`, e.target.value)}
                                                            />
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </TabPanel>
                    </TabPanels>
                </Tabs>

                {/* Action Buttons */}
                <Grid style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                    <Column lg={8} md={4} sm={4}>
                        <Button
                            kind="primary"
                            type="submit"
                            renderIcon={Save}
                            onClick={handleSave}
                        >
                            Save Record
                        </Button>
                        <Button
                            kind="secondary"
                            renderIcon={DocumentExport}
                            onClick={handleExport}
                            style={{ marginLeft: '1rem' }}
                        >
                            Export
                        </Button>
                    </Column>
                </Grid>
            </Form>
        </div>
    );
};

export default LabourCareGuide;