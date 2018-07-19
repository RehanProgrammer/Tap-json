import * as tapTypes from './singer/tap-types'

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
  var result = transform(configObjs.config.map, toParseObj)
  let rec = new tapTypes.streamRecord()
  rec.stream = configObjs.config.stream_name
  rec.time_extracted = new Date()
  rec.record = result
  return rec
}
