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

let map_forheader = {
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
let data = {
  type: 'RECORD',
  stream: 'dbf',
  record: {
    '@numOfRecord': 1,
    '@deleted': false,
    TYPE: 'P',
    GIN_BALE: '',
    LOAD_NUM: '',
    GIN_ID: '',
    GIN_WT: 582,
    GIN_TARE: '',
    BAGGING: 0,
    TIES: 0,
    SEED_WT: '',
    SHIFT: 1,
    PROD_ID: '400',
    OWNER_ID: '400',
    FARM_ID: '1752',
    FIELD_ID: 'N/A',
    PICK: '1',
    DT_GIN: '20171010',
    BIRTH_DT: '\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000',
    BIRTH_TIME: '',
    LABOR_SECS: '',
    GRADE: 41,
    STAPLE: 35,
    MIC: 4.6,
    LEAF: 4,
    EXT_MATTER: '',
    REMARKS: '',
    STRENGTH: 29,
    COLOR_GR: '41-3',
    COLOR_RD: 74.4,
    COLOR_B: '',
    TRASH: '',
    UNIFORM: 82.3,
    LENGTH: 110,
    ELONGATION: '',
    MOIST_PRE: '',
    MOIST_POST: '',
    DT_CLASS: '20171016',
    CLASS_CORR: '0',
    CCC_LOAN: '+0110',
    VAL_LOAN: '',
    VAL_SEED: '',
    WH_ID: '',
    WH_BALE: '',
    WH_WT: 577,
    DT_STORED: '20171010',
    BIRTH_NUM: '',
    P_CHARGE: '',
    L_CHARGE: '',
    L_SDCREDIT: '',
    TA_NUM: '',
    RETEST: '0',
    CARD_TYPE: '1',
    LOANSTATUS: '',
    LOAN_NUM: '',
    CCC_SENT: false,
    CLOAD_TYPE: '1',
    CLOAD_NUM: '',
    CBALECOUNT: 16,
    CPROD_ACCT: '',
    PR_RECAP: '',
    PR_INVOICE: '',
    SL_RECAP: '',
    SL_INVOICE: '',
    PR_CONTRID: 'AUTAUGA',
    PR_CONTRNM: '',
    SL_CONTRID: 'AUTAUGA',
    EWRXFER_DT: '20171011',
    EWRXFER_TO: 'AUTAUGA',
    HOLD_POST: false,
    SENT: 'Y',
    BLGRP_APP: '',
    BLGRP_BD: '',
    USER_FLAGS: '',
    LASTEWRUPD: '',
    FIREBALE: false,
    MISC_FLAGS: '',
    CON_TRANS: false,
    CON_RECAP: false,
    CON_LOAN: false,
    CON_COMMIT: false
  }
}

let map = {
  mapping: {
    item: {
      GinTag: 'record.GIN_ID',
      GinCode: 'record.GIN_BALE',
      TicketNum: '$1234',
      LoadNum: 'record.FARM_ID',
      GinWt: 'record.GIN_WT(NUMBER)',
      SeedWt: 'record.SeedWt(NUMBER)',
      RemnantType: '$',
      RemnantRef: '$',
      CustomerRef: '$',
      FarmRef: 'record.FARM_ID',
      OwnerRef: 'record.OWNER_ID',
      LoanNum: 'record.LOAN_NUM',
      TransferFlag: 'record.USER_FLAGS',
      Category: '$wth is this',
      Commitment: 'record.CON_COMMIT',
      Label: '$',
      Erecap: '$',
      Listed: 'record.BAGGING',
      SentToWhs: 'record.TIES',
      BaleDate: 'record.DT_GIN',
      WhsTag: 'record.WH_ID',
      WhsCode: 'record.WH_WT',
      CropYear: '$NULL',
      WhsDate: 'record.DT_STORED',
      WhsNet: '$',
      TareWt: '$',
      BagType: 'record.BAGGING',
      Compression: '$',
      BagCond: '$I dont know',
      ClassDate: '$',
      ModAvgLoadType: 'record.CLOAD_TYPE',
      ModAvgLoadNum: 'record.CLOAD_NUM',
      ModAvgNumBales: 'record.CBALECOUNT',
      AMSProdAcct: 'record.CPROD_ACCT',
      Grade: 'record.GRADE',
      Staple: 'record.STAPLE',
      MIC: 'record.MIC',
      Strength: 'record.STRENGTH',
      Leaf: 'record.LEAF',
      ExtMat: 'record.EXT_MATTER',
      Remarks: 'record.REMARKS',
      HVIColorCode: '$',
      HVIColorQuad: '$',
      HVIColorRed: 'record.COLOR_RD',
      HVIColorB: 'record.COLOR_B',
      HVITrash: 'record.TRASH',
      Len100s: 'record.LENGTH',
      Uniformity: 'record.UNIFORM',
      PIMA: '$',
      ClassCardType: 'record.CARD_TYPE',
      LoanOffset: 'record.LOAN_NUM',
      Version: '$'
    }
  }
}
//Note: the map files are not the maps used in my parseJson. the map and data comes from jay website or aws
export async function parseJson(toParse: any, configObjs: any) {
  var result = DataTransform.transform(toParse, configObjs.map) //in order to change to output to a array format use "objectify". see https://www.npmjs.com/package/json-transformer-node for more more info
  console.log(JSON.stringify(result))
  let rec = new tapTypes.streamRecord()
  rec.stream = 'JSON transform'
  rec.time_extracted = new Date()
  rec.record = result
  return rec
}
/*
"Label" : "",
    "Erecap" : "",
    "Listed" : "",
    "SentToWhs" : "",
    "BaleDate" : "",
    "WhsTag" : "",
    "WhsCode" : "",
    "CropYear" : "",
    "WhsDate" : "",
    "WhsNet" : "",
    "TareWt" : "",
    "BagType" : "05",
    "Compression" : "",
    "BagCond" : "",
    "ClassDate" : "",
    "ModAvgLoadType" : "",
    "ModAvgLoadNum" : "",
    "ModAvgNumBales" : "",
    "AMSProdAcct" : "",
    "Grade" : "",
    "Staple" : "",
    "MIC" : "",
    "Strength" : "",
    "Leaf" : "",
    "ExtMat" : "",
    "Remarks" : "",
    "HVIColorCode" : "",
    "HVIColorQuad" : "",
    "HVIColorRed" : "",
    "HVIColorB" : "",
    "HVITrash" : "",
    "Len100s" : "",
    "Uniformity" : "",
    "PIMA" : "",
    "ClassCardType" : "",
    "LoanOffset" : "",
    "Version" : "" */
