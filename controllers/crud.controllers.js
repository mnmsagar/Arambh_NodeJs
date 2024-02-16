const fs = require("fs");

const data = JSON.parse(fs.readFileSync("./models/crud.json"));

exports.getObj = (req, res) => {
  const id = req.params.id;
  const obj = data.find((ele) => {
    return ele.id == id;
  });
  if (!obj) {
    res.json({
      message: "Not Found!!",
    });
    return;
  }
  res.json(obj);
};

exports.updateObj = async (req, res) => {
  const id = req.params.id;
  const newData = req.body;
  const Idx = data.findIndex((ele) => {
    return ele.id === id;
  });
  console.log(Idx);
  if (Idx === -1) {
    res.json({
      message: "Not Found!!",
    });
    return;
  }
  const newObj = {
    id: req.params.id,
    productName: newData.productName,
    price: newData.price,
    brand: newData.brand,
  };

  data[Idx] = newObj;

  await fs.writeFile("./models/crud.json", JSON.stringify(data), (err) => {
    if (err) {
      res.json({
        message: "Error Updating !!",
      });
      return;
    }
    res.json({
      message: "Updated Successfully!!",
    });
  });
};

exports.deleteObj = async (req, res) => {
  const id = req.params.id;
  const Idx = data.findIndex((ele) => {
    return ele.id === id;
  });
  console.log(Idx);
  if (Idx === -1) {
    res.json({
      message: "Not Found!!",
    });
    return;
  }
  data.splice(Idx, 1);
  await fs.writeFile("./models/crud.json", JSON.stringify(data), (err) => {
    if (err) {
      res.json({
        message: "Error saving !!",
      });
      return;
    }
    res.json({
      message: "File Deleted Successfully Successfully!!",
    });
  });
};

exports.createObj = async (req, res) => {
  const newData = req.body;
  const newObj = {
    id: Date.now().toString(),
    productName: newData.productName,
    price: newData.price,
    brand: newData.brand,
  };
  // Generate unique ID for the new data

  data.push(newObj);
  await fs.writeFile("./models/crud.json", JSON.stringify(data), (err) => {
    if (err) {
      res.json({
        message: "Error saving !!",
      });
      return;
    }
    res.json({
      message: "file created Successfully!!",
    });
  });
};

