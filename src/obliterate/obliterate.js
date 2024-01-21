function updateObliterateHTML(){
    DOM(`energyText`).innerHTML = `You have ${format(data.obliterate.energy)} Energy<br><span style="font-size: 0.9rem">You have ${format(data.obliterate.pringles)} Pringles</span>`
    DOM(`obliterateButton`).innerText = `Obliterate your Ordinal for 1 Energy`
    DOM(`obliterateButton`).style.color = data.incrementy.amt.gte(getObliterateReq()) ? '#ff80b9' : '#b06cdc'
}

function getObliterateReq(){
    return D("1e750")
}