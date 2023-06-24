let pos = [0, 0];
function positionRead(position){
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    pos[0] = position.coords.latitude;
    pos[1] = position.coords.longitude;
    console.log("Successfully accessed geolocation.");
}

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(positionRead);
}

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
    
    // JSON.stringify(jsonObject);
    
    const jsonObject = {
        "environment" : environment,
        "travel-mode" : travelMode,
        "budget" : budget,
        "experience" : experience,
        "search-radius" : searchRadius,
        "duration" : duration,
        "position" : {
                        "latitude" : pos[0],
                        "longitude" : pos[1]
                     }
    };

    console.log(jsonObject);

    fetchEvent(jsonObject);
}


async function fetchEvent(userPreference) {
    try {
        const response = await fetch("http://localhost:3000//customer-preferences", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userPreference),
        });
  
        const result = await response.json();
        console.log("Success:", result);
    } catch (error) {
        console.error("Error:", error);
    }
}