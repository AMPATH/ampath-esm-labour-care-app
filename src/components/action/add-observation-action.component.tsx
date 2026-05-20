import { Button } from "@carbon/react"
import { Add } from "@carbon/react/icons";
import { launchWorkspace2, useConfig, usePatient } from "@openmrs/esm-framework";
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

    const handleLaunchWorkspace = () => {
        launchWorkspace2("patient-form-entry-workspace", {
            form: {
                uuid: labourCareFormUuid,
                display: "Labour care guide"
            },
            patient,
            patientUuid,
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