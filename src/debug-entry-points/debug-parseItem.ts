/**
 * This module is the entry point for local execution using a test file. To launch:
 * 1. Open a test file of a type parseable by parseItem (search tap-main.ts for "parseItem" for a clue on the current parser;
 *    an appropriate test file can probably be located under "./testdata/tests")
 * 2. Start debugging with Configuration "Debug parseItem using current opened test file"
 * parseItem will be run on the test file you have open.
 */

/** this is a dummy single-line comment needed for documentation build; a hack for https://github.com/TypeStrong/typedoc/issues/603 */

import * as fse from 'fs-extra'
import { parseJson } from '../tap-main'
import * as tapTypes from '../singer/tap-types'
import * as parseItem from '../tap-main'
import * as path from 'path'
import * as configLoader from '../singer/tap-load-config'
let pathOftap_config = './tap-config.json'

let fileToParse = process.argv[4] // process the file indicated by a parameter passed in
if (fileToParse.endsWith('.ts') || fileToParse.endsWith('.js')) {
  console.error(
    'Uh-oh! you are trying to parse "' +
      path.relative('.', fileToParse) +
      '" (which appears to be a javascript/typescript file) using parseJson.'
  )
  console.error(
    'Try opening a parsable test file (maybe something from "./testdata/tests"?) in the active tab and then debug again.'
  )
} else console.log('Parsing "' + path.relative('.', fileToParse) + '" using parseJson')

debugParseIteM()
async function debugParseIteM() {
  try {
    let configObjs: parseItem.allConfigs
    configObjs = await configLoader.loadConfig()
    let debugParseItem = async () => {
      try {
        let buffer = await fse.readFile(fileToParse)
        var filename = fileToParse.replace(/^.*[\\\/]/, '') //since fileToparse is a path, I have used this regex to read  just the filaname
        let mapBuffer = await fse.readFile(configObjs.config.map_folder + '/' + filename)
        mapBuffer = JSON.parse(mapBuffer.toString())
        configObjs.config.map = mapBuffer
        let value = await parseJson(buffer, configObjs)
        console.log(JSON.stringify(value))
      } catch (error) {
        console.error(error)
      }
    }

    debugParseItem() // run
  } catch (error) {
    console.log('error shown')
  }
}
