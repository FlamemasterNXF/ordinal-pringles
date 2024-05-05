let pringleData = [
    {
        desc: ''
    }
]

function initPringleAlchemy(){
    let canvas = DOM('pringleCanvas')
    let context = canvas.getContext('2d')

    // Draw the Top Left Circle
    context.moveTo(0, 0)
    context.line
    context.strokeStyle = `#ffffff`
    context.beginPath();
    context.arc(150, 145, 140, 0, 2 * Math.PI);
    context.stroke();

    // Draw the Bottom Left Circle
    context.moveTo(0, 600)
    context.line
    context.strokeStyle = `#ffffff`
    context.beginPath();
    context.arc(150, 455, 140, 0, 2 * Math.PI);
    context.stroke();

    // Draw the Top Right Circle
    context.moveTo(1000, 0)
    context.line
    context.strokeStyle = `#ffffff`
    context.beginPath();
    context.arc(850, 145, 140, 0, 2 * Math.PI);
    context.stroke();

    // Draw the Bottom Left Circle
    context.moveTo(1000, 600)
    context.line
    context.strokeStyle = `#ffffff`
    context.beginPath();
    context.arc(850, 455, 140, 0, 2 * Math.PI);
    context.stroke();

    // Draw the Center Circle
    context.moveTo(500, 300)
    context.line
    context.strokeStyle = `#ffffff`
    context.beginPath();
    context.arc(500, 300, 240, 0, 2 * Math.PI);
    context.stroke();
}