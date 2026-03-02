function updateHTML(){
    updateOrdHTML()
    updateMarkupHTML()
    updateBoostersHTML()
    updateCollapseHTML()
    updateObliterateHTML()
    updateAdaptiveHTML()
    if(data.nav.current === 'cards') updateCardsHTML()
    if(data.nav.current === 'network') updateBoostGraph()
}