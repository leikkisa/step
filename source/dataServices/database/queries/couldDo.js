import { getRecordById, findAllWhere } from './utilities'

const getCouldDoById = id => getRecordById( 'could_dos', 'id', id )

const getCouldDosByProjectId = project_id =>
  findAllWhere( 'could_dos', 'project_id', project_id )

export { getCouldDoById, getCouldDosByProjectId }
