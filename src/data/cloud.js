// I don't like globals. They're coarse and rough and irritating and they get everywhere.
let cloudSavingData = {
    isGalaxy:     false,    // Are we on galaxy?
    isLoggedIn:   false,    // Is the user logged in?
    saveInterval: 300000,   // Cloud save every five minutes.
    blockSaving:  false,    // Prevents further cloud saving if true.
}

function loadFromCloud(cloudData = null){
    if(!cloudSavingData.isGalaxy) return showNotification('You must be on galaxy.click to use this!')

    if(cloudData){
        // When we load directly during initialization, there is no need to send a new request.
        importSave(cloudData)
    }
    else{
        // When we load manually we must request the data through galaxy
        window.postMessage({
            action: 'load',
            slot: 0 // The dedicated autosave slot
        }, "https://galaxy.click")
    }
}

function saveToCloud(){
    if(!cloudSavingData.isGalaxy) return showNotification('You must be on galaxy.click to use this!')
    if(!cloudSavingData.blockSaving){
        window.top.postMessage({
            action: "save",
            slot: 0, // The dedicated autosave slot
            label: "Autosave",
            data: compressSaveData(),
        },"https://galaxy.click")
    }
}

// Initialization is called immediately after the loading process is complete
function initializeCloudSaving() {
    // If the game is not running through galaxy, do not continue.
    if(window.top.origin !== "https://galaxy.click"){
        console.info("Game is not on galaxy, Cloud initialization aborted.")
        return
    }

    // Otherwise, trigger a galaxy info message.
    window.top.postMessage({
        action: "info",
    }, "https://galaxy.click");

    window.addEventListener("message", e => {
        if(e.origin === "https://galaxy.click"){
            if(e.data.type === "info"){
                /*
                    https://galaxy.click/docs/dev/responses/info
                    info is sent when saving is initialized, so we can check for it directly
                */
                cloudSavingData.isGalaxy = true // We can now confirm that we are on galaxy
                DOM(`cloudStatus`).innerHTML = 'You are on Galaxy, but not logged in.<br><br>Please log in to enjoy the benefits of Cloud saving!'
                if(e.data.logged_in){
                    cloudSavingData.isLoggedIn = true // We can now confirm that the user is logged in
                    DOM(`cloudStatus`).innerHTML = 'You are on Galaxy and logged in!<br><br>The game will Cloud save every five minutes!'

                    // Begin loading from the cloud
                    window.top.postMessage({
                        action: "load",
                        slot: 0 // The dedicated autosave slot
                    }, "https://galaxy.click")

                    // Initialize the automatic cloud saving
                    window.setInterval(function () {
                        saveToCloud()
                    }, cloudSavingData.saveInterval)
                }
            }
            else if(e.data.type === "save_content"){
                /*
                    https://galaxy.click/docs/dev/responses/save_content
                    save_content is sent as a reply to a load request
                */
                if(!e.data.error){
                    const cloudData = e.data.content
                    loadFromCloud(cloudData)
                }
                else if(e.data.message === "empty_slot"){
                    /*
                        It turns out that saving twice in quick succession can create a race condition, leading to
                        two identical cloud saves being created (bad).
                        So, instead of creating a save to fill the empty slot, we do nothing.
                    */
                }
                else{
                    /*
                        save_content can only return a few errors, and we have covered all but one
                        if we reach this, we know that there has been a server error, and we must stop cloud saving
                    */
                    cloudSavingData.blockSaving = true
                }
            }
        }
    })
}