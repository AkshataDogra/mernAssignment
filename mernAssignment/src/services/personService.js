export default class PersonService {

    // GET PERSON BY ID TO DISPLAY DATA IN PROFILE
    getData () {
        let id = localStorage.getItem ("id");
        var t = localStorage.getItem("token");
        let promise = fetch (`http://localhost:4070/api/person/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization":t
            }
        });
        return promise;
    }

    // REQUEST CREATE NEW TEMP PERSON --- STORE IN TEMP USER
    requestCreate (per){
        let promise = fetch (`http://localhost:4070/api/tempPerson`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify (per)
        });
        return promise;
    }

    // DISPLAY TEMP-PERSONS --- ALL REQUESTS
    getTempPer () {
        console.log ("IN get temp per");
        let promise = fetch (`http://localhost:4070/api/tempPerson`, {
            method: "GET",
            // headers: {
            //     "Content-Type": "application/json",
            //     "Authorization":t
            // }
        });
        return promise;
    }

    // CREATE NEW PERSON --- APPROVE BY ADMIN
    createData (per){
        console.log ("Creating...");
        let promise = fetch (`http://localhost:4070/api/person`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify (per)
        });
        return promise;
    }

    // UPDATE PERSON --- APPROVE BY ADMIN
    updateData(per) {
        console.log("Updating ");
        console.log ("PER"+per);
        let id = per.PersonalUniqueID;
        let promise = fetch (`http://localhost:4070/api/person/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify (per)
        });
        return promise;
    }

    // DELETE TEMP PERSON ---  AFTER APPROVAL
    deleteTemp (per) {
        console.log("Deleting from temporary records...");
        let id = per.PersonalUniqueID;
        let promise = fetch (`http://localhost:4070/api/tempPersonDelete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify (per)
        });
        return promise;
    }

    // DISPLAY PERSON BY ID FOR ADMIN
    getExistingPerson (per) {
        console.log("Searching in records...");
        let id = per.PersonalUniqueID;
        let promise = fetch (`http://localhost:4070/api/person/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        return promise;
    }
};