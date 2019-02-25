export default class UserService {

    // REQUEST CREATE NEW USER --- STORE IN TEMP USER
    requestCreate (usr){
        let promise = fetch (`http://localhost:4070/api/users`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify (usr)
        });
        return promise;
    }


}