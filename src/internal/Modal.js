function createAlert(a,b,c) {
    DOM('alertContainer').style.border = `4px solid gray`
    DOM('alertTitle').innerText = a
    DOM('alertContent').innerText = b
    DOM('closeAlert').innerText = c
    DOM('alert').style.display = 'block'
    DOM('alertContainer').style.display = 'block'
}

function createPrompt(a,b,c='') {
    DOM('promptInput').value = ''
    DOM('promptContainer').style.border = "4px solid whitesmoke"
    DOM('promptTitle').innerText = a
    DOM('promptDesc').innerText = c
    DOM('prompt').style.display = 'block'
    DOM('promptContainer').style.display = 'block'
    switch(b) {
        case 0:
            document.getElementById('promptButton').addEventListener('click', () => { importSave() })
            break
    }
}
function createConfirmation(a,b,c,d,e) {
    let old_element = document.getElementById("yesConfirm");
    let new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
    old_element = document.getElementById("noConfirm");
    new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
    document.getElementById('confirmContainer').style.border = `4px solid gray`
    document.getElementById('confirmTitle').innerText = b
    document.getElementById('confirmContent').innerText = c
    document.getElementById('noConfirm').innerText = d
    document.getElementById('yesConfirm').innerText = e
    switch(a) {
        case 0:
            document.getElementById('confirm').style.display = 'block'
            document.getElementById('confirmContainer').style.display = 'block'
            document.getElementById('noConfirm').addEventListener('click', () => {closeModal(2)})
            document.getElementById('yesConfirm').addEventListener('click', () => {fullReset();closeModal(2)})
        case 1:
            document.getElementById('confirm').style.display = 'block'
            document.getElementById('confirmContainer').style.display = 'block'
            document.getElementById('noConfirm').addEventListener('click', () => {closeModal(2)})
            document.getElementById('yesConfirm').addEventListener('click', () => {factorShift();closeModal(2)})
    }
}
function closeModal(i) {
    switch (i) {
        case 0:
            document.getElementById('alertContainer').style.display = 'none'
            document.getElementById('alert').style.display = 'none'
            break
        case 1:
            document.getElementById('promptContainer').style.display = 'none'
            document.getElementById('prompt').style.display = 'none'
            break
        case 2:
            document.getElementById('confirm').style.display = 'none'
            document.getElementById('confirmContainer').style.display = 'none'
            break
    }
}