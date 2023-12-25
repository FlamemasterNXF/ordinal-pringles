const achievements = [
    {
        id: 11,
        name: "The First Ordinal",
        description: "Reach ω",
        req: () => data.ord.ordinal.gte(10)
    },
    {
        id: 12,
        name: "Many More Ordinals",
        description: "Reach ω^2",
        req: () => data.ord.ordinal.gte(data.ord.base**2)
    },
    {
        id: 13,
        name: "Infinity...?",
        description: "Reach a value of 1.79e308",
        req: () => calculateSimpleHardy().gte(1.78e308)
    },
    {
        id: 14,
        name: "The Tower of Infinities",
        description: "Reach ω^ω",
        req: () => data.ord.ordinal.gte(data.ord.base**data.ord.base)
    },
    {
        id: 15,
        name: "A New Kind of Infinity",
        description: "Reach Ψ(Ω)",
        req: () => data.ord.isPsi
    },
    {
        id: 16,
        name: "The Ultimate Infinity",
        description: "Reach Ψ(Ω₂)",
        req: () => data.ord.ordinal.gte(BHO_VALUE)
    },
    {
        id: 21,
        name: "Speedy",
        description: "Purchase Factor 1",
        req: () => data.factors[0] > 0
    },
    {
        id: 22,
        name: "Breaking the Speed Limit",
        description: "Purchase Factor 2",
        req: () => data.factors[1] > 0
    },
    {
        id: 23,
        name: "The Speed of Sound",
        description: "Purchase Factor 3",
        req: () => data.factors[2] > 0
    },
    {
        id: 24,
        name: "The Speed of Light",
        description: "Purchase Factor 4",
        req: () => data.factors[3] > 0
    },
    {
        id: 25,
        name: "Physics is a Myth",
        description: "Purchase Factor 5",
        req: () => data.factors[4] > 0
    },
    {
        id: 26,
        name: "Infinite Speed",
        description: "Purchase Factor 6",
        req: () => data.factors[5] > 0
    },
    {
        id: 27,
        name: "The Speed of Gator",
        description: "Purchase Factor 7",
        req: () => data.factors[6] > 0
    },
    {
        id: 31,
        name: "Base 2 Soon!",
        description: "Boost Once",
        req: () => data.boost.times > 0
    },
    {
        id: 32,
        name: "Base 2: Only 30 Years Away!",
        description: "Boost Ten Times",
        req: () => data.boost.times > 9
    },
    {
        id: 33,
        name: "Base 2: Only 30 Years Away!",
        description: "Boost Twenty Times",
        req: () => data.boost.times > 19
    },
    {
        id: 34,
        name: "Temporary Delays",
        description: "Boost Thirty Three Times",
        req: () => data.boost.times > 32
    },
    {
        id: 35,
        name: "Base 2... Only 30 Years Away...",
        description: "Boost One Hundred Times",
        req: () => data.boost.times > 99
    },
    {
        id: 36,
        name: "30 Years' Base",
        description: "Boost Three Hundred Times",
        req: () => data.boost.times > 299
    },
    {
        id: 41,
        name: "Easy",
        description: "Complete Challenge 1x3",
        req: () => data.chal.completions[0] > 2
    },
    {
        id: 42,
        name: "Dynamic Hater",
        description: "Complete Challenge 5x3",
        req: () => data.chal.completions[4] > 2
    },
    {
        id: 43,
        name: "Quite Simple",
        description: "Complete Challenge 6x3",
        req: () => data.chal.completions[5] > 2
    },
    {
        id: 44,
        name: "The Difficulty is Negligible",
        description: "Complete Challenge 8x3",
        req: () => data.chal.completions[7] > 2
    },
    {
        id: 45,
        name: "The Most Difficult Test of The Gods",
        description: "Complete Challenge 3x3",
        req: () => data.chal.completions[2] > 2
    },
    {
        id: 46,
        name: "I Hate The Third One",
        description: "Complete all Challenges",
        req: () => allEqual(data.chal.completions, 3)
    },
    {
        id: 51,
        name: "Incrementy Incrementing",
        description: "Purchase a Level of RUP1",
        req: () => data.incrementy.rebuyableAmt[0] > 0
    },
    {
        id: 52,
        name: "Dynamic isn't useless?",
        description: "Purchase IUP3",
        req: () => data.incrementy.hasIUP[5]
    },
    {
        id: 53,
        name: "Dynamic isn't useless!",
        description: "Purchase IUP6",
        req: () => data.incrementy.hasIUP[8]
    },
    {
        id: 54,
        name: "Electric Shuffle",
        description: "Sacrifice Incrementy for Charge",
        req: () => data.incrementy.totalCharge > 0
    },
    {
        id: 55,
        name: "Electric Boogaloo",
        description: "Reach 12 Charge",
        req: () => data.incrementy.totalCharge > 11
    },
    {
        id: 56,
        name: "Stupidly High Electric Bill",
        description: "Reach 25 Charge",
        req: () => data.incrementy.totalCharge > 24
    },
    {
        id: 57,
        name: "The Sacrificial Ritual of Electricity",
        description: "Reach 61 Charge",
        req: () => data.incrementy.totalCharge > 60
    },
    {
        id: 58,
        name: "I use Alienware",
        description: "Reach 73 Charge",
        req: () => data.incrementy.totalCharge > 72
    },
    {
        id: 61,
        name: "Ordinals 2??",
        description: "Purchase the first FGH and SGH Upgrades",
        req: () => data.hierarchies.hasUpgrade[0] && data.hierarchies.hasUpgrade[5]
    },
    {
        id: 62,
        name: "Haha Base 4 in 30 Years",
        description: "Reach Hierarchy Base 5",
        req: () => sBUP0Effect() > 4
    },
    {
        id: 63,
        name: "Oh",
        description: "Reach Hierarchy Base 4",
        req: () => sBUP0Effect() > 5
    },
    {
        id: 71,
        name: "My cup runneth over",
        description: "Produce 1 Booster Power per Second",
        req: () => getOverflowGain(0) >= 1
    },
    {
        id: 72,
        name: "My Cup Flooded The World",
        description: "Produce 1e6 Booster Power per Second",
        req: () => getOverflowGain(0) >= 1e6
    },
    {
        id: 73,
        name: "My Electrical Bill Runneth Over",
        description: "Produce Overcharge",
        req: () => getOverflowGain(1) > 0
    },
    {
        id: 74,
        name: "We Need More Batteries",
        description: "Produce 1 Overcharge per Second",
        req: () => getOverflowGain(1) >= 1
    },
    {
        id: 81,
        name: "YOU HAVE COLLAPSED!",
        description: "Collapse Once",
        req: () => data.collapse.hasSluggish[0]
    },
    {
        id: 82,
        name: "Nightlight, Please",
        description: "Unlock Sluggish Milestone 24",
        req: () => data.collapse.hasSluggish[2]
    },
    {
        id: 83,
        name: "I'm Sure These Won't be Expensive",
        description: "Unlock Sluggish Milestone 12",
        req: () => data.collapse.hasSluggish[3]
    },
    {
        id: 84,
        name: "I forgot about Hierarchies",
        description: "Unlock Sluggish Milestone 2",
        req: () => data.collapse.hasSluggish[4]
    },
    {
        id: 85,
        name: "Collapsing Walls",
        description: "Purchase the 7th Cardinal Upgrade",
        req: () => data.collapse.hasCUP[6]
    },
    {
        id: 91,
        name: "Infinitely Dense",
        description: "Reach Singularity Density ω",
        req: () => data.sing.level > 9
    },
    {
        id: 92,
        name: "Bigger Infinitely Dense",
        description: "Reach Singularity Density ω2",
        req: () => data.sing.level > 19
    },
    {
        id: 93,
        name: "PLEASE DO NOT FEED WILD SINGULARITIES",
        description: "Reach Singularity Density ω5",
        req: () => data.sing.level > 49
    },
    {
        id: 94,
        name: "I Fed The Wild Singularity",
        description: "Reach Singularity Density ω8",
        req: () => data.sing.level > 79
    },
    {
        id: 101,
        name: "Never Liked Those Bases Anyway",
        description: "Dynamic Shift in Any Baseless Realm",
        req: () => data.baseless.shifts > 0
    },
    {
        id: 102,
        name: "Definitely Broke The Speed Limit",
        description: "Dynamic Shift Twice in Any Baseless Realm",
        req: () => data.baseless.shifts > 1
    },
    {
        id: 103,
        name: "The Sound of Light",
        description: "Dynamic Shift Four Times in Any Baseless Realm",
        req: () => data.baseless.shifts > 3
    },
    /*
    {
        id: 104,
        name: "The Gator is Proud",
        description: "Dynamic Shift Seven Times in Any Baseless Realm",
        req: () => data.baseless.shifts > 6
    },
     */
    {
        id: 105,
        name: "Unknowable Horrors",
        description: "Dynamic Shift in the Forgotten Realm",
        req: () => data.baseless.shifts > 0 && data.baseless.mode === 2
    },
    {
        id: 106,
        name: "Forgotten Horrors",
        description: "Dynamic Shift Three Times in the Forgotten Realm",
        req: () => data.baseless.shifts > 2  && data.baseless.mode === 2
    },
    /*
    {
        id: 107,
        name: "The Gator's Prodigy",
        description: "Dynamic Shift Seven Times in the Forgotten Realm",
        req: () => data.baseless.shifts > 6  && data.baseless.mode === 2
    },
     */
    {
        id: 111,
        name: "Blue, like this 99% PURE WATER!",
        description: "Complete the first Purification Milestone",
        req: () => hasAOMilestone(0)
    },
    {
        id: 112,
        name: "We afforded, purchased, and used nine",
        description: "Complete the second Purification Milestone",
        req: () => hasAOMilestone(1)
    },
    {
        id: 113,
        name: "The Unholy Electrical Outlet",
        description: "Complete the third Purification Milestone",
        req: () => hasAOMilestone(2)
    },
    {
        id: 114,
        name: "Incrementy isn't even a word",
        description: "Complete the fourth Purification Milestone",
        req: () => hasAOMilestone(3)
    },
    {
        id: 115,
        name: "Purely Baseless Accusations",
        description: "Complete the fifth Purification Milestone",
        req: () => hasAOMilestone(4)
    },
    {
        id: 116,
        name: "Obesity",
        description: "Reach Singularity Density ω²",
        req: () => data.sing.level > 99
    },
    {
        id: 117,
        name: "The Only Hierarchy Achievement",
        description: "Reach Level 3333 of Any Hierarchy Rebuyable",
        req: () => checkAllIndexes(data.hierarchies.rebuyableAmt, 3333) > 0
    },
    {
        id: 118,
        name: "One Megabooster!",
        description: "Reach 1,000,000 Total Boosters",
        req: () => data.boost.total >= 1e6
    },
    {
        id: 119,
        name: "The Incrementy Incremented",
        description: "Reach 1e700 Incrementy",
        req: () => data.incrementy.amt.gte("1e700")
    },
    {
        id: 999,
        name: "Best Feature In The Whole Game",
        description: "Discover the Secret! Don't worry, it has no effect on gameplay :)",
        req: () => data.gword.unl
    },
]

function initAchs(){
    const achTab = DOM('achPage')
    let rows = Math.floor(achievements[achievements.length-1].id/10)
    let total = 0
    for (let i = 0; i < rows; i++) {
        let row = document.createElement('div')
        row.className = 'flexBox'
        row.id = `achRow${i}`
        row.cssText = 'flex-direction: row'
        achTab.append(row)
    }
    for (let i = 0; i < achievements.length; i++) {
        let row = Math.floor(Math.floor(i/8))
        let ach = document.createElement('button')
        ach.className = 'achievement'
        ach.id = `ach${achievements[i].id}`
        ach.innerText = achievements[i].name
        ach.setAttribute("tooltip", achievements[i].description)
        DOM(`achRow${row}`).append(ach)
    }
}
function checkAchs(){
    for (let i=0; i < achievements.length; i++){
        let id = achievements[i].id
        let ach = DOM(`ach${id}`)
        if(achievements[i].req() && !data.achs[i]) data.achs[i] = true
        ach.style.backgroundColor = data.achs[i] ? '#2c4126' : '#151515'
        ach.style.border = data.achs[i] ? '1px solid goldenrod' : '1px solid #464646'
        ach.style.color = data.achs[i] ? 'goldenrod' : '#9d5700'
    }
}