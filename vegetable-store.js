class VegetableStore {
  constructor(owner, location) {
    this.owner = owner;
    this.location = location;
    this.availableProducts = [];
  }

  loadingVegetables(vegetables) {
    const addedProducts = [];

    vegetables.forEach(element => {
      // slojih dummy imena na tezi koito iskam da gi konvertiram, za da move otdolu da gi napravim Number s imenata koito iskame
      const [product, el2, el3] = element.split(' ');
      const kg = Number(el2);
      const price = Number(el3);

      // findIndex preima funkciq za sravnenie i ako to ne vyrne true za nito edin element dava -1 kato rezultat che ne e nameren
      // a ako go nameri, vryshta index-a na elementa v masiva
      const productIndex = this.availableProducts.findIndex(p => p.product === product)

      if (productIndex === -1) {
        //ako broqcha e 0 znachi nqmam takyv product i si go syzdavam
        this.availableProducts.push({ product, kg, price });
        //posle v prazen masiv si zapazvam imenata na novite producti che da moje po-lesno na kraq da gi returna
        addedProducts.push(product);
      } else {
        //ako broqcha e +1 proverqvam dali novata cena e po visoka i shte q smenq samo v sluchai che e po-visoka
        const target = this.availableProducts[productIndex];
        target.kg += kg;
        if (target.price < price) {
          target.price = price;
        }
      }
    });

    //tyka si retrnvam kakvito novi produti sum zapasil v magazina;
    return `Successfully added ${addedProducts.join(', ')}`;
  }

  buyingVegetables(selectedProducts) {
    let totalPrice = 0;
    selectedProducts.forEach(element => {
      const [product, el2] = element.split(' ');
      quantity = Number(el2);

      const productIndex = this.availableProducts.findIndex(p => p.product === product)

      if (productIndex === -1) {
        //ako broqcha e 0 znachi nqma takava stoka
        throw new Error`${type} is not available in the store, your current bill is ${totalPrice.toFixed(2)}.`;
      }
      // i e hubavo da imame kolkoto se move po malko nestvaniq navytre v edna funkciq

      const target = this.availableProducts[productIndex];
      if (target.kg < quantity) {
        //ako iska poveche kolichestvo ot nalicnoto hvyrlqm greshka;
        throw new Error`The quantity ${quantity} for the vegetable ${type} is not available in the store,
                        your current bill is ${totalPrice.toFixed(2)}.`;
      }

      //inache namalqm kolichestvoto na syotvetniq produkt;
      const purchPrice = target.price * quantity;
      totalPrice += purchPrice
      target.kg = target.kg - quantity;
    });

    //hvalq klienta che si e kupil ot boklucite v magazina :D
    return `Great choice! You must pay the following amount $${totalPrice.toFixed(2)}.`;
  }

  rottingVegetable(product, quantity) {
    const rottingQuantity = Number(quantity);
    const productIndex = this.availableProducts.findIndex(p => p.product === product)

    if (productIndex === -1) {
      throw new Error`${type} is not available in the store.`;
    }

    const target = this.availableProducts[productIndex];
    //tyka proverqvam dali kato mahna gniestata stoka she ostane neshto ili shte izchezne;
    target.kg = Math.max(0, target.kg - rottingQuantity);
    if (resultKG > 0) {
      return `Some quantity of the ${type} has been removed.`;
    }
    return `The entire quantity of the ${type} has been removed.`
  }

  revision() {
    //sortiram productite po cena
    this.availableProducts.sort((a, b) => a.price < b.price ? -1 : (a.price > b.price ? 1 : 0))

    const result = [];
    this.availableProducts.forEach(element => {
      //pylnq si edin masiv s formatirano kakto iskat po sulovie productite s kolichestvo i cena;
      result.push(`${element.product}-${element.kg}-${element.price}`);
    });

    result = result.join('\n');

    return `Available vegetables: \n${result} \nThe owner of the store is ${this.owner}, and the location is ${this.location}.\n`
  }
}
