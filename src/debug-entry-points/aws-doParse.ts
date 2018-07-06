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
  resource: '/doParse',
  path: '/doParse',
  httpMethod: 'POST',
  headers: null,
  queryStringParameters: null,
  pathParameters: null,
  stageVariables: null,
  requestContext: {
    path: '/doParse',
    accountId: '540471531016',
    resourceId: 'rl6k0w',
    stage: 'test-invoke-stage',
    requestId: '7535ec60-7b48-11e8-8b23-6d7699f2ee0b',
    identity: {
      cognitoIdentityPoolId: null,
      cognitoIdentityId: null,
      apiKey: 'test-invoke-api-key',
      cognitoAuthenticationType: null,
      userArn: 'arn:aws:iam::540471531016:root',
      apiKeyId: 'test-invoke-api-key-id',
      userAgent: 'aws-internal/3',
      accountId: '540471531016',
      caller: '540471531016',
      sourceIp: 'test-invoke-source-ip',
      accessKey: 'ASIAIXWF7LBAGGMZ64SA',
      cognitoAuthenticationProvider: null,
      user: '540471531016'
    },
    resourcePath: '/doParse',
    httpMethod: 'POST',
    extendedRequestId: 'JOYH5F9PvHcF3RA=',
    apiId: 'km898b6ahb'
  },
  body:
    '{"toParse":"Mime-Version: 1.0 (Apple Message framework v730)\\r\\nContent-Type: multipart/mixed; boundary=Apple-Mail-13-196941151\\r\\nMessage-Id: <9169D984-4E0B-45EF-82D4-8F5E53AD7012@example.com>\\r\\nFrom: foo@example.com\\r\\nSubject: testing\\r\\nDate: Mon, 6 Jun 2005 22:21:22 +0200\\r\\nTo: blah@example.com\\r\\n\\r\\n\\r\\n--Apple-Mail-13-196941151\\r\\nContent-Transfer-Encoding: quoted-printable\\r\\nContent-Type: text/plain;\\r\\n\\tcharset=ISO-8859-1;\\r\\n\\tdelsp=yes;\\r\\n\\tformat=flowed\\r\\n\\r\\nThis is the first part.\\r\\n\\r\\n--Apple-Mail-13-196941151\\r\\nContent-Type: text/plain; name=This is a test.txt\\r\\nContent-Transfer-Encoding: 7bit\\r\\nContent-Disposition: attachment;\\r\\n\\tfilename=This is a test.txt\\r\\n\\r\\nHi there.\\r\\n\\r\\n--Apple-Mail-13-196941151--",\n"config":"{\\"config\\":{\\r\\n    \\"target_folder\\" : \\"./testdata\\",\\r\\n    \\"start_date\\" : \\"2017-01-01T00:00:00Z\\",\\r\\n    \\"user_agent\\" : \\"Stitch (+support@stitchdata.com)\\"\\r\\n  }\\r\\n}"\n}',
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

handler.doParse(lambdaEvent1, {}, callback)
