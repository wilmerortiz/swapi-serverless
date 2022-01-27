const { conn } = require('../db')
//console.log(conn)
conn.sync({ force: true }).then(async () => {
  console.log("Drop and re-sync db.");
})