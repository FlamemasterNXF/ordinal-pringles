const energyUpgradeData = [
    [
        {
            desc: 'Total Fractal Energy boost AutoBuyers',
            cost: 0,
            eff: () => D(10).pow(data.obliterate.times),
            hasExtraReq: false,
            extraReq: true,
            extraReqText: '',
            node: 0
        }
    ],
    /*
    [
        {
            desc: 'Activating any Color of Pringles boosts Upgrade 0',
            cost: 1,
            eff: (
 => D(1 ,           hasExtraReq: false,
            extraReq: true,
            extraReqText: '',
            node: 0
        },
        {
            desc: 'Activating Orange Pringles provides extra Drains for Cardinal Upgrade 2',
            cost: 1,
            eff: (
 => D(1 ,           hasExtraReq: false,
            extraReq: true,
            extraReqText: '',
            node: 0
        },
        {
            desc: 'Activating Yellow Pringles makes the ω6+5 Singularity Function based on Negative Charge Cap',
            cost: 1,
            eff: (
 => D(1 ,           hasExtraReq: false,
            extraReq: true,
            extraReqText: '',
            node: 0
        },
        {
            desc: "Activating any Color of Pringles below the BHO instantly sets your Ordinal to the BHO without emptying that Color",
            cost: 1,
            eff: (
 => D(1 ,           hasExtraReq: false,
            extraReq: true,
            extraReqText: '',
            node: 0
        },
        {
            desc: "Activating Yellow Pringles makes the ω8 Singularity Function Quintuple the Dynamic Cap",
            cost: 2,
            eff: (
 => D(1 ,           hasExtraReq: false,
            extraReq: true,
            extraReqText: '',
            node: 0
        },
        {
            desc: "Activating Red Pringles now provides free levels of the Third Darkness Upgrade equal to the level of the last Purification Upgrade",
            cost: 2,
            eff: (
 => D(1 ,           hasExtraReq: false,
            extraReq: true,
            extraReqText: '',
            node: 0
        },
        {
            desc: "Activating any Color of Pringles now fills all other Colors to 50%",
            cost: 2,
            eff: (
 => D(1 ,           hasExtraReq: false,
            extraReq: true,
            extraReqText: '',
            node: 0
        },
    ],
    [
        {
            desc: 'Pringles boost AutoClickers',
            cost: 1,
            eff: (
 => D(1 ,           hasExtraReq: false,
            extraReq: true,
            extraReqText: '',
            node: 0
        },
        {
            desc: "Pringles boost Dynamic Gain if it's lower than the Cap, and Dynamic Cap if it's at the Cap",
            cost: 1,
            eff: (
 => D(1 ,           hasExtraReq: false,
            extraReq: true,
            extraReqText: '',
            node: 0
        },
        {
            desc: 'Pringles boost Incrementy Gain',
            cost: 1,
            eff: (
 => D(1 ,           hasExtraReq: false,
            extraReq: true,
            extraReqText: '',
            node: 0
        },
        {
            desc: 'Pringles boost Negative Charge Gain',
            cost: 1,
            eff: (
 => D(1 ,           hasExtraReq: false,
            extraReq: true,
            extraReqText: '',
            node: 0
        },
        {
            desc: 'Pringles boost Cardinal Gain',
            cost: 1,
            eff: (
 => D(1 ,           hasExtraReq: false,
            extraReq: true,
            extraReqText: '',
            node: 0
        },
    ],
     */
    [
        {
            desc: 'Total Fractal Energy provides free levels of the first ℵ<sub>0</sub> Upgrade',
            cost: 1,
            eff: () => D(data.obliterate.times),
            hasExtraReq: false,
            extraReq: true,
            extraReqText: '',
            node: 101
        },
        {
            desc: 'Total Fractal Energy boosts the Singularity boost to Baselessness and the 2nd Singularity Effect is now positive',
            cost: 1,
            eff: () => D(data.obliterate.times).times(10),
            hasExtraReq: false,
            extraReq: true,
            extraReqText: '',
            node: 102
        },
        {
            desc: 'ℵ<sub>0</sub> boosts the third ℵ<sub>0</sub> Upgrade',
            cost: 1,
            eff: () => D(Math.log10(data.baseless.alephNull)/50),
            hasExtraReq: false,
            extraReq: true,
            extraReqText: '',
            node: 103
        },
        {
            desc: 'Total Charge boosts the first Singularity Effect',
            cost: 1,
            eff: () => D(data.incrementy.totalCharge/1000),
            hasExtraReq: false,
            extraReq: true,
            extraReqText: '',
            node: 104
        },
        {
            desc: 'Total Fractal Energy reduces the third Singularity Effect',
            cost: 2,
            eff: () => D(data.obliterate.times/100),
            hasExtraReq: false,
            extraReq: true,
            extraReqText: '',
            node: 105
        },
        {
            desc: '??? (Coming Soon)', // Unlock a new Singularity Effect
            cost: Infinity,
            eff: () => D(1),
            hasExtraReq: false,
            extraReq: true,
            extraReqText: '',
            node: 106
        },
    ],
    [
        {
            desc: 'Toal Fractal Energy boosts the first ℵ<sub>ω</sub> effect',
            cost: 1,
            eff: () => D(data.obliterate.times),
            hasExtraReq: false,
            extraReq: true,
            extraReqText: '',
            node: 201
        },
        {
            desc: 'Total Fractal Energy boosts the ℵ<sub>ω</sub> cap',
            cost: 1,
            eff: () => D(1).plus(data.obliterate.times/4),
            hasExtraReq: false,
            extraReq: true,
            extraReqText: '',
            node: 202
        },
        {
            desc: 'Total Fractal Energy boosts the second ℵ<sub>ω</sub> Effect',
            cost: 1,
            eff: () => D(1).plus(data.obliterate.times/4),
            hasExtraReq: false,
            extraReq: true,
            extraReqText: '',
            node: 203
        },
        {
            desc: "While nothing is being Purified, ℵ<sub>ω</sub> Upgrades three to five provide a combined boost to AutoBuyers",
            cost: 1,
            eff: () => D(getAOREffect(2)).plus(getAOREffect(3)).plus(getAOREffect(4)),
            hasExtraReq: false,
            extraReq: true,
            extraReqText: '',
            node: 204
        },
        {
            desc: 'While the Obscure are being Purified, Total Fractal Energy boost the FGH Successor',
            cost: 1,
            eff: () => D(data.obliterate.times).times(3),
            hasExtraReq: false,
            extraReq: true,
            extraReqText: '',
            node: 205
        },
        {
            desc: 'While the Infinite are being Purified, Total Fractal Energy divide the Dynamic Factor',
            cost: 1,
            eff: () => D(data.obliterate.times).div(2),
            hasExtraReq: false,
            extraReq: true,
            extraReqText: '',
            node: 206
        },
        {
            desc: 'While the Eternal are being Purified, total Fractal Energy provides free levels of the fourth ℵ<sub>ω</sub> Upgrade',
            cost: 2,
            eff: () => D(data.obliterate.times).div(2),
            hasExtraReq: false,
            extraReq: true,
            extraReqText: '',
            node: 207
        },
        {
            desc: 'While the Inferior are being Purified, total Fractal Energy greatly boosts the fifth ℵ<sub>ω</sub> Upgrade',
            cost: 2,
            eff: () => D(data.obliterate.times),
            hasExtraReq: false,
            extraReq: true,
            extraReqText: '',
            node: 208
        },
        {
            desc: 'Cardinals provide free ℶ<sub>ω</sub>',
            cost: 3,
            eff: () => Decimal.log10(data.collapse.cardinals),
            hasExtraReq: false,
            extraReq: true,
            extraReqText: '',
            node: 209
        },
    ],
    [
        {
            desc: "Total Fractal Energy boosts all <span style='color: #ae6610'>Orange</span> Pringles",
            cost: 1,
            eff: () => D(data.obliterate.times),
            hasExtraReq: false,
            extraReq: true,
            extraReqText: '',
            node: 301
        },
        {
            desc: "Total Fractal Energy boosts all <span style='color: #3d40fd'>Blue</span> Pringles",
            cost: 1,
            eff: () => D(data.obliterate.times),
            hasExtraReq: false,
            extraReq: true,
            extraReqText: '',
            node: 302
        },
        {
            desc: "Total Fractal Energy boosts all <span style='color: #f542a4'>Pink-Purple</span> Pringles",
            cost: 1,
            eff: () => D(data.obliterate.times),
            hasExtraReq: false,
            extraReq: true,
            extraReqText: '',
            node: 303
        },
        {
            desc: "Total Fractal Energy boosts all <span style='color: #2da000'>Green</span> Pringles",
            cost: 1,
            eff: () => D(data.obliterate.times),
            hasExtraReq: false,
            extraReq: true,
            extraReqText: '',
            node: 304
        },
        {
            desc: "Cardinals boost all Perfected Pringles",
            cost: 2,
            eff: () => Decimal.log10(data.collapse.cardinals+1).div(10),
            hasExtraReq: false,
            extraReq: true,
            extraReqText: '',
            node: 305
        },
        {
            desc: "Cardinals boost all Limited Edition Pringles",
            cost: 2,
            eff: () => Decimal.log10(data.collapse.cardinals+1).div(10),
            hasExtraReq: false,
            extraReq: true,
            extraReqText: '',
            node: 306
        },
        {
            desc: "Total Fractal Energy boosts the <span style='color: #ce0b0b'>Barbecue</span> Pringle",
            cost: 2,
            eff: () => D(data.obliterate.times),
            hasExtraReq: false,
            extraReq: true,
            extraReqText: '',
            node: 307
        },
        {
            desc: "??? (Coming Soon!)",
            cost: Infinity,
            eff: () => D(1),
            hasExtraReq: false,
            extraReq: true,
            extraReqText: '',
            node: 0
        },
    ],
]

let getEUPEffect = (i, j, number = false) => number
    ? getEUPEffect(i, j).toNumber()
    : hasTreeUpgrade(energyUpgradeData[i][j].node) ? Decimal.max(1, energyUpgradeData[i][j].eff()) : D(1)