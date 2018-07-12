import * as tapTypes from './singer/tap-types'
//import * as configLoader from './singer/tap-load-config'
//import * as configLoader from './tap-load-config'

var DataTransform = require('json-transformer-node') //require('node-json-transform').DataTransform
var fse = require('fs-extra')

let map_forDetail = {
  mapping: {
    item: {
      Bale: [
        {
          list: 'entities',
          item: {
            'Warehouse Code': 'WhsCode',
            'Electronic Receipt Number': 'WhsTag',
            'Crop Year': 'CropYear(NUMBER)',
            'Purchase Order Number': '$',
            'Invoice Number': '$',
            Mark: '$',
            'Grower Reference Number': '$0'
          }
        }
      ]
    }
  }
}

let map_forheaderjson = {
  //needs more work. consult peter
  mapping: {
    item: {
      EWR_ToHost: {
        item: {
          'Holder ID': 'extraInfo.HolderId',
          'User ID': 'extraInfo.UserId',
          'User Password': 'userEntered.User_Password',
          'Batch Number': 'extraInfo.BatchNum',
          'Batch Type': '$52(NUMBER)',
          'Batch Date': '$2018-01-22T00:00:00.000Z',
          'Batch Time': '$2018-07-09T08:30:38.000Z',
          'Buyer ID': 'userEntered.HolderTo',
          'Send Detail': 'userEntered.EAD_Holder',
          'Certificated Type': '$',
          'Only Block Receipts': '$',
          'Loan Transfer': '$'
        }
      }
    }
  }
}
let map_forTrailer = {
  mapping: {
    item: {
      EWR_FromHost: {
        item: {
          'Holder To': 'userEntered.HolderTo',
          'Holder From': 'extraInfo.HolderId',
          'Batch Number': 'extraInfo.BatchNum',
          'Record Count': '$80',
          'Total Weight': '$0',
          'Hash Total': '$72162920'
        }
      }
    }
  }
}

export async function parseJson(toParse: any, configObjs: any) {
  var result = DataTransform.transform(toParse, configObjs.map) //in order to change to output to a array format use "objectify". see https://www.npmjs.com/package/json-transformer-node for more more info
  console.log(JSON.stringify(result))
  let rec = new tapTypes.streamRecord()
  rec.stream = 'JSON transform'
  rec.time_extracted = new Date()
  rec.record = result
  return rec
}
