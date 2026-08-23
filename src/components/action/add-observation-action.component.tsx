import { Button } from "@carbon/react"
import { Add } from "@carbon/react/icons";
import { launchWorkspace2, showSnackbar, useConfig, usePatient, useVisit } from "@openmrs/esm-framework";
import React from "react"
import { useTranslation } from "react-i18next"
import styles from "./add-observation-action.scss";
import { Config } from "../../config-schema";

interface AddObservationActionProps {
    workspaceName: string;
    mutated: () => void
}

const AddObservationAction: React.FC<AddObservationActionProps> = ({ workspaceName, mutated }) => {
    const { t } = useTranslation();
    const { labourCareFormUuid } = useConfig<Config>();
    const { patient, patientUuid } = usePatient();
    const { activeVisit } = useVisit(patientUuid);

    const handleLaunchWorkspace = () => {
        if (!activeVisit) {
            showSnackbar({
                title: t("noActiveVisit", "No active visit"),
                subtitle: t("startVisitToAddObservation", "Please start a visit for this patient before adding an observation"),
                kind: "error",
                isLowContrast: true
            });
            return;
        }

        launchWorkspace2("patient-form-entry-workspace", {
            form: {
                uuid: labourCareFormUuid,
                display: "Labour care guide"
            },
            patient,
            patientUuid,
            visitUuid: activeVisit.uuid,
            mutateVisitContext: mutated
        });
    }

    return (
        <div className={styles.addContainer}>
            <Button
                kind="primary"
                onClick={handleLaunchWorkspace}
                renderIcon={Add}
            >{t("add", "Add")}</Button>
        </div>
    )
}

export default AddObservationAction;