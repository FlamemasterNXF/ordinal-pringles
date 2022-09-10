const TABS = ["markup"]
let diff
function loadTabs(){
    for (let i = 0; i < TABS.length; i++) {
        DOM(`${TABS[i]}Page`).style.display = 'none'
    }
    switchTab('ord')
}
function mainLoop() {
    diff = data.offline.toggled ? (Date.now() - data.time) / 1000 : getRandom(0.048, 0.053)
    data.offline.time = Math.max(data.offline.time - OFFLINE.boost() * diff, 0)
    data.time += diff * OFFLINE.boost
    data.time = Date.now()

    uHTML.update()
}
document.addEventListener('keydown', (event) => {
    let key = event.key;
    //if (key === "m")
}, false);

window.setInterval(function () {
    mainLoop()
}, 50);
window.onload = function () {
    load()
    loadTabs()
}