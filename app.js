var express     = require("express"),
    mongoose    = require("mongoose"),
    bodyParser  = require("body-parser"),
    Food        = require("./models/food"),
    app         = express();
    
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost/resto");

//  ROUTES
app.get("/", function(req, res) {
    Food.find({}, function(err, food) {
        if(err) {
            console.log(err);
        } else {
            res.render("index", {food: food});
        }
    })
});

app.post("/food", function(req, res) {
    Food.create(req.body.food, function(err, food) {
        if(err) {
            console.log(err);
        }else {
            res.redirect("/");
        }
    });
});

app.get("/food/new" , function(req, res) {
    res.render("food/new");
});

app.get("/food/:id/update", function(req, res) {
    Food.findById(req.params.id, function(err, food) {
        if(err) {
            console.log(err);
        }else {
            res.render("food/update", {food: food});
        }
    });
});

app.post("/food/:id/update", function(req, res) {
    Food.findByIdAndUpdate(req.params.id, req.body.food, function(err, food) {
        if(err) {
            console.log(err);
        }else {
            res.redirect("/#daftar-menu");
        }
    });
});

app.get("/food/:id/remove", function(req, res) {
    Food.findByIdAndRemove(req.params.id, function(err, food) {
        if(err) {
            console.log(err);
        }else {
            res.redirect("/#daftar-menu");
        }
    });
});

app.get("*", function(req, res) {
    res.send("Error 404 gan...");
});


// SERVER
app.listen(process.env.PORT || 3000, function() {
    console.log("server started");
})