class Wallet{
  constructor(planName,planPrice,combo){
    this.planName = planName || ''
    this.planPrice = planPrice || 0	  
    this.combo = combo || false
    this.discount = this.combo !== null && this.combo ? true : false;
    this.discount ? this.discountType = ['simple','double','full'] : false;
    this.discountType === 'simple' ? this.planPrice *= 0.1 : this.discountType === 'double' ? this.planPrice *= 0.2 : this.planPrice *= 0.3    	  
  }

  get indexes(){
    return { 
      plan: [{
        name: this.planName,
	price: this.planPrice      
      }],
      combo: this.combo,
      discount: this.discount,
      discountType : this.discountType	    
    }
  } 	

  mountWalletPrice(data){
    data = typeof data === 'object' && data.plan instanceof Array ? (
    mountedPrice = data.plan.length > 1 ? data.plan.reduce((acc,elem) => acc + elem.price,0) : data.plan[0].price) : false;
    return mountedPrice		 
  }

}


const buy = new Wallet('unimed-flex-2',350,true)
const newBuy = new Wallet('unimed-familia-3',1200,false)

console.log(buy)
console.log(newBuy)
console.log(buy.indexes)

module.exports = Wallet;
