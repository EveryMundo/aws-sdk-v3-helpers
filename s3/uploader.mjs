import {
  CreateMultipartUploadCommand,
  UploadPartCommand,
  CompleteMultipartUploadCommand,
  AbortMultipartUploadCommand
} from '@aws-sdk/client-s3'

import { s3 } from './client.mjs'

export class S3MultiPart {
  static get s3Client () {
    if (!this._s3Client) {
      // this._s3Client = new S3Client({})
      this._s3Client = s3.client
    }

    return this._s3Client
  }

  constructor (bucketName, key, s3Client = S3MultiPart.s3Client) {
    this.s3Client = s3Client
    this.bucketName = bucketName
    this.key = key
  }

  async createMultipartUpload () {
    const command = new CreateMultipartUploadCommand({
      Bucket: this.bucketName,
      Key: this.key
    })

    const mpUpload = await this.s3Client.send(command)

    this.uploadId = mpUpload.UploadId

    return mpUpload
  }

  async uploadPart (PartNumber, Body) {
    if (this.uploadId == null) {
      try {
        await this.createMultipartUpload()
      } catch (e) {
        console.error(e)
        throw e
      }
    }

    const command = new UploadPartCommand({
      Bucket: this.bucketName,
      Key: this.key,
      UploadId: this.uploadId,
      Body,
      PartNumber
    })

    return this.s3Client.send(command)
  }

  async completeMultipartUpload (Parts) {
    const command = new CompleteMultipartUploadCommand({
      Bucket: this.bucketName,
      Key: this.key,
      UploadId: this.uploadId,
      MultipartUpload: { Parts }
    })

    return this.s3Client.send(command)

    // const completeCommand = new CompleteMultipartUploadCommand({
    //   Bucket: bucketName,
    //   Key: key,
    //   UploadId,
    //   MultipartUpload: { Parts }
    // })

    // await S3MultiPart.s3Client.send(completeCommand)
  }

  async abortMultipartUpload () {
    if (!this.uploadId) return

    const command = new AbortMultipartUploadCommand({
      Bucket: this.bucketName,
      Key: this.key,
      UploadId: this.uploadId
    })

    return this.s3Client.send(command)
  }
}
