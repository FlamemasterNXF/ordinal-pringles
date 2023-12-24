// Applies Secret gwa Theme
function gwaifyOrdinal(ord){
    if(!data.gword.enabled) return ord
    return ord.replaceAll('H', "<img src='https://cdn.discordapp.com/emojis/1117560267560206436.gif?size=48&quality=lossless'>")
        .replaceAll("&psi;<sub>1</sub>", "<img src='https://cdn.discordapp.com/emojis/925185146481704990.webp?size=32'>")
        .replaceAll("&psi;", "<img src='https://cdn.discordapp.com/emojis/929933686353297479.webp?size=32'>")
        .replaceAll("Ω<sub>2</sub>","<img src='https://cdn.discordapp.com/emojis/854483367600193566.webp?size=24'>")
        .replaceAll("Ω","<img src='https://cdn.discordapp.com/emojis/967188082434662470.webp?size=24'>")
        .replaceAll("ω","<img src='https://cdn.discordapp.com/emojis/853002327362895882.webp?size=24'>")
        .replaceAll("&omega","<img src='https://cdn.discordapp.com/emojis/853002327362895882.webp?size=24'>")
        .replaceAll("&phi;","<img src='https://cdn.discordapp.com/emojis/916425545770745856.webp?size=24'>")
        .replaceAll('+2', "+<img src='https://cdn.discordapp.com/emojis/970019428391591976.webp?size=24'>")
        .replaceAll('2+', "<img src='https://cdn.discordapp.com/emojis/970019428391591976.webp?size=24'>+")
        .replaceAll('<sup>2</sup>', "<sup><img src='https://cdn.discordapp.com/emojis/970019428391591976.webp?size=24'></sup>")
        .replaceAll('<sub>2</sub>', "<sub><img src='https://cdn.discordapp.com/emojis/970019428391591976.webp?size=24'></sub>")
        .replaceAll('+1', "+<img src='https://cdn.discordapp.com/emojis/926324253270360154.webp?size=24'>")
        .replaceAll('1+', "<img src='https://cdn.discordapp.com/emojis/926324253270360154.webp?size=24'>+")
        .replaceAll('<sup>1</sup>', "<sup><img src='https://cdn.discordapp.com/emojis/926324253270360154.webp?size=24'></sup>")
        .replaceAll('<sub>1</sub>', "<sub><img src='https://cdn.discordapp.com/emojis/926324253270360154.webp?size=24'></sub>")
}

// Explains Secret gwa Theme
function gwaifyExplain(){
    createAlert("Here's what those gwas mean!",
        "&psi; = <img src='https://cdn.discordapp.com/emojis/929933686353297479.webp?size=32'><br>&psi;<sub>1</sub> = <img src='https://cdn.discordapp.com/emojis/925185146481704990.webp?size=32'><br>Ω = <img src='https://cdn.discordapp.com/emojis/967188082434662470.webp?size=24'><br>Ω<sub>2</sub> (aka BHO) = <img src='https://cdn.discordapp.com/emojis/854483367600193566.webp?size=24'><br>ω = <img src='https://cdn.discordapp.com/emojis/853002327362895882.webp?size=24'><br>&phi; = <img src='https://cdn.discordapp.com/emojis/916425545770745856.webp?size=24'><br>2 = <img src='https://cdn.discordapp.com/emojis/970019428391591976.webp?size=24'><br>1 = <img src='https://cdn.discordapp.com/emojis/926324253270360154.webp?size=24'>",
        "Thanks for the help!"
    )
}