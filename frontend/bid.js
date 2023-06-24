async function postBid()
{
    const modalLoc = document.getElementById("location").value;
    const modalActivity = document.getElementById("activity").value;
    const modalCost = document.getElementById("cost").value;
    const modalPartner = document.getElementById("partner").value

    const postBidRequestPayload = {
        location: modalLoc,
        activity: modalActivity,
        price: modalCost,
        partner: modalPartner === (undefined || modalPartner !== "yes")? false : true
    };

    try {
        const response = await fetch("https://sixinthecity.ai/api/bid", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postBidRequestPayload),
        });
  
        const result = await response.json();
        console.log("Success:", result);
        displayBids();
    } catch (error) {
        console.error("Error:", error);
    }
    
    // Clear the input
    document.getElementById("location").value = "";
    document.getElementById("activity").value = "";
    document.getElementById("cost").value = "";
    document.getElementById("partner").value = "";

    $('#exampleModal').modal('hide'); // Close the modal
}

async function fetchBids()
{
    try {
        const response = await fetch("https://sixinthecity.ai/api/bid", {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
        });
  
        const result = await response.json();

        result = 
        {
            "b5c24c74-fa98-4dfd-b58f-a53eb531ea5f": {
                "location": "Cherry Street Coffee in Belltown", 
                "activity": "Get coffee as a group", 
                "price": 50, "completed": false
            }, 
            "74e6aefd-de04-47fe-9597-149d4db7b453": {
                "location": "Bangrak Market in Belltown", 
                "activity": "Get Thai food as a group", 
                "price": 75, "completed": false
            }, 
            "472ea4a8-5ac6-400f-8854-769276c2cc38": {
                "location": "instruct group to use Lime Scooters to get around", 
                "activity": "Use Lime Scooters as your mode of transportation.", 
                "price": 0.02, "partner": true, "completed": false
            }, 
            "3da226ac-3bea-47e3-8286-7366f2fa5e57": {
                "location": "Eat Punani",
                "activity": "Eat Punani", 
                "price": "100", 
                "partner": true, 
                "completed": false
            }
        }
        console.log("Success:", result);
    } catch (error) {
        console.error("Error:", error);
    }
    console.log('Fetching bids');
}

function displayBids()
{
    result = 
        {
            "b5c24c74-fa98-4dfd-b58f-a53eb531ea5f": {
                "location": "Cherry Street Coffee in Belltown", 
                "activity": "Get coffee as a group", 
                "price": 50, 
                "completed": false
            }, 
            "74e6aefd-de04-47fe-9597-149d4db7b453": {
                "location": "Bangrak Market in Belltown", 
                "activity": "Get Thai food as a group", 
                "price": 75, 
                "completed": false
            }, 
            "472ea4a8-5ac6-400f-8854-769276c2cc38": {
                "location": "instruct group to use Lime Scooters to get around", 
                "activity": "Use Lime Scooters as your mode of transportation.", 
                "price": 0.02, 
                "partner": true, 
                "completed": false
            }, 
            "3da226ac-3bea-47e3-8286-7366f2fa5e57": {
                "location": "Eat Punani",
                "activity": "Eat Punani", 
                "price": "100", 
                "partner": true, 
                "completed": true
            }
        }
    
    const list1 = document.getElementById("list-of-bids-1"); 
    const list2 = document.getElementById("list-of-bids-2"); 
    var bidsHtml1 = "";
    var bidsHtml2 = ""

    for (item of Object.keys(result))
    {
        bid = result[item];

        if (bid.completed === true)
        {
            bidsHtml2 += `<div class="list-group-item list-group-item-action" aria-current="true">
            <div class="d-flex w-100 justify-content-between">
                <h3 class="mb-1">${bid.location}</h5>
                <h4 class="mb-1">$${bid.price}</h5>
            </div>
            <p class="mb-1">The bid activity is ${bid.activity}</p>
            <br>
            ${bid.partner !== undefined && bid.partner === true ? `<p>Partner</p>` : `<p>No partner</p>`}
            <small>
                <button type="button" class="btn btn-danger btn-small" onclick="deleteBid(\'' + item + '\')">Delete Bid</button>
            </small>
            </div>`
        }
        else {
            bidsHtml1 += `<div class="list-group-item aria-current="true">
            <div class="d-flex w-100 justify-content-between">
                <h3 class="mb-1">${bid.location}</h5>
                <h4 class="mb-1">$${bid.price}</h5>
            </div>
            <p class="mb-1">The bid activity is ${bid.activity}</p>
            <br>
            ${bid.partner !== undefined && bid.partner === true ? `<p>Partner</p>` : `<p>No partner</p>`}
            <small>
                <button type="button" class="btn btn-danger btn-small" onclick="deleteBid(\'' + item + '\')">Delete Bid</button>
            </small>
            </div>`
        }   
    }

    list1.innerHTML = bidsHtml1
    list2.innerHTML = bidsHtml2
}

async function deleteBid(bidId)
{    
    try
    {
        response = await fetch("https://sixinthecity.ai/api/bid/" + bidId, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();
        console.log("Success:", result);
    }
    catch (error) {
        console.error("Error:", error);
    }

    displayBids();
}

displayBids()

