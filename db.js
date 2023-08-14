const mongoose = require('mongoose');
const monggoURL = "mongodb+srv://foodie:rammodi00@cluster0.tt8to4r.mongodb.net/foodie?retryWrites=true&w=majority"

const mongodb = async () => {
  await mongoose.connect(monggoURL, {
    useNewUrlParser: true
  }).then(async ( ) => {
    console.log("connection succesfull");

    const SampleModel = mongoose.model("Sample", new mongoose.Schema({}), "sample");
    global.food = await SampleModel.find({});
    const foodCategory=mongoose.model("Footcategory",new mongoose.Schema({}),"footcategory");
  global.food1=await foodCategory.find({})
   
  //  console.log(gl)
  }).catch((err) => { 
    console.log(err);
  })
}
module.exports = mongodb;