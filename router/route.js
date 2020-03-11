const express= require('express')
const control=require('../controller')
const appRoute= express()

appRoute.get('/',control.home);
appRoute.get('/create',control.create)
appRoute.post('/create',control.newPost)
appRoute.get('/edit/:name',control.edit)
appRoute.post('/update/:name',control.update)
appRoute.get('/delete/:name',control.delete)


module.exports= appRoute