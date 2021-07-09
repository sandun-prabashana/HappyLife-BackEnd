var express = require('express');
const User = require("../model/User");
var router = express.Router();


router.get("/allusers", async (req, res) => {
    const users = await User.find();
    res.send({ data: users });
  });


  router.route("/register").post(function(req, res) {
    const { body } = req;
    const { uid, name, email, password } = body;
    User.find(
        {
          uid: uid,
        },
        (err, previousUsers) => {
            if (previousUsers.length > 0) {
                return res.send({
                    success: false,
                    message: "Error: Account already exists"
                });
            }

            const newUser = new User();
            newUser.uid = uid;
            newUser.name = name;
            newUser.email = email;
            newUser.password = password;
            newUser.save((err, user) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: "Error: Server Error"
                    });
                }
                return res.send({
                    success: true,
                    message: "Signed up"
                });
            });
        }
    );
});
  

  

  router.post("/saveuser", async (req, res) => {

    const users = new User(req.body);
    await users.save();
    res.send({ data: users });
    // console.log(data);
  });

  router.get("/oneuser/:email", async (req, res) => {
    try {
      const users = await User.findOne(req.params);
      res.send({ data: users });
    } catch {
      res.status(404).send({ error: "user not found!" });
    }
  });

  router.patch("/updateuser/:uid", async (req, res) => {
    try {
      const users = await User.findOne(req.params);
      Object.assign(users, req.body);
      users.save();
      res.send({ data: users });
    } catch {
      res.status(404).send({ error: "user not found!" });
    }
  });

  router.delete("/deleteuser/:id", async (req, res) => {
    try {
      const users = await User.findById(req.params.id);
      await users.remove();
      res.send({ data: true });
    } catch {
      res.status(404).send({ error: "user not found!" });
    }
  });

  
  

module.exports = router;