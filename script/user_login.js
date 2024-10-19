document.getElementById("login").addEventListener("submit", function (event) {
    event.preventDefault();
    
    // Get the entered username and password
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    
    // Define users (in a real app, this data would come from a server)
    var users = {
        "admin": { "password": "adminpass", "role": "Admin" },
        "normaluser": { "password": "userpass", "role": "Normal" }
    };
    
    // Check if the username exists and the password matches
    if (users[username] && users[username].password === password) {
        // Store the user role in sessionStorage
        sessionStorage.setItem("userRole", users[username].role);
        
        // Display the main content and hide the login form
        document.getElementById("main-content").style.display = "block";
        document.getElementById("login-form").style.display = "none";
        
        // Customize access based on user role
        if (users[username].role === "Admin") {
            // Admin: Access to all menus and buttons
        } else if (users[username].role === "Normal") {
            // Normal user: Hide some menus and buttons
            document.getElementById("pills-kedb-tab").style.display = "none"; // Hide KEDB menu
          // Disable "Clear All" button
        }
    } else {
        // Invalid login
        document.getElementById("error-msg").innerText = "Invalid username or password";
    }
});
document.getElementById("logout-btn").addEventListener("click", function () {
    sessionStorage.clear();  // Clear the session storage
    location.reload();       // Reload the page to go back to the login form
});