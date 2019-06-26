const fastify = require('fastify')({logger: true})
const path = require('path')
const repl = require('./src/repl')

fastify.register(require('fastify-static'), {
    root: path.join(__dirname, 'public'),
    prefix: '/public/', // optional: default '/'
})

fastify.get('/', async (req, res)=>{
    res.sendFile('index.html')
})

fastify.post('/repl', async(req, res)=>{
    try{
        res
          .code(200)
          .header('Content-Type', 'application/json')
          .send({
            output:repl.parse(req.body.cmd)
          })
        
    } catch(err){
        fastify.log.error(err)
        res.code(400)
            .send('Bad Request')
    }
})

const start = async () =>{
    try{
        await fastify.listen(3000)
        fastify.log.info(`server listening on ${fastify.server.address().port}`)
    } catch (err){
        fastify.log.error(err)
        process.exit(1)
    }
}
start()
