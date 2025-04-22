const mongoose = require('mongoose');

const main= async ()=>{
  await  mongoose.connect("mongodb://mongo/brijwasi");
}
main().then(()=>{
  console.log("MongoDB connected successfully")
}) .catch((err)=>{
    console.log(err);
})
module.exports=main;
