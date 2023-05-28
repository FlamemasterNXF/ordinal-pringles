let timesToLoop = [0,0, 0,0]

let t1Auto = () => (factorBoost()*bup5Effect()*alephEffect(0))**cupEffect(1)*cupEffect(3)
let t2Auto = () => 1*chalEffectTotal()*bup5Effect()*incrementyMult()*iup6Effect()*bup48Effect()*hupData[3].effect()*alephEffect(1)*cupEffect(0)*cupEffect(3)*dupEffect(0)

function tick(diff){
    // TODO: PSI Check, probably doesn't need to be on tick()
    if(!data.ord.isPsi && data.ord.ordinal >= PSI_VALUE && data.ord.base === 3) {
        data.ord.isPsi = true
        data.ord.ordinal = 4
    }

    // Check for Challenge Completion
    chalComplete()

    //Automation Tier 1
    for (let i = 0; i < 2; i++) timesToLoop[i] += !data.chal.active[4] 
        ? (diff*(data.autoLevels[i]+extraT1())*t1Auto()*data.dy.level)/data.chal.decrementy
        : (diff*(data.autoLevels[i]+extraT1())*t1Auto()/data.dy.level)/data.chal.decrementy
    
    for (let i = 2; i < 4; i++) timesToLoop[i] = data.boost.hasBUP[autoUps[i-2]] 
        ? t2Auto()
        : 0

    if(Math.floor(timesToLoop[0]/1000) >= 1){
        successor(timesToLoop[0]/1000)
        timesToLoop[0] -= Math.floor(timesToLoop[0]/1000)*1000
    }

    if(Math.floor(timesToLoop[1]/1000) >= 1){
        maximize()
        timesToLoop[1] -= Math.floor(timesToLoop[1]/1000)*1000
    }

    // Automation Tier 2
    // BuyMax Autobuyer
    if(timesToLoop[2]>=1 && (data.markup.powers < fsReqs[data.markup.shifts] || data.ord.base === 3) && data.autoStatus.enabled[0]){ 
        buyMaxT1()
    }

    // Markup Autobuyer
    let collapseCheck = data.ord.ordinal < BHO_VALUE || data.collapse.times > 0
    if(timesToLoop[3]>=1 && data.ord.isPsi && data.autoStatus.enabled[1] && collapseCheck) markup(timesToLoop[3]*diff/1000)

    // Automation Tier 2: Post-Collapse
    if(data.collapse.hasSluggish[2] && data.autoStatus.enabled[2]) sacrificeIncrementy() //Charge Autobuyer
    if(data.collapse.hasSluggish[2] && data.autoStatus.enabled[3]){ // Repeatable IUP Autobuyer
        for (let i = 0; i < 3; i++) {
            buyIUP(i, true)
        }
    }

    // Increase Hierarchies 
    if(data.boost.unlocks[2]) increaseHierarchies(diff)

    // TODO: Check for "Base is Always 5/4 in Challenges", probably doesn't need to be on tick()
    if(data.chal.active.includes(true) && data.boost.hasBUP[2]) data.ord.base = bup2Effect()

    // Unlock Booster Features
    boosterUnlock()
}