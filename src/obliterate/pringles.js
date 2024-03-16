let getPringleGain = () => data.obliterate.times > 0 ? Math.sqrt(data.obliterate.energy) : 0
let isDrainingPringles = () => data.obliterate.currentDrain > -1
let getPringleDrain = () => data.obliterate.pringlesBeforeDrain / 300

function displayPringlesGain(){
    if(isDrainingPringles()) return `-${format(data.obliterate.pringles / (5 * 60 * 1000 / 50))}/s`
    return `+${format(getPringleGain())}/s`
}

function loadPringleContainers(){
    for (let i = 0; i < data.obliterate.containers.length; i++) {
        DOM(`pringlesProgress${i}`).style.height = `${data.obliterate.containers[i].percentFilled}%`
    }
}

function drainPringles(diff){
    if(data.obliterate.pringles <= 0){
        data.obliterate.pringles = 0
        data.obliterate.containers[data.obliterate.currentDrain].percentFilled = 100
        DOM(`pringlesProgress${data.obliterate.currentDrain}`).style.height = `${data.obliterate.containers[data.obliterate.currentDrain].percentFilled}%`
        return data.obliterate.currentDrain = -1
    }

    data.obliterate.pringles -= getPringleDrain()*diff

    let percentGain = 100 - ((data.obliterate.pringles/data.obliterate.pringlesBeforeDrain)*100)

    if(data.obliterate.containers[data.obliterate.currentDrain].percentFilled < percentGain){
        data.obliterate.containers[data.obliterate.currentDrain].percentFilled = percentGain
        DOM(`pringlesProgress${data.obliterate.currentDrain}`).style.height = `${data.obliterate.containers[data.obliterate.currentDrain].percentFilled}%`
    }
}

function fillPringlesContainer(i){
    if(data.obliterate.containers[i].percentFilled !== 100 && data.obliterate.currentDrain === i) return data.obliterate.currentDrain = -1
    data.obliterate.pringlesBeforeDrain = data.obliterate.pringles
    data.obliterate.currentDrain = i
}