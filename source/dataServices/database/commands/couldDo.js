import { createRecord, updateRecordWithUserID, deleteRecordWithUserID, updateOrderWithUserId } from './utilities'

const newCouldDo = attributes => createRecord( 'could_dos', attributes )

const editCouldDo = ( id, user_id, attributes ) => updateRecordWithUserID( 'could_dos', id, user_id, attributes )

const orderCouldDos = ( user_id, attributes ) => updateOrderWithUserId( 'could_dos', user_id, attributes )

const deleteCouldDo = ( id, user_id ) => deleteRecordWithUserID( 'could_dos', id, user_id )

export { newCouldDo, editCouldDo, orderCouldDos, deleteCouldDo }
