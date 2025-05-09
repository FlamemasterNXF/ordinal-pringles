function createAlert(name,desc,close, heights = {container: 13, button: 3}) {
    document.getElementById('alertTitle').innerHTML = name
    document.getElementById('alertContent').innerHTML = desc
    document.getElementById('closeAlert').innerHTML = close
    document.getElementById('alert').style.display = 'block'
    document.getElementById('alertContainer').style.display = 'block'
    document.getElementById('alertContainer').style.height = `${heights.container}rem`
    document.getElementById('closeAlert').style.height = `${heights.button}rem`
}

function createPrompt(name,func,useInput,desc='') {
    document.getElementById('promptInput').value = ''
    document.getElementById('promptTitle').innerText = name
    document.getElementById('promptDesc').innerText = desc
    document.getElementById('prompt').style.display = 'block'
    document.getElementById('promptContainer').style.display = 'block'

    if(useInput) document.getElementById('promptButton').addEventListener('click', ()=> func(document.getElementById('promptInput').value))
    else document.getElementById('promptButton').addEventListener('click', ()=> func())
}

function createPromptWithArg(name, func, useInput, arg) {
    document.getElementById('promptInput').value = ''
    document.getElementById('promptTitle').innerText = name
    document.getElementById('prompt').style.display = 'block'
    document.getElementById('promptContainer').style.display = 'block'

    if(useInput) document.getElementById('promptButton').addEventListener('click', ()=> func(arg, document.getElementById('promptInput').value))
    else document.getElementById('promptButton').addEventListener('click', ()=> func(arg))
}

function createConfirmation(name,desc,no,yes,func,arg) {
    let oldElement = document.getElementById("yesConfirm");
    let newElement = oldElement.cloneNode(true);
    oldElement.parentNode.replaceChild(newElement, oldElement);
    oldElement = document.getElementById("noConfirm");
    newElement = oldElement.cloneNode(true);
    oldElement.parentNode.replaceChild(newElement, oldElement);

    document.getElementById('confirmTitle').innerText = name
    document.getElementById('confirmContent').innerText = desc
    document.getElementById('noConfirm').innerText = no
    document.getElementById('yesConfirm').innerText = yes
    document.getElementById('confirm').style.display = 'block'
    document.getElementById('confirmContainer').style.display = 'block'
    document.getElementById('noConfirm').addEventListener('click', () => closeModal('confirm'))

    if(arg !== undefined) document.getElementById('yesConfirm').addEventListener('click', () => {
        func(arg)
        closeModal('confirm')
    })
    else document.getElementById('yesConfirm').addEventListener('click', () => {func();closeModal('confirm')})
}
function closeModal(i) {
    document.getElementById(`${i}Container`).style.display = 'none'
    document.getElementById(`${i}`).style.display = 'none'
}

function isModalOpen(name){
    return document.getElementById(`${name}Container`).style.display === 'block'
}

function showNotification(text){
    const notification = document.getElementById(`notification`)
    notification.innerHTML = text

    notification.classList.add('show')
    setTimeout(()=>{
        notification.classList.remove('show')
    }, 3000)
}