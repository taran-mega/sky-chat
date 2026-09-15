// Get Data from HTML
const loadingCircle = document.getElementById("loading");

// Variable(s)
const API_URL = "https://sky-chat-backend-bl9g.onrender.com";

// Function to check authentication of user
async function checkAuth(){
    
    // Make Controller
    const controller = new AbortController();
    
    // Make Request
    const response = await fetch(
        `${API_URL}/is-auth`,
        {
            method: "GET",
            credentials: "include"
        }
    );
    
    // Convert Response into JSON
    const data = await response.json();
    
    // Check Success
    if (data.success){
        
        window.location.href = "panel.html";
    }
    else{
        window.location.href = "auth.html";
    }
}

// call initial function(s)
checkAuth();