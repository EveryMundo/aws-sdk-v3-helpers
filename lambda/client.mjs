import {
  LambdaClient,
  InvokeCommand,
  GetFunctionConfigurationCommand,
  UpdateFunctionConfigurationCommand
} from '@aws-sdk/client-lambda'

import { AWSHelper } from '../lib/classes/AWSHelper.class.mjs'

export const createHelper = (region, ClientClass) => new LambdaHelper(region, ClientClass)

export class LambdaHelper extends AWSHelper {
  constructor (region = process.env.AWS_REGION, ClientClass = LambdaClient) {
    super(region, ClientClass)
  }

  invoke (params) {
    return this._client.send(new InvokeCommand(params))
  }

  getFunctionConfiguration (params) {
    return this._client.send(new GetFunctionConfigurationCommand(params))
  }

  updateFunctionConfiguration (params) {
    return this._client.send(new UpdateFunctionConfigurationCommand(params))
  }
}

export const client = createHelper()

export default {
  client,
  createHelper
}
