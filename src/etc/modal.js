function createAlert(name,desc,close) {
    DOM('alertTitle').innerHTML = name
    DOM('alertContent').innerHTML = desc
    DOM('closeAlert').innerHTML = close
    DOM('alert').style.display = 'block'
    DOM('alertContainer').style.display = 'block'
}

function createPrompt(name,func,useInput,desc='') {
    DOM('promptInput').value = ''
    DOM('promptTitle').innerText = name
    DOM('promptDesc').innerText = desc
    DOM('prompt').style.display = 'block'
    DOM('promptContainer').style.display = 'block'
    useInput?DOM('promptButton').addEventListener('click', ()=> func(DOM('promptInput').value)):DOM('promptButton').addEventListener('click', ()=> func())
}
function createConfirmation(name,desc,no,yes,func,arg) {
    let old_element = document.getElementById("yesConfirm");
    let new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
    old_element = document.getElementById("noConfirm");
    new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
    document.getElementById('confirmTitle').innerText = name
    document.getElementById('confirmContent').innerText = desc
    document.getElementById('noConfirm').innerText = no
    document.getElementById('yesConfirm').innerText = yes
    document.getElementById('confirm').style.display = 'block'
    document.getElementById('confirmContainer').style.display = 'block'
    document.getElementById('noConfirm').addEventListener('click', () => {closeModal('confirm')})
    arg !== undefined?document.getElementById('yesConfirm').addEventListener('click', () => {func(arg);closeModal('confirm')})
        :document.getElementById('yesConfirm').addEventListener('click', () => {func();closeModal('confirm')})
}
function closeModal(i) {
    document.getElementById(`${i}Container`).style.display = 'none'
    document.getElementById(`${i}`).style.display = 'none'
}