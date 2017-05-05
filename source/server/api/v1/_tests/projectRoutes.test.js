import {
  withThreeCouldDos,
  withThreeProjects,
  mockProjectData
} from 'sym/source/testUtilities'
import { expect, chai } from 'sym/configuration/testSetup'
import server from '../../../server'

describe( 'project routes', () => {

  context( '/project/:id/could-do', () => {

    withThreeCouldDos( () => {

      it( 'should get all could-dos for a project id', () =>
        chai.request( server )
          .get( '/project/1/could-do' )
          .then( response => {
            const couldDos = response.body
            expect( couldDos.length ).to.equal( 2 )
            const couldDoTexts = couldDos.map( couldDo => couldDo.text ).sort()
            expect( couldDoTexts ).to.eql( ['eat breakfast', 'eat zero sugar'] )
          })
      )

      it( 'should throw an error if no project with given id is found', () =>
        chai.request( server )
          .get( '/project/198/could-do' )
          .catch( error => expect( error ).to.be.an.instanceof( Error ) )
      )

    })
  })

  context( '/project/new', () => {

    it( 'should return created project', () =>
      chai.request( server )
        .post( '/project/new' )
        .send( mockProjectData.fakeProject3 )
        .then( response => expect( response.body.text ).to.equal( 'dreaming' ) )
    )

    it( 'should throw an error if supplied invalid attributes', () =>
      chai.request( server )
        .post( '/project/new' )
        .send( mockProjectData.invalidProject )
        .catch( error => expect( error ).to.be.an.instanceof( Error ) )
    )

  })

  context( '/project/edit/:id', () => {

    withThreeProjects( () => {

      it( 'should return the edited project', () =>
        chai.request( server )
          .post( '/project/edit/77' )
          .send( mockProjectData.fakeEdit )
          .then( response => expect( response.body.text ).to.equal( 'snoozing' ) )
      )

      it( 'should throw an error if no project with given id is found', () =>
        chai.request( server )
          .post( '/project/edit/777777' )
          .send( mockProjectData.fakeEdit )
          .catch( error => expect( error ).to.be.an.instanceof( Error ) )
      )

      it( 'should throw an error if given invalid attributes', () =>
        chai.request( server )
          .post( '/project/edit/77' )
          .send( mockProjectData.invalidProject )
          .catch( error => expect( error ).to.be.an.instanceof( Error ) )
      )

    })
  })

  context( '/project/delete/:id', () => {

    withThreeProjects( () => {

      it( 'should return 1 after deleting one item', () =>
        chai.request( server )
          .post( '/project/delete/77' )
          .then( response => expect( response.body ).to.equal( 1 ) )
      )

      it( 'should throw an error if no project with given id is found', () =>
        chai.request( server )
          .post( '/project/delete/777777' )
          .catch( error => expect( error ).to.be.an.instanceof( Error ) )
      )

    })

  })

  context( '/user/:id/projects', () => {

    withThreeProjects( () => {

      it( 'should get all projects for a user id', () =>
        chai.request( server )
          .get( '/user/1/projects' )
          .then( response => {
            const projects = response.body
            expect( projects.length ).to.equal( 2 )
            const projectNames = projects.map( project => project.text ).sort()
            expect( projectNames ).to.eql( ['eating', 'sleeping'] )
          })
      )

      it( 'should throw an error if no projects for given user id are found', () =>
        chai.request( server )
          .get( '/user/111234/projects' )
          .catch( error => expect( error ).to.be.an.instanceof( Error ) )
      )

    })

  })

  context( '/project/order', () => {
    const projectsWithNewOrder = []
    Object.keys( mockProjectData ).forEach( ( key, index ) => {
      if ( index < 2 ) {
        mockProjectData[key].order = index + 35
        projectsWithNewOrder.push( mockProjectData[key] )
      }
    })

    withThreeProjects( () => {

      it( 'should update order of projects', () =>
        chai.request( server )
          .post( '/project/order' )
          .send( projectsWithNewOrder )
          .then( ({ body: { rowCount } }) => {
            expect( rowCount ).to.equal( 2 )
          })
      )

    })

  })

})
