// Get Data from HTML
const searchBar = document.getElementById("search-bar");
const resultArea = document.getElementById("results");

// Request(s) Controller
let controller = null;

// Function for Start/End loading animation
function toggleLoading(type = "start"){
    
    // If "start"
    if (type === "start"){
        document.querySelector("#search-area #search-btn #text").style.display = "none";
        document.querySelector("#search-area #search-btn .loadingCircle").style.display = "block";
    }
    
    // If "end"
    else if (type === "end"){
        document.querySelector("#search-area #search-btn #text").style.display = "block";
        document.querySelector("#search-area #search-btn .loadingCircle").style.display = "none";
    }
    
    // If not defined well
    else{
        console.log("Animation toggling argument is not defined well.");
    }
}

// Function to adding User on screen
function addUserToScreen(username){
    
    // Make MainElement
    const div = document.createElement("div");
    div.className = "result";
    
    // Make Left Content
    const leftDiv = document.createElement("div");
    
    // Make Right Button
    const btn = document.createElement("button");
    btn.textContent = "+ Connect"
    
    // Add Data into Left Content
    leftDiv.textContent = username;
    
    // Attach Result with Results Screen
    div.appendChild(leftDiv);
    div.appendChild(btn);
    resultArea.appendChild(div);
}

// Function for sending request to backend
async function sendToBackend(){
    
    // URLs
    const API_URL = "https://sky-chat-backend-bl9g.onrender.com";
    
    // Cancel Previous Request
    if(controller){controller.abort();}
    
    // Make Controller for new request
    controller = new AbortController();    
    
    // Start Animation
    toggleLoading("start");
    
    // Try Request
    try{
        
        // Establish Connection
        const response = await fetch(
            `${API_URL}/search-users`,
            {
                method: "POST",
                credentials: "include",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    input: searchBar.value
                }),
                signal: controller.signal
            }
        );
        
        // Convert Response into JSON
        const data = await response.json();
        
        // Check Success
        if(data.success){
        
            // For Every item in Response
            for (let item of data){
        
                // Add to Screen
                addUserToScreen(item.username);
            }
        }
    }
    
    // Handle Error(s)
    catch(error){
        
        // Abort Error
        if(error.name === "AbortError"){
            console.log("previous request is cancelled.");
            return;
        }
        
        // Other Error(s)
        console.error(error);
    }
    
    // Finally
    finally{
        
        // End Loading
        toggleLoading("end");
    }
}

// Function for Sending Request from frontend
async function sendRequest(){
    
    // Clear Results
    resultArea.innerHTML = "";
   
    // Send To Backend
    await sendToBackend();
}

// Make Control for Keyboard
window.addEventListener("keydown", (event) => {
    
    // "ENTER" key
    if (event.key === "Enter"){
        sendRequest();
    }
});