export const getHoursLabels = (numRange: number = 0.5, max: number = 12) => {
    const hours: Array<number> = [];
    for (let i = numRange; i <= max; i = i + numRange) {
        hours.push(i);
    }
    return hours;
}

export const abnormalValues = {
    supportiveCare: {
        companion: {
            text: "N",
            isAbnormal: (v) => v === "N"
        },
        painRelief: {
            text: "N",
            isAbnormal: (v) => v === "N"
        },
        oralFluid: {
            text: "N",
            isAbnormal: (v) => v === "N"
        },
        posture: {
            text: "SP",
            isAbnormal: (v) => v === "SP"
        }
    },
    baby: {
        baselineFHR: {
            text: "<110, >160",
            isAbnormal: (v) => parseInt(v) < 110 || parseInt(v) > 160
        },
        FHRDeceleration: {
            text: "L",
            isAbnormal: (v) => v === "L"
        },
        amnioticFluid: {
            text: "M+++, B",
            isAbnormal: (v) => ["M+++", "B"].includes(v)
        },
        fetalPosition: {
            text: "P, T",
            isAbnormal: (v) => ["P", "T"].includes(v)
        },
        caput: {
            text: "+++",
            isAbnormal: (v) => v === "+++"
        },
        moulding: {
            text: "+++",
            isAbnormal: (v) => v === "+++"
        },
    },
    woman: {
        pulse: {
            text: "<60, >120",
            isAbnormal: (v) => parseInt(v) < 60 || parseInt(v) > 120
        },
        systolicBP: {
            text: "<80, >140",
            isAbnormal: (v) => parseInt(v) < 80 || parseInt(v) > 140
        },
        diastolicBP: {
            text: ">90",
            isAbnormal: (v) => parseInt(v) > 90
        },
        temperature: {
            text: "<35.0, >37.5",
            isAbnormal: (v) => parseFloat(v) < 35.0 || parseFloat(v) > 37.5
        },
        urine: {
            text: "P++, A++",
            isAbnormal: (v) => ["P++", "A++"].includes(v)
        }
    },
    labourProgress: {
        contractionsPer10Min: {
            text: "<2, >5",
            isAbnormal: (v) => parseInt(v) < 2 || parseInt(v) > 5
        },
        durationOfContractions: {
            text: "<20, >60",
            isAbnormal: (v) => parseInt(v) < 20 || parseInt(v) > 60
        },
        cervix: {
            cervix5: {
                text: ">6h",
                isAbnormal: (v) => parseFloat(v) > 6.0
            },
            cervix6: {
                text: ">5h",
                isAbnormal: (v) => parseFloat(v) > 5.0
            },
            cervix7: {
                text: ">3h",
                isAbnormal: (v) => parseFloat(v) > 3.0
            },
            cervix8: {
                text: ">2.5h",
                isAbnormal: (v) => parseFloat(v) > 2.5
            },
            cervix9: {
                text: ">2h",
                isAbnormal: (v) => parseFloat(v) > 2.0
            },
        }
    }
}