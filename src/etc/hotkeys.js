const controls = {
    "s": { pressed: false },
    "m": { pressed: false },
    "i": { pressed: false },
    "f": { pressed: false },
    "h": { pressed: false }
}
document.addEventListener('keydown', (event) => {
    let key = event.key;
    if (controls[key]) {
        controls[key].pressed = true;
    }
}, false);
document.addEventListener('keyup', (event) => {
    let key = event.key;
    if (controls[key]) {
        controls[key].pressed = false;
    }
}, false);
