import * as tapTypes from './singer/tap-types'
import * as configLoader from './singer/tap-load-config'
//import * as configLoader from './tap-load-config'

var DataTransform = require('node-json-transform').DataTransform
var fse = require('fs-extra')
let data = {
  deliveryInfo: {
    Filename: '',
    Subject: 'Ferguson - K & D Farms JV: 1303',
    Body: '',
    To: 'kelly@texasorganic.com',
    CC: '',
    subject: 'Ferguson - K & D Farms JV: 1303'
  },
  filter: '((it.FarmRef == 228) and (it.CustomerRef == 91) and ( {{{Bale.NotARemnant}}}))',
  userEntered: {
    User_Password: 'ANITA',
    HolderTo: 'Z439664',
    EAD_Holder: 'y'
  },
  detailProperties: [
    {
      Name: 'WhsCode',
      DataType: 'String',
      MaxLength: 6
    },
    {
      Name: 'WhsTag',
      DataType: 'String',
      MaxLength: 7
    },
    {
      Name: 'CropYear',
      DataType: 'String',
      MaxLength: 4
    }
  ],
  select: 'new (WhsCode as WhsCode, WhsTag as WhsTag, CropYear as CropYear)',
  dataport: 'Transfer.Transfer Loan Bales.ewrexp',
  deliveryMethod: 'Ewr',
  extraInfo: {
    WhsCode: '880533',
    WhsTag: '0901997',
    CropYear: 2017,
    ConnectUsing: 'Sync',
    FtpHost: 'ftp.ewrinc.net',
    FtpLogin: 'Z439664',
    FtpPassword: 'texo2514',
    HolderId: 'Z439664',
    UserId: 'MORTON',
    BatchNum: '1519',
    CreateDate: '2018-01-22T18:00:00Z',
    CreateTime: '08:30:38'
  },
  entities: [
    {
      WhsCode: '880533',
      WhsTag: '0901997',
      CropYear: 2017
    },
    {
      WhsCode: '880533',
      WhsTag: '0901998',
      CropYear: 2017
    },
    {
      WhsCode: '880533',
      WhsTag: '0901999',
      CropYear: 2017
    }
  ]
}

let map_forDetail = {
  list: 'entities',
  item: {
    'Warehouse Code': 'WhsCode',
    'Electronic Receipt Number': 'WhsTag',
    'Crop Year': 'CropYear',
    'Purchase Order Number': '',
    'Invoice Number': '',
    Mark: '',
    'Grower Reference Number': 0
  }
}
let data1 = {
  extraInfo: {
    WhsCode: '880533',
    WhsTag: '0901997',
    CropYear: 2017,
    ConnectUsing: 'Sync',
    FtpHost: 'ftp.ewrinc.net',
    FtpLogin: 'Z439664',
    FtpPassword: 'texo2514',
    HolderId: 'Z439664',
    UserId: 'MORTON',
    BatchNum: '1519',
    CreateDate: '2018-01-22T18:00:00Z',
    CreateTime: '08:30:38'
  }
}

let map = {
  //if this works change to map_forHeader

  'Holder ID': 'extraInfo.HolderId'
}
/*
"User ID": 'extraInfo.UserId',
    "User Password": 'extraInfo.list1.User_Password',
    "Batch Number": 'extraInfo.BatchNum',
    "Batch Type": 52,
    "Batch Date": 'extraInfo.CreateDate',
    "Batch Time": 'extraInfo.CreateTime',
   // "Buyer ID": 'list1.HolderTo',
    //"Send Detail": 'list1.EAD_Holder',
    "Certificated Type": "",
      "Only Block Receipts": "",
      "Loan Transfer": ""
  }
*/

export async function parseJson(toParse: any, configObjs: any) {
  let config = configObjs
  console.log(data1)
  console.log(map)

  var dataTransform = DataTransform(data1, map)
  var result = dataTransform.transform()
  console.log(result)
  if (config.map == undefined) {
    //console.log(configObjs);
    map = JSON.parse(JSON.stringify(map))
    data = JSON.parse(JSON.stringify(data))

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
