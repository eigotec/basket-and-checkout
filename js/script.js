/*jshint esversion: 6 */

  /*const access_key = 'aeb995e7e969370ff057fa7ac98504ec';
  const from = 'GBP';
  const to = 'EUR';*/

  const wrapper = document.getElementById('wrapper');
  const checkoutTable = document.getElementById('checkoutTable');
  const checkoutButton = document.getElementById('checkoutButton');
  let total = 0;
  const rates = [];

  getRates = () => {
  
    fetch(`https://exchangeratesapi.io/api/latest?base=GBP`).then(function(response) {
      return response.json();
    })
    .then(function(rates) {
      console.log(rates);
    });
  };

  const products = 
  [
    {
      name: 'Peas',
      price: 0.95,
      qty: 0,
      subtotal: 0
    },
    {
      name: 'Eggs',
      price: 2.10,
      qty: 0,
      subtotal: 0
    },
    {
      name: 'Milk',
      price: 1.30,
      qty: 0,
      subtotal: 0
    },
    {
      name: 'Beans',
      price: 0.73,
      qty: 0,
      subtotal: 0
    }  
  ];



  // PRODUCT MARKUP

  const markup = 
  `
    ${products.map(product =>
      `<div class="product">
        <h3>${product.name}</h3>
        <img src="../../images/${product.name}.png" alt="${product.name}" />
        <h4>&pound;${product.price.toFixed(2)}</h4>
        <div class="controls">
          <button class="minusQty">-</button>
          <input type="text" class="qtyInput" value="${product.qty}" />
          <button class="addQty">+</button>
        </div>
        <button class="addToBasket">Add to Basket</button>
      </div>`).join('')}
  `;

  wrapper.innerHTML = markup;

  //const addQty = document.getElementsByClassName('qtyValue');
  //addQty.addEventListener("click", addQtyNumber, false);

  const plus = [].slice.call(document.getElementsByClassName("addQty"));
  const minus = [].slice.call(document.getElementsByClassName("minusQty"));
  const qtyValue = [].slice.call(document.getElementsByClassName("qtyInput"));
  const addToBasket = [].slice.call(document.getElementsByClassName("addToBasket"));

  plus.forEach(function (element, index){
    element.addEventListener("click", function(){
      qtyValue[index].value ++;
      products[index].qty = qtyValue[index].value;
    });
  });

  minus.forEach(function (element, index){
    element.addEventListener("click", function(){
      if(qtyValue[index].value != 0){
        qtyValue[index].value --;
        products[index].qty = qtyValue[index].value;
      }
    });
  });

  addToBasket.forEach(function (element, index){
    element.addEventListener("click", function(){
      alert('Added to basket!');
      products[index].qty = qtyValue[index].value;
      products[index].subtotal = products[index].qty * products[index].price.toFixed(2);
      console.log(products);
    });
  });

  checkoutButton.addEventListener("click",function(){
    const getTotal = () => {
      products.map(product => {
        total += product.subtotal;
      });
    };
    getTotal();
    const checkout =
    `
    <table>
    <tr>
      <th>Name</th>
      <th>Price</th>
      <th>Qty</th>
      <th>Subtotal</th>
    </tr>
    ${products.map(product =>
      `<tr>
        <td>${product.name}</td>
        <td>${product.price.toFixed(2)}</td>
        <td>${product.qty}</td>
        <td>${product.subtotal.toFixed(2)}</td>
       </tr>
      `).join('')}
      </table>
      <h1 id="checkoutTotal">Total: &pound;${total.toFixed(2)}</h1>`;
    checkoutTable.innerHTML = checkout;
  });


   



  //console.log(qtyValue);
  