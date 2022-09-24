let boostTab = "upgrades"
function switchBoostTab(t){
    DOM(`${boostTab}SubPage`).style.display = `none`
    DOM(`${t}SubPage`).style.display = `flex`
    boostTab = t
}

const bupDesc = ['Each Factor\'s effect is doubled', 'Boost OP gain by 10x', 'The Ordinal Base is reduced by 4 if it\'s over 7', 'Dynamic Gain and Cap are squared in Odd-Numbered Challenges',
    'Unlock Max All AutoBuyer', 'Boosters Boost Tier 1 and 2 automation', 'Factor Boosts lower the Ordinal Base, but only under Ψ(Ω)', 'Dynamic Gain is increased based on how fast it decreases',
    'Unlock Markup AutoBuyer', 'Gain 20 Free OP/s', 'Gain 3 Free Factors if you have unlocked them all', 'Boosters boost OP gain if the Ordinal Base is less than 6']
const bupCostsHTML = [1, 5, 72, 53,
    1, 4, 73, 74,
    1, 8, 16, 66]
function initBUPs(){
    let rows = [DOM('bupColumn0'), DOM('bupColumn1'), DOM('bupColumn2')]
    let total = 0
    for (let i = 0; i < rows.length; i++) {
        for (let n = 0; n < bupCostsHTML.length/3; n++) {
            let bup = document.createElement('button')
            bup.className = 'bup'
            bup.id = `bup${total}`
            bup.innerText = `${bupDesc[total]}\n${bupCostsHTML[total]} Boosters`
            rows[i].append(bup)
            ++total
        }
    }
}
const autoNames = ['Max All', 'Markup']
const autoRequirements = ['you can\'t Factor Shift', 'you\'re past Ψ(Ω)']
function updateBoostersHTML(){
    for (let i = 0; i < data.autoStatus.unl.length; i++) {
        DOM(`t2AutoText${i}`).innerText = `Your ${autoNames[i]} AutoBuyer is clicking the ${autoNames[i]} button 0 times/second, but only if ${autoRequirements[i]}`
        DOM(`auto${i+2}`).innerText = data.autoStatus.unl[i]?`${autoNames[i]} AutoBuyer: ${boolToReadable(data.autoStatus.enabled[i], 'EDL')}`:`${autoNames[i]} AutoBuyer: LOCKED`
    }
}