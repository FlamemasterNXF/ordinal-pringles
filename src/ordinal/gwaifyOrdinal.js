// Applies Secret gwa Theme
function gwaifyOrdinal(ord){
    if(!data.gword.enabled) return ord
    return ord
        .replaceAll('H', "<img src='res/gwaify/chipper.gif'>")
        .replaceAll("&psi;<sub>1</sub>", "<img src='res/gwaify/gwagic.webp'>")
        .replaceAll("&psi;", "<img src='res/gwaify/gwagichat.webp'>")
        .replaceAll("Ω<sub>2</sub>","<img src='res/gwaify/voidgwa.webp'>")
        .replaceAll("Ω","<img src='res/gwaify/tetris.webp'>")
        .replaceAll("ω", "<img src='res/gwaify/gwa.webp'>")
        .replaceAll("&omega;","<img src='res/gwaify/gwa.webp'>")
        .replaceAll("&phi;","<img src='res/gwaify/gwarnament.webp'>")
        .replaceAll('9', "<img src='res/gwaify/gwaold.webp'>")
        .replaceAll('8', "<img src='res/gwaify/gwatrollfront.webp'>")
        .replaceAll('7', "<img src='res/gwaify/gwatroll.webp'>")
        .replaceAll('6', "<img src='res/gwaify/gwatoot.webp'>")
        .replaceAll('5', "<img src='res/gwaify/gwablob.webp'>")
        .replaceAll('4', "<img src='res/gwaify/gwastarfull.webp'>")
        .replaceAll('3', "<img src='res/gwaify/gwastar.webp'>")
        .replaceAll('2', "<img src='res/gwaify/gwahatfront.webp'>")
        .replaceAll('1', "<img src='res/gwaify/gwafront.webp'>")
        .replaceAll('0', "<img src='res/gwaify/gwegg.webp'>")
}

// Explains Secret gwa Theme
function gwaifyExplain(){
    createAlert("Here's what those gwas mean!",
        "&psi; = <img src='https://cdn.discordapp.com/emojis/929933686353297479.webp?size=32'><br>&psi;<sub>1</sub> = <img src='https://cdn.discordapp.com/emojis/925185146481704990.webp?size=32'><br>Ω = <img src='https://cdn.discordapp.com/emojis/967188082434662470.webp?size=24'><br>Ω<sub>2</sub> (aka BHO) = <img src='https://cdn.discordapp.com/emojis/854483367600193566.webp?size=24'><br>ω = <img src='https://cdn.discordapp.com/emojis/853002327362895882.webp?size=24'><br>&phi; = <img src='https://cdn.discordapp.com/emojis/916425545770745856.webp?size=24'><br>9 = <img src='res/gwaify/gwaold.webp'><br>8 = <img src='res/gwaify/gwatrollfront.webp'><br>7 = <img src='res/gwaify/gwatroll.webp'><br>6 = <img src='res/gwaify/gwatoot.webp'><br>5 = <img src='res/gwaify/gwablob.webp'><br>4 = <img src='res/gwaify/gwastarfull.webp'><br>3 = <img src='res/gwaify/gwastar.webp'><br>2 = <img src='https://cdn.discordapp.com/emojis/970019428391591976.webp?size=24'><br>1 = <img src='https://cdn.discordapp.com/emojis/926324253270360154.webp?size=24'><br>0 = <img src='res/gwaify/gwegg.webp'>",
        "Thanks for the help!",
        {container: 35, button: 2}
    )
}
