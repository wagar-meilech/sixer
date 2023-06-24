

async function postBid()
{
    const modalLoc = document.getElementById("location").value;
    const modalActivity = document.getElementById("activity").value;
    const modalCost = document.getElementById("cost").value;
    const modalPartner = document.getElementById("cost").value

    const postBidRequestPayload = {
        location: modalActivity,
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
    } catch (error) {
        console.error("Error:", error);
    }
    
    $('#exampleModal').modal('hide'); // Close the modal
}

function fetchBids()
{
    console.log('Fetching bids');
}