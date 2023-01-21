# MERN-Project
Creating Webapplication Using MERN Stack

<h3>STEPS</h3>

<h4>1.Object modeling with help of mongoose (category, order, product, user)<br/></h4>
<h4>2.Mongodb connection and db talk<br/></h4>
<h4>3.Creating ".env" file and setup environment variables</h4>

<details>
<summary><h4>4.Middeleware and initial routes</h4></summary>

<!--*******What is middle ware section start*******-->
<details>
<summary><h6>1.What is middleware? </h6></summary>
Here we are visiting "admin" route and sending response message<br/>

```ruby
const admin = (req, res) => {
    return res.send("<h1>Admin dash board</h1>")
};
app.get("/admin", admin);
```

If we wanted to do something inbetween requesting and response, thats where middleware come to the picture, isAdmin - Middleware<br/>

```ruby
const admin = (req, res) => {
    return res.send("<h1>Admin dash board</h1>")
};

const isAdmin = (req, res, next) => {
    console.log("isAdmin is running..");
    next();
};

app.get("/admin", isAdmin, admin);
```

</details>
<!--*******What is middle ware section end*******-->

<!--*******Common Middlewares start*******-->
<details>
<summary><h6>2.Common Middlewares</h6></summary>
    body-parser --> Parse incoming request bodies in a middleware before your handlers, available under the req.body property.<br/>
    cookie-parser --> Parse Cookie header and populate req.cookies with an object keyed by the cookie names.<br/>
    cors --> CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.<br/>
    Cross-Origin Resource Sharing (CORS) is an HTTP-header based mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own       from which a browser should permit loading resources
</details>
<!--*******Common Middlewares end*******-->

<!--*******Router in express start*******-->
<details>
<summary><h6>3.Router in express</h6></summary>
    First I create authentication route inside the auth.js like below
    
```ruby
const express = require('express')
const router = express.Router()

router.get("/signout", (req, res) => {
    res.send("User Signout");
});
module.exports = router;
```
    Inside app.js we use that route with help of below satements 
    
```ruby
//import routes (import auth.js file inside routes folder)
const authRoutes = require("./routes/auth");

//routes
app.use("/api", authRoutes);
```    
when we are accessing signout route we have to access it like this way http://localhost:3000/api/signout
</details>
<!--*******Router in express end*******-->

<!--*******How to use controller start*******-->
<details>
<summary><h6>4.How to use controller</h6></summary>
    * Better to create controller file related to route file with same name (auth.js)<br/>
    * As I understood controllers are the functions definions of routes (inside auth controller)
    
```ruby
exports.signout = (req, res) => {
    res.json({
        message: "user signout"
    });
}
```   
    * we use above exported function inside auth.js (routes/auth.js) like below
    
```ruby
const express = require('express')
const router = express.Router()

const {signout} = require("../controllers/auth");

router.get("/signout", signout);

module.exports = router;
```  

</details>
<!--*******How to use controller end*******-->
  
</details>

