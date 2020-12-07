const e = require('express');
let express = require('express');
let session = require('express-session');
let route = express.Router();
let db = require('../database/connection');

route.get('/', function(req, res) {
  let category;
  db.query("select distinct cat_id,name from category",function (err, result, fields) {
    if (err) {
      throw err;
    } else {
      res.render('home', {category: result});
    }
  });
});
route.get('/products', function(req, res) {
  let category,prodcuts;
  db.query("select distinct cat_id,name from category; SELECT * FROM category;", [1,2], function (err, result) {
    if (err) {
      throw err;
    } else {
      res.render('products', {category:result[0],products: result[1]});
    }
  });
});

route.get('/products/:cat_id', function(req, res) {
  let category,items;
  db.query("select distinct cat_id,name from category; select c.cat_id,c.name,p.prod_id,p.item_name,p.price,p.picture from category as c join products  as p on p.cat_id=c.cat_id where c.cat_id='"+req.params.cat_id+"'", [1,2] , function (err, result, fields) {
    if (err) {
      throw err;
    } else {
      res.render('items', {category: result[0],items:result[1]});
    }
  });
});

route.get('/add-to-cart/:product', function(req, res) {

  let product = req.params.product.split("-")[1];
  let products = [];
  if(req.cookies.node_express_nicehome) {
    products = req.cookies.node_express_nicehome;
  }
  db.query("select prod_id,item_name,price,picture from products where prod_id='"+product+"'" , function (err, result, fields) {
    if (err) {
      throw err;
    } else {
      let flag = 0;
      products.forEach(item => {
        if(item.prod_id == product) {
          flag = 1;
        }
      });
      if(flag == 0) {
        products.push({
          prod_id: result[0].prod_id,
          item_name: result[0].item_name,
          price: result[0].price,
          picture: result[0].picture,
          quantity: 1
        });
      }
      res.cookie('node_express_nicehome', products, {path:'/'});
      res.redirect('/cart');
    }
  });
});

route.get('/remove-from-cart/:index', function(req, res) {
  let products = req.cookies.node_express_nicehome;
  let index = req.params.index.split("-")[1];
  products.splice(index, 1);
  res.cookie('node_express_nicehome', products, {path:'/'});
  
  res.redirect('/cart');
});

route.get('/cart', function(req, res) {
  let products = [];
  let category;
  db.query("select distinct cat_id,name from category",function (err, result, fields) {
    if (err) {
      throw err;
    } else {
      if(req.cookies.node_express_nicehome) {
        res.render('cart', {category:result,products: req.cookies.node_express_nicehome});
      } else {
        res.render('cart', {category:result,products: products});
      }
    } 
  });  
});

route.post('/sendcart', function(req, res) {
  let gofor=req.body.submit_btn;
  let qty=req.body.quantity;
  console.log(gofor);
  if(gofor=="CheckOut")
  {
    let category;
    db.query("select distinct cat_id,name from category",function (err, result, fields) {
    if (err) {
      throw err;
    } else {
      res.render('billing', {category: result});
    }
    });
  }
  else
  {
    let products = req.cookies.node_express_nicehome;
    products.forEach(function(product, index) {
    product.quantity = qty[index];
    });
    res.clearCookie('node_express_nicehome', {path:'/'});
    res.cookie('node_express_nicehome', products);
    res.redirect('/cart');
  }
});

route.post('/billing', function(req, res) {
  //Product Cart Information
  let products=req.cookies.node_express_nicehome;
  
  //Getting Last Order I
    db.query("select ifnull(max(order_id),0) as `oid` from orders",function(err,result,fields){
      if(err)
      {
        throw err;
      }
      else
      {
        let newid=result[0].oid+1;
        //Inserting new order
        products.forEach(function(item){
          db.query("insert into orders(order_id,prod_id,quantity,subtotal) values(?,?,?,?)",[newid,item.prod_id,item.quantity,(item.quantity*item.price)],function(err){
            if(err)
            {
              throw err;
            }
          });
        });
        

        // Inserting Billing Information to Billing Table Database
        let newbilling=[];
        newbilling.push(newid,req.body.name,req.body.address,req.body.email,req.body.ci,req.body.dop,req.body.mop);
        db.query("insert into billing(order_id,uname,address,email,contact,dateofpayment,modeofpayment) values(?)",[newbilling],function(err){
          if(err)
          {
            throw err;
          }
          else
          {
            console.log("Billing Information Saved Successfully");
            res.clearCookie('node_express_nicehome',{path:'/'});
            res.redirect('/');
          }
        });
      }
    });
});

route.get('/aboutus', function(req, res) {
  let category;
  db.query("select distinct name from category",function (err, result, fields) {
    if (err) {
      throw err;
    } else {
      res.render('aboutus', {category: result});
    }
  });
});

route.get('/login',function(req,res){

  res.render('login');

});

route.post('/admin',function(req,res){
  db.query("select * from admin where username=? and password=?",[req.body.email,req.body.password],function (err,result){
    if(err)
    {
      throw err;
    }
    else
    {
      if(result.length>0)
      {
        req.session.email=result[0].username;
        res.redirect('/orderinfo');
      }
      else
      {
        res.render('login');
      }
    }
  });
});

route.get('/orderinfo',function(req,res){
  if(req.session.email)
  {
    let order;
    db.query("SELECT o.order_id AS `orderid`,p.item_name AS `prodname`,o.quantity AS `quantity`,o.subtotal AS `subtotal`,10 AS `shipping`,SUM(o.subtotal) + 10 AS `total`FROM orders AS o JOIN products AS p ON p.prod_id = o.prod_id GROUP BY o.order_id , p.prod_id",function(err,result,fields){
    if(err)
    {
      throw err;
    }
    else
    {
      res.render('orderinfo',{order:result});
    }
  });
  }
  else
  {
    res.redirect('login');
  } 
});

route.get('/billinfo',function(req,res){
  if(req.session.email)
  {
    let billing;
    db.query("select order_id as `orderid`,uname as `fullname`,address as `address`,email as`email`,contact as `contact`,date(dateofpayment) as `dop`,modeofpayment as `mop` from billing",function(err,result,fields){
      if(err)
      {
        throw err;
      }
      else
      {
        res.render('billinfo',{billing:result});
      }
    });
  }
  else{
    res.redirect('login');
  }
});

route.get('/contactus', function(req, res) {
  let category;
  db.query("select distinct name from category",function (err, result, fields) {
    if (err) {
      throw err;
    } else {
      res.render('contactus', {category: result});
    }
  });
});

route.get('/logout',function(req,res){
  req.session.destroy(function(){

    });
  res.redirect('/');
});

module.exports = route;