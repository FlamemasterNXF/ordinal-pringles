let isMobileMode = () => window.matchMedia("(max-width: 960px)").matches

function getAdaptiveButton(name){
    return isMobileMode() ? `mobile${name}` : name
}

function updateAdaptiveHTML(){
    if(isMobileMode()){
        DOM(`header`).style.borderTopLeftRadius = isObliterationUnlocked() ? '0px' : '16px'
        DOM(`header`).style.borderLeft = isObliterationUnlocked() ? '1px solid gray' : '2px solid gray'
    }
}

let isMobileNavMaximized = true
function changeMobileNavHTML(){
    DOM(`header`).style.display = isMobileNavMaximized ? 'none' : 'block'
    DOM(`sidebar0`).style.display = isMobileNavMaximized ? 'none' : 'flex'
    DOM(`minimizeButton`).style.display = isMobileNavMaximized ? 'none' : 'block'
    DOM(`maximizeButton`).style.display = isMobileNavMaximized ? 'block' : 'none'
    isMobileNavMaximized = !isMobileNavMaximized
}