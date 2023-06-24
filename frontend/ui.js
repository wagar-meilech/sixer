function onSubmit(){
    // Environment
    const environment = document.getElementById("environment").value;

    // Travel Mode
    const travelMode = document.getElementById("travel-mode").value;

    // Budget
    const budget = document.getElementById("budget").value;

    // Experience
    const experience = document.getElementById("experience").value;

    // Distance
    const searchRadius = document.getElementById("search-radius").value;

    // Duration
    const duration = document.getElementById("duration").value;

    const jsonObject = {"environment" : environment,
                        "travel-mode" : travelMode,
                        "budget" : budget,
                        "experience" : experience,
                        "search-radius" : searchRadius,
                        "duration" : duration
                        };
    
    fetchEvent(jsonObject);
}

function fetchEvent(jsonObject)
{
    fetch('http://localhost:3000/customer-preferences', {
        method: 'POST',
        body: jsonObject
        }).then(function (response) {
        // The API call was successful!
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response);
        }
        }).then(function (data) {
            // This is the JSON from our response
            console.log(data);
        }).catch(function (err) {
            // There was an error
            console.warn('Something went wrong.', err);
        });
}