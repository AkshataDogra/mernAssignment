export default class LoginService {

    // GET USER DETAILS AT LOGIN
    getUser (user) {
        console.log ("In getUser call");
        let username = user.UserName;
        let promise = fetch (`http://localhost:4070/api/user/${username}`, {
            method: "GET"
        });
        return promise;
    }

    // AUTHORIZE USER
    authUser (user) {
        console.log ("In service call");
        let promise = fetch ('http://localhost:4070/api/users/auth', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify (user)
        });
        return promise;
    }
    
}