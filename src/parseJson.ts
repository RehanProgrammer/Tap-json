import * as tapTypes from './singer/tap-types'

/** extend ConfigType as needed for this tap; this will describe tap-config.json */
interface ConfigType extends tapTypes.ConfigType {
  /** set the name of the stream to be returned by the parser */
  stream_name?: string
  /** tap-json needs a map to describe the desired conversion  */
  map?: any
}
/** extend allConfigs to use our extended ConfigType */
interface allConfigs extends tapTypes.allConfigs {
  config: ConfigType
}

var DataTransform = require('json-transformer-node') //require('node-json-transform').DataTransform

export async function parseJson(toParse: any, configObjs: allConfigs) {
  let toParseObj
  if (toParse instanceof Buffer) {
    toParseObj = JSON.parse(toParse.toString())
  } else if (typeof toParse === 'string') {
    toParseObj = JSON.parse(toParse)
  } else if (toParse instanceof Object) {
    toParseObj = toParse
  }
  var result = DataTransform.transform(toParseObj, configObjs.config.map) //in order to change to output to a array format use "objectify". see https://www.npmjs.com/package/json-transformer-node for more more info
  let rec = new tapTypes.streamRecord()
  rec.stream = configObjs.config.stream_name
  rec.time_extracted = new Date()
  rec.record = result
  return rec
}
