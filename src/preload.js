const {
    ipcRenderer
} = require("electron")

const {
    Backend
} = require("./backend.js")

process.on("loaded", () => {
    window.platformDesktop = new Backend();

    window.addEventListener("message", event => {
        const message = event.data;
        if (message.type === "platformMessage") {
            ipcRenderer.send("platformMessage", message.message);
        }
    }, false);
})