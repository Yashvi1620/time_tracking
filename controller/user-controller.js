const bcrypt=require("bcrypt")
const UserModel=require("../model/user -model")
module.exports.addUser=function(req,res){
    let firstName=req.body.firstName
    let email=req.body.email
    let password=req.body.password
    //encrypt
    let encPassword=bcrypt.hashSync(password,10)
    let role=req.body.role
    

    let user=new UserModel({
        firstName:firstName,
        email:email,
        password:encPassword,
        role:role,
      
    })

    user.save(function(err,data){
        if(err){
            res.json({msg:"SMW",data:err,status:-1})
        }else{
            res.json({msg:"signup done",data:data,status:200})
        }
    })
}
module.exports.getAllUsers=function(req,res){
    UserModel.find().populate("role").exec(function(err,data){
        if(err){
            res.json({msg:"SMW",data:err,status:-1})
        }else{
            res.json({msg:"users ret..",data:data,status:200})
        }
    })
    
}
module.exports.deleteUser=function(req,res){
    let userId=req.params.userId
    UserModel.deleteOne({_id:userId},function(err,data){
        if(err){
            res.json({msg:"SMW",data:err,status:-1})
        }else{
            res.json({msg:"users removed..",data:data,status:200})
        }
    })
    
}
module.exports.updateUser=function(req,res){
    let userId=req.body.userId
   
    
   
    let firstName=req.body.firstName
    let email=req.body.email
    let password=req.body.password
    let role=req.body.role
    
    UserModel.updateOne({_id:userId},{firstName:firstName,email:email,password:password,role:role},function(err,data){
        if (err){
            res.json({msg:"Something went wrong!!!",status:-1,data:err})
        }else{
            res.json({msg:"updated...",status:200,data:data})
        }
    })
}
// login
module.exports.login=function(req,res){
    
    let param_email=req.body.email
    let param_password=req.body.password
     //let param_role=req.body.role
    

    let isCorrect=false;
    UserModel.findOne({email:param_email }).populate("role").exec(function(err,data){
        if(data){
            let ans= bcrypt.compareSync(param_password,data.password)
            if(ans==true){
                isCorrect=true
            }
        }
        if(isCorrect==false){
            res.json({msg:"Invalid Credentials...",data:req.body,status:-1})

        }else{
            res.json({msg:"Login...",data:data,status:200})
        }
    })
}