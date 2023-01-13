# MERN-Project
Creating Webapplication Using MERN Stack

<h3>STEPS</h3>

<h4>1.Object modeling with help of mongoose (category, order, product, user)<br/></h4>
<h4>2.Mongodb connection and db talk<br/></h4>
<h4>3.Creating ".env" file and setup environment variables</h4>

<details>
<summary><h4>4.Middeleware and initial routes</h4></summary>

<details>
<summary><h6>What is middleware? </h6></summary>
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
</details>

