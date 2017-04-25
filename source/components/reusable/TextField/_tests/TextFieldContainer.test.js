import React from 'react'
import sinon from 'sinon'
import {
  mount
} from 'enzyme'
import moxios from 'moxios'
import makeEditable from '../TextFieldContainer'
import {
  expect
} from 'sym/configuration/testSetup'
import TextFieldContainer from '../TextFieldContainer'
import globalState from 'sym/source/components/utilities/globalState'
import { mockGlobalState } from 'sym/source/testUtilities/mockComponentData'

describe.only('<TextFieldContainer />', () => {
  let warnStub, wrapper, makeEditableSpy, makeKeyPressProjectSpy, makeKeyPressCouldDoSpy

  beforeEach(() => {
    moxios.install()
    warnStub = sinon.stub(console, 'warn').callsFake(() => null)
    makeEditableSpy = sinon.spy(TextFieldContainer.prototype, 'makeEditable')
    makeKeyPressProjectSpy = sinon.spy(globalState, 'updateProjectText')
    makeKeyPressCouldDoSpy = sinon.spy(globalState, 'updateCouldDoText')
    wrapper = mount( < TextFieldContainer / > )
    globalState.set(mockGlobalState)
    // wrapperCouldDo = mount()
  })

  afterEach(() => {
    warnStub.restore()
    makeEditableSpy.restore()
    makeKeyPressProjectSpy.restore()
    makeKeyPressCouldDoSpy.restore()
    wrapper.unmount()
    moxios.uninstall()
  })

  it('renders .text-field-container', () =>
    expect(wrapper.find('.text-field-container').length).to.equal(1)
  )

  it('calls makeEditable on click', () => {
    wrapper.find('.text-field-container').simulate('click')
    expect(makeEditableSpy.calledOnce).to.equal(true)
  })

  it('renders <TextField />', () =>
    expect(wrapper.find('TextField').length).to.equal(1)
  )

  it('updates global state with new project when type is project', done => {
    wrapper = mount( < TextFieldContainer type='project' / > )
    wrapper.instance().makeEditable()
    let event = {
      key: 'Enter'
    }
    wrapper.instance().handleKeyPress(event)
    moxios.wait( () => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: ''
      }).then( () => {
        expect( makeKeyPressProjectSpy.calledOnce ).to.equal( true )
        expect( makeKeyPressCouldDoSpy.notCalled ).to.equal( true )
        done()
      }).catch(done)
    })
  })

  it('updates global state with new couldDo when type is couldDo', done => {
    wrapper = mount( < TextFieldContainer type='could-do' / > )
    wrapper.instance().makeEditable()
    let event = {
      key: 'Enter'
    }
    wrapper.instance().handleKeyPress(event)
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: ''
      }).then(() => {
        expect( makeKeyPressCouldDoSpy.calledOnce ).to.equal(true)
        expect( makeKeyPressProjectSpy.notCalled ).to.equal( true )
        done()
      }).catch(done)
    })
  })

  it('editInput changes state to input value', () => {
    let event = {
      target: {
        value: 'Cow Cow Moo Moo'
      }
    }
    wrapper.instance().editInput(event)
    expect(wrapper.state().inputValue).to.equal('Cow Cow Moo Moo')
  })

  it('keyHandlePress sets state to false after enter', done => {
    wrapper = mount( < TextFieldContainer type='could-do' projectId='2' id='2' text='Sally Moos' / > )
    wrapper.instance().makeEditable()
    let event = {
      key: 'Enter'
    }
    wrapper.instance().handleKeyPress(event)
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: ''
      }).then(() => {
        expect(wrapper.state().editing).to.equal(false)
        done()
      }).catch(done)
    })
  })

  it( 'textFieldContainer error handler', () =>
    expect( wrapper.find( 'TextField' ).length ).to.equal( 1 )
  )

})
