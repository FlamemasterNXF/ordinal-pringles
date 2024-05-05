function initPurityPlane(){
    let canvas = DOM('purityCanvas')
    let context = canvas.getContext('2d')

    // Draw the Initial Plane
    context.moveTo(0, 0)
    context.line
    context.strokeStyle = `#ffffff`
    context.strokeRect(0, 275, 550, 0);
    context.strokeRect(275, 0, 0, 550);

    // Draw the Points
    let containers = [
        DOM('ppYContainer'),
        DOM('ppXContainer0'),
        DOM('ppXContainer1'),
    ]
    for (let i = 0; i < 9; i++) {
        let point = document.createElement('div')
        point.className = 'purityPoint'
        point.id = `ppY${i}`
        point.style.marginTop = i > 0 ? `2.35rem` : `-0.5rem`
        containers[0].append(point)
    }
    for (let i = 0; i < 4; i++) {
        let point = document.createElement('div')
        point.className = 'purityPoint'
        point.id = `ppX${i}`
        point.style.marginBottom = '0.5rem'
        point.style.marginLeft = i > 0 ? '2.35rem' : '0rem'
        containers[1].append(point)
    }
    for (let i = 0; i < 4; i++) {
        let point = document.createElement('div')
        point.className = 'purityPoint'
        point.id = `ppX${i}`
        point.style.marginBottom = '0.5rem'
        point.style.marginLeft = i > 0 ? '2.35rem' : '0rem'
        containers[2].append(point)
    }
}