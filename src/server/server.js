const pg = require('pg-adapter')
const express = require('express');
const app = express();
const port = process.env.PORT || 5002;
var bodyParser = require('body-parser')
app.use(bodyParser.json());
var md5 = require('md5');

const {Adapter} = pg
const db = new Adapter({
  host: '127.0.0.1',
  port: 5432,
  database: 'higharc',
  user: 'admin',
  password: 'admin',
  pool: 10,
  log: true,
})

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/login', async(req, res) => {
  const {username, password} = req.query
    await db.connect()
    let users = await db.objects('SELECT * FROM higharc.users')
    for(const user of users) {
      if(user.name.equalIgnoreCase(username)) {
        
      }
    }
});

app.post('/users', async (req, res) => {
  const {username, password} = req.body
  // await db.connect()
  let user = await db.query(`SELECT * FROM higharc.users where name='${username}'`)
  if(md5(password) === user[0].password) {
    const uuid = generateRandom32()
    let expiry = Math.floor(+new Date() / 1000)
    expiry += 24 * 3600
    let objects = await db.objects(`INSERT INTO higharc.sessions(username, session, expiry)VALUES ('${username}', '${uuid}', to_timestamp(${expiry}))`)
    res.send({ uuid, username })
  } else {
    res.send({ express: 'failure' })
  }
});

app.post('/sessions', async (req, res) => {
  const {uuid} = req.body
  let session = await db.query(`SELECT * FROM higharc.sessions where session='${uuid}'`)
  if(session && session.length) {
    const expiryTime = session[0].expiry
    const dbTime = Math.floor(new Date(expiryTime).getTime() / 1000)
    const currTime = Math.floor(new Date().getTime() / 1000)
    if(currTime - dbTime > 24 * 3600) {
      res.json({status: 403})
      let deletedSession = await db.query(`DELETE FROM higharc.sessions where session='${uuid}'`)
    } else {
      res.json({status: 200, username: session[0].username})
    }
  } else {
    res.json({status: 403})
  }


});

app.post('/saverecipes', async(req, res) => {
  const {name, ingredients, username, title, tags} = req.body
  await db.connect()
  let objects = await db.objects(`INSERT INTO higharc.recipes(id, name, title, ingredients, tags, username)VALUES (DEFAULT, '${name}', '${title}', '${ingredients}', '${tags}', '${username}')`)
  res.send({ express: 'success with me rec' });
});


app.post('/deleterecipe', async(req, res) => {
  const {name} = req.body
  await db.connect()
  let objects = await db.objects(`DELETE FROM higharc.recipes where name='${name}'`)
  res.send({ express: 'deleted' });
});

app.patch('/updateRecipe', async(req, res) => {
  const {title, ingredients, name, tags} = req.body
  await db.connect()
  let objects = await db.objects(`UPDATE higharc.recipes SET ingredients='${ingredients}', tags='${tags}', title='${title}' where name='${name}'`)
  res.send({ express: 'updated' });
});

app.get('/recipes', async(req, res) => {
  const {username} = req.query
  // await db.connect()
  let recipes = await db.objects(`select * from higharc.recipes where username='${username}'`)
  res.send({recipes})
});

function generateRandom32 () {
  let str = "abcdefghijkl123456789mnopqIJKLMNOPQRSTUVWXYZ123456789rstuvwxyzABCCDEFGH";
  let result = ''
  for (let i = 0; i < 32; i++) {
    let rand = (Math.floor(Math.random() * 100)) % str.length
    result += str[rand]
  }

  return result
}