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
    
    // JSON.stringify(jsonObject);

    console.log(jsonObject);

}