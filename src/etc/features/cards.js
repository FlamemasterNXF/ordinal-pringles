// The default object used for saving a card
const cardDataTemplate = {
    quality: 1,
    copies: 0
}

const defaultCardData = Array.from({ length: 3 }, () =>
    Array.from({ length: 7 }, () => structuredClone(cardDataTemplate))
)
defaultCardData.push(Array.from({ length: 3 }, () =>
    structuredClone(cardDataTemplate))
)

const defaultCardShopData = [[0, 0], [0, 1], [0, 2]]

const cardShopSeconds = 86400

const cardData = [
    [
        {
            name: "Base 5",
            path: 'res/cards/base5.png',
        },
        {
            name: "Factor",
            path: 'res/cards/factor.png',
        },
        {
            name: "Hardy Hierarchy",
            path: 'res/cards/hardy.png',
        },
        {
            name: "Omega",
            path: 'res/cards/omega.png',
        },
        {
            name: "Ordinal Power",
            path: 'res/cards/op.png',
        },
        {
            name: "+1",
            path: 'res/cards/plusone.png',
        },
        {
            name: "Psi",
            path: 'res/cards/psi.png',
        },
    ],
    [
        {
            name: "Base 4",
            path: 'res/cards/base4.png',
        },
        {
            name: "Charge",
            path: 'res/cards/charge.png',
        },
        {
            name: "Decrementy",
            path: 'res/cards/decrementy.png',
        },
        {
            name: "FGH",
            path: 'res/cards/fgh.png',
        },
        {
            name: "Incrementy",
            path: 'res/cards/incrementy.png',
        },
        {
            name: "Negative Charge",
            path: 'res/cards/negativecharge.png',
        },
        {
            name: "SGH",
            path: 'res/cards/sgh.png',
        },
    ],
    [
        {
            name: "Base 3",
            path: 'res/cards/base3.png',
        },
        {
            name: "Aleph",
            path: 'res/cards/aleph.png',
        },
        {
            name: "Base 100",
            path: 'res/cards/base3.png',
        },
        {
            name: "Hypercharge",
            path: 'res/cards/hypercharge.png',
        },
        {
            name: "NGH",
            path: 'res/cards/ngh.png',
        },
        {
            name: "Pringle",
            path: 'res/cards/pringle.png',
        },
        {
            name: "Uppercase Omega",
            path: 'res/cards/upperomega.png',
        }
    ],
    [
        {
            name: "Base 2",
            path: 'res/cards/base2.png',
        },
        {
            name: "OFP",
            path: 'res/cards/ofp.png',
        },
        {
            name: "Overcharge",
            path: 'res/cards/overcharge.png',
        },
    ],
]
const rarityData = [
    {
        name: "Normal",
        color: "#837E86",
        threshold: 100, // Only for consistency, it defaults to Normal
    },
    {
        name: "Boosted",
        color: "#639BFF",
        threshold: 41,
    },
    {
        name: "Collapsed",
        color: "#99E550",
        threshold: 11,
    },
    {
        name: "Obliterated",
        color: "#D77BBA",
        threshold: 1,
    },
]
const promotionCosts = [ 0, 25, 35, 50, 80 ]
const cardMilestones = [
    {
        desc: "Reach Base 3",
        tooltip: "Wow! You'll reach Base 2 soon! -10% restock time!",
        req: () => data.ord.base === 3 ||  data.boost.times > 0 || data.collapse.times > 0 || data.obliterate.times > 0,
    },
    {
        desc: "Unlock Challenges",
        tooltip: "Incredible! You're beating the hardest Challenges in the game! -10% restock time!",
        req: () => isTabUnlocked('chal'),
    },
    {
        desc: "Unlock Incrementy",
        tooltip: "Impressive! You're incrementing the Incrementy to increment the Incrementy! -10% restock time!",
        req: () => isTabUnlocked('incrementy'),
    },
    {
        desc: "Unlock Hierarchies",
        tooltip: "Unbelievable! You found some new Ordinals, these will soon surely reach Base 3 as well! -10% restock time!",
        req: () => isTabUnlocked('hierarchies'),
    },
    {
        desc: "Unlock Overflow",
        tooltip: "Wonderful! You found a use for all those Boosters which aren't important for anything but Upgrades! -10% restock time!",
        req: () => isTabUnlocked('overflow'),
    },
    {
        desc: "Complete Sluggish Milestone 34",
        tooltip: "Legendary! You Collapsed your Ordinal and reached the ultimate stage of the game! -10% restock time!",
        req: () => hasSluggishMilestone(0),
    },
    {
        desc: "Complete Sluggish Milestone 12",
        tooltip: "Amazing! No one has ever completed a challenge this hard, this is really the ultimate challenge! -10% restock time!",
        req: () => hasSluggishMilestone(3),
    },
    {
        desc: "Complete Sluggish Milestone 2",
        tooltip: "Stunning! You completed the final ultimate challenge and removed the challenge from Challenges! -10% restock time!",
        req: () => hasSluggishMilestone(4),
    },
    {
        desc: "Unlock Hypercharge and Baselessness",
        tooltip: "Magnificent! You discovered the absolute ultimate challenge of the game as well as the supreme version of Charge! -10% restock time!",
        req: () => isTabUnlocked('hyper'),
    },
    {
        desc: "Unlock Purification",
        tooltip: "Spectacular! You reached the completely absolutely final ultimate challenges of the final layer of the game, and reached the last row of Hypercharge! -10% restock time!",
        req: () => isTabUnlocked('purification'),
    },
    {
        desc: "Obliterate",
        tooltip: "Phenomenal! You Obliterated your Ordinal, reaching the true final layer of the game and achieving the absolute complete and total final ultimate level of your power! -10% restock time!",
        req: () => data.obliterate.times > 0,
    },
]

function updateCardMilestoneUnlockHTML(){
    for (let i = 0; i < cardMilestones.length; i++) {
        DOM(`cardMilestone${i}`).className = cardMilestones[i].req() ? 'completedCardMilestone' : 'cardMilestone'
    }
}

function isCardUnlocked(i, j){
    return data.cards.data[i][j].copies > 0
}
function getCardCopies(i, j){
    return data.cards.data[i][j].copies
}
function getCardQuality(i, j){
    return data.cards.data[i][j].quality
}
function getCardStars(i, j){
    if(!isCardUnlocked(i, j)) return 0
    let copies = getCardCopies(i, j)
    for (let i = 0; i < promotionCosts.length; i++) {
        if(copies < promotionCosts[i]) return i
        copies -= promotionCosts[i]
    }
    return 5
}
function getCardPromotionCost(i, j){
    let cost = 0
    for(let k = 0; k < getCardStars(i, j)+1; k++){
        cost += promotionCosts[k]
    }
    return cost
}

function getCardProduction(i, j){
    if(!isCardUnlocked(i, j)) return 0
    if(getCardStars(i, j) === 1) return 1/(4-i)
    return (getCardStars(i, j) ** (i+1))/(4-i)
}
function getTotalCardProduction(){
    let total = 0
    for (let i = 0; i < cardData.length; i++) {
        for (let j = 0; j < cardData[i].length; j++) {
            if(isCardUnlocked(i, j)) total += getCardProduction(i, j)
        }
    }
    return total
}

function getShopCardCost(shopIndex){
    const rarity = data.cards.shopCards[shopIndex][0]
    const id = data.cards.shopCards[shopIndex][1]

    let scarcityFactor = 1
    for (let i = 0; i < cardData.length; i++) {
        for (let j = 0; j < cardData[i].length; j++) {
            if(isCardUnlocked(i, j)) scarcityFactor += 2
        }
    }
    return (((getCardStars(rarity, id) + 1)*(rarity+1)) ** (rarity + Math.sqrt(getCardCopies(rarity, id)) + 1)) * scarcityFactor * (rarity+1)
}

function getGambleYield(){
    if(data.cards.gambleCard.length === 0) return 0
    const rarity = data.cards.gambleCard[0]
    const id = data.cards.gambleCard[1]
    const star = getCardStars(rarity, id)
    const quality = getCardQuality(rarity, id)
    return ((5*quality) * ((rarity + 1) ** star)) * 2
}

function selectGambleCard(i, j){
    data.cards.gambleCard[0] = i
    data.cards.gambleCard[1] = j
}

function initCardHTML(){
    const milestoneContainer = DOM(`cardMilestoneContainer`)
    for (let i = 0; i < cardMilestones.length; i++){
        const milestone = document.createElement('button')
        milestone.id = `cardMilestone${i}`
        milestone.innerText = `${cardMilestones[i].desc}`
        milestone.setAttribute("tooltip", cardMilestones[i].tooltip)
        milestoneContainer.appendChild(milestone)
    }

    const topCardContainer = DOM(`cardContainer`)
    for (let i = 0; i < cardData.length; i++){
        for (let j = 0; j < cardData[i].length; j++){
            const cardContainer = document.createElement('div')
            cardContainer.className = 'column flexBox cardContainer'
            cardContainer.id = `card${i}${j}`
            cardContainer.style.display = isCardUnlocked(i, j) ? 'block' : 'none'
            cardContainer.onclick = () => selectGambleCard(i, j)

            const card = document.createElement('div')
            card.className = 'card'
            card.style.borderColor = rarityData[i].color

            const img = document.createElement('img')
            img.className = 'cardImage'
            img.src = cardData[i][j].path
            card.appendChild(img)

            const starRow = document.createElement('div')
            starRow.className = 'cardStarRow row flexBox'
            for (let k = 0; k < 5; k++) {
                const star = document.createElement('img')
                star.className = 'cardStar'
                star.id = `card${i}${j}star${k}`
                star.src = 'res/cards/star.png'
                star.style.display = getCardStars(i, j) > k ? 'block' : 'none'
                starRow.appendChild(star)
            }
            card.appendChild(starRow)

            const promotion = document.createElement('button')
            promotion.className = 'cardPromotion'
            promotion.id = `cardPromotion${i}${j}`
            promotion.style.borderColor = rarityData[i].color

            cardContainer.appendChild(card)
            cardContainer.appendChild(promotion)
            topCardContainer.appendChild(cardContainer)
        }
    }

    const shopContainer = DOM(`cardShopContainer`)
    for (let i = 0; i < defaultCardShopData.length; i++) {
        const cardContainer = document.createElement('div')
        cardContainer.className = 'column flexBox cardContainer'
        cardContainer.id = `shopCard${i}`
        cardContainer.onclick = () => buyShopCard(i)
        cardContainer.style.cursor = 'pointer'

        const card = document.createElement('div')
        card.className = 'card'
        card.id = `shopCardCard${i}`
        card.style.borderColor = rarityData[data.cards.shopCards[i][0]].color
        cardContainer.appendChild(card)

        const img = document.createElement('img')
        img.className = 'cardImage'
        img.id = `shopCardImg${i}`
        img.src = cardData[data.cards.shopCards[i][0]][data.cards.shopCards[i][1]].path
        card.appendChild(img)

        const desc = document.createElement('button')
        desc.className = 'cardPromotion'
        desc.id = `shopCardDesc${i}`
        desc.style.borderColor = rarityData[data.cards.shopCards[i][0]].color
        cardContainer.appendChild(desc)

        shopContainer.appendChild(cardContainer)
    }

    updateCardMilestoneUnlockHTML()
    updateCardsToggleHTML()
}

function updateShopCardHTML(i){
    const rarity = data.cards.shopCards[i][0]
    const id = data.cards.shopCards[i][1]

    const card = DOM(`shopCardCard${i}`)
    card.style.borderColor = rarityData[rarity].color

    const img = DOM(`shopCardImg${i}`)
    img.src = cardData[rarity][id].path

    const desc = DOM(`shopCardDesc${i}`)
    desc.style.borderColor = rarityData[rarity].color
}

function updateGambleCardHTML(){
    const rarity = data.cards.gambleCard[0] || 0
    const id = data.cards.gambleCard[1] || 0

    const card = DOM(`gambleCard`)
    card.style.borderColor = rarityData[rarity].color

    const img = DOM(`gambleCardImg`)
    img.src = data.cards.gambleCard.length > 0 ? cardData[rarity][id].path : ''

    const desc = DOM(`gambleCardDesc`)
    desc.style.borderColor = rarityData[rarity].color
    desc.style.fontSize = '0.8rem'

    desc.innerHTML = data.cards.gambleCard.length > 0
        ? `<span style="color: ${rarityData[rarity].color}"><b>${rarityData[rarity].name}</b> ${getCardStars(rarity, id)}★ ${cardData[rarity][id].name}</span><br><span style="font-size: 0.8rem">You own ${getCardCopies(rarity, id)} Copies</span></span><br><span style="font-size: 0.6rem">Click another Card to re-select</span>`
        : `Click a ${formatOrdinalCards()} Card in your collection to queue it for Investment!`

    const qualityText = getCardQuality(rarity, id) > 1 ? `<br>Your yields are boosted by the Card's Quality of ${getCardQuality(rarity, id)}!` : ''
    DOM(`cardGambleButton`).innerHTML = `Your chosen ${formatOrdinalCards()} Card allows for:<br>a $ gain of <span style="color: #2da000">+${1.5*getGambleYield()}%</span><br>a $ loss of <span style="color: #ce0b0b">-${getGambleYield()}%</span>${qualityText}<br><span style="font-size: 0.8rem">Like with all markets, your odds are 50/50!</span><br><br><span style="color: #2da000; font-size: 0.7rem">A gain will grant you 5 Copies of your Card, on the house!<br>A gain will also increase your Card's Quality!</span><br><span style="color: #ce0b0b; font-size: 0.7rem">A loss will cost you 25 Copies of your Card!</span>`
}

function updateCardHTML(){
    for (let i = 0; i < cardData.length; i++) {
        for (let j = 0; j < cardData[i].length; j++) {
            DOM(`card${i}${j}`).style.display = isCardUnlocked(i, j) ? 'block' : 'none'
            for (let k = 0; k < 5; k++) {
                DOM(`card${i}${j}star${k}`).style.display = getCardStars(i, j) > k ? 'block' : 'none'
            }
            if(isCardUnlocked(i, j)){
                const rarityText = `<span style="color: ${rarityData[i].color}"><b>${rarityData[i].name}</b> ${cardData[i][j].name}`
                const promotionText = getCardStars(i, j) < 5
                    ? `${getCardCopies(i, j)} / ${getCardPromotionCost(i, j)} Copies`
                    : `MAXED`
                const productionText = `Making ${format(getCardProduction(i, j))} $/s`
                const qualityText = getCardQuality(i, j) > 1 ? `<br>Quality: ${getCardQuality(i, j)}` : ''
                DOM(`cardPromotion${i}${j}`).innerHTML = `${rarityText}<br>${promotionText}<br>${productionText}${qualityText}`
            }
        }
    }
}

function updateCardShopHTML(){
    DOM(`cardsMoneyText`).innerHTML = `You are making <b>$${format(getTotalCardProduction())}/s</b> and have <b>$${format(data.cards.money)}</b> in the Bank (0.01% Yearly Interest!)!`
    DOM(`cardsMoneyText2`).innerHTML = `You are making <b>$${format(getTotalCardProduction())}/s</b> and have <b>$${format(data.cards.money)}</b> in the Bank (0.01% Yearly Interest!)!`
    DOM(`cardShopResetText`).innerText = `The Shop will reset its offers in ${formatTime(cardShopSeconds - data.cards.shopTimer)}`
    for (let i = 0; i < defaultCardShopData.length; i++) {
        const rarity = data.cards.shopCards[i][0]
        const id = data.cards.shopCards[i][1]
        const rarityText = `<span style="color: ${rarityData[rarity].color}"><b>${rarityData[rarity].name}</b> ${cardData[rarity][id].name}`
        DOM(`shopCardDesc${i}`).innerHTML = `${rarityText}<br>Costs $${format(getShopCardCost(i))}`
    }
}

function getCardMilestoneCompletions(){
    let milestones = 0
    for(let i=0; i < cardMilestones.length; i++){
        if(cardMilestones[i].req()) milestones++
    }
    return milestones
}

function getCardPackSeconds(){
    let seconds = 86400
    for (let i = 0; i < getCardMilestoneCompletions(); i++) {
        seconds -= seconds * 0.1
    }
    return seconds
}

function getRandomCard(oldRarity = null, oldID = null){
    const rarityRoll = getRandom(1, 101)
    let rarity = 0
    for (let i = rarityData.length-1; i > 0; i--) { // Don't need to check Normal, it's the default
        if(rarityRoll <= rarityData[i].threshold){
            rarity = i
            break
        }
    }
    let id = getRandom(0, cardData[rarity].length)

    if(oldRarity && oldID && oldRarity === rarity && oldID === id) return getRandomCard(oldRarity, oldID)
    if(getCardCopies(rarity, id) === 190) return getRandomCard(oldRarity, oldID)
    return { rarity: rarity, id: id }
}

function canOpenCardPack(){
    return data.cards.timer >= getCardPackSeconds()
}
function openCardPack(){
    if(!canOpenCardPack()){
        createNotification(`${formatOrdinalCards()} apologizes, but your pack is not yet ready.`)
        return
    }
    data.cards.timer = 0

    const card = getRandomCard()
    data.cards.data[card.rarity][card.id].copies += 1
    createNotification(`You got a ${rarityData[card.rarity].name} ${cardData[card.rarity][card.id].name}`) // TODO
}

function pickNewShopCard(i, oldRarity, oldID){
    const newCard = getRandomCard(oldRarity, oldID)
    data.cards.shopCards[i][0] = newCard.rarity
    data.cards.shopCards[i][1] = newCard.id

    updateShopCardHTML(i)
}
function buyShopCard(i){
    if(data.cards.money < getShopCardCost(i)) return
    data.cards.money -= getShopCardCost(i)

    const rarity = data.cards.shopCards[i][0]
    const id = data.cards.shopCards[i][1]
    data.cards.data[rarity][id].copies++
    createNotification(`Thank you for your purchase! Lucky for you, ${formatOrdinalCards()} has already restocked the Shop!`)

    pickNewShopCard(i, rarity, id)
}

function resetCardShop(){
    data.cards.shopTimer = 0
    for (let i = 0; i < defaultCardShopData.length; i++) {
        const oldRarity = data.cards.shopCards[i][0]
        const oldID = data.cards.shopCards[i][1]
        pickNewShopCard(i, oldRarity, oldID)
    }
    createNotification(`The ${formatOrdinalCards()} Shop has new offers!`)
}

function changeCardCopies(i, j, amount){
    data.cards.data[i][j].copies = Math.max(0, data.cards.data[i][j].copies + amount)
}
function gambleCard(){
    if(data.cards.gambleCard.length < 0) return
    const rarity = data.cards.gambleCard[0]
    const id = data.cards.gambleCard[1]

    const isUp = getRandom(0, 2) === 0
    const copyChange = isUp ? 5 : -25
    const upFactor = isUp ? 1.5 : 1
    const effectiveYield = upFactor*getGambleYield()

    data.cards.money = Math.max(0, changeByPercentage(data.cards.money, effectiveYield, isUp))

    if(isUp) data.cards.data[rarity][id].quality++
    changeCardCopies(rarity, id, copyChange)

    if(!isCardUnlocked(rarity, id)) data.cards.gambleCard = []

    const text = isUp
        ? `The ${formatOrdinalCards()} Investment Center has increased your $ by <span style="color: #2da000">${effectiveYield}%</span!`
        : `Unfortunately, the Markets went down. Your $ was decreased by <span style="color: #ce0b0b">-${effectiveYield}%</span>, and you lost 25 Copies.`
    createNotification(text)
}

function formatOrdinalCards(){
    const style = `
    background-image: linear-gradient(90deg, var(--ordinal-color-one), var(--ordinal-color-two), var(--ordinal-color-three));
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;`
    return `<span style="${style}">Ordinal Cards™</span>`
}
function updateCardsHTML(){
    const openText = canOpenCardPack() ? `<b>Open an ${formatOrdinalCards()} pack!</b>` : 'Sorry, your pack isn\'t ready yet.'
    const timerText = canOpenCardPack() ? 'NOW!' : `in ${formatTime(getCardPackSeconds()-data.cards.timer)}`
    DOM(`openPack`).innerHTML = `<span style="font-size: 1.2rem">${openText}</span><br><br>We restock our ${formatOrdinalCards()} packs every ${formatTime(getCardPackSeconds())}, which means you can open one ${timerText}<br>Make sure you visit the ${formatOrdinalCards()} Shop below your collection when packs aren't available!<br>Completing any of the listed Milestones reduces the ${formatOrdinalCards()} restock time by 10%!</span>`

    updateCardMilestoneUnlockHTML()
    updateCardHTML()
    updateCardShopHTML()
    updateGambleCardHTML()
}

function cardsToggle() {
    data.cards.enabled = !data.cards.enabled
    updateCardsToggleHTML()
}
function updateCardsToggleHTML(){
    updateCardsNavVisibility()
    const color = data.cards.enabled
        ? getCSSVariable('setting-on-text-color')
        : getCSSVariable('setting-off-text-color')
    DOM(`cardsToggle`).innerHTML = `Display the ${formatOrdinalCards()} tab <span style="color: ${color}">[${formatBool(data.cards.enabled)}]</span>`
}
function updateCardsNavVisibility(){
    DOM('cardsNavLayer').style.display = data.cards.enabled ? '' : 'none'
}