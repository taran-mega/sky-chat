// Get Data from HTML

// Function for sending request to backend
async function sendToBackend(){
    
    // Variable
    API_URL = "https://sky-chat-backend-bl9g.onrender.com";
    
    // Make Controller
    const controller= new AbortController();
    
    // Fetch URL
   const response  = await fetch(
        `${API_URL}/contacts`,
        {
            method: "GET",
            credentials: "include",
            header:{
                "Content-Type": "application/json"
            },
            signal: controller.signal
        }
    );
    
    // Convert Response into JSON
    const data = await response.json();
    
    console.log(JSON.stringify(data, null, 2));
}