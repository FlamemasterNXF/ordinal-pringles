let treeNodes = new vis.DataSet([
    { id: 0, label: "" },

    { id: 101, label: "101" },
    { id: 102, label: "102" },
    { id: 103, label: "103" },
    { id: 104, label: "104" },
    { id: 105, label: "105" },
    { id: 106, label: "106" },

    { id: 201, label: "201" },
    { id: 202, label: "202" },
    { id: 203, label: "203" },
    { id: 204, label: "204" },
    { id: 205, label: "205" },
    { id: 206, label: "206" },
    { id: 207, label: "207" },
    { id: 208, label: "208" },
    { id: 209, label: "209" },

    { id: 301, label: "301" },
    { id: 302, label: "302" },
    { id: 303, label: "303" },
    { id: 304, label: "304" },
    { id: 305, label: "305" },

    { id: 401, label: "401" },
    { id: 402, label: "402" },
])

let treeEdges = new vis.DataSet([
    { from: 0, to: 101 },
    { from: 0, to: 101 },
    { from: 101, to: 102 },
    { from: 102, to: 103 },
    { from: 103, to: 104 },
    { from: 104, to: 105 },
    { from: 105, to: 106 },

    { from: 0, to: 201 },
    { from: 0, to: 201 },
    { from: 201, to: 202 },
    { from: 202, to: 203 },
    { from: 203, to: 204 },
    { from: 204, to: 205 },
    { from: 205, to: 206 },
    { from: 206, to: 207 },
    { from: 207, to: 208 },
    { from: 208, to: 209 },

    { from: 0, to: 301 },
    { from: 0, to: 301 },
    { from: 301, to: 302 },
    { from: 302, to: 303 },
    { from: 303, to: 304 },
    { from: 304, to: 305 },

    { from: 0, to: 401 },
    { from: 0, to: 401 },
    { from: 401, to: 402 },
])

let treeContainer = DOM("energyTree")
let treeData = {
    nodes: treeNodes,
    edges: treeEdges,
}
let treeOptions = {
    nodes: {
        'font' : {
            'color' : 'black'
        },
        'color' : '#615a6c',
        'shape' : 'circle',
        'size' : 30,
        'borderWidth' : 2,
        'borderWidthSelected' : 3,
    },
    interaction: {hover: true}
}
let hasDrawnTree = false
function drawTree(){
    new vis.Network(treeContainer, treeData, treeOptions)
        .on('hoverNode', function (properties){
            try{
                updateEnergyTreeText(properties.node)
            }
            catch (e) {}
        })
        .on( 'click', function(properties) {
            try {
                let treeNode = treeNodes.get(properties.nodes)[0]
                let id = treeNode.id

                let fixedIds = getFixedTreeNode(id)
                let node = energyUpgradeData[fixedIds[0]][fixedIds[1]]

                if(hasTreeUpgrade(id) || node.cost > data.obliterate.energy || !canPurchaseTreeUpgrade(id, node)) return
                purchaseTreeUpgrade(id, node)
                updateEnergyTreeText(id)
            }
            catch (e) {}
        })

    hasDrawnTree = true
    loadNodeColors()
}

function loadNodeColors(respec = false){
    for (let i = 0; i < data.obliterate.energyUpgrades.length; i++) {
        setNodeColor(data.obliterate.energyUpgrades[i], respec)
    }
}
function setNodeColor(id, forceFalse = false){
    let node = treeNodes.get(id)
    node.color = hasTreeUpgrade(id) && !forceFalse ? '#996cdc' : '#615a6c'
    treeNodes.update(node)
}

let hasTreeUpgrade = (id) => data.obliterate.energyUpgrades.includes(id)
function canPurchaseTreeUpgrade(id, node){
    if(node.hasExtraReq && !node.extraReq) return false
    if(id === 0) return true
    if(id.toString().charAt(1) === '0' && id.toString().charAt(2) === '1') return hasTreeUpgrade(0)
    return hasTreeUpgrade(id-1)
}
function getFixedTreeNode(id){
    if(id === 0) return [0, 0]

    let split = splitAt(1, id.toString())
    let branch = parseInt(split[0])
    let index = parseInt(split[1]) - 1

    return [branch, index]
}
function getLowerTreeNodeString(id){
    if(id === 0) return 0
    if(id.toString().charAt(1) === '0' && id.toString().charAt(2) === '1') return 0

    return id-1
}

function updateEnergyTreeText(id){
    let identifiers = getFixedTreeNode(id)
    let node = energyUpgradeData[identifiers[0]][identifiers[1]]
    DOM(`energyTreeText`).innerHTML = `<span style="color: #4a4a4a">Upgrade ${id}:</span> <span style="color: #b06cdc">${node.desc}</span><br>${hasTreeUpgrade(id) ? energyUpgradeData[identifiers[0]][identifiers[1]].isUnlock ? `<span style="color: #dc6cc6"> Unlocked!` : `<span style="color: #dc6cc6"> Currently: ${node.sign !== 'x' ? `${node.sign}${format(getEUPEffect(identifiers[0], identifiers[1]))}` : `${format(getEUPEffect(identifiers[0], identifiers[1]))}${node.sign}`}` : canPurchaseTreeUpgrade(id, node) ? `<span style="color: #6c6c6c">Can be Activated for</span> <span style="color: #d56cdc">${node.cost} Fractal Energy</span>` : `<span style="color: #ab003d">You must first Activate Upgrade ${getLowerTreeNodeString(id)}${node.hasExtraReq ? node.extraReqText : ''}</span>`}`
}

function purchaseTreeUpgrade(id, node){
    data.obliterate.energy -= node.cost
    data.obliterate.energyUpgrades.push(id)
    if(data.obliterate.passiveEnergy + getTotalPassiveEnergyInvested() < getTotalEnergyInvested(true)) data.obliterate.passiveEnergy += node.cost
    setNodeColor(id)
}

function energyRespecConfirm(){
    if(!data.sToggles[16]) return respecEnergyTree()
    createConfirmation('Are you certain?', 'This will force an Obliteration reset!', 'Nope!', 'Yeah', respecEnergyTree)
}
function respecEnergyTree(){
    loadNodeColors(true)

    let total = getTotalEnergyInvested() + data.obliterate.energy > data.obliterate.energy ? getTotalEnergyInvested() + data.obliterate.energy : data.obliterate.energy
    data.obliterate.energyUpgrades = []
    data.obliterate.energy = total

    obliterateReset()
}
function getTotalEnergyInvested(forPassive = false){
    let total = 0
    for (let i = 0; i < data.obliterate.energyUpgrades.length; i++) {
        let ids = getFixedTreeNode(data.obliterate.energyUpgrades[i])
        total += energyUpgradeData[ids[0]][ids[1]].cost
    }
    if (forPassive) total += (data.purity.isUnlocked.slice(0,10).filter(i=>i).length - 2)
    return total
}
