import React from "react";
import '@carbon/charts-react/styles.css';
import LabourCareTables from "./labour-care-tables/labour-care-tables.component";
import AddObservationAction from "./action/add-observation-action.component";

const LabourCare: React.FC = () => {
    const workspaceName = ""

    const mutated = () => { }

    return (
        <>
            <AddObservationAction workspaceName={workspaceName} mutated={mutated} />
            <LabourCareTables />
        </>
    );
}

export default LabourCare;