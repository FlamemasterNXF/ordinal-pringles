let isMobileMode = () => window.matchMedia("(max-width: 960px)").matches

function getAdaptiveButton(name){
    return isMobileMode() ? `mobile${name}` : name
}

function updateAdaptiveHTML(){
    if(isMobileMode()){
        DOM(`header`).style.borderLeft = isObliterationUnlocked() ? 'none' : '1px solid gray'
        DOM(`header`).style.width = isObliterationUnlocked() ? '50%' : '100%'

        const tabButtons = document.getElementsByClassName('tabButton')
        for(let i = 0; i < tabButtons.length; i++){
            if(tabButtons[i].classList.contains('minorTabButton')) continue
            tabButtons[i].style.width = `${87.5/getMajorTabsUnlocked()}%`
        }
    }
}