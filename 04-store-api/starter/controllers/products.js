const { filter } = require('lodash');
const Product = require('../models/product')

 let name = 'Desmond, Adabe';
 name = name.split(',').join(' ');
 console.log(name);

const geAllProductsStatic = async (req, res) => {
    const products = await Product.find({price: {$gt: 30}}).sort('name').select('name price');
    res.status(200).json({products: products, nbHits: products.length});
}
const getAllProducts = async(req, res) => {
    // filtering
    const {featured, company, name, sort, fields, numericFilters}  = req.query;
    const queryObject = {};



    if(featured){
        queryObject.featured = featured === 'true' ? true: false;
    }

    if(company){
        queryObject.company = company;
    }

    if(name){
        queryObject.name = {
            $regex: name,
            $options: 'i'
        }
    }
   
    if (numericFilters) {
        const operatorMap = {
            '<' : '$lt',
            '<=': '$lte',
            '=' : '$eq',
            '>' : '$gt',
            '>=': '$gte',
        }

        const regExp = /\b(<|>|>=|=|<|<=)\b/g
         let filters = numericFilters.replace(
            regExp,
            (match) => `-${operatorMap[match]}-`
         );

         const options = ['price','rating'];
         filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-');
            if(options.includes(field)){
                queryObject[field] = {[operator] : Number(value)};
            }
         })
        console.log(queryObject);
    }
    
    // console.log(queryObject);
    let result = Product.find(queryObject);

    if(sort){
      const sortList = sort.split(',').join(' ');
      result = result.sort(sortList);
    }else{
        result =result.sort('createdAt')
    }

   if(fields){
       const fieldsList = fields.split(',').join(' ');
       result = result.select(fieldsList);
   }
   
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    console.log(skip, limit);

    result = result.skip(skip).limit(limit);
    const products = await result
    res.status(200).json({products: products, nbHits: products.length});
}

module.exports = {
    geAllProductsStatic,
    getAllProducts
}