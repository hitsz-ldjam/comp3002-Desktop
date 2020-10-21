const fs = require("fs")
const path = require("path")

let ROOT_DIR = "./"
let ASSET_DIR = path.join(ROOT_DIR, "data")

class Backend {
    constructor() {
        if (!fs.existsSync(ASSET_DIR)) {
            fs.mkdirSync(ASSET_DIR);
        }
    }

    /**
     * Show a message popup.
     * @param {string} message 
     */
    showMessage(message) {
        return alert(message);
    }

    logMessage(message) {
        console.log(message);
    }

    logError(error) {
        console.error(error);
    }

    /** WTF stands for What a Terrible Failure */
    logWTF(wtf) {
        console.error('> WTF: ' + wtf);
    }

    /**
     * Load data from file.
     * @param {string} name Name of the file, can not contain path separators
     * @returns {string} Content of the file. Null if the operation failed.
     */
    loadAssetFile(name) {
        let filepath = path.join(ASSET_DIR, name);

        if (!fs.existsSync(filepath))
            return null;

        let stat = fs.statSync(filepath);
        if (stat.isFile()) {
            let buf = fs.readFileSync(filepath, {
                encoding: "UTF-8"
            });
            return buf;
        } else {
            return null;
        }
    }

    /**
     * Store data to file.
     * @param {string} name Name of the file, can not contain path separators
     * @param {string} data Data to write.
     * @returns {boolean} Whether the operation successed.
     */
    storeAssetFile(name, data) {
        let filepath = path.join(ASSET_DIR, name);
        return fs.writeFileSync(filepath, data) != 0;
    }

    /**
     * Delete file.
     * @param {string} name Name of the file, can not contain path separators
     * @returns True if the file was successfully deleted; else false.
     */
    deleteAssetFile(name) {
        let filepath = path.join(ASSET_DIR, name);

        if (!fs.existsSync(filepath))
            return false;

        let stat = fs.statSync(filepath);
        if (stat.isFile()) {
            fs.unlinkSync(filepath);
            return true;
        } else {
            return false;
        }
    }

    /**
     * List all files.
     * @returns Array of filenames.
     */
    listAssetFiles() {
        if (!fs.existsSync(ASSET_DIR))
            return null;

        return fs.readdirSync(ASSET_DIR);
    }
}

module.exports = {
    Backend
}