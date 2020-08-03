const {MongoClient,ObjectId} = require('mongodb')
const localStringConn = `mongodb://localhost:${process.env.MONGO_LOCALPORT}`
const cloudStringConn = ``
require('dotenv').config()

const connection = async() => {
	const client = new MongoClient(localStringConn,{ useUnifiedTopology: true});
	await client.connect();
	const dataList = await client.db().admin().listDatabases();
	const db = client.db(process.env.MONGO_DATABASE)
	let mongoData = {
	   client,
	   db,
	   dataList	
	}
	return mongoData
}

const getDatabasesList = connection => new Promise(async(resolve,reject) => {
  connection = await connection();
  const {dataList} = connection;
  const {databases} = dataList;
  databases instanceof Array ? resolve(databases) : reject(new Error('Error'))
  await connection['client'].close();	
})


const getUsersAsync = connection => new Promise(async(resolve,reject) => {
  connection = await connection();
  connection['db'].collection(process.env.MONGO_COLLECTION).find().toArray((err,data) => {
    !err ? resolve(data) : reject(err)
  })
  await connection['client'].close();	
})

const getUserByIdAsync = (connection,id) => new Promise(async(resolve,reject) => {
  connection = await connection();
  connection['db'].collection(process.env.MONGO_COLLECTION).findOne({_id: ObjectId(id)},(err,userData) => {
    !err ? resolve(userData) : reject(err)
  })
  await connection['client'].close();	
})

const insertSingleUserAsync = (connection,data) => new Promise(async(resolve,reject) => {
  connection = await connection();
  connection['db'].collection(process.env.MONGO_COLLECTION).insertOne(data,(err,userData) => {
    !err ? resolve() : reject(err)
  })
  await connection['client'].close();	
})

const insertMultipleUserAsync = (connection,MultiData) => new Promise(async(resolve,reject) => {
  connection = await connection();
  connection['db'].collection(process.env.MONGO_COLLECTION).insertMany(Multidata,(err,mData) => {
    !err ? resolve() : reject(err)
  })
  await connection['client'].close();	
})

const updateUserDataAsync = (connection,id,newData) => new Promise(async(resolve,reject) => {
  connection = await connection();
  connection['db'].collection(process.env.MONGO_COLLECTION).updateOne({_id: ObjectId(id)},{$set: newData},{upsert: true},err => {
    !err ? resolve() : reject(err)
  })
  await connection['client'].close();	
})

const removeUserDataAsync = (connection,id) => new Promise(async(resolve,reject) => {
  connection = await connection();
  connection['db'].collection(process.env.MONGO_COLLECTION).deleteOne({_id: ObjectId(id)},err => {
    !err ? resolve() : reject(err)
  })
  await connection['client'].close();	
})




