/* eslint-disable no-unused-expressions */
import { it, describe, beforeEach, afterEach } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'
import {
  PutRecordCommand,
  PutRecordsCommand
} from '@aws-sdk/client-kinesis'
// import './test-setup.mjs'
import * as lib from '../../kinesis/client.mjs'

const context = describe

describe('kinesis/client.mjs', () => {
  let box
  beforeEach(() => { box = sinon.createSandbox() })

  afterEach(() => { box.restore() })

  it('should export an object named client', async () => {
    expect(lib.client).to.be.an('object')
  })

  describe('#client', () => {
    context('Before the first call', () => {
      it('should have _client as undefined', async () => {
        const o = lib.createHelper()
        expect(o._client).to.be.undefined
      })
    })

    context('Aefore the first call', () => {
      it('should be an instance of the input class', async () => {
        class TestClass {}
        const o = lib.createHelper(undefined, TestClass)
        const client = o.client
        expect(client).to.instanceof(TestClass)
        expect(o._client).to.equal(client)
      })
    })
  })

  describe('#putRecord', () => {
    context('when called with VALID argument', () => {
      it('should call client.send with the correct arguments', async () => {
        const o = lib.createHelper()
        const client = o.client
        const stub = box.stub(client, 'send')
        const params = { some: 'params' }

        await o.putRecord(params)
        expect(stub.calledOnce).to.be.true
        const [firstInvocationArgs] = stub.args
        expect(firstInvocationArgs[0]).to.be.instanceof(PutRecordCommand)
        expect(firstInvocationArgs[0].input).to.deep.equal(params)
      })
    })
  })

  describe('#putRecords', () => {
    context('when called with VALID argument', () => {
      it('should call client.send with the correct arguments', async () => {
        const o = lib.createHelper()
        const client = o.client
        const stub = box.stub(client, 'send')
        const params = { some: 'params' }

        await o.putRecords(params)
        expect(stub.calledOnce).to.be.true
        const [firstInvocationArgs] = stub.args
        expect(firstInvocationArgs[0]).to.be.instanceof(PutRecordsCommand)
        expect(firstInvocationArgs[0].input).to.deep.equal(params)
      })
    })
  })
})
