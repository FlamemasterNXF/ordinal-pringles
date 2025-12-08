const graphColors = {
    // Ordinal
    ordinal: '#CD5C5CFF',

    // Markup
    factor: '#CDA05CFF',
    autoclicker: '#FF4500FF',
    dynamic: '#a27500',
    factorShift: '#d7b45d',

    // Boosters
    autobuyer: '#8080FF',
    bup: '#0537cc',
    chargedBUP: '#DAA520FF',
    challenge: '#ffe99c',
    decrementy: 'rgba(101,101,143,0.92)',
    incrementy: '#3684f3',
    hierarchy: '#8082ff',
    overflow: '#00FFFFFF',

    // Collapse
    cardinal: '#20da45',
    baseless: '#aa6000',
    hypercharge: '#b2c503',
    purification: '#bb3856',

    // Obliteration
    energyTree: '#d56cdc',
    passiveEnergy: '#be89cc',
    pringle: '#b400b3',
    purity: '#745c88',
    stability: '#7634ff',

    // Default
    default: '#FFFFFF'
}

function buildBoostGraph(){
    const boosts = boostManager.getBoostData()
    const nodes = new Map()
    const edges = []

    for (const boost of boosts) {
        if (!nodes.has(boost.name)) {
            nodes.set(boost.name, {
                id: boost.name,
                label: boost.name,
                color: boost.color ?? graphColors.default
            })
        }
    }

    for (const boost of boosts) {
        if (!boost.target) continue

        const targets = Array.isArray(boost.target) ? boost.target : [boost.target]

        for (const target of targets) {

            if (!nodes.has(target)) {
                nodes.set(target, {
                    id: target,
                    label: target,
                    color: graphColors.default
                })
            }

            edges.push({
                id: `${boost.name}-${target}`,
                from: boost.name,
                to: target,
                label: boost.effect ? formatEffect(boost.effect, boost.sign) : "",
                color: boost.color ?? graphColors.default
            })
        }
    }

    return {
        nodes: Array.from(nodes.values()),
        edges
    }
}

let boostGraphNodes // exposed so that updateBoostGraph() can use it
let boostGraphEdges // exposed so that updateBoostGraph() can use it
function initBoostGraph(){
    const container = document.getElementById('graphNetwork')
    const graphData = buildBoostGraph()
    boostGraphEdges = new vis.DataSet(graphData.edges)
    boostGraphNodes = new vis.DataSet(graphData.nodes)

    const network = new vis.Network(container, { nodes: boostGraphNodes, edges: boostGraphEdges }, {
        layout: {
            improvedLayout: false
        },
        physics: false,
        nodes: {
            size: 24,
            borderWidth : 2,
            borderWidthSelected : 3,
        },
        edges: {
            color: "#aaa",
            font: {
                color: "#eee",
                size: 14,
                background: "#000000",
                strokeWidth: 0,
                align: "top",
                vadjust: -10
            },

            arrows: {
                to: {
                    enabled: true,
                    scaleFactor: 1,
                    type: "arrow"
                },
            }
        },
        interaction: {
            hover: true,
            selectable: false,
            selectConnectedEdges: false
        }
    })
    network.moveTo({
        scale: 0.25
    })
    network.setOptions({
        physics: {
            enabled: true,
            solver: "forceAtlas2Based",
            forceAtlas2Based: {
                centralGravity: 0.007,
            }
        }
    })
}

function updateBoostGraph() {
    const workingEdges = boostGraphEdges.get()
    const updateNodes = []
    const updateEdges = []

    boostManager.getBoostData().forEach(boost => {
        if (boost.shouldDisplay === undefined) return

        const shouldDisplay = boost.shouldDisplay()
        const node = boostGraphNodes.get(boost.name)
        const relevantEdges = workingEdges.filter(edge => edge.from === boost.name)

        if(shouldDisplay){
            const labelUpdate = boost.effect ? formatEffect(boost.effect, boost.sign) : ""

            if (node.hidden !== !shouldDisplay){
                for (const edge of relevantEdges){
                    if(edge.label !== labelUpdate) updateEdges.push({id: edge.id, label: labelUpdate, hidden: !shouldDisplay})
                    else updateEdges.push({id: edge.id, hidden: !shouldDisplay})
                }
                updateNodes.push({id: boost.name, hidden: !shouldDisplay})
            }
            else{
                for (const edge of relevantEdges){
                    if(edge.label !== labelUpdate) updateEdges.push({id: edge.id, label: labelUpdate, hidden: !shouldDisplay})
                }
            }
        }
        else if (node.hidden !== !shouldDisplay){
            for (const edge of relevantEdges) updateEdges.push({id: edge.id, hidden: !shouldDisplay})
            updateNodes.push({id: boost.name, hidden: !shouldDisplay})
        }
    })

    if (updateNodes.length > 0) boostGraphNodes.update(updateNodes)
    if (updateEdges.length > 0) boostGraphEdges.update(updateEdges)
}