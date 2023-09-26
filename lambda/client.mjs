import {
  LambdaClient,
  GetFunctionConfigurationCommand,
  UpdateFunctionConfigurationCommand
} from '@aws-sdk/client-lambda'

export const createHelper = (LambdaClientClass = LambdaClient) => ({
  _client: undefined,
  get client () {
    if (this._client == null) {
      this._client = new LambdaClientClass({ region: process.env.AWS_REGION })
    }

    return this._client
  },

  getFunctionConfiguration (params) {
    return this.client.send(new GetFunctionConfigurationCommand(params))
  },

  pdateFunctionConfiguration (params) {
    return this.client.send(new UpdateFunctionConfigurationCommand(params))
  }
})

export const client = createHelper()

export default {
  client,
  createHelper
}
