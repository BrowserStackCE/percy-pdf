const fs = require("fs");
const { spawnSync } = require("child_process");

module.exports = {
  writeContentToFile: async function writeContentToFile(
    content,
    folder,
    fileName,
    fileEncoding
  ) {
    let filePath = `${folder}/${fileName}`;
    fs.writeFileSync(filePath, content, fileEncoding);
    return filePath;
  },
  replaceContentInFile: async function replaceContentInFile(
    str,
    findTextOrPattern,
    replaceTextOrPattern
  ) {
    return str.replace(findTextOrPattern, replaceTextOrPattern);
  },

  recreateFolder: async function recreateFolder(folderName, isRecursive) {
    if (fs.existsSync(folderName)) {
      fs.rmSync(folderName, { recursive: isRecursive }, (err) => {
        if (err) throw err;
      });
    }

    fs.mkdirSync(folderName, { recursive: isRecursive }, (err) => {
      if (err) throw err;
    });
  },

  copyFolder: async function copyFolder(
    sourceFolder,
    destinationFolder,
    isRecursive
  ) {
    fs.cpSync(sourceFolder, destinationFolder, { recursive: isRecursive });
  },
  readFile: async function readFile(fileName, encoding) {
    return fs.readFileSync(fileName, encoding);
  },

  getDirNames: function getDirNames(dirPath) {
    return fs.readdirSync(dirPath).filter((dir) => !dir.startsWith("."));
  },

  getFileNames: function getDirNames(dirPath, ext) {
    return fs.readdirSync(dirPath).filter((fileName) => fileName.endsWith(ext));
  },

  startExternalProcess: async function startExternalProcess(
    command,
    args,
    options
  ) {
    return spawnSync(command, args, options);
  },
};
