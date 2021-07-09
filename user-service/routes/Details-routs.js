var express = require('express');
const Detail = require("../model/Details");
var router = express.Router();

  

  router.post("/savedetail", async (req, res) => {

    const details = new Detail(req.body);
    await details.save();
    res.send({ data: details });
  });

  router.get("/alldata/:uid",async (req,res)=>{
    const details = await Detail.find(req.params);
    res.send(details);
    
  })

module.exports = router;