import * as tapTypes from './singer/tap-types'
import { exists } from 'fs'

/** extend ConfigType as needed for this tap; this will describe tap-config.json */
export interface ConfigType extends tapTypes.ConfigType {
  /** set the name of the stream to be returned by the parser */
  stream_name?: string
  /** tap-json needs a map to describe the desired conversion  */
  map?: any
  map_folder?: string
}
/** extend allConfigs to use our extended ConfigType */
export interface allConfigs extends tapTypes.allConfigs {
  config: ConfigType
}

var transform = require('qewd-transform-json').transform

export async function parseJson(toParse: any, configObjs: allConfigs) {
  let toParseObj
  if (toParse instanceof Buffer) {
    toParseObj = JSON.parse(toParse.toString())
  } else if (typeof toParse === 'string') {
    toParseObj = JSON.parse(toParse)
  } else if (toParse instanceof Object) {
    toParseObj = toParse
  }
  if (toParseObj instanceof Array) {
    toParseObj = {
      __rootArray: toParseObj
    }
  }

  let counters: any = {}
  /** Increment the indicated value by adding incAmt. Returns null, so the object containing this call is unaffected
   */
  let incCounter = function(name: string, incAmt: any) {
    if (!counters[name]) counters[name] = 0
    counters[name] += 1 * incAmt
  }
  /** Gets an existing counter. If incAmt is passed in, increment first and then return the counter */
  let getCounter = function(name: string, incAmt?: any) {
    if (incAmt) incCounter(name, incAmt)
    return counters[name]
  }

  let asString = function(value: string): string {
    return '' + value
  }
  let asNumber = function(value: number): number {
    return 1 * value
  }
  let subStr = function(value: string, start: number, count: number) {
    return value.substr(start, count)
  }

  let result = transform(configObjs.config.map, toParseObj, {
    incCounter,
    getCounter,
    asString,
    asNumber,
    subStr
  })
  if (result.__rootArray) {
    result = result.__rootArray
  }
  if (result instanceof Array) {
    for (let i in result) {
      let rec = new tapTypes.streamRecord()
      rec.stream = configObjs.config.stream_name
      rec.time_extracted = new Date()
      rec.record = result[i]
      result[i] = rec
    } //end of for loop
  } else {
    let rec = new tapTypes.streamRecord()
    rec.stream = configObjs.config.stream_name
    rec.time_extracted = new Date()
    rec.record = result
    return rec
  }

  return result
}
