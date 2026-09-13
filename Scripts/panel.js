// Get Data from HTML
const page = document.getElementById("page");

// Function(s) to change main page from Panel
function openContacts(){page.src = "contacts.html";}
function openSearch(){page.src = "search.html";}

// Make Initial Steps
function init(){
    
    // Change Page Location
    page.src = "contacts.html";
}
init();