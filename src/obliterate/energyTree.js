const treeConnections = new vis.DataSet([
    { from: 0, to: 101 },
    { from: 0, to: 101 },
    { from: 101, to: 102 },
    { from: 102, to: 103 },
    { from: 103, to: 104 },
    { from: 104, to: 105 },
    { from: 105, to: 106 },
    { from: 105, to: 107 },

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
])

function loadTreeNodes(){
    let nodeArray = [{ id: 0, label: "" }]
    for (let i = 1; i < energyUpgradeData.length; i++) {
        for (let j = 0; j < energyUpgradeData[i].length; j++) {
            nodeArray.push({
                id: getEUPID(i, j),
                label: getEUPIDString(i, j)
            })
        }
    }
    return new vis.DataSet(nodeArray)
}

const treeContainer = DOM("energyTree")

const treeData = {
    nodes: loadTreeNodes(),
    edges: treeConnections,
}

const treeOptions = {
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
    edges: {
        arrows: {
            to: {
                enabled: true,
                scaleFactor: 1,
                type: "arrow"
            },
        }
    },
    interaction: {hover: true}
}

let hasDrawnTree = false
function drawTree(){
    new vis.Network(treeContainer, treeData, treeOptions)
        .on('hoverNode', function (properties){
            try{
                updateEUPDescriptionHTML(properties.node)
            }
            catch (e) {}
        })
        .on( 'click', function(properties) {
            try {
                let treeNode = treeData.nodes.get(properties.nodes)[0]
                let nodeID = treeNode.id

                let fixedIds = getDataIDFromTreeID(nodeID)
                let eup = energyUpgradeData[fixedIds[0]][fixedIds[1]]

                if(hasTreeUpgrade(nodeID) || eup.cost > data.obliterate.energy || !canPurchaseTreeUpgrade(nodeID, fixedIds)) return
                purchaseEUP(nodeID, eup)
                updateEUPDescriptionHTML(nodeID)
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
    let node = treeData.nodes.get(id)
    node.color = hasTreeUpgrade(id) && !forceFalse ? '#996cdc' : '#615a6c'
    treeData.nodes.update(node)
}

let hasTreeUpgrade = (id) => data.obliterate.energyUpgrades.includes(id)
function canPurchaseTreeUpgrade(nodeID, dataIDs){
    if(nodeID === 0) return true
    if(dataIDs[1] === 0) return hasTreeUpgrade(0)

    const requiredUpgradeID = getEUPNodeRequirement(nodeID, dataIDs)
    return hasTreeUpgrade(requiredUpgradeID) && isEUPExtraReqSatisfied(dataIDs[0], dataIDs[1])
}

function getDataIDFromTreeID(id){
    if(id === 0) return [0, 0]

    let split = splitAt(1, id.toString())
    let branch = parseInt(split[0])
    let index = parseInt(split[1]) - 1

    return [branch, index]
}

function energyRespecConfirm(){
    if(!getSimpleSetting('eupRespecConfirmation')) return respecEnergyTree()
    createConfirmation('Are you certain?', 'This will force an Obliteration reset!', 'Nope!', 'Yeah', respecEnergyTree)
}
function respecEnergyTree(){
    loadNodeColors(true)

    let total = getTotalEnergyInvested() + data.obliterate.energy > data.obliterate.energy ? getTotalEnergyInvested() + data.obliterate.energy : data.obliterate.energy
    data.obliterate.energyUpgrades = []
    data.obliterate.energy = total

    obliterateReset()
}