import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'

const createS3Helper = (S3ClientClass = S3Client) => ({
  _client: undefined,
  get client () {
    if (this._client == null) {
      this._client = new S3ClientClass({ region: process.env.AWS_REGION })
    }

    return this._client
  },

  getObject (params) {
    return this.client.send(new GetObjectCommand(params))
  },

  putObject (params) {
    return this.client.send(new PutObjectCommand(params))
  }
})

export const s3 = createS3Helper()
export default { createS3Helper, s3 }
