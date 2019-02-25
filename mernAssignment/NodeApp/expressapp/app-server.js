var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
var mongoose = require("mongoose");
var cors = require("cors");

mongoose.Promise = global.Promise;

var instance = express();
instance.use(
  express.static(path.join(__dirname, "./../node_modules/jquery/dist/"))
);

var router = express.Router();
instance.use(router);

instance.use(bodyParser.urlencoded({ extended: false }));
instance.use(bodyParser.json());

instance.use(cors());
router.get("/home", function(req, resp) {
  resp.sendFile("home.html", {
    root: path.join(__dirname, "./../views")
  });
});

// 5. Model-Schema-Mapping with collection on Mongo DB and
// establishing collection with it.'
mongoose.connect(
  "mongodb://localhost/PersonInformationDb",
  { useNewUrlParser: true }
);

var dbConnect = mongoose.connection;
if (!dbConnect) {
  console.log("Sorry Connection is not established");
  return;
}


// *** SCHEMAS *** //

var personsSchema = mongoose.Schema({
    PersonalUniqueID: String,
    FullName: Object,
    Gender: String,
    DateOfBirth: String,
    Age: String,
    Address: Object,
    City: String,
    State: String,
    PinCode: String,
    PhoneNo: String,
    MobileNo: String,
    PhysicalDisability: String,
    MaritalStatus: String,
    EducationStatus: String,
    BirthSign: String
});

var rolesSchema = mongoose.Schema({
  RoleId: String,
  RoleName: String
});

var usersSchema = mongoose.Schema({
  UserId: String,
  UserName: String,
  EmailAddress: String,
  Password: String,
  RoleId: String,
  RoleName: String
});


//                                name        schema          collection
var personModel = mongoose.model("Persons", personsSchema, "Persons");
var userModel = mongoose.model("Users", usersSchema, "Users");
var roleModel = mongoose.model("Roles", rolesSchema, "Roles");
var tempPersonSchemaModel = mongoose.model("TempPersons", personsSchema, "TempPersons");


// *** ROLES api *** //
// CREATE ROLE
instance.post("/api/role", function(request, response) {
    var role ={
      RoleId:request.body.RoleId,
      RoleName:request.body.RoleName
  };  
  // pass the parsed object to "create()" method
  roleModel.create(role , function(err, res) {
    if (err) {
      response.statusCode = 500;
      response.send(err);
    }
    response.send({ status: 200, data: res });
  });
});


// *** PERSON api *** //
// CREATE PERSON
instance.post("/api/person", function(request, response) {
  // parsing posted data into JSON
  var per = {
    PersonalUniqueID: request.body.PersonalUniqueID,
    FullName: {
        FirstName: request.body.FullName.FirstName,
        MiddleName: request.body.FullName.MiddleName,
        LastName: request.body.FullName.LastName
    },
    Gender: request.body.Gender,
    DateOfBirth: request.body.DateOfBirth,
    Age: request.body.Age,
    Address: {
        FlatNo: request.body.Address.FlatNo,
        SocietyName: request.body.Address.SocietyName,
        AreaName: request.body.Address.AreaName
    },
    City: request.body.City,
    State: request.body.State,
    PinCode: request.body.PinCode,
    PhoneNo: request.body.PhoneNo,
    MobileNo: request.body.MobileNo,
    PhysicalDisability: request.body.PhysicalDisability,
    MaritalStatus: request.body.MaritalStatus,
    EducationStatus: request.body.EducationStatus,
    BirthSign: request.body.BirthSign
  };
  // pass the parsed object to "create()" method
  personModel.create(per, function(err, res) {
    if (err) {
      response.statusCode = 500;
      response.send(err);
    }
    response.send({ status: 200, data: res });
  });
});

// READ PERSON
instance.get("/api/person", function(request, response) {
  
    personModel.find().exec(function(err, res) {
              if (err) {
                response.statusCode = 500;
                response.send({ status: response.statusCode, error: err });
              }
              response.send({ status: 200, data: res });
          });
  });

//READ PERSON BY ID
instance.get ("/api/person/:id",function (request,response) {
  var per = { PersonalUniqueID:request.params.id }
  // console.log (per);

  // tok=request.headers.authorization;
  // var tokenReceived=request.headers.authorization.split(" ")[1];
  // // console.log (tokenReceived);
  //   // verify token
  //   jwt.verify(tokenReceived,instance.get("jwtSecret"), function(err, decoded){
  //       console.log("In verify");
  //       if(err){
  //           console.log("In auth error");
  //           response.send({Success: false, message:"Token verification error"});
  //       } else {
  //         console.log("Login Successful");
  //         //decode the request
  //         request.decoded=decoded;
          personModel.findOne (per, function (err,res) {
            if (err) {
              response.statusCode=500;
              response.send ({status:response.statusCode,error:err});
            }
          response.send ({status:200,data:res});
          });
        // }
      // });
    });

// UPDATE PERSON
instance.put("/api/person/:id", function(request, response) {
  // parsing posted data into JSON
  var id = { PersonalUniqueID:request.params.id }
  // console.log(request.body);
  // console.log("Id : "+id);
  let nameObj = {
    FirstName: request.body.FullName.FirstName,
    MiddleName: request.body.FullName.MiddleName,
    LastName: request.body.FullName.LastName
  };

let addObj = {
    FlatNo: request.body.Address.FlatNo,
    SocietyName: request.body.Address.SocietyName,
    AreaName: request.body.Address.AreaName
};
  var newValue = {$set: {
    PersonalUniqueID: request.body.PersonalUniqueID,
    FullName: nameObj,
    Gender: request.body.Gender,
    DateOfBirth: request.body.DateOfBirth,
    Age: request.body.Age,
    Address: addObj,
    City: request.body.City,
    State: request.body.State,
    PinCode: request.body.PinCode,
    PhoneNo: request.body.PhoneNo,
    MobileNo: request.body.MobileNo,
    PhysicalDisability: request.body.PhysicalDisability,
    MaritalStatus: request.body.MaritalStatus,
    EducationStatus: request.body.EducationStatus,
    BirthSign: request.body.BirthSign 
  }};

  personModel.updateOne (id, newValue, function (err, res) {
    if (err) {
      response.statusCode = 500;
      response.send ({status: response.statusCode, error: err});
    }
  response.send ({status: 200, data: res});
}); 
});



var jwtSettings = {
    jwtSecret: "dbcsbiobc0708hdfcyesbombob"
}
// set the secret with express object
instance.set("jwtSecret", jwtSettings.jwtSecret);
var tokenStore = "";

// *** USER api *** //
// CREATE USER 
instance.post("/api/users", function(request, response) {
  var usr = {
    UserId: request.body.UserId,
    UserName: request.body.UserName,
    EmailAddress: request.body.EmailAddress,
    Password: request.body.Password,
    RoleId: request.body.RoleId,
    RoleName: request.body.RoleName
  };
  userModel.create(usr, function(err, res) {
    if (err) {
      response.statusCode = 500;
      response.send(err);
    }
    response.send({ status: 200, data: res });
  });
});

// AUTHENTICATE USER
instance.post("/api/users/auth", function(request, response) {
  var user = {
      // UserId: request.body.UserId,
      UserName: request.body.UserName,
      // EmailAddress: request.body.EmailAddress,
      Password: request.body.Password,
      // RoleId: request.body.RoleId,      
      RoleName: request.body.RoleName
  };

  console.log("In auth user", JSON.stringify(user));
    userModel.findOne({UserName:request.body.UserName}, function(err, usr){
        if(err)
        {
            console.log("Some Error has occurred");
            throw err;
        }
        if(!usr){
            response.send({statusCode:404, message:"Sorry user is not available."});
        }
        else if(usr)
        {
            
            if(usr.Password != user.Password)
            {
               
                response.send({statusCode: 404, message:"Sorry! username and password not found"});
            }
            else{
                console.log("In else if", JSON.stringify(usr));
                // Sign in user and generate token
                var token=jwt.sign({usr}, 
                    instance.get("jwtSecret"),{
                    expiresIn:3600
                });
                //save token globally
                console.log("In else if", JSON.stringify(usr));
                tokenStore=token;
                console.log(tokenStore);
                response.send({authenticated: true, message: "Login Successful", token:token});
            }
        }
    });
});

// READ USERS
instance.get("/api/users", function(request, response) {
  
  userModel.find().exec(function(err, res) {
            if (err) {
              response.statusCode = 500;
              response.send({ status: response.statusCode, error: err });
            }
            response.send({ status: 200, data: res });
        });
});

// READ USER BY USERNAME
instance.get("/api/user/:username", function(request, response) {
  var usr = { UserName: request.params.username }
  console.log ("In api");
  
  userModel.findOne( usr, function(err, res) {
            if (err) {
              response.statusCode = 500;
              response.send({ status: response.statusCode, error: err });
            }
            response.send({ status: 200, data: res });
        });       
});



// *** TEMP-PERSON api *** //
//CREATE TEMP PERSON REQUEST
instance.post("/api/tempPerson", function(request, response) {
  // parsing posted data into JSON
  let nameObj = {
            FirstName: request.body.FullName.FirstName,
            MiddleName: request.body.FullName.MiddleName,
            LastName: request.body.FullName.LastName
        };

  let addObj = {
            FlatNo: request.body.Address.FlatNo,
            SocietyName: request.body.Address.SocietyName,
            AreaName: request.body.Address.AreaName
        };

  var tempPer = {
    PersonalUniqueID: request.body.PersonalUniqueID,
    FullName: nameObj,
    Gender: request.body.Gender,
    DateOfBirth: request.body.DateOfBirth,
    Age: request.body.Age,
    Address: addObj,
    City: request.body.City,
    State: request.body.State,
    PinCode: request.body.PinCode,
    PhoneNo: request.body.PhoneNo,
    MobileNo: request.body.MobileNo,
    PhysicalDisability: request.body.PhysicalDisability,
    MaritalStatus: request.body.MaritalStatus,
    EducationStatus: request.body.EducationStatus,
    BirthSign: request.body.BirthSign
  };
  // pass the parsed object to "create()" method
  tempPersonSchemaModel.create(tempPer, function(err, res) {
    if (err) {
      response.statusCode = 500;
      response.send(err);
    }
    response.send({ status: 200, data: res });
  });
});

// DISPLAY TEMP PERSONS
instance.get("/api/tempPerson", function(request, response) {
  
  tempPersonSchemaModel.find().exec(function(err, res) {
            if (err) {
              response.statusCode = 500;
              response.send({ status: response.statusCode, error: err });
            }
            response.send({ status: 200, data: res });
        });
});

//DELETE TEMP PERSON
instance.delete("/api/tempPersonDelete/:id", function(request, response) {
  var id = { PersonalUniqueID:request.params.id };
  tempPersonSchemaModel.deleteOne(id,function(err,res){
    if (err) {
      response.statusCode = 500;
      response.send(err);
    }
    response.send({ status: 200, data: res });
  });
});


// 6. start listening
instance.listen(4070, function() {
  console.log("started listening on port 4070");
});