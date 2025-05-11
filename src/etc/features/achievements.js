let achievements = [
    {
        name: "The First Ordinal",
        description: "Reach ω",
        req: () => data.ord.ordinal.gte(10)
    },
    {
        name: "Many More Ordinals",
        description: "Reach ω^2",
        req: () => data.ord.ordinal.gte(data.ord.base**2)
    },
    {
        name: "Infinity...?",
        description: "Reach a value of 1.79e308",
        req: () => calculateSimpleHardy().gte(1.78e308)
    },
    {
        name: "The Tower of Infinities",
        description: "Reach ω^ω",
        req: () => data.ord.ordinal.gte(data.ord.base**data.ord.base)
    },
    {
        name: "A New Kind of Infinity",
        description: "Reach Ψ(Ω)",
        req: () => data.ord.isPsi
    },
    {
        name: "The Ultimate Infinity",
        description: "Reach Ψ(Ω₂)",
        req: () => data.ord.isPsi && data.ord.ordinal.gte(BHO_VALUE)
    },
    {
        name: "Speedy",
        description: "Purchase Factor 1",
        req: () => data.factors[0] > 0
    },
    {
        name: "Breaking the Speed Limit",
        description: "Purchase Factor 2",
        req: () => data.factors[1] > 0
    },
    {
        name: "The Speed of Sound",
        description: "Purchase Factor 3",
        req: () => data.factors[2] > 0
    },
    {
        name: "The Speed of Light",
        description: "Purchase Factor 4",
        req: () => data.factors[3] > 0
    },
    {
        name: "Physics is a Myth",
        description: "Purchase Factor 5",
        req: () => data.factors[4] > 0
    },
    {
        name: "Infinite Speed",
        description: "Purchase Factor 6",
        req: () => data.factors[5] > 0
    },
    {
        name: "The Speed of Gator",
        description: "Purchase Factor 7",
        req: () => data.factors[6] > 0
    },
    {
        name: "Base 2 Soon!",
        description: "Boost Once",
        req: () => data.boost.times > 0
    },
    {
        name: "Base 2: Only 30 Years Away!",
        description: "Boost Ten Times",
        req: () => data.boost.times > 9
    },
    {
        name: "Base 2: Only 30 Years Away!",
        description: "Boost Twenty Times",
        req: () => data.boost.times > 19
    },
    {
        name: "Temporary Delays",
        description: "Boost Thirty Three Times",
        req: () => data.boost.times > 32
    },
    {
        name: "Base 2... Only 30 Years Away...",
        description: "Boost One Hundred Times",
        req: () => data.boost.times > 99
    },
    {
        name: "30 Years' Base",
        description: "Boost Three Hundred Times",
        req: () => data.boost.times > 299
    },
    {
        name: "Easy",
        description: "Complete Challenge 1x3",
        req: () => data.chal.completions[0] > 2
    },
    {
        name: "Dynamic Hater",
        description: "Complete Challenge 5x3",
        req: () => data.chal.completions[4] > 2
    },
    {
        name: "Quite Simple",
        description: "Complete Challenge 6x3",
        req: () => data.chal.completions[5] > 2
    },
    {
        name: "The Difficulty is Negligible",
        description: "Complete Challenge 8x3",
        req: () => data.chal.completions[7] > 2
    },
    {
        name: "The Most Difficult Test of The Gods",
        description: "Complete Challenge 3x3",
        req: () => data.chal.completions[2] > 2
    },
    {
        name: "I Hate The Third One",
        description: "Complete all Challenges",
        req: () => allEqual(data.chal.completions, 3)
    },
    {
        name: "Incrementy Incrementing",
        description: "Purchase a Level of RUP1",
        req: () => data.incrementy.rebuyableAmt[0] > 0
    },
    {
        name: "Dynamic isn't useless?",
        description: "Purchase IUP3",
        req: () => data.incrementy.hasIUP[5]
    },
    {
        name: "Dynamic isn't useless!",
        description: "Purchase IUP6",
        req: () => data.incrementy.hasIUP[8]
    },
    {
        name: "Electric Shuffle",
        description: "Sacrifice Incrementy for Charge",
        req: () => data.incrementy.totalCharge > 0
    },
    {
        name: "Electric Boogaloo",
        description: "Reach 12 Charge",
        req: () => data.incrementy.totalCharge > 11
    },
    {
        name: "Stupidly High Electric Bill",
        description: "Reach 25 Charge",
        req: () => data.incrementy.totalCharge > 24
    },
    {
        name: "The Sacrificial Ritual of Electricity",
        description: "Reach 61 Charge",
        req: () => data.incrementy.totalCharge > 60
    },
    {
        name: "I use Alienware",
        description: "Reach 73 Charge",
        req: () => data.incrementy.totalCharge > 72
    },
    {
        name: "Ordinals 2??",
        description: "Purchase the first FGH and SGH Upgrades",
        req: () => data.hierarchies.hasUpgrade[0] && data.hierarchies.hasUpgrade[5]
    },
    {
        name: "Haha Base 4 in 30 Years",
        description: "Reach Hierarchy Base 5",
        req: () => getBUPEffect(4) > 4
    },
    {
        name: "Oh",
        description: "Reach Hierarchy Base 4",
        req: () => getBUPEffect(4) > 5
    },
    {
        name: "My cup runneth over",
        description: "Produce 1 Booster Power per Second",
        req: () => getBoosterPowerGain() >= 1
    },
    {
        name: "My Cup Flooded The World",
        description: "Produce 1e6 Booster Power per Second",
        req: () => getBoosterPowerGain() >= 1e6
    },
    {
        name: "My Electrical Bill Runneth Over",
        description: "Produce Overcharge",
        req: () => getOverchargeGain() > 0
    },
    {
        name: "We Need More Batteries",
        description: "Produce 1 Overcharge per Second",
        req: () => getOverchargeGain() >= 1
    },
    {
        name: "YOU HAVE COLLAPSED!",
        description: "Collapse Once",
        req: () => data.collapse.hasSluggish[0]
    },
    {
        name: "Nightlight, Please",
        description: "Unlock Sluggish Milestone 24",
        req: () => data.collapse.hasSluggish[2]
    },
    {
        name: "I'm Sure These Won't be Expensive",
        description: "Unlock Sluggish Milestone 12",
        req: () => data.collapse.hasSluggish[3]
    },
    {
        name: "I forgot about Hierarchies",
        description: "Unlock Sluggish Milestone 2",
        req: () => data.collapse.hasSluggish[4]
    },
    {
        name: "Collapsing Walls",
        description: "Purchase the 7th Cardinal Upgrade",
        req: () => data.collapse.hasCUP[6]
    },
    {
        name: "Hyperactive Charge",
        description: "Obtain your first Hypercharge",
        req: () => hasPassiveHypercharge(0)
    },
    {
        name: "Well that was easy",
        description: "Obtain a row two Hypercharge",
        req: () => hasPassiveHypercharge(1)
    },
    {
        name: "Trickle-Down Chargenomics",
        description: "Obtain a row three Hypercharge",
        req: () => hasPassiveHypercharge(2)
    },
    {
        name: "I Hypercharged the Nightlight",
        description: "Obtain a row four Hypercharge",
        req: () => hasPassiveHypercharge(3)
    },
    {
        name: "Never Liked Those Bases Anyway",
        description: "Baseless Shift in Any Baseless Realm",
        req: () => data.baseless.shifts > 0
    },
    {
        name: "Definitely Broke The Speed Limit",
        description: "Baseless Shift Twice in Any Baseless Realm",
        req: () => data.baseless.shifts > 1
    },
    {
        name: "The Sound of Light",
        description: "Baseless Shift Four Times in Any Baseless Realm",
        req: () => data.baseless.shifts > 3
    },
    {

        name: "The Gator is Proud",
        description: "Baseless Shift Seven Times in Any Baseless Realm",
        req: () => data.baseless.shifts > 6
    },
    {
        name: "Unknowable Horrors",
        description: "Baseless Shift in the Forgotten Realm",
        req: () => data.baseless.shifts > 0 && data.baseless.mode === 2
    },
    {
        name: "Forgotten Horrors",
        description: "Baseless Shift Three Times in the Forgotten Realm",
        req: () => data.baseless.shifts > 2  && data.baseless.mode === 2
    },
    /*
    {

        name: "The Gator's Prodigy",
        description: "Dynamic Shift Seven Times in the Forgotten Realm",
        req: () => data.baseless.shifts > 6  && data.baseless.mode === 2
    },
     */

    {
        name: "My Pringles are 99% Pure",
        description: "Complete the first Purification Milestone",
        req: () => hasAOMilestone(0)
    },
    {
        name: "We afforded, purchased, and used nine",
        description: "Complete the second Purification Milestone",
        req: () => hasAOMilestone(1)
    },
    {
        name: "The Unholy Electrical Outlet",
        description: "Complete the third Purification Milestone",
        req: () => hasAOMilestone(2)
    },
    {
        name: "Incrementy isn't even a word",
        description: "Complete the fourth Purification Milestone",
        req: () => hasAOMilestone(3)
    },
    {
        name: "Purely Baseless Accusations",
        description: "Complete the fifth Purification Milestone",
        req: () => hasAOMilestone(4)
    },
    {
        name: "The Only Hierarchy Achievement",
        description: "Reach Level 3333 of Any Hierarchy Rebuyable",
        req: () => checkAllIndexes(data.hierarchies.rebuyableAmt, 3333) > 0
    },
    {
        name: "One Megabooster!",
        description: "Reach 1,000,000 Total Boosters",
        req: () => data.boost.total >= 1e6
    },

    {
        name: "YOU HAVE CHIPPED!",
        description: "Obliterate",
        req: () => data.obliterate.times > 0
    },
    {
        name: "Sleepy Charge",
        description: "Complete one Row of Passive Upgrades",
        req: () => completedPassiveUpgradeRows() > 0
    },
    {
        name: "Are you Passive yet?",
        description: "Unlock all Passive Upgrades",
        req: () => completedPassiveUpgradeRows() >= 5
    },
    {
        name: "Pringle Eater Reference",
        description: "Assign a Pringle to every Purity Point",
        req: () => getAssignedPurityPoints() >= data.purity.isAssigned.length
    },
    {
        name: "Mark... it is forbidden ",
        description: "Unlock Energy Upgrade 209",
        req: () => hasTreeUpgrade(209)
    },
    {
        name: "Enter the something something",
        description: "Reach 1e1500 Incrementy",
        req: () => data.incrementy.amt.gte("1e1500")
    },
    {
        name: "A Bountiful Harvest",
        description: "Reach 1e100 Cardinals",
        req: () => data.collapse.cardinals.gte(1e100)
    },
    {
        name: "Omega Mode",
        description: "Baseless Shift Five Times in the Forgotten Realm",
        req: () => data.baseless.shifts > 4  && data.baseless.mode === 2
    },
    {
        name: "Base Megabooster!",
        description: "Reach 3,000,000 Boosters",
        req: () => data.boost.amt >= 3e6
    },
    {
        name: "Hypercharging Drains sounds... Dangerous",
        description: "Obtain a row five Hypercharge",
        req: () => hasPassiveHypercharge(4)
    },


    {
        name: "Best Notation EVER",
        description: "Discover the Secret Notation!",
        req: () => data.gword.unl
    },
    {
        name: "Best Feature EVER",
        description: "Invite the Bunnies to visit you!",
        req: () => data.bunny.unlocked
    }
]

function initAchs(){
    const achTab = DOM('achPage')
    let rows = Math.floor(achievements.length/8)+1
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
        ach.id = `ach${total}`
        ach.innerText = achievements[i].name
        ach.setAttribute("tooltip", achievements[i].description)
        DOM(`achRow${row}`).append(ach)
        ++total
    }
}
function checkAchievements(){
    for (let i= 0; i < achievements.length; i++){
        let ach = DOM(`ach${i}`)
        if(hasAchievement(i) && !data.achs[i]) data.achs[i] = true
        ach.className = hasAchievement(i) ? 'completeAchievement' : 'achievement'
    }
}

let hasAchievement = (i) => achievements[i].req() || data.achs[i]
