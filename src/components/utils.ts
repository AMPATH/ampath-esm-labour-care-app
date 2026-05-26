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
            isAbnormal: (v) => v === "N",
            resolve: (v) => {
                if (v.toUpperCase() === "NO") {
                    return "N";
                }
                if (v.toUpperCase() === "YES") {
                    return "Y";
                }
                return v;
            }
        },
        painRelief: {
            text: "N",
            isAbnormal: (v) => v === "N",
            resolve: (v) => {
                if (v.toUpperCase() === "NO") {
                    return "N";
                }
                if (v.toUpperCase() === "YES") {
                    return "Y";
                }
                return v;
            }
        },
        oralFluid: {
            text: "N",
            isAbnormal: (v) => v === "N",
            resolve: (v) => {
                if (v.toUpperCase() === "NO") {
                    return "N";
                }
                if (v.toUpperCase() === "YES") {
                    return "Y";
                }
                return v;
            }
        },
        posture: {
            text: "SP",
            isAbnormal: (v) => v === "SP",
            resolve: (v) => {
                if (v.toUpperCase() === "SUPINE POSITION") {
                    return "SP";
                }
                if (v.toUpperCase() === "MOBILE") {
                    return "MO";
                }
                return v;
            }
        }
    },
    baby: {
        baselineFHR: {
            text: "<110, >160",
            isAbnormal: (v) => parseInt(v) < 110 || parseInt(v) > 160
        },
        FHRDeceleration: {
            text: "L",
            isAbnormal: (v) => v === "L",
            resolve: (v) => {
                if (v.toUpperCase() === "NO") {
                    return "N";
                }
                if (v.toUpperCase() === "EARLY FETAL HEART RATE DECELERATION") {
                    return "E";
                }
                if (v.toUpperCase() === "LATE FETAL HEART RATE DECELERATION") {
                    return "L";
                }
                if (v.toUpperCase() === "VARIABLE FETAL HEART RATE DECELERATION") {
                    return "V";
                }
                return v;
            }
        },
        amnioticFluid: {
            text: "M+++, B",
            isAbnormal: (v) => ["M+++", "B"].includes(v),
            resolve: (v) => {
                if (v.toUpperCase() === "AMNIOTIC MEMBRANE INTACT") {
                    return "I";
                }
                if (v.toUpperCase() === "CLEAR FLUID") {
                    return "C";
                }
                if (v.toUpperCase() === "MECONIUM STAINING") {
                    // Further modification
                    return "M+++";
                }
                if (v.toUpperCase() === "BLOODSTAINED AMNIOTIC FLUID") {
                    return "B";
                }
                return v;
            }
        },
        fetalPosition: {
            text: "P, T",
            isAbnormal: (v) => ["P", "T"].includes(v),
            resolve: (v) => {
                if (v.toUpperCase() === "OCCIPUT ANTERIOR POSITION") {
                    return "A";
                }
                if (v.toUpperCase() === "OCCIPUT POSTERIOR POSITION") {
                    return "P";
                }
                if (v.toUpperCase() === "TRANSVERSE LIE") {
                    return "T";
                }
                return v;
            }
        },
        caput: {
            text: "+++",
            isAbnormal: (v) => v === "+++",
            resolve: (v) => {
                if (v.toUpperCase() === "NONE") {
                    return "0";
                }
                if (v.toUpperCase() === "1+") {
                    return "+";
                }
                if (v.toUpperCase() === "2+") {
                    return "++";
                }
                if (v.toUpperCase() === "3+") {
                    return "+++";
                }
                return v;
            }
        },
        moulding: {
            text: "+++",
            isAbnormal: (v) => v === "+++",
            resolve: (v) => {
                if (v.toUpperCase() === "NONE") {
                    return "0";
                }
                if (v.toUpperCase() === "1+") {
                    return "+";
                }
                if (v.toUpperCase() === "2+") {
                    return "++";
                }
                if (v.toUpperCase() === "3+") {
                    return "+++";
                }
                return v;
            }
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
                isAbnormal: (v, timeSlot) => v && parseFloat(timeSlot) > 6,
                resolve: (v) => {
                    if (v == 5) {
                        return "X"
                    }
                    return;
                }
            },
            cervix6: {
                text: ">5h",
                isAbnormal: (v, timeSlot) => v && parseFloat(timeSlot) > 5,
                resolve: (v) => {
                    if (v == 6) {
                        return "X"
                    }
                    return;
                }
            },
            cervix7: {
                text: ">3h",
                isAbnormal: (v, timeSlot) => v && parseFloat(timeSlot) > 3,
                resolve: (v) => {
                    if (v == 7) {
                        return "X"
                    }
                    return;
                }
            },
            cervix8: {
                text: ">2.5h",
                isAbnormal: (v, timeSlot) => v && parseFloat(timeSlot) > 2.5,
                resolve: (v) => {
                    if (v == 8) {
                        return "X"
                    }
                    return;
                }
            },
            cervix9: {
                text: ">2h",
                isAbnormal: (v, timeSlot) => v && parseFloat(timeSlot) > 2,
                resolve: (v) => {
                    if (v == 9) {
                        return "X"
                    }
                    return;
                }
            },
            cervix10: {
                resolve: (v) => {
                    if (v == 10) {
                        return "X"
                    }
                    return;
                }
            }
        },
        descent: {
            cervix0: {
                resolve: (v) => {
                    if (v == 0) {
                        return "O"
                    }
                    return;
                }
            },
            cervix1: {
                resolve: (v) => {
                    if (v == 1) {
                        return "O"
                    }
                    return;
                }
            },
            cervix2: {
                resolve: (v) => {
                    if (v == 2) {
                        return "O"
                    }
                    return;
                }
            },
            cervix3: {
                resolve: (v) => {
                    if (v == 3) {
                        return "O"
                    }
                    return;
                }
            },
            cervix4: {
                resolve: (v) => {
                    if (v == 4) {
                        return "O"
                    }
                    return;
                }
            },
            cervix5: {
                resolve: (v) => {
                    if (v == 5) {
                        return "O"
                    }
                    return;
                }
            }
        }
    }
}