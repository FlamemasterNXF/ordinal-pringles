/*
    {
        type: string
        id: string | null
        desc: string
        default: null | bool

        isMulti: null | true
        multiData: null | [ { desc: string, color: string } ]

        onclick: null | any
        specialDisplay: null | string

        doRefresh: null | true
    }
*/
const settingsData = [
    {
        type: 'Game',
        id: 'offlineProgress',
        desc: 'Offline Progress',
        default: true
    },
    {
        type: 'Game',
        id: 'bulkBoosting',
        desc: 'Bulk Boosting',
        default: true
    },
    {
        type: 'Game',
        id: 'challengeRefund',
        desc: 'Booster Refund in C6 - C8',
        default: true
    },
    {
        type: 'Game',
        id: 'obliterationAutomationDisable',
        desc: 'Disable Automation on Obliteration',
        default: false
    },{
        type: 'Game',
        id: 'obliterationNegativeChargeReset',
        desc: 'Disable Negative Charge on Obliteration',
        default: false
    },

    {
        type: 'Confirmation',
        id: 'shiftConfirmation',
        desc: 'Factor Shift Confirmation',
        default: true
    },
    {
        type: 'Confirmation',
        id: 'boostConfirmation',
        desc: 'Factor Boost Confirmation',
        default: true
    },
    {
        type: 'Confirmation',
        id: 'refundConfirmation',
        desc: 'Booster Refund Confirmation',
        default: true
    },
    {
        type: 'Confirmation',
        id: 'chargeRefundConfirmation',
        desc: 'Charge Refund Confirmation',
        default: true
    },
    {
        type: 'Confirmation',
        id: 'challengeConfirmation',
        desc: 'Challenge Enter and Exit Confirmation',
        default: true
    },
    {
        type: 'Confirmation',
        id: 'collapseConfirmation',
        desc: 'Collapse Confirmation',
        default: true
    },
    {
        type: 'Confirmation',
        id: 'darknessConfirmation',
        desc: 'Darkness Enter and Exit Confirmation',
        default: true
    },
    {
        type: 'Confirmation',
        id: 'baselessnessConfirmation',
        desc: 'Baselessness Enter and Exit Confirmation',
        default: true
    },
    {
        type: 'Confirmation',
        id: 'obliterationConfirmation',
        desc: 'Obliteration Confirmation',
        default: true
    },
    {
        type: 'Confirmation',
        id: 'eupRespecConfirmation',
        desc: 'Energy Upgrade Respec Confirmation',
        default: true
    },
    {
        type: 'Confirmation',
        id: 'peupRespecConfirmation',
        desc: 'Passive Upgrade Respec Confirmation',
        default: true
    },
    {
        type: 'Confirmation',
        id: 'stabilizationRespecConfirmation',
        desc: 'All Stabilization Respec Confirmations',
        default: true
    },


    {
        type: 'Popup',
        id: 'challengePopup',
        desc: 'Challenge Completion Popup',
        default: true
    },
    {
        type: 'Popup',
        id: 'baselessChallengePopup',
        desc: 'Baseless Challenge Completion Popup',
        default: true
    },

    {
        type: 'UI',
        id: 'trimSetting',
        desc: 'Change Max Ordinal Display Length',

        onclick: () => createPrompt('Input New Length', changeTrim, true),
        specialDisplay: () => data.ord.trim
    },
    {
        type: 'UI',
        id: 'ordinalDisplayMode',
        desc: 'Change the Ordinal Display Mode',

        isMulti: true,
        multiData: [
            {
                desc: 'Buchholz',
                color: '#ef6a6a'
            },
            {
                desc: 'Veblen',
                color: '#efa16a'
            },
            {
                desc: 'BMS',
                color: '#efed6a'
            },
            {
                desc: 'Y-Sequence',
                color: '#9fef6a'
            },
        ]
    },
    {
        type: 'UI',
        id: 'ordinalColorMode',
        desc: 'Change the Ordinal Color Mode',

        isMulti: true,
        multiData: [
            {
                desc: 'Normal',
                color: '#ef6a6a'
            },
            {
                desc: 'Shifting',
                color: '#efa16a'
            },
        ]
    },
    {
        type: 'UI',
        id: 'bigHardy',
        desc: 'Hardy Value Display for Ordinals >= 1.8e308',
        default: false
    },
    {
        type: 'UI',
        id: 'boostBar',
        desc: 'Display the Boost Progress Bar',
        default: true
    },
    {
        type: 'UI',
        id: 'noColorPringles',
        desc: 'Differentiate Pringles Without Color',
        default: true,

        doRefresh: true
    },
    {
        type: 'UI',
        id: 'sidebarsInThemes',
        desc: 'Display the Sidebars in Theme Settings',
        default: false
    },
    {
        type: 'UI',
        id: 'technicalSettingsToggle',
        desc: 'Display Technical Settings',
        default: false,

        onclick: () => DOM(`technicalTab`).style.display = getSimpleSetting('technicalSettingsToggle') ? 'block' : 'none'
    },

    {
        type: 'Tech',
        id: 'useExpanta',
        desc: 'Use ExpantaNum in Extended Hardy Displays',

        default: false,
    }
]

function switchMulti(i){
    const settingData = settingsData[i]
    const max = settingData.multiData.length
    const currentIndex = settingData.multiData.findIndex(item => item.desc === data.settings[settingData.id])

    let newIndex = currentIndex + 1 < max ? currentIndex + 1 : 0
    data.settings[settingData.id] = settingData.multiData[newIndex].desc
    DOM(`setting${settingData.id}`).innerHTML = displaySetting(i)

    if(settingData.doRefresh) saveAndReload()
}

function updateSetting(i){
    const settingData = settingsData[i]
    data.settings[settingData.id] = !data.settings[settingData.id]
    DOM(`setting${settingData.id}`).innerHTML = displaySetting(i)

    if(settingData.doRefresh) saveAndReload()
    if(settingData.onclick !== undefined) settingData.onclick()
}

function makeNewSetting(i){
    if(settingsData[i].id === undefined) return

    if(!data.settings.hasOwnProperty(settingsData[i].id)){
        if(settingsData[i].isMulti) data.settings[settingsData[i].id] = settingsData[i].multiData[0].desc
        else data.settings[settingsData[i].id] = settingsData[i].default
    }
}

function displaySetting(i){
    const settingData = settingsData[i]
    let text = settingData.desc
    if(settingData.specialDisplay !== undefined){
        text += ` <span style="color: ${getCSSVariable('setting-special-text-color')}">[${settingData.specialDisplay()}]</span>`
    }
    else if(settingData.isMulti){
        const index = settingData.multiData.findIndex(item => item.desc === data.settings[settingData.id])
        const desc = settingData.multiData[index].desc
        const color = settingData.multiData[index].color
        text += ` <span style="color: ${color}">[${desc}]</span>`
    }
    else{
        const color = data.settings[settingData.id]
            ? getCSSVariable('setting-on-text-color')
            : getCSSVariable('setting-off-text-color')
        text += ` <span style="color: ${color}">[${formatBool(data.settings[settingData.id])}]</span>`
    }
    return text
}

function makeSettingUI(i){
    const settingData = settingsData[i]
    const container = DOM(`settings${settingData.type}SubPage`)
    let setting = document.createElement('button')
    setting.className = 'setting'
    setting.id = `setting${settingData.id}`
    setting.innerHTML = displaySetting(i)

    if(settingData.isMulti) setting.onclick = () => switchMulti(i)
    else setting.onclick = () => updateSetting(i)

    container.appendChild(setting)
}

function initSettings(){
    for (let i = 0; i < settingsData.length; i++) {
        makeNewSetting(i)
        makeSettingUI(i)
    }
}

function getSettingIndexFromID(id){
    for (let i = 0; i < settingsData.length; i++) {
        if(settingsData[i].id === id) return i
    }
}

let getSimpleSetting = (name) => data.settings[name]
