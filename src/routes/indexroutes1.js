const { Router } = require("express");
const router = Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

router.get("/users", (req, res) =>{
//metodo para traer todos los usuarios
res.json([

  {
    name: "Juan David",
    email: "juan@gmail.com",
    date: '23-90-1992',
    phone:'234567',
    address:'Jutiapa, Jutiapa',
    photo:'This is a photo'
  },
  {
    name: " Ernesto Gonzales",
    email: "juan@gmail.com",
    date: '23-90-1992',
    phone:'234567',
    address:'Jutiapa, Jutiapa',
    photo:'This is a photo'
  },
  {
    name: " Norma Chinchilla",
    email: "juan@gmail.com",
    date: '23-90-1992',
    phone:'234567',
    address:'Jutiapa, Jutiapa',
    photo:'This is a photo'
  },

])

});

//informacion privada
router.get("/private-users", verifyToken, (req, res) =>{
  //metodo para traer todos los usuarios
  res.json([
  
    {
      name: " Juan Pablo ",
      email: "juan@gmail.com",
      password:'123445',
      date: '23-90-1992',
      phone:'234567',
      address:'Jutiapa, Jutiapa',
      photo:'This is a photo'
    },
    {
      name: " Juan Gutierrez",
      email: "juan@gmail.com",
      password:'123445',
      date: '23-90-1992',
      phone:'234567',
      address:'Jutiapa, Jutiapa',
      photo:'This is a photo'
    },
    {
      name: " Juan Aguirre ",
      email: "juan@gmail.com",
      password:'123445',
      date: '23-90-1992',
      phone:'234567',
      address:'Jutiapa, Jutiapa',
      photo:'This is a photo'
    },
  
  ])
  
  });

//metodo para registrarse
router.post("/register", async (req, res) => {
  const { name, email, password, date, phone, address, photo } = req.body;
  const newUser = new User({
    name,
    email,
    password,
    date,
    phone,
    address,
    photo,
  });
  await newUser.save();
  const token = jwt.sign({ _id: newUser._id }, "secretKey");
  return res.status(200).json({ token });
});

//metodo para loguearse
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).send("The email does not existe");
  if (user.password !== password)
    return res.status(401).send("Wrong password ");
  const token = jwt.sign({ _id: user._id }, "secretKey");
  return res.status(200).json({ token });
});


module.exports = router;

function verifyToken(req, res, next){
  if(!req.headers.authorization){
    return res.status(401).send("Acceso no autorizado");
  }

  const token = req.headers.authorization.split(' ')[1];
  if(token==='null')
  return res.status(401).send("Acceso no autorizado");


  const payload = jwt.verify(token, 'secretKey')
  req.userId = payload._id;
  next();

}
