import React from 'react'
import { SortableContainer, arrayMove } from 'react-sortable-hoc'
import _ from 'lodash'
import RowContainer from '../Row/RowContainer'
import globalState from '../../utilities/globalState'

const RowList = ({ items, type }) => {
  const itemList = []
  let itemsInOrder = []

  if ( items ) {
    for ( const key in items ) {
      itemList.push( items[key] )
    }
    itemsInOrder = _.sortBy( itemList, 'order' ).map( ( item, order ) => (
      <RowContainer key={ item.id } order={ order } fieldType={ type } { ...item } />
    ) )
  } else {
    itemsInOrder = <div className='loading'> Loading . . . </div>
  }

  const SortableList = SortableContainer( () => (
    <div className={ `${type}-rowlist-container` }>
      <ul>
        { itemsInOrder }
      </ul>
    </div>
  ) )

  const onSortEnd = ({ oldIndex, newIndex }) => {
    console.log( 'itemsInOrder:', itemsInOrder )
    console.log( 'oldIndex:', oldIndex )
    console.log( 'newIndex:', newIndex )
    const afterSort = arrayMove( itemsInOrder, oldIndex, newIndex ).map( ({ key: id }, index ) => ({
      id,
      order: index
    }) )
    console.log( 'afterSort:', afterSort )
    // axios.post( `${__HOST__}/${type}/order`, afterSort ) //eslint-disable-line
    switch ( type ) {
      case 'project':
        globalState.updateProjects( afterSort )
        break
      case 'could-do':
        globalState.updateCouldDos( afterSort )
        break
      default:
    }
  }

  return (
    <SortableList onSortEnd={ onSortEnd } />
  )
}

export default RowList
