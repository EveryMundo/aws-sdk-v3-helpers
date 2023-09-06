/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import sinon from 'sinon'
import {
  CreateMultipartUploadCommand,
  UploadPartCommand,
  CompleteMultipartUploadCommand,
  AbortMultipartUploadCommand // ,
  // S3Client
} from '@aws-sdk/client-s3'

import s3Lib from '../s3/client.mjs'

// import '../test-setup.js'
// import * as lib from '../../lib/s3-uploader.mjs'
import { S3MultiPart } from '../s3/uploader.mjs'

describe('s3/uploader.mjs', () => {
  let box
  beforeEach(() => { box = sinon.createSandbox() })

  afterEach(() => { box.restore() })

  it('should export a class', async () => {
    expect(S3MultiPart).to.be.a('function')
    expect(S3MultiPart.toString().slice(0, 5)).to.equal('class')
  })

  describe('#S3MultiPart', () => {
    let fakeS3Client
    let instance

    beforeEach(() => {
      fakeS3Client = { send () {} }

      box.stub(s3Lib.s3, 'client').value(fakeS3Client)
      instance = new S3MultiPart('test-bucket', 'test-key')
      box.stub(instance.s3Client, 'send').callsFake(() => {
        return {
          UploadId: 'test-upload-id'
        }
      })
    })

    it('should have a static property name s3Client', async () => {
      expect(S3MultiPart).to.have.property('s3Client', fakeS3Client)
    })

    describe('#createMultipartUpload', () => {
      it('should call createMultipartUpload once with a CreateMultipartUploadCommand', async () => {
        const res = await instance.createMultipartUpload()
        expect(res).to.have.property('UploadId', 'test-upload-id')
        expect(instance.s3Client.send).to.have.property('calledOnce', true)
        const [firstInvocationArgs] = instance.s3Client.send.args
        expect(firstInvocationArgs[0]).to.be.instanceof(CreateMultipartUploadCommand)
      })
    })

    describe('#uploadPart', () => {
      context('When instance.uploadId is falsy', () => {
        it('should call send twice, with CreateMultipartUploadCommand then UploadPartCommand', async () => {
          const res = await instance.uploadPart()
          expect(res).to.have.property('UploadId', 'test-upload-id')
          expect(instance.s3Client.send).to.have.property('calledTwice', true)
          const [firstInvocationArgs, secondInvocationArgs] = instance.s3Client.send.args
          expect(firstInvocationArgs[0]).to.be.instanceof(CreateMultipartUploadCommand)
          expect(secondInvocationArgs[0]).to.be.instanceof(UploadPartCommand)
        })

        context('when CreateMultipartUpload throws one', () => {
          it('should throw an error', async () => {
            instance.s3Client.send.onCall(0).throws(new Error('test error'))
            const res = await instance.uploadPart().catch(err => err)
            expect(res).to.be.instanceof(Error, 'test error')
          })
        })
      })

      context('When instance.uploadId is falsy', () => {
        it('should call send once with UploadPartCommand', async () => {
          instance.uploadId = 'test-upload-id'
          const res = await instance.uploadPart()
          expect(res).to.have.property('UploadId', 'test-upload-id')
          expect(instance.s3Client.send).to.have.property('calledOnce', true)
          const [firstInvocationArgs] = instance.s3Client.send.args
          expect(firstInvocationArgs[0]).to.be.instanceof(UploadPartCommand)
        })
      })
    })

    it('should call completeMultipartUpload once with a CompleteMultipartUploadCommand', async () => {
      const res = await instance.completeMultipartUpload()
      expect(res).to.have.property('UploadId', 'test-upload-id')
      expect(instance.s3Client.send).to.have.property('calledOnce', true)
      const [firstInvocationArgs] = instance.s3Client.send.args
      expect(firstInvocationArgs[0]).to.be.instanceof(CompleteMultipartUploadCommand)
    })

    describe('#abortMultipartUpload', () => {
      context('When instance.uploadId is falsy', () => {
        it('should return undefined', async () => {
          const res = await instance.abortMultipartUpload()
          expect(res).to.be.undefined
          expect(instance.s3Client.send).to.have.property('calledOnce', false)
        })
      })

      context('When instance.uploadId is valid', () => {
        it('should call abortMultipartUpload once with a AbortMultipartUploadCommand', async () => {
          instance.uploadId = 'test-upload-id'
          const res = await instance.abortMultipartUpload()
          expect(res).to.have.property('UploadId', 'test-upload-id')
          expect(instance.s3Client.send).to.have.property('calledOnce', true)
          const [firstInvocationArgs] = instance.s3Client.send.args
          expect(firstInvocationArgs[0]).to.be.instanceof(AbortMultipartUploadCommand)
        })
      })
    })
    // describe('#initialize')
  })

  context('A brand new instance', () => {
    const bucketName = 'test-bucket'
    const key = 'test-key'
    const s3Client = {}
    const instance = new S3MultiPart(bucketName, key, s3Client)

    it('should have s3Client as passed', async () => {
      expect(instance).to.have.property('s3Client', s3Client)
    })

    it('should have bucketName as passed', async () => {
      expect(instance).to.have.property('bucketName', bucketName)
    })

    it('should have key as passed', async () => {
      expect(instance).to.have.property('key', key)
    })
  })
})
