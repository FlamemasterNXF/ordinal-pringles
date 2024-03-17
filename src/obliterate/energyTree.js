let treeNodes = new vis.DataSet([
    { id: 0, label: "" },
    { id: 101, label: "101" },
    { id: 201, label: "201" },
    { id: 301, label: "301" },
    { id: 401, label: "401" },
    { id: 501, label: "501" },
])

let treeEdges = new vis.DataSet([
    { from: 0, to: 101 },
    { from: 0, to: 201 },
    { from: 0, to: 301 },
    { from: 0, to: 401 },
    { from: 0, to: 501 },
])

// create a network
let treeContainer = DOM("energyTree")
let treeData = {
    nodes: treeNodes,
    edges: treeEdges,
}
let treeOptions = {
    nodes: {
        'color' : '#996cdc',
        'shape' : 'circle',
        'size' : 30,
        'borderWidth' : 2,
        'borderWidthSelected' : 3,
    },
}
let hasDrawnTree = false
function drawTree(){
    new vis.Network(treeContainer, treeData, treeOptions).on( 'click', function(properties) {
        try {
            let id = treeNodes.get(properties.nodes)[0].id
            console.log(id);
        }
        catch (e) {}
    });
    hasDrawnTree = true
}
