import { ExtensionSlot } from '@openmrs/esm-framework';
import React from 'react';

const LabourCareDashboard: React.FC = () => {
    return (
        <>
            <div>Labour Care</div>
            <ExtensionSlot name='labour-care-chart-slot' state={{ hello: "Hello there" }} />
        </>
    );
}

export default LabourCareDashboard;