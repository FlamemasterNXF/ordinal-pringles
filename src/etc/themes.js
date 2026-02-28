const DOCUMENT_ROOT = document.documentElement
const ROOT_STYLES = getComputedStyle(DOCUMENT_ROOT)

const themeGlobals = {
    isDraggingColorPicker: false,
    currentThemeModification: 'null',
    currentHue: 0
}

const themeSettings = [
    {
        desc: 'Persist Current Theme on Refresh'
    }
]

function getCSSVariable(name, autofillPrefix = true){
    if(autofillPrefix) return ROOT_STYLES.getPropertyValue(`--${name}`)
    return ROOT_STYLES.getPropertyValue(name)
}

function setCSSVariable(name, value, autofillPrefix = true){
    if(autofillPrefix) name = `--${name}`
    DOCUMENT_ROOT.style.setProperty(name, value)
    data.theme.currentTheme[name] = value
}

function makeCSSVariableArray() {
    // root.css will always be index 0
    return Array.from(document.styleSheets[0].cssRules).reduce((array, rule) => {
            return array.concat(Array.from(rule.style))
        }, []
    ).reduce((map, name) => {
        return {...map, [name]: getCSSVariable(name, false)};
    }, {})
}

function makeThemeVariableText(name){
    return name.replace(/-(\w)/g, (_, letter) => ' ' + letter.toUpperCase()).replace(/^-/g, '')
}

function makeThemeVariableBorderColor(color){
    //TODO: Add a limit instead of making this exact so e.g. very dark gray on black still gets a border.
    if(color === getCSSVariable('main-background-color')) return getCSSVariable('generic-gray')
    return color
}

function updateThemeButton(name, color, element = null){
    if(name.includes('generic')) return

    if(element !== null){
        element.style.backgroundColor = color
        element.style.borderColor = makeThemeVariableBorderColor(color)
    }
    else{
        DOM(`themeButton${name}`).style.backgroundColor = color
        DOM(`themeButton${name}`).style.borderColor = makeThemeVariableBorderColor(color)
    }
}

function updateDotPosition(e) {
    const colorGradientBox = document.getElementById('colorGradientBox')
    const colorSelectorDot = document.getElementById('colorSelectorDot')
    const colorInput = document.getElementById('colorInput')

    const rect = colorGradientBox.getBoundingClientRect()
    let x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
    let y = Math.max(0, Math.min(e.clientY - rect.top, rect.height))

    colorSelectorDot.style.left = `${x}px`
    colorSelectorDot.style.top = `${y}px`

    // Calculate selected color
    const saturation = (x / rect.width) * 100;
    let lightness

    if (saturation === 0) lightness = 100 - (y / rect.height) * 100
    else lightness = 50 - (y / rect.height) * 50

    const normalizedColor = hslToHex(themeGlobals.currentHue, saturation, lightness)
    colorInput.value = normalizedColor
    setCSSVariable(themeGlobals.currentThemeModification, normalizedColor, false)
    updateThemeButton(themeGlobals.currentThemeModification, normalizedColor)
}

function setDotFromHSL(h, s, l) {
    const colorGradientBox = document.getElementById('colorGradientBox')
    const colorSelectorDot = document.getElementById('colorSelectorDot')

    const rect = colorGradientBox.getBoundingClientRect();
    const x = (s / 100) * rect.width;
    const y = (1 - l / 100) * rect.height;

    colorSelectorDot.style.left = `${x}px`;
    colorSelectorDot.style.top = `${y}px`;
}

function updateHuePosition(){
    const colorGradientBox = document.getElementById('colorGradientBox')
    const colorSelectorDot = document.getElementById('colorSelectorDot')
    const hueSlider = document.getElementById('hueSlider')

    themeGlobals.currentHue = hueSlider.value
    updateGradient()

    // Scuffed but it works and I am tired.
    const fakeEvent = {
        clientX: parseFloat(colorSelectorDot.style.left) + colorGradientBox.getBoundingClientRect().left,
        clientY: parseFloat(colorSelectorDot.style.top) + colorGradientBox.getBoundingClientRect().top
    }
    updateDotPosition(fakeEvent)
}

function updatePickerFromInput(input) {
    if(input[0] !== '#') return;

    const hueSlider = document.getElementById('hueSlider')
    try {
        const hsl = hexToHSL(input);
        themeGlobals.currentHue = hsl.h
        hueSlider.value = hsl.h
        setDotFromHSL(hsl.h, hsl.s, hsl.l)
        updateGradient()

        setCSSVariable(themeGlobals.currentThemeModification, input, false)
        updateThemeButton(themeGlobals.currentThemeModification, input)
    } catch (e) {
        console.warn(`Invalid color in picker: ${input}, expected hex format.`);
    }
}

function updateGradient() {
    const colorGradientBox = document.getElementById('colorGradientBox')
    const color = `hsl(${themeGlobals.currentHue}, 100%, 50%)`

    colorGradientBox.style.background = `
        linear-gradient(to bottom, 
            transparent, 
            black
        ),
        linear-gradient(to right, 
            white, 
            ${color}
        )`
    colorGradientBox.style.backgroundBlendMode = 'multiply'
}

function showColorPicker(event, name){
    const colorPicker = document.getElementById('colorPicker')
    const scrollOffsets = getScrollOffsets(document.getElementById("cssVariablesContainer"))
    const hueSlider = document.getElementById('hueSlider')
    const colorInput = document.getElementById('colorInput')

    colorPicker.style.display = 'block'
    const viewportWidth = Math.max(DOCUMENT_ROOT.clientWidth, window.innerWidth || 0)
    const viewportHeight = Math.max(DOCUMENT_ROOT.clientHeight, window.innerHeight || 0)
    const pickerRect = colorPicker.getBoundingClientRect()

    let x = event.clientX
    let y = event.clientY

    if (x + pickerRect.width > viewportWidth) x = viewportWidth - pickerRect.width - 10
    if (y + pickerRect.height > viewportHeight) y = viewportHeight - pickerRect.height - 10

    colorPicker.style.left = `${x + scrollOffsets.x}px`
    colorPicker.style.top = `${y + scrollOffsets.y}px`

    colorInput.value = getCSSVariable(name, false)
    themeGlobals.currentThemeModification = name

    const hsl = hexToHSL(getCSSVariable(name, false))
    themeGlobals.currentHue = hsl.h
    hueSlider.value = hsl.h
    setDotFromHSL(hsl.h, hsl.s, hsl.l)
    updateGradient()
}

function hideColorPicker(){
    const colorPicker = document.getElementById('colorPicker')
    if(!themeGlobals.isDraggingColorPicker) colorPicker.style.display = 'none'
}

function initPickerDragging(e){
    themeGlobals.isDraggingColorPicker = true
    updateDotPosition(e)
}

function initThemeHTML(){
    const container = DOM('cssVariablesContainer')
    const colorInput = document.getElementById('colorInput')

    const keys = getThemeSetting(0) ? Object.keys(data.theme.currentTheme) : Object.keys(makeCSSVariableArray())
    const values = getThemeSetting(0) ? Object.values(data.theme.currentTheme) : Object.values(makeCSSVariableArray())

    for (let i = 0; i < keys.length; i++) {
        const name = keys[i]
        const value = values[i]

        if(name.includes('generic')) continue

        let elementRow = document.createElement('div')
        elementRow.className = 'row flexBox'

        let text = document.createElement('div')
        text.className = 'themeTexts'
        text.id = `themeText${name}`
        text.innerText = makeThemeVariableText(name)
        elementRow.appendChild(text)

        let color = document.createElement('button')
        color.className = 'themeButton'
        color.id = `themeButton${name}`
        updateThemeButton(name, value, color)
        color.addEventListener('click', () => showColorPicker(event, name))
        elementRow.appendChild(color)

        container.appendChild(elementRow)
    }

    document.addEventListener('mousemove', (e) => {
        if (themeGlobals.isDraggingColorPicker) updateDotPosition(e)
    })
    document.addEventListener('mouseup', () => themeGlobals.isDraggingColorPicker = false)

    let colorInputTimeout
    colorInput.addEventListener('input', (e) => {
        clearTimeout(colorInputTimeout)
        colorInputTimeout = setTimeout(() => {
            updatePickerFromInput(e.target.value)
        }, 300)
    })

    initThemeControlHTML()
}

let getThemeSetting = (i) => data.theme.settings[i]

function displayThemeSetting(i, directlySet = true){
    let text = themeSettings[i].desc
    const color = getThemeSetting(i) ? '#2da000' : '#ce0b0b'
    text = `${text} <span style="color: ${color}">[${formatBool(getThemeSetting(i))}]</span>`
    if(directlySet) DOM(`themeSetting${i}`).innerHTML = text
    else return text
}

function toggleThemeSetting(i){
    data.theme.settings[i] = !data.theme.settings[i]
    displayThemeSetting(i)
}

function makeSavedThemeText(i){
    const color = data.theme.savedThemes[i] !== 0 ? '#5faf40' : '#c44444'
    const state = data.theme.savedThemes[i] !== 0
        ? 'Used! Click here to load this Theme!'
        : 'Empty! Click here to save your Theme for later!'
    return `Theme Slot ${i}: <span style="color: ${color}">${state}</span>`
}

function useThemeSlot(i){
    // Zero is a stand-in for null in this case as the save unpacking can't handle null very well
    if(data.theme.savedThemes[i] === 0){
        data.theme.savedThemes[i] = {}
        const keys = Object.keys(data.theme.currentTheme)
        const values = Object.values(data.theme.currentTheme)
        for (let j = 0; j < keys.length; j++) {
            console.log(keys[j])
            data.theme.savedThemes[i][keys[j]] = values[j]
        }
    }
    else {
        const keys = Object.keys(data.theme.savedThemes[i])
        const values = Object.values(data.theme.savedThemes[i])
        for (let j = 0; j < keys.length; j++) {
            setCSSVariable(keys[j], values[j], false)
            updateThemeButton(keys[j], values[j])
        }
    }

    DOM(`savedTheme${i}`).innerHTML = makeSavedThemeText(i)
}

function resetThemeSlot(i){
    data.theme.savedThemes[i] = 0
    DOM(`savedTheme${i}`).innerHTML = makeSavedThemeText(i)
}

function exportTheme(i){
    const exportedDataText = document.createElement("textarea")
    exportedDataText.value = JSON.stringify(data.theme.savedThemes[i])
    document.body.appendChild(exportedDataText)

    exportedDataText.select()
    exportedDataText.setSelectionRange(0, 99999)

    document.execCommand("copy")
    document.body.removeChild(exportedDataText)
    createNotification(`The Theme in Slot ${i} has been copied to the clipboard!`)
}

function importTheme(i, themeData){
    data.theme.savedThemes[i] = JSON.parse(themeData)
    DOM(`savedTheme${i}`).innerHTML = makeSavedThemeText(i)

    createNotification(`Successfully imported Theme to Slot ${i}!`)
    closeModal('prompt')
}

function updateThemeDefaults(){
    // Create a new default theme based on the current values
    const newDefault = makeCSSVariableArray()
    const newKeys = Object.keys(newDefault)

    const currentKeys = Object.keys(data.theme.currentTheme)
    const defaultKeys = Object.keys(data.theme.defaultTheme)

    // If a current theme value is a default, update it to match the new defaults (if necessary)
    for (let i = 0; i < newKeys.length; i++) {
        const newValue = newDefault[newKeys[i]]
        const currentValue = data.theme.currentTheme[currentKeys[i]]
        const defaultValue = data.theme.defaultTheme[defaultKeys[i]]

        if(newValue === defaultValue) continue;
        if(currentValue === defaultValue) data.theme.currentTheme[newKeys[i]] = newValue
    }

    // Ensure default theme remains up to date
    data.theme.defaultTheme = makeCSSVariableArray()
}

function loadTheme(){
    updateThemeDefaults()

    if(!getThemeSetting(0)) return

    const keys = Object.keys(data.theme.currentTheme)
    const values = Object.values(data.theme.currentTheme)
    for (let i = 0; i < keys.length; i++) {
        setCSSVariable(keys[i], values[i], false)
    }
}


function resetTheme(){
    const keys = Object.keys(data.theme.defaultTheme)
    const values = Object.values(data.theme.defaultTheme)
    for (let i = 0; i < keys.length; i++) {
        setCSSVariable(keys[i], values[i], false)
        updateThemeButton(keys[i], values[i])
    }
}

function initThemeControlHTML(){
    const container = DOM('themeControlContainer')
    for (let i = 0; i < themeSettings.length; i++) {
        let setting = document.createElement('button')
        setting.className = 'themeSetting'
        setting.id = `themeSetting${i}`
        setting.innerHTML = displayThemeSetting(i, false)
        setting.addEventListener('click', () => toggleThemeSetting(i))

        container.appendChild(setting)
    }
    for (let i = 0; i < data.theme.savedThemes.length; i++) {
        let savedWrapper = document.createElement('div')
        savedWrapper.className = 'savedThemeWrapper'
        savedWrapper.id = `savedThemeWrapper${i}`

        let saved = document.createElement('button')
        saved.className = 'savedTheme'
        saved.id = `savedTheme${i}`
        saved.innerHTML = makeSavedThemeText(i)
        saved.addEventListener('click', () => useThemeSlot(i))

        let savedReset = document.createElement('button')
        savedReset.className = 'savedThemeReset'
        savedReset.id = `savedThemeReset${i}`
        savedReset.innerHTML = 'Reset'
        savedReset.addEventListener('click', () => resetThemeSlot(i))

        let exportButton = document.createElement('img')
        exportButton.className = 'exportThemeButton'
        exportButton.src = 'res/upload.png'
        exportButton.addEventListener('click', () => exportTheme(i))

        let importButton = document.createElement('img')
        importButton.className = 'importThemeButton'
        importButton.src = 'res/download.png'
        importButton.addEventListener('click', () => createPromptWithArg('Import Theme!', importTheme, true, i))

        savedWrapper.appendChild(saved)
        savedWrapper.appendChild(exportButton)
        savedWrapper.appendChild(importButton)
        savedWrapper.appendChild(savedReset)
        container.appendChild(savedWrapper)
    }

    let reset = document.createElement('button')
    reset.className = 'savedTheme'
    reset.id = 'themeReset'
    reset.innerText = 'Reset your current Theme to default'
    reset.addEventListener('click', () => resetTheme())
    container.appendChild(reset)
}

