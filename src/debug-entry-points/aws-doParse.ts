/**
 * This module is the entry point for a local code path that mocks an HTTP POST call to AWS Lambda via API Gateway;
 * see [here](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-handler.html)
 */

/** this is a dummy single-line comment needed for documentation build; a hack for https://github.com/TypeStrong/typedoc/issues/603 */

import * as handler from '../aws/handler'

function callback(error: any, result: Object) {
  if (error) {
    console.log('ERROR!')
    console.log(JSON.stringify(error))
  } else {
    console.log('OK!')
    console.log(JSON.stringify(result))
  }
}

/**
 * lambdaEvent is from a Lambda POST call; body is the "request body", or payload, of the POST call--sent by the caller
 * Retrieve a new version of this--search for "lambdaEvent" in handler.ts
 */
let lambdaEvent = {
  resource: '/doparse',
  path: '/doparse',
  httpMethod: 'POST',
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-US,en;q=0.9',
    'CloudFront-Forwarded-Proto': 'https',
    'CloudFront-Is-Desktop-Viewer': 'true',
    'CloudFront-Is-Mobile-Viewer': 'false',
    'CloudFront-Is-SmartTV-Viewer': 'false',
    'CloudFront-Is-Tablet-Viewer': 'false',
    'CloudFront-Viewer-Country': 'US',
    'content-type': 'text/plain',
    Host: 'ookskinyxa.execute-api.us-west-2.amazonaws.com',
    origin: 'https://priceless-stonebraker-28f31a.netlify.com',
    Referer: 'https://priceless-stonebraker-28f31a.netlify.com/page-3',
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36',
    Via: '2.0 8ef95d493d865f4668c02b9fe8b8f1e5.cloudfront.net (CloudFront)',
    'X-Amz-Cf-Id': 'Y5Wwqp1xc1UWSPiThY3uwLr_VbXr2eWzvygsnsmF2T4CPrH3BoGURg==',
    'X-Amzn-Trace-Id': 'Root=1-5b466a27-e56aa5d464b0c9d4386a22b2',
    'X-Forwarded-For': '65.182.85.9, 70.132.9.108',
    'X-Forwarded-Port': '443',
    'X-Forwarded-Proto': 'https'
  },
  queryStringParameters: null,
  pathParameters: null,
  stageVariables: null,
  requestContext: {
    resourceId: '0375q4',
    resourcePath: '/doparse',
    httpMethod: 'POST',
    extendedRequestId: 'J4WGOHJIPHcFs1g=',
    requestTime: '11/Jul/2018:20:35:51 +0000',
    path: '/dev/doparse',
    accountId: '895843423532',
    protocol: 'HTTP/1.1',
    stage: 'dev',
    requestTimeEpoch: 1531341351853,
    requestId: '00932f37-854a-11e8-aabe-69501dceb634',
    identity: {
      cognitoIdentityPoolId: null,
      accountId: null,
      cognitoIdentityId: null,
      caller: null,
      sourceIp: '65.182.85.9',
      accessKey: null,
      cognitoAuthenticationType: null,
      cognitoAuthenticationProvider: null,
      userArn: null,
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36',
      user: null
    },
    apiId: 'ookskinyxa'
  },
  body:
    '{"toParse":{"userEntered":{"User Password":"ANITA","HolderTo":"Z439664","EAD Holder":"y"},"deliveryMethod":"Ewr","extraInfo":{"WhsCode":"880533","WhsTag":"0901997","CropYear":2017,"ConnectUsing":"Sync","FtpHost":"ftp.ewrinc.net","FtpLogin":"Z439664","FtpPassword":"texo2514","HolderId":"Z439664","UserId":"MORTON","BatchNum":"1519","CreateDate":"2018-01-22T18:00:00Z","CreateTime":"08:30:38"},"entities":[{"WhsCode":"880533","WhsTag":"0901997","CropYear":2017},{"WhsCode":"880533","WhsTag":"0901998","CropYear":2017},{"WhsCode":"880533","WhsTag":"0901999","CropYear":2017},{"WhsCode":"880533","WhsTag":"0902000","CropYear":2017},{"WhsCode":"880533","WhsTag":"0902001","CropYear":2017}]},"config":{"start_date":"2017-01-01T00:00:00Z","user_agent":"Stitch (+support@stitchdata.com)","map":{"mapping":{"item":{"Bale":[{"list":"entities","item":{"Warehouse Code":"WhsCode","Electronic Receipt Number":"WhsTag","Crop Year":"CropYear(NUMBER)","Purchase Order Number":"$","Invoice Number":"$","Mark":"$","Grower Reference Number":"$0"}}]}}}}}',
  isBase64Encoded: false
}

let lambdaEvent1 = {
  resource: '/doparse',
  path: '/doparse',
  httpMethod: 'POST',
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-US,en;q=0.9',
    'CloudFront-Forwarded-Proto': 'https',
    'CloudFront-Is-Desktop-Viewer': 'true',
    'CloudFront-Is-Mobile-Viewer': 'false',
    'CloudFront-Is-SmartTV-Viewer': 'false',
    'CloudFront-Is-Tablet-Viewer': 'false',
    'CloudFront-Viewer-Country': 'US',
    'content-type': 'text/plain',
    Host: 'ookskinyxa.execute-api.us-west-2.amazonaws.com',
    origin: 'https://priceless-stonebraker-28f31a.netlify.com',
    Referer: 'https://priceless-stonebraker-28f31a.netlify.com/page-3',
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36',
    Via: '2.0 e87cddaecfdfe4a2224e7886a96f09ac.cloudfront.net (CloudFront)',
    'X-Amz-Cf-Id': '-V5FeEvQMuKLnjE8hj_jFckoA-k5dGytHnOap6_Cmg0L4cmskwItnA==',
    'X-Amzn-Trace-Id': 'Root=1-5b3fcd7a-845b9d5639e51d3e1daf454a',
    'X-Forwarded-For': '65.182.85.9, 54.240.149.145',
    'X-Forwarded-Port': '443',
    'X-Forwarded-Proto': 'https'
  },
  queryStringParameters: null,
  pathParameters: null,
  stageVariables: null,
  requestContext: {
    resourceId: '0375q4',
    resourcePath: '/doparse',
    httpMethod: 'POST',
    extendedRequestId: 'Jn0LLFSsvHcFufA=',
    requestTime: '06/Jul/2018:20:13:46 +0000',
    path: '/dev/doparse',
    accountId: '895843423532',
    protocol: 'HTTP/1.1',
    stage: 'dev',
    requestTimeEpoch: 1530908026784,
    requestId: '16b51a1b-8159-11e8-a4ad-03a0e8d81039',
    identity: {
      cognitoIdentityPoolId: null,
      accountId: null,
      cognitoIdentityId: null,
      caller: null,
      sourceIp: '65.182.85.9',
      accessKey: null,
      cognitoAuthenticationType: null,
      cognitoAuthenticationProvider: null,
      userArn: null,
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36',
      user: null
    },
    apiId: 'ookskinyxa'
  },
  body:
    '{"toParse":{"ModuleId":[{"Name":"ModuleId","Start":0,"Length":0,"DataType":"Alphanumeric","Description":"Module ID","Picture":"","ignoreOnImport":false,"Template":"","Value":"","ToCanonical":[{"match":"^\\\\s*(.{15})","replace":""}],"FromCanonical":[]}]},"config":{"start_date":"2017-01-01T00:00:00Z","user_agent":"Stitch (+support@stitchdata.com)","map":{"list":"ModuleId","item":{"tapName":"Name"}}}}',
  isBase64Encoded: false
}

handler.doParse(lambdaEvent, {}, callback)
