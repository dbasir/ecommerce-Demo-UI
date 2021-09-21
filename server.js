/**
 Author: Divya Basir
 Date: 14th September 2021
 Title: Fulhaus Tech Test
 version: 1.0.0 - 14th Sep 2021, Divya Basir
 */

 //Configure express
 var express = require('express');
 var app  = express();
 var HTTP_PORT = process.env.PORT||8080;
 //const fetch = require('node-fetch');

 function onHTTPStart(){
     console.log("Express is running on port : "+HTTP_PORT);

 }

 //Static folders for express
 app.use(express.static("views"));
 app.use(express.static("public"));

 //form processing
 var bodyparser = require("body-parser");
 var path = require("path");
 app.use(express.urlencoded({extended:false}));

 //handlebars
 const ehbs = require('express-handlebars');
 app.engine('.hbs',ehbs({
     extname:'.hbs'
 }));
 app.set('view engine','.hbs');

 const request = require('request');

 /** 
  request({
     url:"https://main-api.fulhaus.com/fulhaus-tech-test/get-products",
     json:true
 },(err, response, body)=>{
     console.log(body);
 })
 */
 // database connections
 const config = require("./models/js/config");
 const mongoose = require("mongoose");
  // database models
  const ProductModel = require("./models/productList");

  // create a new company




// database connection
mongoose.connect(config.dbconn, { useNewUrlParser: true, useUnifiedTopology: true });


 //Routes
  app.get("/",(req,res)=>{
    
    request({
      url:"https://main-api.fulhaus.com/fulhaus-tech-test/get-products",
      json:true
  },(err, response, body)=>{
      console.log(JSON.stringify(body[0].imageURLs, undefined, 4));
  })
    /** 
     var Product = new ProductModel({
        productURLs:"./img/productsImg/prod1.jpg",
        productName:"Table",
        brandName:"Ikea",
        productPrice:900
      });
      Product.save((err) => {
        if(err) {
          console.log("There was an error saving the Table product");
        } else {
          console.log("The Table product was saved to the productList collection");
        }
        // exit the program after saving
       // process.exit();
      });
    */
      ProductModel.find()
      .lean()
      .exec()
      .then((prod) => {
          res.render("home", { prod: prod, hasprod: !!prod.length, layout: false })
      })
    
     
 })

 //Start Express Server
 app.listen(HTTP_PORT, onHTTPStart);


 ///// To connect to SQL Server through Node.JS

 /**
  *function testDB(){
    var sql = require('mssql');
    var config = {
      user:'DESKTOP-T6MVOUI\\DELL',
      password:'Apo@12345',
      database:'AdventureWorks2017',
      server:'DESKTOP-T6MVOUI\\SQLEXPRESS',
      options: {
        //encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
      }
    }
    var connection = new sql.ConnectionPool(config,function(err){
      console.log(err);
      var request = new sql.Request(connection);
      request.query('SELECT TOP (10) [DepartmentID],[Name] ,[GroupName],[ModifiedDate] FROM [HumanResources].[Department]',function(err,recordset){
        console.log("query errors: "+err);
        console.log(recordset);
      })
    });
  }
  */
 ///// To connect to SQL Server through Node.JS