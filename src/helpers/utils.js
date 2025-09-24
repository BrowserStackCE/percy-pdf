import fs from 'fs'
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs'
import yaml from 'js-yaml'
import { yamlMerge } from './yaml-merge.js'

export const utils = {
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

  fileExists: async function fileExists (fileOrFolderName) {
    if (fs.existsSync(fileOrFolderName)) {
      return true
    }
  },

  copyFile: async function copyFile (src, dest) {
    const data = fs.readFileSync(src)
    fs.writeFileSync(dest, data)
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
    const loadingTask = getDocument(pdfFilePath)
    return await loadingTask.promise
      .then(function (doc) {
        return doc.numPages
      })
  },

  mergeMultipleYmlFiles: async function mergeMultipleYmlFiles (
    ...ymlConfigFiles
  ) {
    return yamlMerge(...ymlConfigFiles)
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
