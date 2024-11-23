const express = require('express');
const app = express();
const {products} = require('./02-express-tutorial/data')

const port = 4000;

app.get('/', (req, res) =>{
  res.send('<h1> Home page</h1><a href="/api/products">products</a>');
});

app.get('/api/products', (req, res) =>{
  const newProduct = products.map((product) => {
    const {id, name, image} = product;
    return{id, name, image};
  })
  res.send(newProduct)
});

app.get('/api/products/:id', (req, res) =>{
  const {id} = req.params;
  const singleProduct = products.find((product) => product.id === Number(id));
  res.send(singleProduct);

});

app.get('/api/v1/products/query', (req, res) => {
  const {search, limit} = req.query;
  let sortedProducts = [...products];

  if(search) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.startsWith(search);
    })
  }
  if(limit){
   sortedProducts = sortedProducts.slice(0, limit);
  }

  if(sortedProducts.length < 1){
    return res.status(200).json({status: true, data:[]});
  }

  res.status(200).send(sortedProducts)
} )
app.listen(port, () => {
  console.log('Server listening on port ' + port);
}
);

