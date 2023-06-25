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
        partner: modalPartner.toLowerCase() === "yes"
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
        fetchBids();
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
        displayBids(result);
        console.log("Success:", result);
    } catch (error) {
        console.error("Error:", error);
    }
    console.log('Fetching bids');
}

function displayBids(result)
{
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

    fetchBids();
}

fetchBids()

