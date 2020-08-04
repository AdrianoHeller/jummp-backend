const {StringDecoder} = require('string_decoder')
const http = require('http')
const url = require('url')
const hash = require('crypto')
require('dotenv')['config']();
const utils = {
  parser: body => {
    return typeof body === 'string' && body.length ? JSON.parse(body) : {} 
  },
  stringifier: message => {
    message = message instanceof Object && Object.keys(message).length > 0 ? message : false;
    return message !== null ? JSON.stringify(message) : {}	  
  },
  hashPasswordInput: inputData => {
    return inputData = typeof inputData === 'string' && inputData.length > 0 ? (
      hash.createHmac(process.env.HASH_METHOD,process.env.HASH_SECRET).update(inputData).digest(process.env.HASH_DIGEST)
    ) : false
  },
  generateSessionToken: tokenLength => {
    tokenLength = typeof tokenLength === 'number' && tokenLength > 0 ? tokenLength : false;
    const possibleChars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let sessionToken = new String;
    for(let i = 0; i < tokenLength; i++){
      const randomChosenChars = possibleChars.charAt(Math.floor(Math.random()*possibleChars.length));
      sessionToken += randomChosenChars;	    
    }
    return sessionToken
  },
  jsonData: {
    one: 'Content-Type',
    two: 'application/json'	  
  }
}
const {Jummper,Professional,Influencer,Asset} = require('./src/Jummp')
const {Cart} = require('./src/Cart')
const {Cashback} = require('./src/BusinessRules')
const {Wallet} = require('./src/Wallet')

const {	jsonData,
	parser,
	stringifier,
	hashPasswordInput,
	generateSessionToken} = utils;

const httpServer = http.createServer((req,res) => {
	const {parse} = url;
	const {headers,method} = req;
	const {pathname,query} = parse(req.url,true);
	const regexPattern = /^\/+|\/+$/;
	const path = pathname.replace(regexPattern,'');
	const Decoder = new StringDecoder(process.env.ENCODING);
	let strBuffer = '';
	req.on('data', streamInput => {
	  strBuffer += Decoder['write'](streamInput)
	});
	req.on('end', () => {
	  strBuffer += Decoder['end']();
	  
	  const payloadData = {
	    body: strBuffer,
	    headers,
	    method,
	    params: query,
	    path,
	    parser	  
	  }
	  
	  const routeTreater = typeof router[path] !== 'undefined' ? router[path] : router.notFound;
		routeTreater(payloadData,res)
	})
})

httpServer.listen(process.env.HTTP_PORT, err => {
  !err ? console.log(`Server running on PORT -> ${process.env.HTTP_PORT}`) : console.error(err)
})

const router = {
  check: (payloadData,res) => {
    res.setHeader(jsonData.one,jsonData.two);
    res.writeHead(200);
    res.end();	  
  },
  login: (payloadData,res) => {
    res.setHeader(jsonData.one,jsonData.two);
    let {method,headers,body} = payloadData
    headers.token ? (
      method === 'POST' ? (
       parsedBody = parser(body), 
       parsedBody.name && parsedBody.email && parsedBody.password ? (
	  name = typeof parsedBody.name === 'string' && parsedBody.name !== null ? parsedBody.name : false,
	  email = typeof parsedBody.email === 'string' && parsedBody.email !== null ? parsedBody.email : false,
	  password = typeof parsedBody.password === 'string' && parsedBody.password !== null ? parsedBody.password : false,
          parsedBody.hashedPassword = hashPasswordInput(password),  
	  delete parsedBody.password,
	  parsedBody.token = generateSessionToken(50),
	  res.writeHead(200),
	  res.end(stringifier(parsedBody))	
	) : (
	  res.writeHead(400),
	  res.end(stringifier({'Error':'Missing input values.'}))	
	)
      ) : (
        res.writeHead(405),
	res.end(stringifier({'Error':'Method not allowed in this endpoint.'}))     
      )
    ) : (
      res.writeHead(403),
      res.end(stringifier({'Error': 'No token provided.'}))	    
    )	  
  },
  newUser: (payloadData,res) => {
    res.setHeader(jsonData.one,jsonData.two);
    let {method,body} = payloadData;
    method === 'POST' ? (
      parsedBody = parser(body),
      parsedBody.name && parsedBody.address && parsedBody.email && parsedBody.password && parsedBody.city && parsedBody.phone && parsedBody.zipCode ? (
	name = typeof parsedBody.name === 'string' && parsedBody.name.length > 0 ? parsedBody.name : false,
	address = typeof parsedBody.address === 'string' && parsedBody.address.length > 0 ? parsedBody.address : false,
	email = typeof parsedBody.email === 'string' && parsedBody.email.length > 0 ? parsedBody.email : false,
	pass = typeof parsedBody.password === 'string' && parsedBody.password.length > 0 ? parsedBody.password : false,
	city = typeof parsedBody.city === 'string' && parsedBody.city.length > 0 ? parsedBody.city : false,
	phone = typeof parsedBody.phone === 'string' && parsedBody.phone.length > 0 ? parsedBody.phone : false,
	zipCode = typeof parsedBody.zipCode === 'string' && parsedBody.zipCode.length >= 8 ? parsedBody.zipCode : false,
        parsedBody.hashedPassword = hashPasswordInput(pass),
	delete parsedBody.password,
	parsedBody.password = parsedBody.hashedPassword,      
	res.writeHead(302,{Location:'/success-page'}),
	res.end()      
      ) : (
        res.writeHead(400),
	res.end(stringifier({'Error':'Missing input values.'}))      
      ) 	    
    ) : (
      res.writeHead(405),
      res.end(stringifier({'Error':'Method not Allowed in this endpoint.'}))	        )
  },
  'success-page': (payloadData,res) => {
    res.setHeader(jsonData.one,jsonData.two);
    let parsedBody = parser(payloadData.body);
    parsedBody ? (
      res.writeHead(200),
      res.end(stringifier({'Message':'Logged with success'}))	    
    ) : (
      res.writeHead(400),
      res.end(stringifier({'Error':'Missing Input Values'}))	    
    )	  
  },
  notFound: (payloadData,res) => {
    res.setHeader(jsonData.one,jsonData.two);
    res.writeHead(404);
    res.end();	  
  }
}
