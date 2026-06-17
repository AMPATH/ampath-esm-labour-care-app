/**
 * This is the entrypoint file of the application. It communicates the
 * important features of this microfrontend to the app shell. It
 * connects the app shell to the React application(s) that make up this
 * microfrontend.
 */
import { getAsyncLifecycle, defineConfigSchema, getSyncLifecycle } from '@openmrs/esm-framework';
import { createDashboardLink } from '@openmrs/esm-patient-common-lib';
import { configSchema } from './config-schema';
import { patientChartLabourCareMetaData } from './dashboard-meta';

const moduleName = '@ampath/esm-labour-care-app';

const options = {
  featureName: 'labour-care',
  moduleName,
};

/**
 * This tells the app shell how to obtain translation files: that they
 * are JSON files in the directory `../translations` (which you should
 * see in the directory structure).
 */
export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

/**
 * This function performs any setup that should happen at microfrontend
 * load-time (such as defining the config schema) and then returns an
 * object which describes how the React application(s) should be
 * rendered.
 */
export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
}

/**
 * This named export tells the app shell that the default export of `root.component.tsx`
 * should be rendered when the route matches `root`. The full route
 * will be `openmrsSpaBase() + 'root'`, which is usually
 * `/openmrs/spa/root`.
 */
export const root = getAsyncLifecycle(() => import('./root.component'), options);

export const patientChartLabourCareLink = getSyncLifecycle(
  createDashboardLink(patientChartLabourCareMetaData),
  options,
);

export const labourCare = getAsyncLifecycle(() => import('./components/labour-care.component'), options);

// Workspaces - To be used later on when needed
// Forms
export const foetalHeartRateForm = getAsyncLifecycle(() => import('./components/workspaces/foetal-heart-rate-form/foetal-heart-rate-form.workspace'), options);
export const cervicalForm = getAsyncLifecycle(() => import('./components/workspaces/cervical-form/cervical-form.workspace'), options);
export const bloodPressureForm = getAsyncLifecycle(() => import('./components/workspaces/blood-pressure-form/blood-pressure-form.workspace'), options);
export const drugsAndFluidsForm = getAsyncLifecycle(() => import('./components/workspaces/drugs-and-fluids-form/drugs-and-fluids-form.workspace'), options);
export const membraneAmnioticFluidAndMouldingForm = getAsyncLifecycle(() => import('./components/workspaces/membrane-amniotic-fluid-and-moulding-form/membrane-amniotic-fluid-and-moulding-form.workspace'), options);
export const oxytocinForm = getAsyncLifecycle(() => import('./components/workspaces/oxytocin-form/oxytocin-form.workspace'), options);
export const temperatureForm = getAsyncLifecycle(() => import('./components/workspaces/temperature-form/temperature-form.workspace'), options);
export const urineForm = getAsyncLifecycle(() => import('./components/workspaces/urine-form/urine-form.workspace'), options);