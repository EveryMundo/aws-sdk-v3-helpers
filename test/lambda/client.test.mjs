/* eslint-disable no-unused-expressions */
import { it, describe, beforeEach, afterEach } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'
import {
  InvokeCommand,
  GetFunctionConfigurationCommand,
  UpdateFunctionConfigurationCommand
} from '@aws-sdk/client-lambda'

const context = describe
// import './test-setup.mjs'
import * as lib from '../../lambda/client.mjs'

describe('lambda/client.mjs', () => {
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

  describe('#invoke', () => {
    context('when called with VALID argument', () => {
      it('should call client.send with the correct arguments', async () => {
        const o = lib.createHelper()
        const client = o.client
        const stub = box.stub(client, 'send')
        const params = { some: 'params' }

        await o.invoke(params)
        expect(stub.calledOnce).to.be.true
        const [firstInvocationArgs] = stub.args
        expect(firstInvocationArgs[0]).to.be.instanceof(InvokeCommand)
        expect(firstInvocationArgs[0].input).to.deep.equal(params)
      })
    })

    context('when called with VALID argument and payload', () => {
      it('should call client.send with the correct arguments', async () => {
        const o = lib.createHelper()
        const client = o.client
        const stub = box.stub(client, 'send')
        const params = { some: 'params' }
        const payload = { some: 'payload' }

        await o.invoke(params, payload)
        expect(stub.calledOnce).to.be.true
        const [firstInvocationArgs] = stub.args
        expect(firstInvocationArgs[0]).to.be.instanceof(InvokeCommand)
      })
    })
  })
  describe('#getFunctionConfiguration', () => {
    context('when called with VALID argument', () => {
      it('should call client.send with the correct arguments', async () => {
        const o = lib.createHelper()
        const client = o.client
        const stub = box.stub(client, 'send')
        const params = { some: 'params' }

        await o.getFunctionConfiguration(params)
        expect(stub.calledOnce).to.be.true
        const [firstInvocationArgs] = stub.args
        expect(firstInvocationArgs[0]).to.be.instanceof(GetFunctionConfigurationCommand)
        expect(firstInvocationArgs[0].input).to.deep.equal(params)
      })
    })
  })

  describe('#updateFunctionConfiguration', () => {
    context('when called with VALID argument', () => {
      it('should call client.send with the correct arguments', async () => {
        const o = lib.createHelper()
        const client = o.client
        const stub = box.stub(client, 'send')
        const params = { some: 'params' }

        await o.updateFunctionConfiguration(params)
        expect(stub.calledOnce).to.be.true
        const [firstInvocationArgs] = stub.args
        expect(firstInvocationArgs[0]).to.be.instanceof(UpdateFunctionConfigurationCommand)
        expect(firstInvocationArgs[0].input).to.deep.equal(params)
      })
    })
  })
})
