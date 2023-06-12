function getBarPercent(){
    if(!data.ord.isPsi) return 0
    return Math.min(100, (data.ord.ordinal / boostReq()) * 100)
}
function updateProgressBar(){
    DOM("progressBar").style.width = getBarPercent() + "%"
    DOM("progressBar").innerHTML = getBarPercent().toFixed(2) + "%"
}