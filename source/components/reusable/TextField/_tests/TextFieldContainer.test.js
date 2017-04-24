import React from 'react'
import sinon from 'sinon'
import { mount } from 'enzyme'
import moxios from 'moxios'
import makeEditable from '../TextFieldContainer'
import { expect } from 'sym/configuration/testSetup'
import TextFieldContainer from '../TextFieldContainer'
import globalState from 'sym/source/components/utilities/globalState'

describe.only( '<TextFieldContainer />', () => {
  let warnStub, wrapper, makeEditableSpy, makeKeyPressProjectSpy, makeKeyPressCouldDoSpy

  beforeEach( () => {
    moxios.install()
    warnStub = sinon.stub( console, 'warn' ).callsFake( () => null )
    makeEditableSpy = sinon.spy( TextFieldContainer.prototype, 'makeEditable' )
    makeKeyPressProjectSpy = sinon.spy( globalState, 'updateProjectText')
    makeKeyPressCouldDoSpy = sinon.spy( globalState, 'updateCouldDoText')
    wrapper = mount( <TextFieldContainer type='project' /> )
    // wrapperCouldDo = mount()
  })

  afterEach( () => {
    warnStub.restore()
    makeEditableSpy.restore()
    makeKeyPressProjectSpy.restore()
    makeKeyPressCouldDoSpy.restore()
    wrapper.unmount()
    moxios.uninstall()
  })

  it( 'renders .text-field-container', () =>
    expect( wrapper.find( '.text-field-container' ).length ).to.equal( 1 )
  )

  it( 'calls makeEditable on click', () => {
    wrapper.find( '.text-field-container' ).simulate( 'click' )
    expect( makeEditableSpy.calledOnce ).to.equal( true )
  })

  it( 'renders <TextField />', () =>
    expect( wrapper.find( 'TextField' ).length ).to.equal( 1 )
  )

  it( 'updates global state with new project when type is project', done => {
    makeEditable()
    let something = {key:'Enter'}
    handleKeyPress(something)
    moxios.wait( () => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: ''
      }).then( () => {
        expect( makeKeyPressProjectSpy.calledOnce ).to.equal( true )
        done()
      }).catch( done )
    })
  })

  // it( 'updates global state with new couldDo when type is couldDo', () =>
  //   // wrapper.setProps({ type: ''})
  //   expect( makeKeyPressCouldDoSpy.calledOnce ).to.equal( true )
  // )

  // it( 'textFieldContainer error handler', () =>
  //   expect( wrapper.find( 'TextField' ).length ).to.equal( 1 )
  // )

})
