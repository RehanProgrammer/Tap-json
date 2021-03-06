/**
 * The exports in this file can be set as "handlers" (entry points) for AWS Lambda functions;
 * e.g. ```export function hello...``` in handler.js is accessible as "handler.hello".
 *
 * For automated Serverless deployment this is setup is managed in serverless.yml.
 * Search for handler.hello to see how is is done.
 */ /** hack for https://github.com/TypeStrong/typedoc/issues/603 */

import getFile = require('./s3-getfile')
import * as fse from 'fs-extra'
//import { parseItem } from '../tap-main'
import { parseJson } from '../tap-main'
import * as tapTypes from '../singer/tap-types'

// response object for Lambda Proxy integration; see https://serverless.com/framework/docs/providers/aws/events/apigateway/
class lambdaResponse {
  statusCode: number = 200
  headers: object = {
    // TODO: limit to a whitelist of allowed sites
    'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
  }
  body: string = '' // set response body here
}

export function hello(event: any, context: any, callback: any) {
  console.log('it hit me')
  const response = new lambdaResponse()
  response.body = JSON.stringify({
    message: 'Hello! Your function executed successfully!',
    lambdaEvent: event
  })

  callback(null, response)

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Hello! Your function executed successfully!', event });
}

export async function doParse(event: any, context: any, callback: any) {
  const response = new lambdaResponse()
  response.body = JSON.stringify({ message: 'this is a dummy body and should be replaced.' })

  try {
    const body = JSON.parse(event.body)
    //console.log(event) // uncomment this to dump a copy of the "lambdaEvent" to CloudWatch log, so you can update your aws-*.ts file with a good "test" copy of that event...
    // ..that contains the custom fields needed by your particular parser

    let toParse = body.toParse
    let config = <tapTypes.allConfigs>body.config
    response.body = JSON.stringify(await parseJson(toParse, config))
    callback(null, response)
  } catch (err) {
    console.log(err)
    response.statusCode = 500
    response.body = JSON.stringify({ message: 'an error has occurred' })
    // not returning as an error, per callback (error param is still null), but setting response to represent the error
    callback(null, response)
    //callback(new Error("an error has occurred"))
    // These errors aren't getting passed all the way back through API Gateway, no matter what we do here. Set up API Gateway
    // appears to be required: https://aws.amazon.com/blogs/compute/error-handling-patterns-in-amazon-api-gateway-and-aws-lambda/
    // https://aws.amazon.com/premiumsupport/knowledge-center/malformed-502-api-gateway/
    return
  }
}

export function handleFileTrigger(event: any, context: any, callback: any) {
  const response = new lambdaResponse()
  const body = JSON.parse(event.body)
  let toParse = body.toParse
  let config = <tapTypes.allConfigs>body.config
  function handleFile(contents: any) {
    console.log('File Contents: \n' + contents)
    parseJson(contents, config).then(function(parsedObj: Object) {
      console.log('Parsed Contents: \n' + JSON.stringify(parsedObj))
      response.body = JSON.stringify(parsedObj)
    })
  }

  if (typeof event === 'string') {
    // if event is a string then we are running locally (because on AWS event is always an object) and the string represents a filename
    fse.readFile(event).then(function(buffer: Buffer) {
      handleFile(buffer)
      callback(null, response)
    })
  } else {
    getFile
      .getFilePromise(event.Records[0]) // this grabs only the first record, assuming we'll always only receive one at a time
      .then(function(value: any) {
        handleFile(value)
        return value
      })
      .catch(function(error: any) {
        // Handle any error from all above steps
        console.log('final error: ', error)
        return error
      })
      .then(function(finalResult: any) {
        // final .then replaces .finally
        callback(null, response)
      })
  }
}
