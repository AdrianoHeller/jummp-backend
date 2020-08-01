class Cart{
  constructor(address,comp,city,state){
    this.products = []    
    this.sumCart = 0
    this.address = address
    this.comp = comp
    this.city = city
    this.state = state	  
  }
  get cart(){
   return this.products ? `${JSON.stringify(this.products)}${this.sumCart}${this.address}${this.comp}
	  ${this.city}${this.state}` : false;
  }
  
  currentCart(){
    return this.products    
  }
  
  addToCurrentCart(itemData){
    itemData  = typeof itemData === 'object' && Object.entries(itemData).length > 0  ? itemData : false;
    this.products.push(itemData)	  
  }

  getCurrentPrices(){
    const prices = this.products instanceof Array && this.products.length > 0 ? this.products.map(item => item.price) : false
    return this.sumCart = prices.reduce((acc,elem) => acc += elem,0)
  }

  removeFromCart(id){
    let newCart = [] 
    for(let prod of this.products){
        typeof id === 'string' && id.length > 0 ? id : false; 
	Object.values(prod).includes(id) ? true : newCart.push(prod);
    }
    this.products = newCart
        return this.products	  
  }
}

const shop = new Cart('Sullivan St','23th','Boston','MA')
shop.addToCurrentCart({
	id: '7hye73idjdur8',
        itemRef: 'HealthPlan-SG-Flex',
	type: 'individual',
	price: 2000
})
shop.addToCurrentCart({
	id: '852g5dg37dh37dh38j38dj3',
        itemRef: 'HealthPlan-MD-Single',
	type: 'individual',
	price: 875
})
shop.addToCurrentCart({
	id: '9t26sg38d39du37s16j3',
        itemRef: 'HealthPlan-SM-Family',
	type: 'family',
	price: 9019
})

console.log(shop.getCurrentPrices())
console.log(shop.currentCart())
shop.removeFromCart('9t26sg38d39du37s16j3')
console.log(shop.currentCart())
console.log(shop.cart)

module.exports = Cart;
