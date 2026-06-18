import React, { useMemo } from "react";
import TableRowData from "../table-row.component";
import { type LabourEncounter, type RowValue } from "../../../types";
import { getMappedRowValue } from "../../../resource/labour-care.resource";
import { useConfig } from "@openmrs/esm-framework";
import { Config } from "../../../config-schema";
import styles from "./index.scss";

interface InitialsProps {
    rowLength: {
        firstStage: Array<number>,
        secondStage: Array<number>
    },
    encounters: LabourEncounter[]
}

interface Initials {
    initials: Array<RowValue>;
}

const Initials: React.FC<InitialsProps> = ({ encounters, rowLength }) => {
    const { concepts } = useConfig<Config>();
    const mappedData = useMemo<Initials>(() => {
        if (encounters) {
            let results = {
                initials: []
            }

            const setConceptUuid = concepts.labourProgressConceptSetUuid;

            encounters.map((encounter) => {
                // Use any labour progress concept
                let mappedValue = getMappedRowValue(encounter, concepts.companionConceptUuid, concepts.labourDurationConceptUuid, concepts.labourStageConceptUuid, { setConceptUuid });
                mappedValue.value = mappedValue.provider.initials;
                results.initials.push(mappedValue);
            });

            return results as Initials;
        }
        return {} as Initials;
    }, [encounters]);

    return <>
        <h6 className={styles.sectionTitle}>INITIALS</h6>
        <TableRowData rowLabelText='INITIALS' data={mappedData.initials} rowLength={rowLength} />
    </>
}

export default Initials;