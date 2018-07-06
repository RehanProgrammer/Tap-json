import * as tapTypes from './singer/tap-types'
import * as configLoader from './singer/tap-load-config'
//import * as configLoader from './tap-load-config'

var DataTransform = require('node-json-transform').DataTransform
var fse = require('fs-extra')
let data = {
  ModuleId: [
    {
      Name: 'ModuleId',
      Start: 0,
      Length: 0,
      DataType: 'Alphanumeric',
      Description: 'Module ID',
      Picture: '',
      ignoreOnImport: false,
      Template: '',
      Value: '',
      ToCanonical: [
        {
          match: '^\\s*(.{15})',
          replace: ''
        }
      ],
      FromCanonical: []
    }
  ]
}

let map = {
  list: 'ModuleId',
  item: {
    tapName: 'Name',
    targetName: 'Name',
    FixedStart: 'Start',
    FixedLength: 'Length',
    'DataType:': 'DataType',
    Description: 'Description',
    TargetPicture: 'Picture',
    ignoreOnImport: 'ignoreOnImport',
    ExportTemplate: 'Template',
    ImportTemplate: 'Template',
    Value: 'Value',
    ImportRegex: 'ToCanonical.0.match',
    ExportRegex: ''
  }
}
export async function parseJson(toParse: any, configObjs: any) {
  // var configObjs = await configLoader.loadConfig();
  // let config = configObjs.config
  //let parsed = await toParse;
  let config = configObjs
  console.log(toParse)
  //toParse = JSON.parse(JSON.stringify(toParse));
  if (config.map == undefined) {
    //console.log(configObjs);
    map = JSON.parse(JSON.stringify(map))
    data = JSON.parse(JSON.stringify(data))
    console.log(map)
    console.log(data)
    if (Array.isArray([Object.keys(data)[0]])) {
      var dataTransform = DataTransform(data, map)
      var result = dataTransform.transform()
      console.log(result)
      let rec = new tapTypes.streamRecord()
      rec.stream = 'JSON transform'
      rec.time_extracted = new Date()
      rec.record = result
      return rec
    }
  } else {
    //if (typeof(config.target_map) == 'string') map = await fse.readFile(config.target_map)//discuss with jay that send a map with the data
    // else if (typeof(config.target_map) == 'object') {map = config.target_map}
    //toParse = JSON.parse(JSON.stringify(toParse));
    //transform the data
    if (Array.isArray(toParse[Object.keys(toParse)[0]])) {
      var dataTransform = DataTransform(toParse, config.map)
      var result = dataTransform.transform()
      let rec = new tapTypes.streamRecord()
      rec.stream = 'JSON transform'
      rec.time_extracted = new Date()
      rec.record = result
      return rec
    } else {
      return console.log('error: JSON is not in acceptable format')
    }
    //var check = Array.isArray(map);
  }
}
