const mongoose = require('mongoose');

const main= async ()=>{
  await  mongoose.connect("mongodb://localhost:27017/brijwasi");
}
main().then(()=>{
  console.log("MongoDB connected successfully")
}) .catch((err)=>{
    console.log(err);
})
module.exports=main;
