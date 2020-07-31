class Cashback{
  constructor(amount,creditExists,account,bank,type,label){
    this.creditCardExists = creditExists
    this.creditCardExists ? (
    this.creditCardLabel = ['visa','mastercard','american-express','diners'].map(item => item.replace(/[-]/g,'')).includes(label.toLowerCase()) ? label.toLowerCase() : null ) : false;	  
    this.account = account || false;
    this.account ? (
	    this.accountBank = bank,
	    this.accountType = type
    ) : false;	  
    this.amount = amount || 0 	  
  }
  
  get cashback(){
    return this.creditCardExists ? `${this.account}${this.amount}${this.creditCardExists}${this.creditCardLabel}` : false;
  }
  
  get amount(){
    return this._amount
  }
  
  set amount(value){
    return this._amount = value
  }

  incrementValue(amount){
    return this.amount + amount
  }
}

const recover = new Cashback(15000,true,'18750-4','Banco Santander','Conta-Corrente','visa')

console.log(recover.incrementValue(200)) 
console.log(recover.cashback)
