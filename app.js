var express         = require("express"),
    mongoose        = require("mongoose"),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"); 
    Food            = require("./models/food"),
    app             = express();
    
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost/resto");

// INDEX ROUTE
app.get("/", function(req, res) {
    Food.find({}, function(err, food) {
        if(err) {
            console.log(err);
        }
        res.render("index", {
            food: food
        });
    });
});

// CREATE ROUTE
app.get("/food/new", function (req, res) {
    res.render("food/new");
});

app.post("/food", function(req, res) {
    Food.create(req.body.food, function(err, food) {
        if(err) {
            console.log(err);
        }
        res.redirect("/#daftar-menu");
    });
});

// UPDATE ROUTE
app.get("/food/:id/update", function(req, res) {
    Food.findById(req.params.id, function(err, food) {
        if(err) {
            console.log(err);
        }
        res.render("food/update", {food: food});
    });
});

app.put("/food/:id", function(req, res) {
    Food.findByIdAndUpdate(req.params.id, req.body.food, function(err, food) {
        if(err) {
            console.log(err);
        }
        res.redirect("/#daftar-menu");
    });
});

// DELETE ROUTE
app.delete("/food/:id", function(req, res) {
    Food.findByIdAndRemove(req.params.id, function(err, food) {
        if(err) {
            console.log(err);
        }
        res.redirect("/#daftar-menu");
    });
});

// 404 NOT FOUND
app.get("*", function(req, res) {
    res.send("Error 404 gan...");
});

// SERVER
app.listen(process.env.PORT || 3000, function() {
    console.log("server started");
})