const achievements = [
    {
        req: [
            _=> (data.ord.ordinal >= 10 || data.ord.isPsi),
            _=> data.ord.ordinal >= data.ord.base**2 || data.ord.isPsi,
            _=> calculateHardy() >= 1.78e308 || data.ord.isPsi,
            _=> data.ord.ordinal >= data.ord.base**data.ord.base || data.ord.isPsi ,
            _=> data.ord.isPsi,
            _=> data.ord.ordinal >= BHO_VALUE,
        ],
        name: [
            "The First Ordinal",
            "Many More Ordinals",
            "Infinity...?",
            "The Tower of Infinities",
            "A New Kind of Infinity",
            "The Ultimate Infinity"
        ],
        popup: [
            "Reach ω",
            "Reach ω^2",
            "Reach a value of 1.79e308",
            "Reach ω^ω",
            "Reach Ψ(Ω)",
            "Reach BHO"
        ]
    },
    {
        req: [
            _=> data.factors[0] > 0,
            _=> data.factors[1] > 0,
            _=> data.factors[2] > 0,
            _=> data.factors[3] > 0,
            _=> data.factors[4] > 0,
            _=> data.factors[5] > 0,
            _=> data.factors[6] > 0,
        ],
        name: [
            "Speed",
            "Breaking the Speed Limit",
            "The Speed of Sound",
            "The Speed of Light",
            "Physics is a Myth",
            "Infinite Speed",
            "The Speed of Gator",
        ],
        popup: [
            "Purchase Factor 1",
            "Purchase Factor 2",
            "Purchase Factor 3",
            "Purchase Factor 4",
            "Purchase Factor 5",
            "Purchase Factor 6",
            "Purchase Factor 7",
        ]
    },
    {
        req: [
            _=> data.ord.base < 10,
            _=> data.ord.base < 8,
            _=> data.ord.base < 6,
            _=> data.ord.base < 4,
            _=> data.boost.times > 0,
            _=> data.boost.times > 4,
            _=> data.boost.times > 9,
            _=> data.boost.times > 19,
            _=> data.boost.times > 32
        ],
        name: [
            "Lower is Better",
            "How Low Can You Go?",
            "Descending into the Depths",
            "Penultimate",
            "...what?",
            "Base 2 Soon!",
            "Base 2: Only 30 Years Away!",
            "Temporary Delays",
            "Base 2 NOW"
        ],
        popup: [
            "Reach Base 9",
            "Reach Base 7",
            "Reach Base 5",
            "Reach Base 3",
            "Boost Once",
            "Boost Five Times",
            "Boost Ten Times",
            "Boost Twenty Times",
            "Boost Thirty-Three Times"
        ]
    },
    {
        req: [
            _=> data.dy.level >= 10,
            _=> data.dy.level >= 40,
            _=> data.dy.level >= 400,
            _=> data.dy.level >= 4e4,
        ],
        name: [
            "Overdrive",
            "Maximum Overdrive",
            "Maximum is Irrelevant",
            "Irrelevancy is Irrelevant"
        ],
        popup: [
            "Reach a Dynamic Factor of 10",
            "Reach a Dynamic Factor of 40",
            "Reach a Dynamic Factor of 400",
            "Reach a Dynamic Factor of 4e4"
        ]
    },
    {
        req: [
            _=> data.chal.completions[0] >= 1,
            _=> data.chal.completions[0] >= 3,
            _=> data.chal.completions[5] >= 1,
            _=> data.chal.completions[5] >= 3,
            _=> data.chal.completions[7] >= 1,
            _=> data.chal.completions[7] >= 3,
            _=> allEqual(data.chal.completions, 3)
        ],
        name: [
            "Way Too Easy",
            "Still Too Easy",
            "Even a Child Could Do This",
            "I Could Do This in My Sleep",
            "Not Challenging",
            "I Swear it is NOT Challenging",
            "I Did This in My Sleep"
        ],
        popup: [
            "Complete Challenge 1",
            "Complete Challenge 1x3",
            "Complete Challenge 6",
            "Complete Challenge 6x3",
            "Complete Challenge 8",
            "Complete Challenge 8x3",
            "Complete all Challenges"
        ]
    },
    {
        req: [
            _=> data.incrementy.rebuyableAmt[0] >= 1,
            _=> data.incrementy.hasIUP[4],
            _=> data.incrementy.hasIUP[5],
            _=> data.incrementy.hasIUP[8],
            _=> data.incrementy.totalCharge >= 1,
            _=> data.incrementy.totalCharge >= 4,
            _=> data.incrementy.totalCharge >= 12,
        ],
        name: [
            "Increment the Increment of the Incrementy",
            "What Cap?",
            "Dynamic is finally useful!",
            "The Strongest Factor",
            "Electric Shuffle",
            "Electric Boogaloo",
            "Maximum Voltage",
        ],
        popup: [
            "Purchase a level of Rebuyable Upgrade 1",
            "Purchase Incrementy Upgrade 2",
            "Purchase Incrementy Upgrade 3",
            "Purchase Incrementy Upgrade 9",
            "Sacrifice Incrementy for Charge",
            "Sacrifice Incrementy for Charge 4 times",
            "Sacrifice Incrementy for Charge 12 times",
        ]
    },
    {
        req: [
            _=> data.hierachies.hasUpgrade[0],
            _=> data.hierachies.hasUpgrade[3],
        ],
        name: [
            "Ordinals 2.0",
            "Ordinals 3.0",
        ],
        popup: [
            "Purchase the first FGH Upgrade",
            "Purchase the first SGH Upgrade",
        ]
    },
]
function initAchs(){
    const achTab = DOM('achPage')
    let total = 0
    for (let i = 0; i < achievements.length; i++) {
        let row = document.createElement('div')
        row.className = 'flexBox'
        row.id = `achRow${i}`
        row.cssText = 'flex-direction: row'
        achTab.append(row)
        for (let j = 0; j < achievements[i].name.length; j++) {
            let ach = document.createElement('button')
            ach.className = 'achievement'
            ach.id = `achievement${total}`
            ach.textContent =  `${achievements[i].name[j]}`
            ach.addEventListener('mouseover', ()=>DOM('achText').innerText = achievements[i].popup[j])
            row.append(ach)
            ++total
        }
    }
}
function checkAchs(){
    let total = 0
    for (let i=0; i < achievements.length; i++){
        for (let j = 0; j < achievements[i].req.length; j++) {
            let ach = DOM(`achievement${total}`)
            if(achievements[i].req[j]() && !data.achs.includes(total))data.achs.push(total)
            ach.style.backgroundColor = data.achs.includes(total)?'#0f6f00':'#151515'
            ach.style.color = data.achs.includes(total)?'#c8c500':'#9d5700'
            ++total
        }
    }
}