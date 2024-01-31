export class AWSHelper {
  _client = undefined
  region = undefined
  ClientClass = undefined

  constructor (region, ClientClass) {
    if (ClientClass instanceof Function === false) throw new Error('ClientClass must be a class')

    this.region = region
    this.ClientClass = ClientClass
  }

  get client () {
    if (this._client == null) {
      this._client = new this.ClientClass({
        region: this.region,
        endpoint: process.env.AWS_ENDPOINT
      })
    }

    return this._client
  }
}
