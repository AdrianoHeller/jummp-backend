const {StringDecoder} = require('string_decoder')
const http = require('http')
const url = require('url')
require('dotenv')['config']();
const utils = {
  parser: body => {
    body = typeof body === 'string' && body.length ? JSON.parse(body) : {} 
  },
  jsonData: {
    one: 'Content-Type',
    two: 'application/json'	  
  }
}
const {Jummper,Professional,Influencer,Asset} = require('./src/jummp')


const {jsonData,parser} = utils;

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
	  
	  const routeTreater = router[path] !== null ? router[path] : router.notFound;
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
  notFound: (payloadData,res) => {
    res.setHeader(jsonData.one,jsonData.two);
    res.writeHead(404);
    res.end();	  
  }
}
