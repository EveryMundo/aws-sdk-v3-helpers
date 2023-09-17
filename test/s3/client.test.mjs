/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import sinon from 'sinon'
import { GetObjectCommand, PutObjectCommand, HeadObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3'
import { it, describe, beforeEach, afterEach } from 'mocha'

const context = describe
// import './test-setup.mjs'
// import * as lib from '../../lib/s3-client.js'
import lib from '../../s3/client.mjs'

describe('s3/client.mjs', () => {
  let box
  beforeEach(() => { box = sinon.createSandbox() })

  afterEach(() => { box.restore() })

  it('should export an object named s3', async () => {
    expect(lib.s3).to.be.an('object')
  })

  describe('#client', () => {
    context('Before the first call', () => {
      it('should have _client as undefined', async () => {
        const s3 = lib.createS3Helper()
        expect(s3._client).to.be.undefined
      })
    })

    context('Aefore the first call', () => {
      it('should be an instance of the input class', async () => {
        class TestClass {}
        const s3 = lib.createS3Helper(TestClass)
        const client = s3.client
        expect(client).to.instanceof(TestClass)
        expect(s3._client).to.equal(client)
      })
    })
  })

  describe('#getObject', () => {
    context('when called with VALID argument', () => {
      it('should call client.send with the correct arguments', async () => {
        const s3 = lib.createS3Helper()
        const client = s3.client
        const stub = box.stub(client, 'send')
        const params = { some: 'params' }

        await s3.getObject(params)
        expect(stub.calledOnce).to.be.true
        const [firstInvocationArgs] = stub.args
        expect(firstInvocationArgs[0]).to.be.instanceof(GetObjectCommand)
        expect(firstInvocationArgs[0].input).to.deep.equal(params)
      })
    })
  })

  describe('#putObject', () => {
    context('when called with VALID argument', () => {
      it('should call client.send with the correct arguments', async () => {
        const s3 = lib.createS3Helper()
        const client = s3.client
        const stub = box.stub(client, 'send')
        const params = { some: 'params' }

        await s3.putObject(params)
        expect(stub.calledOnce).to.be.true
        const [firstInvocationArgs] = stub.args
        expect(firstInvocationArgs[0]).to.be.instanceof(PutObjectCommand)
        expect(firstInvocationArgs[0].input).to.deep.equal(params)
      })
    })
  })

  describe('#headObject', () => {
    context('when called with VALID argument', () => {
      it('should call client.send with the correct arguments', async () => {
        const s3 = lib.createS3Helper()
        const client = s3.client
        const stub = box.stub(client, 'send')
        const params = { some: 'params' }

        await s3.headObject(params)
        expect(stub.calledOnce).to.be.true
        const [firstInvocationArgs] = stub.args
        expect(firstInvocationArgs[0]).to.be.instanceof(HeadObjectCommand)
        expect(firstInvocationArgs[0].input).to.deep.equal(params)
      })
    })
  })

  describe('#listObjectsV2', () => {
    context('when called with VALID argument', () => {
      it('should call client.send with the correct arguments', async () => {
        const s3 = lib.createS3Helper()
        const client = s3.client
        const stub = box.stub(client, 'send')
        const params = { some: 'params' }

        await s3.listObjectsV2(params)
        expect(stub.calledOnce).to.be.true
        const [firstInvocationArgs] = stub.args
        expect(firstInvocationArgs[0]).to.be.instanceof(ListObjectsV2Command)
        expect(firstInvocationArgs[0].input).to.deep.equal(params)
      })
    })
  })

  describe('#readBody', () => {
    context('when called with VALID argument', () => {
      it('should read the stream', async () => {
        const stream = await import('node:stream')
        const passThroughStream = new stream.PassThrough()

        const promise = lib.readBody(passThroughStream)

        passThroughStream.write('hello ')
        passThroughStream.write('world')
        passThroughStream.end('!')

        const res = await promise
        expect(res).to.be.instanceof(Buffer)
        expect(res.toString()).to.equal('hello world!')
      })
    })
  })
})
