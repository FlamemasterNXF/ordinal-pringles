let treeNodes = new vis.DataSet([
    { id: 0, label: "" },
    { id: 101, label: "101" },
    { id: 102, label: "102" },
    { id: 103, label: "103" },
    { id: 104, label: "104" },
    { id: 105, label: "105" },
    { id: 106, label: "106" },
    { id: 107, label: "107" },
    { id: 108, label: "108" },

    { id: 201, label: "201" },
    { id: 202, label: "202" },
    { id: 203, label: "203" },
    { id: 204, label: "204" },
    { id: 205, label: "205" },

    { id: 301, label: "301" },
    { id: 302, label: "302" },
    { id: 303, label: "303" },
    { id: 304, label: "304" },
    { id: 305, label: "305" },
    { id: 306, label: "306" },
    { id: 307, label: "307" },
    { id: 308, label: "308" },

    { id: 401, label: "401" },
    { id: 402, label: "402" },
    { id: 403, label: "403" },
    { id: 404, label: "404" },
    { id: 405, label: "405" },
    { id: 406, label: "406" },
    { id: 407, label: "407" },
    { id: 408, label: "408" },
    { id: 409, label: "409" },

    { id: 501, label: "501" },
    { id: 502, label: "502" },
    { id: 503, label: "503" },
    { id: 504, label: "504" },
    { id: 505, label: "505" },
    { id: 506, label: "506" },
    { id: 507, label: "507" },
    { id: 508, label: "508" },
])

let treeEdges = new vis.DataSet([
    { from: 0, to: 101 },
    { from: 101, to: 102 },
    { from: 102, to: 103 },
    { from: 103, to: 104 },
    { from: 104, to: 105 },
    { from: 105, to: 106 },
    { from: 106, to: 107 },
    { from: 107, to: 108 },

    { from: 0, to: 201 },
    { from: 201, to: 202 },
    { from: 202, to: 203 },
    { from: 203, to: 204 },
    { from: 204, to: 205 },

    { from: 0, to: 301 },
    { from: 301, to: 302 },
    { from: 302, to: 303 },
    { from: 303, to: 304 },
    { from: 304, to: 305 },
    { from: 305, to: 306 },
    { from: 306, to: 307 },
    { from: 307, to: 308 },

    { from: 0, to: 401 },
    { from: 401, to: 402 },
    { from: 402, to: 403 },
    { from: 403, to: 404 },
    { from: 404, to: 405 },
    { from: 405, to: 406 },
    { from: 406, to: 407 },
    { from: 407, to: 408 },
    { from: 408, to: 409 },

    { from: 0, to: 501 },
    { from: 501, to: 502 },
    { from: 502, to: 503 },
    { from: 503, to: 504 },
    { from: 504, to: 505 },
    { from: 505, to: 506 },
    { from: 506, to: 507 },
    { from: 507, to: 508 },
])

// create a network
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
        'color' : '#996cdc',
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
    DOM(`energyTreeText`).innerHTML = `<span style="color: #4a4a4a">Upgrade ${id}:</span> <span style="color: #b06cdc">${node.desc}</span><br>${hasTreeUpgrade(id) ? `<span style="color: #dc6cc6"> Activated!` : canPurchaseTreeUpgrade(id, node) ? `<span style="color: #6c6c6c">Can be Activated for</span> <span style="color: #d56cdc">${node.cost} Fractal Energy</span>` : `<span style="color: #ab003d">You must first Activate Upgrade ${getLowerTreeNodeString(id)}${node.hasExtraReq ? node.extraReqText : ''}</span>`}`
}

function purchaseTreeUpgrade(id, node){
    data.obliterate.energy -= node.cost
    data.obliterate.energyUpgrades.push(id)
}
