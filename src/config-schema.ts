import { Type, validator } from '@openmrs/esm-framework';
import _default from 'react-hook-form/dist/utils/createSubject';

export const configSchema = {
  encounterTypeUuid: {
    _type: Type.ConceptUuid,
    _default: '26eeda6e-d490-47f3-bacd-058684be6d97',
    _description: 'Labour care encounter type'
  },
  concepts: {
    // Labour stage and time slot
    labourDurationConceptUuid: {
      _type: Type.ConceptUuid,
      _default: 'a8aff9b4-1350-11df-a1f1-0026b9348838',
      _description: 'Length of labour in hours.',
    },
    labourStageConceptUuid: {
      _type: Type.ConceptUuid,
      _default: '8f435457-3d4f-4831-9f4c-b8dec1550137',
      _description: 'Current stage of labour (First / Second).',
    },
    // ── Header / Patient Info ──────────────────────────────────────────
    parityConceptUuid: {
      _type: Type.ConceptUuid,
      _default: 'a899a920-1350-11df-a1f1-0026b9348838',
      _description: 'Parity — number of previous deliveries.',
    },
    gravidaConceptUuid: {
      _type: Type.ConceptUuid,
      _default: 'a8aaf59a-1350-11df-a1f1-0026b9348838',
      _description: 'Gravida — total number of pregnancies.',
    },
    labourOnsetConceptUuid: {
      _type: Type.ConceptUuid,
      _default: 'f0d1dda9-e09e-4bb8-b4fe-1d2f2144ac71',
      _description: 'Type of labour (e.g. Spontaneous, Induced).',
    },
    activeLabourDatetimeConceptUuid: {
      _type: Type.ConceptUuid,
      _default: '3b85d576-ddf8-4c6a-9128-d5f265ba3cbb',
      _description: 'Labour start date and time — active labour diagnosis.',
    },
    rupturedMembranesDatetimeConceptUuid: {
      _type: Type.ConceptUuid,
      _default: 'e2ddba74-73b0-4840-a3cf-7d61a9d8853a',
      _description: 'Date and time of membrane rupture.',
    },
    riskFactorsConceptUuid: {
      _type: Type.ConceptUuid,
      _default: 'bf48af84-e16a-4757-81da-582511e88b35',
      _description: 'Overall risk assessment — freetext risk factors.',
    },
    startTimeConceptUuid: {
      _type: Type.ConceptUuid,
      _default: 'a89ece64-1350-11df-a1f1-0026b9348838',
      _description: 'Start time of the labour care guide monitoring.',
    },
    // ── Supportive Care ────────────────────────────────────────────────
    companionConceptUuid: {
      _type: Type.ConceptUuid,
      _default: 'aaa420c8-5f0e-467f-af3f-49ed6d84752e',
      _description: 'Presence of a birth companion (Yes / No / Declined).',
    },
    painReliefConceptUuid: {
      _type: Type.ConceptUuid,
      _default: '72809773-f6ca-4471-8161-fe84c49ea945',
      _description: 'Pain relief given (Yes / No / Declined).',
    },
    oralFluidsConceptUuid: {
      _type: Type.ConceptUuid,
      _default: '114f9886-ddaa-460e-b2c8-64404cba2d02',
      _description: 'Oral fluid given (Yes / No / Declined).',
    },
    postureConceptUuid: {
      _type: Type.ConceptUuid,
      _default: '033215b6-e9b2-4c26-b59b-69634b634367',
      _description: 'Type of posture (Supine / Mobile).',
    },

    // ── Baby ───────────────────────────────────────────────────────────
    baselineFhrConceptUuid: {
      _type: Type.ConceptUuid,
      _default: 'a8a007a2-1350-11df-a1f1-0026b9348838',
      _description: 'Baseline fetal heart rate (bpm). Alert: <110 or ≥160.',
    },
    fhrDecelerationConceptUuid: {
      _type: Type.ConceptUuid,
      _default: '5ba94f35-84a6-4b55-9d03-1f65d3f8d7b0',
      _description: 'Type of fetal heart rate deceleration (Early / Late / Variable / None).',
    },
    amnioticFluidConceptUuid: {
      _type: Type.ConceptUuid,
      _default: 'c69e6dfd-7b03-40ae-a902-3cf72c79c136',
      _description: 'Visual inspection of amniotic fluid (Intact / Clear / Meconium / Blood).',
    },
    fetalPositionConceptUuid: {
      _type: Type.ConceptUuid,
      _default: 'a8b026a0-1350-11df-a1f1-0026b9348838',
      _description: 'Fetal presentation / position (Anterior / Posterior / Transverse).',
    },
    caputConceptUuid: {
      _type: Type.ConceptUuid,
      _default: 'f1c5abf6-4710-4ec7-8160-4b4adbf42c91',
      _description: 'Caput succedaneum status (0 / + / ++ / +++). Alert: +++.',
    },
    mouldingConceptUuid: {
      _type: Type.ConceptUuid,
      _default: '1215d4c3-b371-481f-9b77-d54e9eeed5f4',
      _description: 'Fetal moulding score (0 / + / ++ / +++). Alert: +++.',
    },

    // ── Woman's Vitals ─────────────────────────────────────────────────
    pulseConceptUuid: {
      _type: Type.ConceptUuid,
      _default: 'a8a65f12-1350-11df-a1f1-0026b9348838',
      _description: 'Maternal pulse rate (bpm). Alert: <60 or ≥120.',
    },
    systolicBpConceptUuid: {
      _type: Type.ConceptUuid,
      _default: 'a8a65d5a-1350-11df-a1f1-0026b9348838',
      _description: 'Systolic blood pressure (mmHg). Alert: <80 or ≥140.',
    },
    diastolicBpConceptUuid: {
      _type: Type.ConceptUuid,
      _default: 'a8a65e36-1350-11df-a1f1-0026b9348838',
      _description: 'Diastolic blood pressure (mmHg). Alert: ≥90.',
    },
    temperatureConceptUuid: {
      _type: Type.ConceptUuid,
      _default: 'a8a65fee-1350-11df-a1f1-0026b9348838',
      _description: 'Maternal temperature (°C). Alert: <35.0 or ≥37.5.',
    },
    urineProteinConceptUuid: {
      _type: Type.ConceptUuid,
      _default: 'a8a47ca6-1350-11df-a1f1-0026b9348838',
      _description: 'Urine protein level. Alert: P++.',
    },
    urineAcetoneConceptUuid: {
      _type: Type.ConceptUuid,
      _default: 'b72fa772-19a9-4386-8185-6491ab97e97e',
      _description: 'Urine acetone / ketone level. Alert: A++.',
    },

    // ── Contractions ───────────────────────────────────────────────────
    contractionsPerTenMinConceptUuid: {
      _type: Type.ConceptUuid,
      _default: 'eebf4cfb-5cf7-4efa-a860-993677d6cd31',
      _description: 'Frequency of uterine contractions per 10 minutes. Alert: ≤2 or >5.',
    },
    contractionDurationConceptUuid: {
      _type: Type.ConceptUuid,
      _default: '55a3f38e-8758-483a-9a5f-d6273f5e6803',
      _description: 'Duration of each contraction in seconds. Alert: <20 or >60.',
    },

    // ── Labour Progress ────────────────────────────────────────────────
    cervicalDilationConceptUuid: {
      _type: Type.ConceptUuid,
      _default: 'b95b991a-887a-42f9-914f-db0ea18b1e7f',
      _description: 'Cervical dilation in cm (5-10). Plotted as X on the labour progress grid.',
    },
    fetalDescentConceptUuid: {
      _type: Type.ConceptUuid,
      _default: 'a6e1be1a-226f-4f59-81f5-eea2ee1ac80d',
      _description: 'Descent of fetal head (fifths palpable above pelvic brim, 0-5). Plotted as O.',
    },

    // ── Medication ─────────────────────────────────────────────────────
    oxytocinAdministeredConceptUuid: {
      _type: Type.ConceptUuid,
      _default: '8454e61e-0802-416a-9209-62d779d7e016',
      _description: 'Whether oxytocin was administered during this visit (Yes / No).',
    },
    oxytocinConcentrationConceptUuid: {
      _type: Type.ConceptUuid,
      _default: 'e012caff-01e4-49d3-b918-1b69cbda9306',
      _description: 'Oxytocin concentration in U/L.',
    },
    oxytocinDripDoseConceptUuid: {
      _type: Type.ConceptUuid,
      _default: '21ca3adc-6217-44b5-8f4b-380fce2cc3f6',
      _description: 'Oxytocin drip rate in drops/min.',
    },
    medicationConceptUuid: {
      _type: Type.ConceptUuid,
      _default: 'a89c26b4-1350-11df-a1f1-0026b9348838',
      _description: 'Whether any other medication was received at this visit (Yes / No).',
    },
    ivFluidsAdministeredConceptUuid: {
      _type: Type.ConceptUuid,
      _default: '6b0c64cd-b206-4ac5-92e4-ecb5b34c7d28',
      _description: 'Whether IV fluids were administered (Yes / No).',
    },
    ivFluidsTypeConceptUuid: {
      _type: Type.ConceptUuid,
      _default: '0917834d-9fea-4ff7-b1b4-2b306ab1e7a3',
      _description: 'Type of IV fluid administered (e.g. Glucose/Dextrose, Normal Saline).',
    },

    // ── Shared Decision-Making ─────────────────────────────────────────
    assessmentNotesConceptUuid: {
      _type: Type.ConceptUuid,
      _default: '5e4dc798-2cce-4a1a-97e9-bcf22d64b07c',
      _description: 'Clinical assessment notes (freetext).',
    },
    planNotesConceptUuid: {
      _type: Type.ConceptUuid,
      _default: '23f710cc-7f9c-4255-9b6b-c3e240215dba',
      _description: 'Therapeutic plan notes (freetext).',
    },
  },
};

export type Config = {
  encounterTypeUuid: string;
  concepts: {
    // Labour stage and time slot
    labourDurationConceptUuid: string;
    labourStageConceptUuid: string;
    // Header
    parityConceptUuid: string;
    gravidaConceptUuid: string;
    labourOnsetConceptUuid: string;
    activeLabourDatetimeConceptUuid: string;
    rupturedMembranesDatetimeConceptUuid: string;
    riskFactorsConceptUuid: string;
    startTimeConceptUuid: string;
    // Supportive Care
    companionConceptUuid: string;
    painReliefConceptUuid: string;
    oralFluidsConceptUuid: string;
    postureConceptUuid: string;
    // Baby
    baselineFhrConceptUuid: string;
    fhrDecelerationConceptUuid: string;
    amnioticFluidConceptUuid: string;
    fetalPositionConceptUuid: string;
    caputConceptUuid: string;
    mouldingConceptUuid: string;
    // Woman's Vitals
    pulseConceptUuid: string;
    systolicBpConceptUuid: string;
    diastolicBpConceptUuid: string;
    temperatureConceptUuid: string;
    urineProteinConceptUuid: string;
    urineAcetoneConceptUuid: string;
    // Contractions
    contractionsPerTenMinConceptUuid: string;
    contractionDurationConceptUuid: string;
    // Labour Progress
    cervicalDilationConceptUuid: string;
    fetalDescentConceptUuid: string;
    // Medication
    oxytocinAdministeredConceptUuid: string;
    oxytocinConcentrationConceptUuid: string;
    oxytocinDripDoseConceptUuid: string;
    medicationConceptUuid: string;
    ivFluidsAdministeredConceptUuid: string;
    ivFluidsTypeConceptUuid: string;
    // Shared Decision-Making
    assessmentNotesConceptUuid: string;
    planNotesConceptUuid: string;
  };
};