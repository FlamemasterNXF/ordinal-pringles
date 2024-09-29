let automationData = [
    [
        {
            name: "Max All AutoBuyer",
            desc: "clicking the Max All button",
            hasReq: true,
            req: "but only if you can't Factor Shift",
            unlock: () => data.boost.hasBUP[5],
        },
        {
            name: "Markup AutoBuyer AutoBuyer",
            desc: "clicking the Markup button",
            hasReq: true,
            req: "but only if you're past Ψ(Ω)",
            unlock: () => data.boost.hasBUP[10],
        },
    ],
    [
        {
            name: "Charge AutoBuyer",
            desc: "Sacrificing Incrementy for Charge",
            hasReq: false,
            unlock: () => hasSluggishMilestone(2)
        },
        {
            name: "RUP AutoBuyer",
            desc: "buying RUPs",
            hasReq: true,
            req: "but only if you can't afford a Charge",
            unlock: () => hasSluggishMilestone(2)
        },
        {
            name: "Hierarchy Buyable AutoBuyer",
            desc: "buying Hierarchy Buyables",
            hasReq: false,
            unlock: () => hasSluggishMilestone(3)
        },
        {
            name: "Booster Upgrades AutoBuyer",
            desc: "buying Booster Upgrades",
            hasReq: false,
            unlock: () => data.sing.hasEverHadFunction[0]
        },
        {
            name: "Supercharge AutoBuyer",
            desc: "Supercharging Booster Upgrades",
            hasReq: true,
            req: "but only if you already have the required Booster Upgrade",
            unlock: () => data.sing.hasEverHadFunction[3]
        },
        {
            name: "ℵ<sub>0</sub> Upgrade AutoBuyer",
            desc: "purchasing ℵ<sub>0</sub> Upgrades",
            hasReq: false,
            unlock: () => hasPassiveUpgrade(21)
        },
        {
            name: "ℵ<sub>&omega;</sub> Upgrade AutoBuyer",
            desc: "purchasing ℵ<sub>&omega;</sub> Upgrades",
            hasReq: false,
            unlock: () => hasPassiveUpgrade(22)
        },
    ],
]

function initAutomation(){
    let container = DOM(`auto2SubPage`)
    for (let i = 0; i < automationData.length; i++) {
        let textContainer = document.createElement('div')
        textContainer.className = 'flexBox column'
        textContainer.id = `autoTextContainer${i}`
        textContainer.style.marginTop = `1rem`
        container.appendChild(textContainer)

        let toggleContainer = document.createElement('div')
        toggleContainer.className = 'flexBox row'
        toggleContainer.id = `autoToggleContainer${i}`
        container.appendChild(toggleContainer)

        for (let j = 0; j < automationData[i].length ; j++) {
            let text = document.createElement('div')
            text.className = `centeredText automationText`
            text.id = `autoText${i}${j}`
            textContainer.appendChild(text)
            updateAutomationText(i, j)

            let toggle = document.createElement('button')
            toggle.className = `automation${i}`
            toggle.id = `autoToggle${i}${j}`
            toggle.addEventListener('click', () => toggleAuto(i, j))
            toggleContainer.appendChild(toggle)
            updateAutomationToggle(i, j)

            updateAutomationDisplay(i, j)
        }
    }
}

function updateAutomationText(i, j){
    DOM(`autoText${i}${j}`).innerHTML = `Your <span style="color: #80ceff">${getAutomationName(i, j)}</span> ${getAutomationDesc(i, j)} <span style="color: #8080FF">${format(getAutomationSpeed(i, j))} times/second</span>${getAutomationReq(i, j)}`
}
function updateAutomationToggle(i, j){
    DOM(`autoToggle${i}${j}`).innerHTML = `${getAutomationName(i, j)}: ${formatBool(getAutomationEnabled(i, j), 'EDL')}`
}
function updateAutomationDisplay(i, j){
    DOM(`autoText${i}${j}`).style.display = isAutomationUnlocked(i, j) ? `block` : `none`
    DOM(`autoToggle${i}${j}`).style.display = isAutomationUnlocked(i, j) ? `block` : `none`
}

function updateAllAutomationHTML(){
    for (let i = 0; i < automationData.length; i++) {
        for (let j = 0; j < automationData[i].length; j++) {
            if(isAutomationUnlocked(i, j)){
                updateAutomationDisplay(i, j)
                updateAutomationText(i, j)
                updateAutomationToggle(i, j)
            }
        }
    }
}

function toggleAuto(i, j){
    if(!isAutomationUnlocked(i, j)) return
    switch (i) {
        case 0:
            data.autoStatus.enabled[j] = !data.autoStatus.enabled[j]
            break;
        case 1:
            data.autoStatus.enabled[j+2] = !data.autoStatus.enabled[j+2]
            break;
        case 2:
            data.collapse.apEnabled[j] = !data.collapse.apEnabled[j]
            break;
    }
}

let getAutomationName = (i, j) => automationData[i][j].name
let getAutomationDesc = (i, j) => automationData[i][j].desc
let getAutomationReq = (i, j) => automationData[i][j].hasReq ? `, ${automationData[i][j].req}` : ''
let isAutomationUnlocked = (i, j) => automationData[i][j].unlock()
let getAutomationSpeed = (i) => i === 0 ? t2Auto() : 20
let getAutomationEnabled = (i, j) => i === 2 ? data.collapse.apEnabled[j] : i === 1 ? data.autoStatus.enabled[j+2] : data.autoStatus.enabled[j]