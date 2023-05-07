const fs = require("fs")
class utils {
    //1. 清空文件夹
    emptyDir(path) {
        const files = fs.readdirSync(path);
        files.forEach(file => {
            const filePath = `${path}/${file}`;
            const stats = fs.statSync(filePath);
            if (stats.isDirectory()) {
                emptyDir(filePath);
            } else {
                fs.unlinkSync(filePath);
                // console.log(`删除${file}文件成功`);
            }
        });
    }
} 

  module.exports = new utils()