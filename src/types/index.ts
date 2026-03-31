export interface RowValue {
    value: string;
    timeSlot: number;
    stage: Stage;
}

type Stage = 1 | 2;