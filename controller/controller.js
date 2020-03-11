const mClient= require('mongodb').MongoClient
const assert= require('assert')
const url="mongodb://localhost:27017"

const dbname="firstdb"

let database;

mClient.connect(url,function(err,result){
    database=result.db(dbname)
    console.log("Database connection established successfully")
})


module.exports={
    home:(req,res)=>{
        database.collection('newcollection').find().toArray(function(err,result){
            console.log(result)
            res.render('index',{posts:result})
        })

    },

    create:(req,res)=>{
        res.render('create')
    },

    newPost:(req,res)=>{
        let val= req.body;

        let n1=val.name1
        let n2=val.name2
        let n3= val.name3

        database.collection('newcollection').insertOne({
            name:n1,
            desc:n2,
            created_at:n3
        },function(err,result){
            console.log('data inserted successfully')
            console.log(result)


        })
        res.redirect('/')
    },

    edit:(req,res)=>{

        const ref= req.params.name
        database.collection('newcollection').find({name:ref}).toArray(function(err,result){
            assert.equal(null,err)
            console.log("The results fetched are   ",result)
            res.render('update',{re:result})
        })

        },

    update:(req,res)=>{
        const n1=req.params.name
        const val= req.body

        const v1=val.name1
        const v2=val.name2
        const v3= val.name3


        database.collection('newcollection').update({name:n1},
            {
                $set:{
                    name:v1,
                    desc:v2,
                    created_at:v3
                }
            },
            function(err,result){
            console.log("Data has been updated successfully")
                res.redirect('/')
            })

    },
    delete:(req,res)=>{
        const n2= req.params.name

        database.collection('newcollection').deleteOne({name:n2},function(err,result){
            assert.equal(null,err)
            console.log('The Data has been deleted successfully')

            res.redirect('/')
        })
    }


}


