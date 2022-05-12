const connectionhelper = require('./connetToDB')
const jwt = require('jsonwebtoken');
const jwtKey = 'my_secret_key';
const jwtExpiryTimeInMilliSeconds = 1000 * 60 * 15; // 15 min

// -----------------------
// business:
function getAllRestaurants(cat_name) {
    return new Promise(async (resolve, reject) => {
        if(cat_name == "1" ||
        cat_name == "2" ||
        cat_name == "3"|| 
        cat_name == "4"){
            let y = await connectionhelper.connectionfun()
            const business = y.query(`SELECT * FROM business JOIN businesscategory ON business.category_id = businesscategory.id WHERE business.category_id = ${cat_name}` , (err, rows) => {
                if (!err) {
                    console.log('The data from business table are: \n', rows)
                    y.release()
                } else {
                    console.log(err)
                    y.release()
                    reject(err);
                }
                resolve(rows)
            })
          }
        else{
            res.err("the category is unkown");
          }
    })
}

exports.getAllRestaurants = getAllRestaurants

// -------------------------------------------

function myCheckUserPasswordService(username, password) {
    return new Promise(async (resolve, reject) => {
        try {
            let y = await connectionhelper.connectionfun()
            y.query(`SELECT * FROM business WHERE userName ='${username}' and password='${password}'`, (err, rows) => {
                if (err) {
                    console.log("there was an error while sending query to"
                        + " db to get the customer details by uname and pass", err)
                    y.release()
                    reject(err);
                } else {
                    console.log("myCheckUserPasswordService - rtnd rows ", rows)
                    y.release()
                }
                if (Object.keys(rows).length > 0) {
                    console.log('Found data for the provided uname and pass: ', rows)
                    resolve(true)
                }
                else {
                    resolve(false)
                }
            })
        }
        catch (err) {
            reject("myCheckUserPasswordService error: ", err)
        }
    })
}
exports.myCheckUserPasswordService = myCheckUserPasswordService

// -------------------------------------------------

function CheckUsernameInUsers(username, password) {
    return new Promise(async (resolve, reject) => {
        try {
            let y = await connectionhelper.connectionfun()
            y.query(`SELECT * FROM users WHERE userName ='${username}' and password='${password}'`, (err, rows) => {
                if (err) {
                    console.log("there was an error while sending query to"
                        + " db to get the customer details by uname and pass", err)
                    y.release()
                    reject(err);
                } else {
                    console.log("myCheckUserPasswordService - rtnd rows ", rows)
                    y.release()
                }
                if (Object.keys(rows).length > 0) {
                    console.log('Found data for the provided uname and pass: ', rows)
                    resolve(true)
                }
                else {
                    resolve(false)
                }
            })
        }
        catch (err) {
            reject("myCheckUserPasswordService error: ", err)
        }
    })
}
exports.CheckUsernameInUsers = CheckUsernameInUsers

//-----------------------------------------------------------------------
//     (only if username, password match our records)
const signIn = async (req, res) => {
    // Get credentials (username and password) from JSON body
    //   and use our service to check if they are OK
    const { username, password } = req.body;
    const isPassOK = await myCheckUserPasswordService(username, password);
    if (!isPassOK) { 
        const isPassOk2 = await CheckUsernameInUsers(username , password);
        // return 401 error if authentication not OK  
        if(!isPassOk2){
            return res.status(401).send("username or password didnt match the info we have");
        }
    }
    // once we got here, we know that a user with the provided uname and pass exists in the db,
    //          lets get a cart for him 
    // let cartnum
    // try {
    //     console.log("signIn - going to try to get a cart for the user");
    //     let resultFromGetCartForTheUser = await getCartForTheUser(username);
    //     cartnum = resultFromGetCartForTheUser;
    // }
    // catch (err) {
    //     console.log(`signIn - while we were waiting for getCartForTheUser there was an error:  ${err}`);
    //     return res.status(500).send("error getting a cart");
    // }

    // Create a new token with the username in the payload
    //  which expires X seconds after issue
    let token;
    try {
        let X = jwtExpiryTimeInMilliSeconds;
        token = jwt.sign({ username }, jwtKey, {
            algorithm: 'HS256',
            expiresIn: X
        })
    }
    catch (err) {
        console.log("signin - error while creating the new token: ", err);
    }
    console.log('signin - successfully creaeted token:', token)

    // set a cookie named 'token' with value = the token string we created above, 
    //   with max age 
    // here, the max age is in milliseconds, so we multiply by 1000
    res.cookie('token', token, { maxAge: jwtExpiryTimeInMilliSeconds })
    console.log(token);
    res.json({ username, token });
}
exports.signIn = signIn
//--------------------------------------------------
//--------------------------

const refresh = async (req, res) => {
    console.log("going to try to refresh the token (if there is one and it is still valid");

    let statusCode = 200 // OK
    const token = req.cookies.token;
    console.log(token, "!!!!!!!!!!!!!!!!!!!!");

    if (!token) {
        console.log('refresh - couldnt find token in cookies');
        statusCode = 401;
        return statusCode;
    }
    // once we got here, it means we did found a token in the cookies
    let payload;
    try {
        payload = jwt.verify(token, jwtKey);
    }
    catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            console.log("refresh - jwt.JsonWebTokenError error: " + e);
            statusCode = 401
            return statusCode;
        }
        console.log('refresh - error while reading the token, but NOT a jwt.JsonWebTokenError: ', e);
        statusCode = 400;
        return statusCode;
    }

    // Once we got here it means the token was checked and is valid
    // Now, create a new token for the current user, 
    //   with a renewed expiration time
    console.log("refresh - yayyy we got payload: ", payload);
    console.log("refresh - now creating NEW TOKEN with extended time");
    const newToken = jwt.sign({ username: payload.username }, jwtKey, {
        algorithm: 'HS256',
        expiresIn: jwtExpiryTimeInMilliSeconds
    })

    // Set the new token as the users `token` cookie
    console.log(`refresh - the new refreshed token - ${newToken}`);
    res.cookie('token', newToken, { maxAge: jwtExpiryTimeInMilliSeconds })
    res.thePayload = payload;
    // once we got here it means the statusCode is still 200 (as we initialized to be)
    return statusCode; // returning 200
}
module.exports.refresh = refresh

// ------------------------------------

function AddNewBusiness(reqbody) {
    return new Promise(async (resolve, reject) => {
        if(reqbody.category != 1 && reqbody.category != 2 && reqbody.category != 3 && reqbody.category != 4){
        reject("err category_id must be 1 or 2 or 3 or 4")
        }
        let y = await connectionhelper.connectionfun()
        y.query('INSERT INTO business (businessName ,userName ,logoImage, FirstAndLastName ,password ,location ,remarks ,phone ,email ,instagram ,facebook ,menuImage,category_id , userType_id) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [reqbody.businessName ,reqbody.username ,reqbody.logoImage ,reqbody.FirstAndLastName ,reqbody.password ,reqbody.location ,reqbody.remarks , reqbody.phone ,reqbody.email ,reqbody.instagram  ,reqbody.facebook  ,reqbody.menuImage ,reqbody.category ,1], (err, rows) => {
            if (!err) {
                console.log('The data from business table are: \n', rows);
                y.release()
            } else {
                console.log(err);
                y.release()
                reject(err);
            }
        })
    })
}
exports.AddNewBusiness = AddNewBusiness

// -----------------------
// users:
function AddNewUser(req) {
    return new Promise(async (resolve, reject) => {
        let y = await connectionhelper.connectionfun()
        y.query('INSERT INTO users (userName,FirstAndLastName,password,email,phone,userType_id) VALUES(?,?,?,?,?,?)', [req.username,req.FirstAndLastName,req.password,req.email, req.phone ,2], (err, rows) => {
            if (!err) {
                console.log('The data from users table are: \n', rows);
                y.release()
            } else {
                console.log(err);
                y.release()
                reject(err);
            }

        })
    })
}
exports.AddNewUser = AddNewUser

// --------------------------
// tablereservation:

function GetIdBybusinessname(businessName){
        return new Promise(async (resolve, reject) => {
        let y 
        try{
        y = await connectionhelper.connectionfun()
        }
        catch(err){
            reject("error 4")
        }
        y.query(`SELECT id FROM business WHERE businessName = '${businessName}'`, (err, rows) => {
        if (err) {
            console.log("GetIdBybusinessname - there was an error while sending query to"
                + " db to SELECT id FROM business WHERE businessName", err)
            y.release()
            reject(err);
        } else {
            console.log("GetIdBybusinessname - rtnd rows ", rows)
            y.release()
        }
        if (Object.keys(rows).length === 1) {
            console.log("GetIdBybusinessname - rtnd rows ", rows)
            resolve(rows[0].id)
        }
        else {
            reject(`GetIdBybusinessname - error - more than one users with the same businessName ${businessName}`)
        }
    })

        
    })}
    
exports.GetIdBybusinessname = GetIdBybusinessname

// --------------------------------------

function AddNewTablereservation(req) {
    return new Promise(async (resolve, reject) => {
        let y = await connectionhelper.connectionfun()
        let x = await GetIdBybusinessname(req.businessName)
        y.query('INSERT INTO tablereservation (userName,userPhone,NumberOfPeople,date,hour,business_id) VALUES(?,?,?,?,?,?)', [req.username ,req.customerphone,req.numberofpeople,req.date,req.hour, `${x}`], (err, rows) => {
            if (!err) {
                console.log('The data from users table are: \n', rows);
                y.release()
            } else {
                console.log(err);
                y.release()
                reject(err);
            }
        })
    })
}
exports.AddNewTablereservation = AddNewTablereservation


// -----------------------
// commentsandrating:
function AddCommentToCard(req) {
    return new Promise(async (resolve, reject) => {
        let y
        let x
        console.log(req, "the req from AddCommentToCard !!!!!!!!!!");

        try {
            y = await connectionhelper.connectionfun()
        }
        catch (err) {
            reject("connection not successful myCheckUserPasswordService ", err)
        }

        try {
            x = await GetIdBybusinessname(req.businessName)
            console.log(x, "line 114");
        }

        catch (err) {
            reject("couldnt get user by id from function GetIdBybusinessname ", err)
        }
        try {
            y.query(`INSERT INTO commentsandrating(username,business_id,comment) VALUES (?,?,?)`, [req.username, `${x}`, req.comment], (err, rows) => {
                if (!err) {
                    y.release()
                    resolve("successfully added comment to card")

                } else {
                    console.log(err)
                    y.release()
                    reject(err);
                }
            })
        }
        catch (err) {
            console.log(err, "err from query");

        }

    })
}
exports.AddCommentToCard = AddCommentToCard

// ----------------------------------------

function GetCommentsByBusinessId(req) {
    console.log(req);
    return new Promise(async (resolve, reject) => {
        let y
        let x = await GetIdBybusinessname(req)
        console.log(req, "the req from AddCommentToCard !!!!!!!!!!");

        try {
            y = await connectionhelper.connectionfun()
        }
        catch (err) {
            reject("connection not successful myCheckUserPasswordService ", err)
        }
        try {
            y.query (`SELECT * FROM commentsandrating WHERE business_id = '${x}'` , (err, rows) => {
                if (!err) {
                    y.release()
                    resolve(rows)
                } else {
                    console.log(err)
                    y.release()
                    reject(err);
                }
            })
            
        }
        catch (err) {
            console.log(err, "err from query");
            

 } })}

 exports.GetCommentsByBusinessId = GetCommentsByBusinessId;






