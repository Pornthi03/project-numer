const jsonServer = require('json-server')
const auth = require('json-server-auth')
const app = jsonServer.create()
const router = jsonServer.router('./db.json')
const middlewares = jsonServer.defaults({noCors:true})
var cors = require("cors");
var port = process.env.PORT || 3000;

const rules = auth.rewriter({
    "NumericalMethod":660
})

app.db = router.db
app.use(cors())
app.use(rules)
app.use(auth)
app.use(middlewares);

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./Pornthi03-API-numerical.json');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(router)
app.listen(port,()=>
{
    console.log("JSON SERVER is running!!");
})
