class Jummper{
  constructor(name,address,zipCode,city,state,country,phone,email){
    this.name = name
    this.address = address
    this.zipCode = zipCode
    this.city = city
    this.state = state
    this.country = country
    this.phone = phone
    this.email = email	  
  }
  get fullData(){
  return `${this.name}${this.address}${this.zipCode}${this.city}${this.state}${this.country}${this.phone}${this.email}`
  }  	
}

class Professional extends Jummper{
  constructor(name,address,zipCode,city,state,country,phone,email,professional,indications,subJummpers,converted){
    super(name,address,zipCode,city,state,country,phone,email)
	  this.professional = professional || false
	  this.indications = indications || 0
	  this.subJummpers = subJummpers || 0
	  this.converted = converted || 0
	  this.subJummpers > 0 ? (
	    this.subJummpers >= 1 ? this.jummperType = 'silver' : this.jummperType = 'gold'
	  ) : this.jummperType = 'green'   
  }
	get jummperBio(){
	  return `${this.fullData}${this.professional}${this.indications}${this.subJummpers}${this.jummperType}${this.converted}`
	}
}

class Influencer extends Jummper{
  constructor(name,address,zipCode,city,state,country,phone,email,professional,indications,socialMedia,converted){
    super(name,address,zipCode,city,state,country,phone,email)
	  this.professional = professional || false
	  this.indications = indications || 0
	  this.socialMedia = socialMedia 
	  this.converted = converted || 0
	  this.socialMedia !== null && ['youtuber','instagrammer','podcaster','actor'].includes(this.socialMedia) ? this.jummperType = `influencer->${['youtuber','instagrammer','podcaster','actor'].filter(item => item === this.socialMedia)[0]}` : this.jummperType = 'other'  
  }
	get jummperBio(){
	  return `${this.fullData}${this.professional}${this.indications}${this.socialMedia}${this.jummperType}${this.converted}`
	}
}

class Asset{
  constructor(assetType,assetData,size,doubleSize){
   this.assetType = assetType
   this.assetType !== null && ['signup','buy','sell'].includes(this.assetType) ? this.assetData = assetData : this.assetData = null; 	  
   this.publicKey = this.tokenizeAsset(size);
   this.publicKey !== null ? this.privateKey = this.tokenizeAsset(doubleSize) : this.privateKey = null;	  
   this.metadata = {};
  }
  get asset(){
    return `${this.assetType}${this.assetData}`
  }
  tokenizeAsset(tokenLength){
    tokenLength = typeof tokenLength === 'number' && tokenLength > 0 ? tokenLength : false;
    const listOfChars = 'abcdefghijklmnopqrstuvwxyz0123456789'
    let token = '';
    for(let i = 0; i < tokenLength; i++){
      const randomGenChar = listOfChars.charAt(parseInt(Math.random()*listOfChars.length))
	    token += randomGenChar
    }
    return token	  
  }
  updateMetadata(key,val){
    return this.metadata[key] = val;
  }
}



const user = new Jummper('John Doe','Rua Ancient Place 198 apto 404','80730999','Cascavel','Paraná','Brasil','6299765412','master@up.com');
const userPro = new Professional('Armando Pires Filho','Rua Pio X','81280201','Ivai','Paraná','Brasil','4999270156','armando@hotmail.com',false,1,2,0);
const influencer = new Influencer('Padme Wars','Rua Tatooin 1968 apto 405','80730001','New Galaxy','Wollt','Mars','69998765426','padme@sith.com',true,2,'instagrammer',0);

const cadastro = new Asset('signup',{
  ...userPro
},30,50)

//console.log(cadastro.updateMetadata('date',new Date()))
//console.log(cadastro)
//console.log(influencer.jummperBio)
//console.log(userPro.jummperBio)

module.exports = {
  Jummper,
  Professional,
  Influencer,
  Asset	
}
