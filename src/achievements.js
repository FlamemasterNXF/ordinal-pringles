const achievements = [
    {
        req: [
            _=> (data.ord.ordinal >= 10 || data.ord.isPsi),
            _=> data.ord.ordinal >= data.ord.base**2 || data.ord.isPsi,
            _=> calculateHardy() >= 1.78e308 || data.ord.isPsi,
            _=> data.ord.ordinal >= data.ord.base**data.ord.base || data.ord.isPsi ,
            _=> data.ord.isPsi,
        ],
        name: [
            "The First Ordinal",
            "Many More Ordinals",
            "Infinity...?",
            "The Tower of Infinities",
            "A New Kind of Infinity"
        ],
        popup: [
            "Reach ω",
            "Reach ω^2",
            "Reach a value of 1.79e308",
            "Reach ω^ω",
            "Reach Ψ(Ω)"
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
        ],
        name: [
            "Lower is Better",
            "How Low Can You Go?",
            "Descending into the Depths",
            "Penultimate",
        ],
        popup: [
            "Reach Base 9",
            "Reach Base 7",
            "Reach Base 5",
            "Reach Base 3",
        ]
    },
    {
        req: [
            _=> data.dy.base >= 10,
            _=> data.dy.base >= 40,
        ],
        name: [
            "Overdrive",
            "Maximum Overdrive",
        ],
        popup: [
            "Reach a Dynamic Factor of 10",
            "Reach a Dynamic Factor of 40",
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
            ach.style.backgroundColor = achievements[i].req[j]()?'#0f6f00':'#151515'
            ach.style.color = achievements[i].req[j]()?'#c8c500':'#9d5700'
            ++total
        }
    }
}