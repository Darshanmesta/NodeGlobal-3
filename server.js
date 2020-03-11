const express=require('express')
const bodyParser=require('body-parser')
const app=express()
const route=require('./router/route')
const PORT=4000

app.set('view engine','ejs')
app.set('views','./views')

app.use(bodyParser.urlencoded({extended:true}))
app.use('/',route)

app.listen(PORT,function(){
    console.log(`The server has been started on localhost:${PORT}`)
})



