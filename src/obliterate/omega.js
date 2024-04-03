function updateOmegaModeText(){
    if(data.obliterate.times < 10) DOM(`omegaModeButton`).innerHTML = `<span style="font-size: 1.1rem; color: #7e1e12">Requires 10 Fractal Energy`
    if(data.obliterate.times >= 10 && !inOmegaMode()) DOM(`omegaModeButton`).innerHTML = `<span style="font-size: 1.2rem; color: #da3620">ENTER OMEGA MODE</span><br><br><span style="color: #da4b20">Entering Omega Mode will cause your Ordinal to stop collapsing using Ψ, uncap Ordinal Powers, uncap Factors, reveal Imaginary Shifts and Hyperdynamic Factors, and immediately trigger a Markup.</span>`
    if(data.obliterate.times >= 10 && inOmegaMode()) DOM(`omegaModeButton`).innerHTML = `<span style="font-size: 1.2rem; color: #da3620">EXIT OMEGA MODE</span><br><br><span style="color: #da4b20">Exiting Omega Mode will cause your Ordinal to once again collapse using Ψ, and Ordinal Powers and Factors will be capped once again. However, you will retain your excess Ordinal Powers and Factors.</span>`
}

function toggleOmegaMode(){
    data.ord.isPsi = inOmegaMode()
    data.obliterate.inOmegaMode = !inOmegaMode()
    updateOmegaModeText()

    if(inOmegaMode()) markup()
}
let inOmegaMode = () => data.obliterate.inOmegaMode