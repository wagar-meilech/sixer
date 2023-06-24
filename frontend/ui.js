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
        const response = await fetch("http://localhost:3000/customer-preferences", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userPreference),
        });
  
        const result = await response.json();
        console.log("Success:", result);
        populateEvent(result);
    } catch (error) {
        console.error("Error:", error);
    }
}

function populateEvent(JSONData){
    // const returnedData = JSONData;
    const returnedData = {
        "distance": "2",
        "location": "South Lake Union",
        "environment": "Outdoors",
        "transportation": "Rental Scooters/Bikes",
        "activities": "Explore the city",
        "budget": "120",
        "duration": "4",
        "sponsored_location": "Cherry Street Coffee (2719 1st Ave, Seattle, WA 98121)",
        "sponsored_activity": "Monopoly",
        "itinerary": {
            "event_name": "Exploring South Lake Union",
            "group_size": 6,
            "event_duration": 852,
            "transportation": "Rental Scooters/Bikes",
            "budget_per_person": 120,
            "activities": [
                {
                    "activity_name": "Meet and Greet at Denny Park",
                    "activity_location": "Denny Park, Seattle, WA",
                    "distance_from_previous": 0,
                    "time_elapsed_minutes": 20,
                    "cost_per_person": 0,
                    "description": "Begin the adventure at Denny Park for introductions and group orientation.",
                    "sponsored": false
                },
                {
                    "activity_name": "Ride to Lake Union Park",
                    "activity_location": "Lake Union Park, Seattle, WA",
                    "distance_from_previous": 1,
                    "time_elapsed_minutes": 30,
                    "cost_per_person": 10,
                    "description": "Enjoy a scenic ride to Lake Union Park on rented bikes or scooters. Explore the park's amenities, including its green spaces, walking paths, and waterfront views.",
                    "sponsored": false
                },
                {
                    "activity_name": "Visit to the Museum of History & Industry (MOHAI)",
                    "activity_location": "Museum of History & Industry, Seattle, WA",
                    "distance_from_previous": 0.5,
                    "time_elapsed_minutes": 90,
                    "cost_per_person": 20,
                    "description": "Take a tour of the MOHAI to learn about Seattle's rich history and industry.",
                    "sponsored": false
                },
                {
                    "activity_name": "Game Time at Cherry Street Coffee",
                    "activity_location": "Cherry Street Coffee, 2719 1st Ave, Seattle, WA 98121",
                    "distance_from_previous": 1.2,
                    "time_elapsed_minutes": 60,
                    "cost_per_person": 15,
                    "description": "Ride over to Cherry Street Coffee. Relax and engage in a spirited game of Monopoly while enjoying some great coffee and pastries.",
                    "sponsored": false
                },
                {
                    "activity_name": "Explore Fremont Neighborhood",
                    "activity_location": "Fremont, Seattle, WA",
                    "distance_from_previous": 1,
                    "time_elapsed_minutes": 60,
                    "cost_per_person": 5,
                    "description": "Head to the nearby Fremont neighborhood, known for its quirky attractions and lively atmosphere. Discover public art, visit local shops, and soak in the charming vibe.",
                    "sponsored": false
                },
                {
                    "activity_name": "Lunch at a Food Truck Park",
                    "activity_location": "Food Truck Park, Seattle, WA",
                    "distance_from_previous": 0.8,
                    "time_elapsed_minutes": 45,
                    "cost_per_person": 15,
                    "description": "Refuel with some delicious street food at a local food truck park. Enjoy a variety of cuisines and flavors.",
                    "sponsored": false
                },
                {
                    "activity_name": "Visit the Olympic Sculpture Park",
                    "activity_location": "Olympic Sculpture Park, Seattle, WA",
                    "distance_from_previous": 1.1,
                    "time_elapsed_minutes": 45,
                    "cost_per_person": 0,
                    "description": "Take a leisurely ride to the Olympic Sculpture Park. Explore the outdoor sculpture gallery and admire stunning works of art amidst a beautiful waterfront setting.",
                    "sponsored": false
                },
                {
                    "activity_name": "Ride to Gas Works Park",
                    "activity_location": "Gas Works Park, Seattle, WA",
                    "distance_from_previous": 1.5,
                    "time_elapsed_minutes": 30,
                    "cost_per_person": 10,
                    "description": "Hop back on your rental scooters or bikes and ride to Gas Works Park. Enjoy panoramic views of Seattle's skyline and relax in the park's unique industrial landscape.",
                    "sponsored": false
                },
                {
                    "activity_name": "Explore South Lake Union Park",
                    "activity_location": "South Lake Union Park, Seattle, WA",
                    "distance_from_previous": 0.7,
                    "time_elapsed_minutes": 60,
                    "cost_per_person": 0,
                    "description": "End the day by exploring South Lake Union Park. Take a stroll along the waterfront, rent a paddleboard, or simply relax and enjoy the scenic views.",
                    "sponsored": false
                },
                {
                    "activity_name": "Dinner at a Local Brewery",
                    "activity_location": "Local Brewery, Seattle, WA",
                    "distance_from_previous": 0.8,
                    "time_elapsed_minutes": 60,
                    "cost_per_person": 30,
                    "description": "Treat yourselves to a delicious dinner at a local brewery. Indulge in craft beers and savor mouthwatering dishes.",
                    "sponsored": false
                }
            ]
        }
    }
    const itenerary = returnedData.itinerary.activities

    var eventInfo = document.getElementById('event-info');
    var eventInfoHTML = `<h2 id="event-title" class="mb-1">${returnedData.activities}</h2>

    <li>Group size: 6</li>
    <li>Transportation: ${returnedData.transportation}</li>
    <li>Starting location: ${returnedData.location}</li>
    <li>Event duration: ${returnedData.duration} hours</li>
    <li>Budget: $${returnedData.budget}</li>`

    eventInfo.innerHTML = eventInfoHTML;

    var activityList = document.getElementById('activity-list');
    var activityHTML = ""
    itenerary.forEach((element, index) => {
        // var location = document.createElement("li");
        // location.setAttribute("id", "activity-title_"+index);
        // location.setAttribute()
        // location.innerText = element.location;

        // var description = document.createElement("li");
        // description.setAttribute("id", "description_"+index);
        // description.setAttribute()
        // description.innerText = element.description;

        
        activityHTML += `<li id=${"activity_"+index}href="#" class="list-group-item list-group-item-action flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
          <h4 class="mb-1">${element.activity_name}</h4>
          <small class="text-muted">${element.time_elapsed_minutes} minutes</small>
        </div>
        <p class="mb-1">
          <li>Location: ${element.activity_location}</li>
          <li>Description: ${element.description}</li>
          <li>Cost: $${element.cost_per_person}</li>
        </p>
      </li>`
    });

    activityList.innerHTML = activityHTML;


}

populateEvent();