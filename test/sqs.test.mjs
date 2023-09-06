/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import sinon from 'sinon'
import { SendMessageCommand, SendMessageBatchCommand } from '@aws-sdk/client-sqs'

// import '../test-setup.js'
// import * as lib from '../../lib/sqs-client.js'
import lib from '../sqs/client.mjs'

describe('sqs/client.mjs', () => {
  let box
  beforeEach(() => { box = sinon.createSandbox() })

  afterEach(() => { box.restore() })

  it('should export an object named sqs', async () => {
    expect(lib.sqs).to.be.an('object')
  })

  describe('#client', () => {
    context('Before the first call', () => {
      it('should have _client as undefined', async () => {
        const sqs = lib.createSQSHelper()
        expect(sqs._client).to.be.undefined
      })
    })

    context('Aefore the first call', () => {
      it('should be an instance of the input class', async () => {
        class TestClass {}
        const sqs = lib.createSQSHelper(TestClass)
        const client = sqs.client
        expect(client).to.instanceof(TestClass)
        expect(sqs._client).to.equal(client)
      })
    })
  })

  describe('#sendMessageBatch', () => {
    context('when called with VALID argument', () => {
      it('should call client.send with the correct arguments', async () => {
        const sqs = lib.createSQSHelper()
        const client = sqs.client
        const stub = box.stub(client, 'send')
        const params = { some: 'params' }

        await sqs.sendMessageBatch(params)
        expect(stub.calledOnce).to.be.true
        const [firstInvocationArgs] = stub.args
        expect(firstInvocationArgs[0]).to.be.instanceof(SendMessageBatchCommand)
        expect(firstInvocationArgs[0].input).to.deep.equal(params)
      })
    })
  })

  describe('#sendMessage', () => {
    context('when called with VALID argument', () => {
      it('should call client.send with the correct arguments', async () => {
        const sqs = lib.createSQSHelper()
        const client = sqs.client
        const stub = box.stub(client, 'send')
        const params = { some: 'params' }

        await sqs.sendMessage(params)
        expect(stub.calledOnce).to.be.true
        const [firstInvocationArgs] = stub.args
        expect(firstInvocationArgs[0]).to.be.instanceof(SendMessageCommand)
        expect(firstInvocationArgs[0].input).to.deep.equal(params)
      })
    })
  })
})
