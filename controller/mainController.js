const fs = require("fs");
const path = require("path");

function findAll(){
    let usersJson= fs.readFileSync(path.join(__dirname, "../data/users.json"))
    let data = JSON.parse(usersJson)
    return data
}
    
function writeJson(array){
  let arrayJson = JSON.stringify(array);
  return fs.writeFileSync(path.join(__dirname, "../data/users.json"), arrayJson);
    }


const mainController = {
    home: (req, res) =>{
      res.render("index")
    },
    
    cart: (req, res) =>{
        res.render("carrito")
    },

    register: (req,res)=>{
        res.render("register")
    },

    createUSER: (req,res)=>{
      let data = findAll();
      let ultimo = data.length-1;
      let newUser ={
        id: Number(data[ultimo].id)+1,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        image: "../../img/avatar"+req.file.filename
      }
  
      data.push(newUser)
      writeJson(data)
      res.redirect("/")
    } ,

    login: (req,res)=>{
        res.render("login")
    },

   
    market: function(req, res){
      let tokens = findAll() ;  
      res.render("market", { tokens } )

    },
}
  
module.exports = mainController;