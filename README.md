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
<!--*****************************************************************************What is middle ware section end*******-->

<!--*****************************************************************************Common Middlewares start*******-->
<details>
<summary><h6>2.Common Middlewares</h6></summary>
    body-parser --> Parse incoming request bodies in a middleware before your handlers, available under the req.body property.<br/>
    cookie-parser --> Parse Cookie header and populate req.cookies with an object keyed by the cookie names.<br/>
    cors --> CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.<br/>
    Cross-Origin Resource Sharing (CORS) is an HTTP-header based mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own       from which a browser should permit loading resources
</details>
<!--*****************************************************************************Common Middlewares end*******-->

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

<!--*****************************************************************************Signup start*******-->
<details>
<summary><h6>5.Signup</h6></summary>
    * Create signup router and save data sending throgh postman in to mongodb database<br/> 
    
<b>Signup Controller</b><br/>
![image](https://user-images.githubusercontent.com/54843684/214333360-f9723429-1b2a-467a-a0d6-7b906d1cd720.png)<br/>
    
 <b>Inside Router</b><br/>
![image](https://user-images.githubusercontent.com/54843684/214333826-182a706a-a19c-484a-9b4e-b299feeb18a3.png)<br/>


</details>
<!--*****************************************************************************Signup end*******-->
    
<!--*****************************************************************************Request Validation start*******-->
<details>
<summary><h6>6.Validate Request and Show Messages</h6></summary>
    
<b>modified signup route as below with error messages</b><br/>
```ruby
const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();

const {signout, signup} = require("../controllers/auth");

router.post(
    "/signup", 
    [
        check("name", "name should be at least 3 charaters").isLength({min : 3}),
        check("email", "email is required").isEmail(),
        check("password", "password should be at least 3 charater").isLength({min : 3})
    ] , 
    signup
);

router.get("/signout", signout);


module.exports = router;
```  

<b>signup controller is modifed like below</b><br/>
```ruby
const User = require("../models/user");
const { check, validationResult } = require('express-validator');


exports.signup = (req, res) => {


    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    const user = new User(req.body);
    user.save((err, user) => {
        if(err){
            return res.status(400).json({
                err: "Not able to save user in DB "
            })
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id
        });
    });
}
``` 

<b>See below output of validation message</b><br/><br/>
![image](https://user-images.githubusercontent.com/54843684/214385428-2fc60b17-0d5d-424a-84f8-8320804e3e81.png)
    
<b>When we use "param" insted of "msg", we can see parametrs that issue has</b><br/><br/>
![image](https://user-images.githubusercontent.com/54843684/214386109-4797ee36-7850-4e18-ac34-8148f496282a.png)


</details>
<!--*****************************************************************************Request Validation end*******-->    
  
</details>

<details>
<summary><h4>5.Authentication route and token</h4></summary>
* signup is a process that we stored users details in to the data base<br/> 
* How do we make sure that users log in success fully ? obvious thing is take users email or user name and password, and match the password with the data base password, if it is correctly logged in we can return true otherwise return false  <br/> 
* In our user schema we have created <b>authenticate</b> methods that doing same above thing<br/>
* How we make sure user is logged in?<br/> 
    1. we either use some kind of cookies<br/> 
    2. we either use some kind of token<br/>
    
using above mechanisam we put some infromation to user's browser to make sure that he has logged in and he can authenticate anypoint of time.<br/>In older apporocah we put cookies based infromation in to the users's browser Now modern application prefer <b>token based</b> methods 

</details>
