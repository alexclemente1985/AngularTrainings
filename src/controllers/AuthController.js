const UserModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const consts = require('../consts');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: '../../.env'});

module.exports = {
    register: async function(req,res){
        try{
            let error = null;
            let u = await UserModel.findOne({email: req.body.email});
            if(!u){
                const user = new UserModel(req.body);
                user.password = bcrypt.hashSync(req.body.password, consts.bcryptSalts);
                await user.save();
                delete user.password;
                res.status(200).json(user);
            }
            else{
                error = new Error(consts.error_msgs.EMAIL_ALREADY_REGISTERED.msg);
                error.code = consts.error_msgs.EMAIL_ALREADY_REGISTERED.code
                throw error;
            }
        }
        catch(e){
           switch(e.code){
            case consts.error_msgs.EMAIL_ALREADY_REGISTERED.code:
                return res
                .status(consts.http_status.client_errors.FORBIDDEN)
                .json({message: consts.error_msgs.EMAIL_ALREADY_REGISTERED.msg});
            default:
                return res
                .status(consts.http_status.server_errors.INTERNAL_SERVER_ERROR)
                .json({message: consts.error_msgs.ERROR_WHILE_SAVING_USER.msg, error: e});
        }
        }
    },
    login: function(req,res){
        const password = req.body.password;
        const email = req.body.email;
        let error = null;

        UserModel.findOne({email: email}).lean().exec(
            
            function(err,user){
                try{
                    if(err){
                        error = new Error(consts.error_msgs.BAD_GATEWAY.msg);
                        error.code = consts.error_msgs.BAD_GATEWAY.code;

                        throw error;
                    }

                    const authErr = (password == '' || password ==null || !user);
    
                    if(!authErr){
                        if(bcrypt.compareSync(password, user.password)){
                            let token = jwt.sign({_id: user._id}, process.env.KEYJWT, {expiresIn: consts.expiresJWT});
                            delete user.password;
                            return res.json({...user, token: token})
                        }
                    } 
                    error = new Error(consts.error_msgs.WRONG_EMAIL_PASSWORD.msg);
                    error.code = consts.error_msgs.WRONG_EMAIL_PASSWORD.code;
                    throw error;             
                }
                catch(e){
                    switch(e.code){
                        case consts.error_msgs.WRONG_EMAIL_PASSWORD.code:
                            return res
                            .status(consts.http_status.client_errors.NOT_FOUND)
                            .json({message: consts.error_msgs.WRONG_EMAIL_PASSWORD.msg});
                        case consts.error_msgs.BAD_GATEWAY.code:
                            return res
                            .status(consts.http_status.server_errors.BAD_GATEWAY)
                            .json({message: consts.error_msgs.BAD_GATEWAY.msg, error: err});
                        default:
                            return res
                            .status(consts.http_status.server_errors.INTERNAL_SERVER_ERROR)
                            .json({message: consts.error_msgs.SERVER_ERROR.msg, error: e});
                    }
                }
                
            }
        )
    },
    checkToken: function(req,res,next){
        try{
            const token = req.get('Authorization');
            let error = null;

            if(!token){
                error = new Error(consts.error_msgs.TOKEN_NOT_FOUND.msg);
                error.code = consts.error_msgs.TOKEN_NOT_FOUND.code;
                throw error;
            }
    
            jwt.verify(token, process.env.KEYJWT, 
                (err,decoded) => {
                    if(err || !decoded){
                        error = new Error(consts.error_msgs.WRONG_TOKEN);
                        error.code = consts.error_msgs.WRONG_TOKEN.code;
                        throw error;
                    }
                    next();
                }
            )
        }
        catch(e){
            switch(e.code){
                case consts.error_msgs.TOKEN_NOT_FOUND.code:
                    return res
                    .status(consts.http_status.client_errors.UNAUTHORIZED)
                    .json({message: consts.error_msgs.TOKEN_NOT_FOUND.msg});
                case consts.error_msgs.WRONG_TOKEN.code:
                    return res
                    .status(consts.http_status.client_errors.UNAUTHORIZED)
                    .json({message: consts.error_msgs.WRONG_TOKEN.msg});
                default:
                    return res
                    .status(consts.http_status.server_errors.INTERNAL_SERVER_ERROR)
                    .json({message: consts.error_msgs.SERVER_ERROR.msg, error: e});
            }
        }
        
    },
    userData: function(req,res){
        try{
            const token = req.get('Authorization');
            let error = null;

            jwt.verify(token, process.env.KEYJWT,
                (err, decoded)=>{
                    const id = decoded._id;
                    UserModel.findById(id).lean().exec(
                        function(err,user){
                            if(err || !user){
                                error = new Error(consts.error_msgs.ERROR_WHILE_FETCHING_USER_DATA.msg);
                                error.code = consts.error_msgs.ERROR_WHILE_FETCHING_USER_DATA.code;
                                throw error;
                            }
                            let token = jwt
                            .sign(
                                {_id: user._id},
                                process.env.KEYJWT, 
                                {expiresIn: consts.expiresJWT}
                            );
                            delete user.password;
                            return res.json({...user, token: token})
                        }
                    )
                }
            )
        }
        catch(e){
            switch(e.code){
                case consts.error_msgs.ERROR_WHILE_FETCHING_USER_DATA.code:
                    return res
                    .status(consts.http_status.server_errors.INTERNAL_SERVER_ERROR)
                    .json({message: consts.error_msgs.ERROR_WHILE_FETCHING_USER_DATA.msg, error: e});
                default:
                    return res
                    .status(consts.http_status.server_errors.INTERNAL_SERVER_ERROR)
                    .json({message: consts.error_msgs.SERVER_ERROR.msg, error: e});
            }
        }
    }
}