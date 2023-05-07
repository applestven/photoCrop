var child_process = require("child_process");

class folderService {
    async createFloder(curlpath){ // 弃
        console.log('@curlpath',curlpath)
        return  child_process.exec(curlpath, function(err, stdout, stderr) {
        });
    }
}


module.exports = new folderService()