const jwt = require("jsonwebtoken");
const Company = require("../Models/companyModel.js");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    await Company.findOne({ email }, async (err, company) => {
      if (company) {
        if (await company.correctPassword(password, company.password)) {
          const token = jwt.sign({ id: company._id }, process.env.JWT_SECRET, {
            expiresIn: 30 * 24 * 60 * 60,
          });

          res.send({
            message: "Logged in successfully!",
            success: true,
            company,
          });
        } else {
          res.send({ message: "Incorrect Email or Password!", success: false });
        }
      } else {
        res.send({ message: "Incorrect Email or Password!", success: false });
      }
    });
  } catch (err) {
    res.send({
      message: "Something went wrong. Try again later!",
      success: false,
    });
    console.log(err);
  }
};

exports.register = async (req, res) => {
  const { email } = req.body;
  console.log(req.body);
  try {
    await Company.findOne({ email }, async (err, company) => {
      if (company) {
        res.send({ message: "Company already registered!" });
      } else {
        try {
          const company = await Company.create(req.body);
          const token = jwt.sign({ id: company._id }, process.env.JWT_SECRET, {
            expiresIn: 30 * 24 * 60 * 60,
          });

          res.send({
            message: "Registered successfully!",
            success: true,
            company,
          });
        } catch (err) {
          res.send({ message: "Something went wrong. Try again later!" });
          console.log(err);
        }
      }
    });
  } catch (err) {
    res.send({ message: "Something went wrong. Try again later!" });
    console.log(err);
  }
};

exports.companyVerification = (req, res) => {
  const token = req.body.token;
  if (!token) {
    return res.json({ status: false });
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    } else {
      const company = await Company.findById(data.id);
      if (company) return res.json({ status: true, company });
      else return res.json({ status: false });
    }
  });
};
