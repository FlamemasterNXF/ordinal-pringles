let pringleData = [
    {
        color: '#6ba000',
        colorDesc: 'Green',
        name: 'Flavorful',
        desc: 'Boosts the First Cardinal Upgrade',
        eff: () => 1,
        resNames: 'Incrementy',
        res: [data.incrementy.amt],
        cost: () => 1
    },
    {
        color: '#73af80',
        colorDesc: 'Green',
        name: 'Crispy',
        desc: 'Boosts the Second Cardinal Upgrade',
        eff: () => 1,
        resNames: 'Incrementy',
        res: [data.incrementy.amt],
        cost: () => 1
    },
    {
        color: '#2e8c76',
        colorDesc: 'Green',
        name: 'Popular',
        desc: 'Boosts the Fifth Cardinal Upgrade',
        eff: () => 1,
        resNames: 'Incrementy',
        res: [data.incrementy.amt],
        cost: () => 1
    },
    {
        color: '#2d834f',
        colorDesc: 'Green',
        name: 'Beloved',
        desc: 'Boosts the Sixth Cardinal Upgrade',
        eff: () => 1,
        resNames: 'Incrementy',
        res: [data.incrementy.amt],
        cost: () => 1
    },
    {
        color: '#2da000',
        colorDesc: 'Green',
        name: 'Perfected',
        desc: 'Boosts the Seventh Cardinal Upgrade',
        eff: () => 1,
        resNames: 'of all the Green Pringles',
        res: [data.obliterate.pringleAmount[0], data.obliterate.pringleAmount[1], data.obliterate.pringleAmount[2], data.obliterate.pringleAmount[3]],
        cost: () => 1
    },

    {
        color: '#ae3510',
        colorDesc: 'Red-Orange',
        name: 'Flavorful',
        desc: 'Boosts AutoClicker Speeds',
        eff: () => 1,
        resNames: 'Boosters',
        res: [data.boost.amt],
        cost: () => 1
    },
    {
        color: '#ae8910',
        colorDesc: 'Red-Orange',
        name: 'Crispy',
        desc: 'Boosts ℵ<sub>0</sub> Gain',
        eff: () => 1,
        resNames: 'Boosters',
        res: [data.boost.amt],
        cost: () => 1
    },
    {
        color: '#b07a37',
        colorDesc: 'Red-Orange',
        name: 'Popular',
        desc: 'Boosts the Third ℵ<sub>0</sub> Rebuyable',
        eff: () => 1,
        resNames: 'Boosters',
        res: [data.boost.amt],
        cost: () => 1
    },
    {
        color: '#b6924f',
        colorDesc: 'Red-Orange',
        name: 'Beloved',
        desc: 'Boosts the Second ℵ<sub>0</sub> Rebuyable',
        eff: () => 1,
        resNames: 'Boosters',
        res: [data.boost.amt],
        cost: () => 1
    },
    {
        color: '#ae6610',
        colorDesc: 'Red-Orange',
        name: 'Perfected',
        desc: 'Boosts the First ℵ<sub>0</sub> Effect',
        eff: () => 1,
        resNames: 'of all the Orange Pringles',
        res: [data.obliterate.pringleAmount[5], data.obliterate.pringleAmount[6], data.obliterate.pringleAmount[7], data.obliterate.pringleAmount[8]],
        cost: () => 1
    },

    {
        color: '#c2508f',
        colorDesc: 'Pink-Purple',
        name: 'Flavorful',
        desc: "Reduces the Second Incrementy Rebuyable's Cost",
        eff: () => 1,
        resNames: 'ℵ<sub>0</sub>',
        res: [data.baseless.alephNull],
        cost: () => 1
    },
    {
        color: '#b90d55',
        colorDesc: 'Pink-Purple',
        name: 'Crispy',
        desc: "Reduces the Third Incrementy Rebuyable's Cost",
        eff: () => 1,
        resNames: 'ℵ<sub>0</sub>',
        res: [data.baseless.alephNull],
        cost: () => 1
    },
    {
        color: '#92009a',
        colorDesc: 'Pink-Purple',
        name: 'Popular',
        desc: "Reduces the Fourth Incrementy Rebuyable's Cost",
        eff: () => 1,
        resNames: 'ℵ<sub>0</sub>',
        res: [data.baseless.alephNull],
        cost: () => 1
    },
    {
        color: '#af1fad',
        colorDesc: 'Pink-Purple',
        name: 'Beloved',
        desc: "Reduces the Sixth Incrementy Rebuyable's Cost",
        eff: () => 1,
        resNames: 'ℵ<sub>0</sub>',
        res: [data.baseless.alephNull],
        cost: () => 1
    },
    {
        color: '#f542a4',
        colorDesc: 'Pink-Purple',
        name: 'Perfected',
        desc: "Reduces the Fifth Incrementy Rebuyable's Cost",
        eff: () => 1,
        resNames: 'of all the Pink-Purple Pringles',
        res: [data.obliterate.pringleAmount[10], data.obliterate.pringleAmount[11], data.obliterate.pringleAmount[12], data.obliterate.pringleAmount[13]],
        cost: () => 1
    },

    {
        color: '#0091a2',
        colorDesc: 'Blue',
        name: 'Flavorful',
        desc: "Boosts the FGH Effect",
        eff: () => 1,
        resNames: 'Cardinals',
        res: [data.collapse.cardinals],
        cost: () => 1
    },
    {
        color: '#3e7eab',
        colorDesc: 'Blue',
        name: 'Crispy',
        desc: "Boosts FGH Gain",
        eff: () => 1,
        resNames: 'Cardinals',
        res: [data.collapse.cardinals],
        cost: () => 1
    },
    {
        color: '#0073bb',
        colorDesc: 'Blue',
        name: 'Popular',
        desc: "Boosts the SGH Effect",
        eff: () => 1,
        resNames: 'Cardinals',
        res: [data.collapse.cardinals],
        cost: () => 1
    },
    {
        color: '#384cd2',
        colorDesc: 'Blue',
        name: 'Beloved',
        desc: "Boosts SGH Gain",
        eff: () => 1,
        resNames: 'Cardinals',
        res: [data.collapse.cardinals],
        cost: () => 1
    },
    {
        color: '#4000ff',
        colorDesc: 'Blue',
        name: 'Perfected',
        desc: "Boosts the Hierarchy Rebuyable Caps",
        eff: () => 1,
        resNames: 'of all the Blue Pringles',
        res: [data.obliterate.pringleAmount[15], data.obliterate.pringleAmount[16], data.obliterate.pringleAmount[17], data.obliterate.pringleAmount[18]],
        cost: () => 1
    },


    {
        color: '#a8ad0b',
        colorDesc: 'Green',
        name: 'Limited Edition',
        desc: "Boosts Cardinal Gain",
        eff: () => 1,
        resNames: 'of all the Green Pringles',
        res: [data.obliterate.pringleAmount[0], data.obliterate.pringleAmount[1], data.obliterate.pringleAmount[2], data.obliterate.pringleAmount[3]],
        cost: () => 1
    },
    {
        color: '#77361c',
        colorDesc: 'Orange',
        name: 'Limited Edition',
        desc: "Boosts Dynamic Cap",
        eff: () => 1,
        resNames: 'of all the Orange Pringles',
        res: [data.obliterate.pringleAmount[5], data.obliterate.pringleAmount[6], data.obliterate.pringleAmount[7], data.obliterate.pringleAmount[8]],
        cost: () => 1
    },
    {
        color: '#d065c7',
        colorDesc: 'Pink-Purple',
        name: 'Limited Edition',
        desc: "Reduces Charge Cost",
        eff: () => 1,
        resNames: 'of all the Pink-Purple Pringles',
        res: [data.obliterate.pringleAmount[10], data.obliterate.pringleAmount[11], data.obliterate.pringleAmount[12], data.obliterate.pringleAmount[13]],
        cost: () => 1
    },
    {
        color: '#0ea87a',
        colorDesc: 'Blue',
        name: 'Limited Edition',
        desc: "Boosts Incrementy Gain",
        eff: () => 1,
        resNames: 'of all the Blue Pringles',
        res: [data.obliterate.pringleAmount[15], data.obliterate.pringleAmount[16], data.obliterate.pringleAmount[17], data.obliterate.pringleAmount[18]],
        cost: () => 1
    },
    {
        color: '#ce0b0b',
        colorDesc: 'Red',
        name: 'Barbecue',
        desc: "Boosts AutoBuyer Speed",
        eff: () => 1,
        resNames: 'of all the Inner-Circle Pringles',
        res: [data.obliterate.pringleAmount[4], data.obliterate.pringleAmount[9], data.obliterate.pringleAmount[14], data.obliterate.pringleAmount[19]],
        cost: () => 1
    },
]

function initPringleAlchemy(){
    let canvas = DOM('pringleCanvas')
    let context = canvas.getContext('2d')

    // Draw the Top Left Circle
    context.moveTo(0, 0)
    context.line
    context.strokeStyle = `#5b5b5b`
    context.beginPath();
    context.arc(150, 145, 140, 0, 2 * Math.PI);
    context.stroke();

    // Draw the Bottom Left Circle
    context.moveTo(0, 600)
    context.line
    context.beginPath();
    context.arc(150, 455, 140, 0, 2 * Math.PI);
    context.stroke();

    // Draw the Top Right Circle
    context.moveTo(1000, 0)
    context.line
    context.beginPath();
    context.arc(850, 145, 140, 0, 2 * Math.PI);
    context.stroke();

    // Draw the Bottom Left Circle
    context.moveTo(1000, 600)
    context.line
    context.beginPath();
    context.arc(850, 455, 140, 0, 2 * Math.PI);
    context.stroke();

    // Draw the Center Circle
    context.moveTo(500, 300)
    context.line
    context.beginPath();
    context.arc(500, 300, 240, 0, 2 * Math.PI);
    context.stroke();

    initPringles()
}
function initPringles(){
    for (let i = 0; i < pringleData.length; i++) {
        DOM(`pringle${i}`).addEventListener("mouseenter", (e) => displayPringleButton(e, pringleData[i], i))
        DOM(`pringle${i}`).style.border = `2px solid ${pringleData[i].color}`
    }
}

function displayPringleButton(event, pringleData, i){
    let button = DOM(`pringleButton`)

    button.style.display = `block`
    button.style.left = `${event.pageX}px`
    button.style.top = `${event.pageY}px`

    button.style.color = pringleData.color
    button.innerHTML = `The ${pringleData.name}${i !== 24 ? ` ${pringleData.colorDesc}` : ''} Pringle [${data.obliterate.pringleAmount[i]}]<br><b>${pringleData.desc}</b><br>It costs <b>${pringleData.cost()} ${pringleData.resNames}</b> to craft<br>It is currently UNASSIGNED<br><i style="font-size: 0.85rem; color: gray">Click this Pringle to Craft it!</i>`
}