/*const productModelnpm =[
    {id:1,name:"pro1",price:100},
    {id:2,name:"pro2",price:200},
    {id:3,name:"pro3",price:300},
]*/

import mongoose from "mongoose";
const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: {type:String}
});
const  productModel = mongoose.model("products",productSchema)

export default productModel;
