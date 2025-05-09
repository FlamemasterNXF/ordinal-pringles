const controls = {
    "s": { pressed: false },
    "m": { pressed: false },
    "i": { pressed: false },
    "f": { pressed: false },
    "h": { pressed: false },
    "b": { pressed: false },
    "c": { pressed: false }
}
document.addEventListener('keydown', (event) => {
    if(event.ctrlKey || event.altKey) return

    const key = event.key
    const uppercase = event.key.toUpperCase()
    if ((controls[key] || controls[uppercase]) && !isModalOpen('prompt')) {
        controls[key].pressed = true
    }
}, false);
document.addEventListener('keyup', (event) => {
    const key = event.key
    const uppercase = event.key.toUpperCase()
    if (controls[key] || controls[uppercase]) {
        controls[key].pressed = false
    }
}, false);
