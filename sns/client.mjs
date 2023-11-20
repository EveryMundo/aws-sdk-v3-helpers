import { SNSClient, PublishCommand, PublishBatchCommand } from '@aws-sdk/client-sns'

const createHelper = (region = process.env.AWS_REGION, SNSClientClass = SNSClient) => ({
  _client: undefined,
  get client () {
    if (this._client == null) {
      this._client = new SNSClientClass({ region })
    }

    return this._client
  },

  publishBatch (params) {
    return this.client.send(new PublishBatchCommand(params))
  },

  publish (params) {
    return this.client.send(new PublishCommand(params))
  }
})

export const sns = createHelper()
export const client = sns
export const createSNSHelper = createHelper

export default {
  createSNSHelper,
  sns,
  client,
  createHelper
}
