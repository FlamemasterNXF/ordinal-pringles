let timesToLoop = [0,0, 0,0]

let t2Auto = () => 1*chalEffectTotal()*bup5Effect()*incrementyMult()*iup6Effect()*bup48Effect()*hupData[3].effect()

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
        ? (diff*data.autoLevels[i]*factorBoost()*bup5Effect()*data.dy.level)/data.chal.decrementy
        :(diff*data.autoLevels[i]*factorBoost()*bup5Effect()/data.dy.level)/data.chal.decrementy
    
    for (let i = 2; i < 4; i++) timesToLoop[i] = data.boost.hasBUP[autoUps[i-2]] 
        ? t2Auto()
        : 0

    for (let i = 0; i < 2; i++) {
        if(Math.floor(timesToLoop[i]/1000) >= 1){
            i===0 ? successor(timesToLoop[i]/1000) : maximize()
            timesToLoop[i] -= Math.floor(timesToLoop[i]/1000)*1000
        }
    }

    // Automation Tier 2
    if(timesToLoop[2]>=1 && (data.markup.powers < fsReqs[data.markup.shifts] || data.ord.base === 3) && data.autoStatus.enabled[0]){ 
        if (data.autoLevels[0] == 0 || data.autoLevels[1] == 0){
            // Prioritize Autobuyers Over Factors
            buyMaxAuto()
            return buyMaxFactor() 
        }
        buyMaxFactor() 
        buyMaxAuto()
    }
    if(timesToLoop[3]>=1 && data.ord.isPsi && data.autoStatus.enabled[1] && data.ord.ordinal < BHO_VALUE) markup(timesToLoop[3]*diff/1000)

    // Increase Hierarchies 
    if(data.boost.unlocks[2]) increaseHierarchies(diff)

    // TODO: Check for "Base is Always 5/4 in Challenges", probably doesn't need to be on tick()
    if(data.chal.active.includes(true) && data.boost.hasBUP[2]) data.ord.base = bup2Effect()

    // Unlock Booster Features
    boosterUnlock()
}