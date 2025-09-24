'use strict'

import fs from 'fs'
import jsYaml from 'js-yaml'
import { glob } from 'glob'
import _ from 'lodash'

function readAsJSON (fileName) {
  const fileBuffer = fs.readFileSync(fileName)
  const fileString = fileBuffer.toString()

  return jsYaml.load(fileString)
}

/**
 * Merge the given YAML file names into a single YAML document
 *
 * @param {array} from the file paths to read from
 * @return {string} the output YAML file
 */
export function yamlMerge (...from) {
  const files = from
    .reduce((arr, el) => arr.concat(glob.sync(el)), [])
    .map((path) => readAsJSON(path))

  const outputJSON = _.mergeWith({}, ...files, (objValue, srcValue) => {
    if (Array.isArray(objValue) && Array.isArray(srcValue)) {
      return [...objValue, ...srcValue]
    }

    // handle it just like with _.merge
    return undefined
  })

  return jsYaml.dump(outputJSON)
}
