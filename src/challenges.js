const chalDesc = [
    "You can only buy 1 of each AutoClicker", "You can't buy Factors",
    "The Base is 5 higher", "Factor Shifts don't reduce the base", "Dynamic divides AutoClicker speed and each Booster Upgrade bought multiplies Dynamic Gain and Cap by 2",
    "All previous Challenges at once", "You gain no Dynamic, keep no OP on Markup, Booster Upgrades are useless, and you can only manually click Successor 1000 times per Markup",
    "You exponentially gain Decrementy which divides AutoClicker speed, Challenge 6 completions boost OP gain, Ordinal is capped at ω^(ω^3), and you're trapped in Challenge 7"
]
const chalGoals = [
    [1e32, 1e223, 4e256, Infinity], //4e256 works as a stand in for Epsilon Naught here
    [PSI_VALUE, 6377292, 125524238436, Infinity], //this one is in Ordinal value, [1] and [2] are post-Epsilon-Naught
    [1e200, 1e214, 1e256, Infinity],
    [1e33, 5e113, 1.5e119, Infinity],
    [1e122, 3.33e136, 1e219, Infinity],
    [1.02e33, 1e44, 4.75e108, Infinity],
    [1.05e13, 4.18e18, 1.02e20, Infinity],
    [3.0e10, 6.0e10, 2.4e11, Infinity],
]

function initChals(){
    const rows = [DOM('chalRow0'), DOM('chalRow1'), DOM('chalRow2'), DOM('chalRow3')]
    let total = 0
    for (let i = 0; i < rows.length; i++) {
        for (let n = 0; n < chalDesc.length/4; n++) {
            let chal = document.createElement('button')
            chal.className = 'challenge'
            chal.id = `chal${total}`
            chal.innerText = `Loading...`
            rows[i].append(chal)
            ++total
        }
    }
    for (let i = 0; i < chalDesc.length; i++) {
        DOM(`chal${i}`).addEventListener('click', ()=>chalEnter(i))
        updateChalHTML(i)
    }
}
function updateChalHTML(i){
    DOM(`chal${i}`).style.backgroundColor = data.chal.active[i]?'#002480':data.chal.completions[i]===3?'#078228':'black'
    DOM(`chal${i}`).style.color = data.chal.completions[i]===3?'black':'#8080FF'
    DOM(`chal${i}`).innerText = `Challenge ${i+1}\n${chalDesc[i]}\n\nGoal: ${format(chalGoals[i][data.chal.completions[i]])} OP\nReward: Factor ${i+1} boosts Tier 2 Automation at ${format(chalEffect(i))}% power\nCompletions: ${data.chal.completions[i]}/3`

}
function chalEnter(i){
    if(data.chal.completions[i] === 3) return
    data.chal.active[i] = true
    updateChalHTML(i)
}
function chalExit(){
    for (let i = 0; i < data.chal.active.length; i++) {
        data.chal.active[i] = false
        updateChalHTML(i)
    }
}
let chalEffect = i => data.chal.completions[i]===3?100:100*0.25*data.chal.completions[i]
