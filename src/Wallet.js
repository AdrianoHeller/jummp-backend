class Wallet{
  constructor(planName,planPrice,combo){
    this.planName = planName || ''
    this.planPrice = planPrice || 0	  
    this.combo = combo || false
    this.discount = this.combo !== null && this.combo ? true : false;
    this.discount ? this.discountType = ['simple','double','full'] : false;
    this.discountType === 'simple' ? this.planPrice *= 0.1 : this.discountType === 'double' ? this.planPrice *= 0.2 : this.discountType === 'full' ? this.planPrice *= 0.3 : this.planPrice    	  
  }

  get indexes(){
    return { 
      plan: [{
        name: this.planName,
	price: this.planPrice      
      }],
      combo: this.combo,
      discount: this.discount,
      discountType: this.discountType
    }
  }

  generatePrice(index){
      index = typeof index === 'object' && index.plan instanceof Array ? index : {};
      let amount = 0
      for(let i = 0; i< index.plan.length; i++){
      index.plan[i].price ? amount += index.plan[i].price : false
    }
      index['amount'] = amount	   
    return index
  }

  addPlan(index,data){
      let planData = [];
      planData.push(index.plan[0])	  
      index = typeof index === 'object' && index.plan instanceof Array ? index : false;
      data = data instanceof Object && Object.keys(data).includes('name','price') ?
		  data : false;
      planData.push(data)
      index['plan'] = planData
      return index        
  }

  mountWalletPrice(data){
    let mountedPrice;
    data = typeof data === 'object' && data.plan instanceof Array ? (
    mountedPrice = data.plan.length > 1 ? data.plan.reduce((acc,elem) => acc + elem.price,0) : data.plan[0].price) : false;
    return mountedPrice		 
  }

}


const buy = new Wallet('unimed-flex-2',350,false)
const newBuy = new Wallet('unimed-familia-3',1200,false)

console.log(buy.generatePrice(buy.indexes))
buy.addPlan(buy.indexes,{ name: 'odontoprev-fx-12', price: 250})
console.log(buy.indexes)

module.exports = Wallet;
