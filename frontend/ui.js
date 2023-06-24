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

function getQueryParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

window.addEventListener('load', function() {
  const path = window.location.pathname;
  if (path.includes('/events')) {
    const id = getQueryParam('id');
    console.log(id);

    getEventById(id);
  }
});

function onSubmit(){
    // Environment
    const environment = document.getElementById("environment").value;

    // Travel Mode
    const travelMode = document.getElementById("travel-mode").value;

    // Budget
    const budget = document.getElementById("budget").value;

    // Experience
    const activities = document.getElementById("activities").value;

    // Distance
    const searchRadius = document.getElementById("search-radius").value;

    // Duration
    const duration = document.getElementById("duration").value;
    
    // JSON.stringify(jsonObject);
    
    const jsonObject = {
        "environment" : environment,
        "transportation" : travelMode,
        "budget" : budget,
        "activities" : activities,
        "distance" : searchRadius,
        "duration" : duration,
        // "position" : {
        //                 "latitude" : pos[0],
        //                 "longitude" : pos[1]
        //              }
    };

    console.log(jsonObject);

    fetchEvent(jsonObject);
}


async function fetchEvent(userPreference) {
    try {
        const response = await fetch("https://sixinthecity.ai/api/survey", {
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

async function getEventById(id) {
    try {
        const response = await fetch("https://sixinthecity.ai/api/event/" + id, {
            method: "GET"
        });

        const result = await response.json();
        console.log("Success:", result);
        populateEvent(result);
    } catch (error) {
        console.error("Error:", error);
    }
}

function populateEvent(JSONData){
    const event = JSONData.event || JSONData.raw_event;

    const itenerary = event.itinerary.activities

    var eventInfo = document.getElementById('event-info');
    var eventInfoHTML = `<h2 id="event-title" class="mb-1">${event.itinerary.activities}</h2>

    <li>Group size: 6</li>
    <li>Transportation: ${event.transportation}</li>
    <li>Starting location: ${event.location}</li>
    <li>Event duration: ${event.duration} hours</li>
    <li>Budget: $${event.budget}</li>`

    eventInfo.innerHTML = eventInfoHTML;

    var activityList = document.getElementById('activity-list');
    var activityHTML = ""
    itenerary.forEach((element, index) => {
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
