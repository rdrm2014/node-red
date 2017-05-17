/**
 * Created by ricardomendes on 05/05/17.
 */
var when = require("when");
module.exports = {
    type: "credentials",

    // Validação dos logins
    users: function(username) {
        return when.promise(function(resolve) {
            // Do whatever work is needed to check username is a valid
            // user.
            /*console.log("users");
            console.log(username);*/

            if(true) {
            //if (valid) {
                // Resolve with the user object. It must contain
                // properties 'username' and 'permissions'
                var user = { username: "admin", permissions: "*" };
                resolve(user);
            } else {
                // Resolve with null to indicate this user does not exist
                resolve(null);
            }
        });
    },
    authenticate: function(username,password) {
        return when.promise(function(resolve) {
            /*console.log("authenticate");
            console.log(username + ": " + password);*/

            // Do whatever work is needed to validate the username/password
            // combination.
            if(true) {
            //if (valid) {
                // Resolve with the user object. Equivalent to having
                // called users(username);
                var user = { username: "admin", permissions: "*" };
                resolve(user);
            } else {
                // Resolve with null to indicate the username/password pair
                // were not valid.
                resolve(null);
            }
        });
    },
    /*default: function() {
        return when.promise(function(resolve) {
            // Resolve with the user object for the default user.
            // If no default user exists, resolve with null.
            console.log("default");
            resolve({anonymous: false, permissions:"read"});
        });
    }*/
}