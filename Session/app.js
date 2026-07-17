const express =require("express");
const app = express()

const session = require("express-session");

app.use(session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: true
}));

app.get("/login", (req, res) => {
    req.session.user = "abcd1234";
    res.send("ok");
});
app.get("/", (req, res) => {
    console.log(req.session);
    res.send("HOME PAGE");
});



const PORT=4000
app.listen(PORT,()=>{
    console.log("Server Running at port 4000")
})