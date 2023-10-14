const fs = require('fs')
const { execSync, spawnSync } = require('child_process')
const pdfjsLib = require('pdfjs-dist')
const yaml = require('js-yaml')
const merge = require('./yaml-merge')

module.exports = {
  writeContentToFile: async function writeContentToFile (
    content,
    folder,
    fileName,
    fileEncoding
  ) {
    const filePath = `${folder}/${fileName}`
    fs.writeFileSync(filePath, content, fileEncoding)
    return filePath
  },
  replaceContentInFile: async function replaceContentInFile (
    str,
    findTextOrPattern,
    replaceTextOrPattern
  ) {
    return str.replace(findTextOrPattern, replaceTextOrPattern)
  },

  recreateFolder: async function recreateFolder (folderName, isRecursive) {
    if (fs.existsSync(folderName)) {
      fs.rmSync(folderName, { recursive: isRecursive }, (err) => {
        if (err) throw err
      })
    }

    fs.mkdirSync(folderName, { recursive: isRecursive }, (err) => {
      if (err) throw err
    })
  },

  copyFolder: async function copyFolder (
    sourceFolder,
    destinationFolder,
    isRecursive
  ) {
    fs.cpSync(sourceFolder, destinationFolder, { recursive: isRecursive })
  },
  readFile: async function readFile (fileName, encoding) {
    return fs.readFileSync(fileName, encoding)
  },

  getDirNames: function getDirNames (dirPath) {
    return fs.readdirSync(dirPath).filter((dir) => !dir.startsWith('.'))
  },

  getFileNames: function getDirNames (dirPath, ext) {
    return fs.readdirSync(dirPath).filter((fileName) => fileName.endsWith(ext))
  },

  startExternalProcess: async function startExternalProcess (
    command,
    args,
    options,
    separateShell
  ) {
    return separateShell
      ? execSync(command, args, options)
      : spawnSync(command, args, options)
  },

  listFolderYmlFiles: async function listFolderYmlFiles (dirContPath) {
    const dirCont = fs.readdirSync(dirContPath)
    return dirCont
      .filter((elm) => elm.match(/.*\.(yml?)/gi))
      .map((el) => `${dirContPath}/${el}`)
  },

  emptyDir: async function emptyDir (dir) {
    fs.rmSync(dir, { recursive: true, force: true })
  },

  createDir: async function createDir (dirPath) {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath)
    }
  },

  getPDFPageCount: async function getPDFPageCount (pdfFilePath) {
    return await pdfjsLib
      .getDocument(fs.readFileSync(pdfFilePath))
      .promise.then(function (doc) {
        return doc.numPages
      })
  },

  mergeMultipleYmlFiles: async function mergeMultipleYmlFiles (
    ...ymlConfigFiles
  ) {
    return merge(...ymlConfigFiles)
  },

  loadYmlObj: async function loadYmlObj (ymlStrContent) {
    return yaml.load(ymlStrContent)
  },

  dumpObjToStr: async function dumpObjToStr (obj) {
    return yaml.dump(obj)
  },

  filterDocs: async function filterDocs (
    pdfDocsToFilter,
    currentProjectFolder,
    fileList,
    includeFlag
  ) {
    return fileList.filter(function (el) {
      const currProjectDocs = pdfDocsToFilter.filter(function (docs) {
        return docs.project === currentProjectFolder
      })

      if (includeFlag) {
        return currProjectDocs.map((obj) => obj.doc).includes(el)
      } else {
        return !currProjectDocs.map((obj) => obj.doc).includes(el)
      }
    })
  },

  applySpecialDocConfigs: async function applySpecialDocConfigs (
    pdfRunInfoSpecialDocConfigs,
    projectFolderName,
    fileList
  ) {
    const specialConfigsMap = new Map()
    pdfRunInfoSpecialDocConfigs.forEach((specialConfig) => {
      if (
        fileList.includes(specialConfig.doc) &&
        projectFolderName === specialConfig.project
      ) {
        specialConfigsMap.set(specialConfig.doc, {
          includePages: specialConfig.includePages,
          excludePages: specialConfig.excludePages
        })
      }
    })
    return specialConfigsMap
  }
}
