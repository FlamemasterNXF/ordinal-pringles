const bunnyData = [
    {
        name: "Normal Bunny",
        desc: "I'm just a fluffy little friend :)\nYou can feed me Pringles and I'll bring my other friends over :D",
        img: "res/bunnies/Basic-Bunny.svg"
    },
    {
        name: "Rare Bunny",
        desc: "I'm a different species of fluffy little friend!",
        img: "res/bunnies/Brown-Bunny.svg"
    },
    {
        name: "Mixed Bunny",
        desc: "I'm combination of a few species of fluffy little friends!",
        img: "res/bunnies/Mixed-Bunny.svg"
    },
    {
        name: "Lawyer Bunny",
        desc: "I'm a fluffy little friend who can speak very, very fast :D",
        img: "res/bunnies/Lawyer-Bunny.svg"
    },
    {
        name: "WeeWoo Bunny",
        desc: "I'm a fluffy little friend who is dedicated to protecting other fluffy little friends!",
        img: "res/bunnies/WeeWoo-Bunny.svg"
    },
    {
        name: "Camo Bunny",
        desc: "I'm a very well hidden fluffy little friend, can you see me?",
        img: "res/bunnies/Camo-Bunny.svg"
    },
    {
        name: "Murder Bunny",
        desc: "I'm fluffy, but not a friend >:( (secretly I am still a friend, I just like to act scary)",
        img: "res/bunnies/Murder-Bunny.svg"
    },
    {
        name: "Hero Bunny",
        desc: "I'm a fluffy little friend with special powers!",
        img: "res/bunnies/Hero-Bunny.svg"
    },
    {
        name: "Angel Bunny",
        desc: "I'm a fluffy little friend who, like all my fluffy little friends, has a perfect and fluffy life :)",
        img: "res/bunnies/Angel-Bunny.svg"
    },
    {
        name: "Devil Bunny",
        desc: "I'm an EVIL >:) fluffy little friend who did some EVIL things (but was still perfect and fluffy)",
        img: "res/bunnies/Devil-Bunny.svg"
    },
    {
        name: "Astronaut Bunny",
        desc: "I'm a fluffy little friend who has seen the fluffy little Moon!",
        img: "res/bunnies/Astronaut-Bunny.svg"
    },
    {
        name: "Alien Bunny",
        desc: "I may look different, but I am still fluffy and friendly!",
        img: "res/bunnies/Alien-Bunny.svg"
    },
    {
        name: "King Bunny",
        desc: "I am the lord of all fluffy little things and the fluffiest of them all!",
        img: "res/bunnies/King-Bunny.svg"
    },
    {
        name: "Baby Bunny",
        desc: "I am the true fluffiest little friend of them all :D",
        img: "res/bunnies/Baby-Bunny.svg"
    },
    {
        name: "Forg Bunny",
        desc: "I'm a fluffy little friend dressed as a bouncy little friend :D",
        img: "res/bunnies/Forg-Bunny.svg"
    },
    {
        name: "Magic Bunny",
        desc: "I am a fluffy friend as old as time itself, yet still as fluffy as ever :)",
        img: "res/bunnies/Magic-Bunny.svg"
    },
    {
        name: "Perfect Bunny",
        desc: "I am two halves of a perfect whole, combined ♡ my fluffiness is legendary :DD\nWow, it seems like you've seen all my friends! Thanks for all the Pringles!!! :D",
        img: "res/bunnies/Perfect-Bunny.svg"
    }
]

const experimentData = [
    {
        level: 3,
        desc: 'Begin Legal Proceedings'
    },
    {
        level: 8,
        desc: 'Summon Heavenly Power'
    },
    {
        level: 11,
        desc: 'Prepare Extraterrestrial Technology'
    },
    {
        level: 15,
        desc: 'Use the Ancient Spell'
    }
]

let getForgCost = () => D(`1e${50*(data.bunny.experiment+1)}`)

function updateForgHTML(){
    DOM(`forgButton`).style.display = data.bunny.level > 2 && data.bunny.experiment < 4 ? 'block' : 'none'
    if(data.bunny.experiment === 4){
        DOM('forgText').style.display = 'block'
        return DOM('forgBox').style.display = 'block'
    }

    if(experimentData[data.bunny.experiment].level <= data.bunny.level){
        const desc = experimentData[data.bunny.experiment].desc
        DOM(`forgButton`).innerText = `Top Secret Bunny Experiment: ${desc}!\nRequires ${format(getForgCost())} Cardinals! (Step ${data.bunny.experiment+1}/4)`
        DOM(`forgButton`).style.height = '4rem'
    }
    else{
        DOM(`forgButton`).innerText = `Top Secret Bunny Experiment: The current bunnies can't do more...`
        DOM(`forgButton`).style.height = '2rem'
    }
}

function forgResearch(){
    if(data.collapse.cardinals.gte(getForgCost())){
        data.bunny.experiment++
        updateForgHTML()
    }
}

function getCurrentBunnyImg(){
    return bunnyData[data.bunny.level].img
}

function getBunnyBlurb(i = data.bunny.level){
    const name = bunnyData[i].name
    const desc = bunnyData[i].desc
    return `Hi! I'm the ${name}! ${desc}`
}

function updateBunnyBlurb(blurb){
    DOM('bunnyBlurb').innerText = blurb
}

function updateBunnyHTML(){
    DOM('bunnyBox').src = getCurrentBunnyImg()
    updateBunnyBlurb(getBunnyBlurb())
    DOM('bunnyButton').innerHTML = getTotalPringleLevels() >= getBunnyCost()
        ? `<span style="color: #009696">Feed the Bunny ${getBunnyCost()} Pringles!</span><br><span style="font-size: 0.7rem">Don't worry, the bunny is nice and won't actually take them</span>`
        : `Looks like you lack Pringles right now. You need ${getBunnyCost()} to feed the bunny.<br><span style="font-size: 0.7rem">Don't worry, the bunny will wait patiently for you to gather ${getBunnyCost() - getTotalPringleLevels()} Pringles :)</span>`

    if(data.bunny.level === bunnyData.length-1) DOM('bunnyButton').style.display = 'none'

    updateForgHTML()
}

function addBunnyToRow(i){
    const row = DOM('bunnyRow')
    let bunny = document.createElement('img')
    bunny.style.width = '4rem'
    bunny.style.height = '4rem'
    bunny.src = bunnyData[i].img
    bunny.addEventListener('mouseenter', () => updateBunnyBlurb(getBunnyBlurb(i)))
    bunny.addEventListener('mouseleave', () => updateBunnyBlurb(getBunnyBlurb()))
    row.appendChild(bunny)
}

function initBunnyHTML(){
    updateBunnyToggleHTML()
    updateBunnyHTML()

    for (let i = 0; i < data.bunny.level; i++) {
        addBunnyToRow(i)
    }
}

let getBunnyCost = () => 2**data.bunny.level

function increaseBunnyLevel(){
    if(getTotalPringleLevels() >= getBunnyCost()){
        addBunnyToRow(data.bunny.level)
        data.bunny.level++
        updateBunnyHTML()
    }
}

function updateBunnyToggleHTML(){
    DOM('ordNav').innerText = data.bunny.enabled ? '૮꒰ ˶• w •˶꒱ა ♡' : 'Ordinals'

    const color = data.bunny.enabled
        ? getCSSVariable('setting-on-text-color')
        : getCSSVariable('setting-off-text-color')
    DOM(`bunnyToggle`).innerHTML = `Replace the Ordinal tab with the Bunny tab <span style="color: ${color}">[${formatBool(data.bunny.enabled)}]</span>`
}
function bunnyToggle() {
    data.bunny.enabled = !data.bunny.enabled
    updateBunnyToggleHTML()
}