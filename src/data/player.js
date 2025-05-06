// Easy Decimal Creation
const D = x => new Decimal(x)

// Important Ordinal Values
const PSI_VALUE = 7625597484987
const GRAHAMS_VALUE = 109
const BHO_VALUE = 4*3**40
const BO_VALUE = D('eee98235035280650.45') //Decimal.pow(3, ordMarksBO).mul(4)

// Create all the variables in a data object for saving
function getDefaultPlayer() {
    return {
        nav: {
            current: "ord",
            subtabs: defaultSubTabs,
        },
        ord: {ordinal:D(1), over:D(0), base:10, trim: 5, isPsi: false},
        markup: {powers:D(0), shifts:0},
        factors: Array(7).fill(0),
        dy: {level:D(1), gain:D(0)},
        autoLevels: Array(2).fill(0),
        boost: {amt:0, total:0, times:0, bottomRowCharges:0, hasBUP:Array(15).fill(false), isCharged:Array(15).fill(false), unlocks: Array(5).fill(false)},
        chal: {decrementy: D(1), html: -1, completions: Array(8).fill(0), active: Array(8).fill(false), totalCompletions: 0},
        incrementy: {amt:D(0), hasIUP:Array(12).fill(false), rebuyableAmt: Array(6).fill(0), charge:0, totalCharge:0},
        hierarchies: { ords:[ {ord:D(1), over:D(0), type:"f"}, {ord:D(1), over:D(0), type:"g"} ], rebuyableAmt: Array(6).fill(0), hasUpgrade: Array(10).fill(false)},
        overflow: {bp:1, oc:1, thirdEffect:true}, //for thirdEffect: true=normal, false=inverted
        collapse: {times:0, cardinals:D(0), bestCardinalsGained:D(0), alephs:Array(alephData.length).fill(D(0)), hasCUP:Array(8).fill(false), hasSluggish:Array(5).fill(false), apEnabled:Array(3).fill(false)},
        darkness: {levels: Array(3).fill(0), negativeCharge:0, drains: Array(7).fill(0), sacrificedCharge:0, totalDrains: 0, negativeChargeSpent:0, stabilization:0, depth: 0, negativeChargeEnabled:false, darkened:false},
        baseless:{alephNull: 0, mode:0, baseless:false, shifts:0, bestOrdinalInMode: Array(3).fill(0), metaANR: Array(metaANBuyableData.length).fill(0), normalANR: Array(normalANBuyableData.length).fill(0), tutorial: false},
        baselessRealm: {amt: 0, total: 0, times: 0, hasBUP: Array(12).fill(false), unlocks: Array(4).fill(false), completions: Array(6).fill(0), chalActive: -1, incrementy: 0, rupLevels: Array(3).fill(0), hasUpgrade: Array(11).fill(false), hierarchy: {ord: 0, over: 0}, gupPercentage: Array(3).fill(0), hupLevels: Array(3).fill(0), automationEnabled: Array(2).fill(true)},
        omega:{bestRemnants: 0, alephOmega:1, bestFBInPurification: Array(4).fill(0), purificationIsActive: Array(4).fill(false), whichPurification: -1, aoRebuyables:Array(8).fill(0), tutorial: false},
        obliterate:{times:0, energy:0, passiveEnergy:0, energyUpgrades: [], pringleAmount: Array(10).fill(0), hasPassiveUpgrade: Array(passiveUpgradeData.length).fill(false)},
        purity:{isAssigned: Array(10).fill(false), isUnlocked: Array(4).fill(false).concat(Array(2).fill(true)).concat(Array(4).fill(false)), assignment:Array(10).fill(false), pringleQueued: -1, tutorial: false},
        hyper: { hasUpgrade: Array(hyperChargeUpgradeData.length).fill(false), isUpgradeSecondary: Array(hyperChargeUpgradeData.length).fill(false), shouldForceStable: Array(hyperChargeUpgradeData.length).fill(false), hasPassiveHypercharge: Array(Math.floor(hyperChargeUpgradeData.length/3)).fill(false) },
        stability: { energy:Array(3).fill(0) },

        autoStatus: {enabled: Array(9).fill(false)},
        theme: { currentTheme: makeCSSVariableArray(), defaultTheme: makeCSSVariableArray(), savedThemes: Array(3).fill(0), settings: Array(themeSettings.length).fill(true) },
        settings: {},
        successorClicks: 0,
        lastTick: 0,
        achs: Array(achievements.length).fill(false),
        loadedVersion: VERSION,
        isBeta: IS_BETA,
        offline: true,
        gword: {unl: false, enabled: false},
        bunny: {unlocked: false, enabled: false, level: 0, experiment: 0}
    }
}
let data = getDefaultPlayer()

