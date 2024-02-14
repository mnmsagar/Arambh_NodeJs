const fs = require("fs");

const data = JSON.parse(fs.readFileSync("./models/data.json", "utf8"));

exports.userSignUp = async (req, res) => {
  const user = data.find((element)=>{
    return element.email === req.body.email;
  })
  if(user){
    res.json({
      message : "user already exist"
    })
    return;
  }
  data.push(req.body);
  await fs.writeFile("./models/data.json", JSON.stringify(data), (err) => {
    res.json({
      message: "Error Signing Up",
    });
  });
  res.json({ message: "Successfully Signed Up" });
};

exports.userLogIn = (req, res) => {
  console.log(req.body);
  const user = data.find((element) => {
    return element.email === req.body.email;
  });
  if (!user) {
    res.json({
      message: "Check username/password",
    });
    return;
  }
  if (!user.password === req.body.password) {
    res.json({
      message: "Check username.password",
    });
    return;
  }
  res.json({
    message : "Logged In Successfully !!"
  })
};
