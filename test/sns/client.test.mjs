/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import sinon from 'sinon'
import { PublishCommand, PublishBatchCommand } from '@aws-sdk/client-sns'

// import '../test-setup.js'
// import * as lib from '../../lib/sns-client.js'
import lib from '../../sns/client.mjs'

describe('sns/client.mjs', () => {
  let box
  beforeEach(() => { box = sinon.createSandbox() })

  afterEach(() => { box.restore() })

  it('should export an object named sns', async () => {
    expect(lib.sns).to.be.an('object')
  })

  describe('#client', () => {
    describe('Before the first call', () => {
      it('should have _client as undefined', async () => {
        const sns = lib.createHelper()
        expect(sns._client).to.be.undefined
      })
    })

    describe('Aefore the first call', () => {
      it('should be an instance of the input class', async () => {
        class TestClass {}
        const sns = lib.createHelper(undefined, TestClass)
        const client = sns.client
        expect(client).to.instanceof(TestClass)
        expect(sns._client).to.equal(client)
      })
    })
  })

  describe('#publishBatch', () => {
    describe('when called with VALID argument', () => {
      it('should call client.send with the correct arguments', async () => {
        const sns = lib.createHelper()
        const client = sns.client
        const stub = box.stub(client, 'send')
        const params = { some: 'params' }

        await sns.publishBatch(params)
        expect(stub.calledOnce).to.be.true
        const [firstInvocationArgs] = stub.args
        expect(firstInvocationArgs[0]).to.be.instanceof(PublishBatchCommand)
        expect(firstInvocationArgs[0].input).to.deep.equal(params)
      })
    })
  })

  describe('#publish', () => {
    describe('when called with VALID argument', () => {
      it('should call client.send with the correct arguments', async () => {
        const sns = lib.createHelper()
        const client = sns.client
        const stub = box.stub(client, 'send')
        const params = { some: 'params' }

        await sns.publish(params)
        expect(stub.calledOnce).to.be.true
        const [firstInvocationArgs] = stub.args
        expect(firstInvocationArgs[0]).to.be.instanceof(PublishCommand)
        expect(firstInvocationArgs[0].input).to.deep.equal(params)
      })
    })
  })
})
