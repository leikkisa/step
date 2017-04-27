
exports.up = ( knex, Promise ) =>
  Promise.all( [
    knex.schema.createTable( 'session', table => {
      table.string( 'sid' )
      table.integer( 'sess' )
      table.timestamps( 'expire' )
    })
  ] )

exports.down = ( knex, Promise ) =>
  Promise.all( [
    knex.schema.dropTable( 'session' )
  ] )

// CREATE TABLE "session" (
//   "sid" varchar NOT NULL COLLATE "default",
// 	"sess" json NOT NULL,
// 	"expire" timestamp(6) NOT NULL
// )
// WITH (OIDS=FALSE);
// ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
