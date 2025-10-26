// navbar.js
const loggedOutArray = [
    { text: "Home", link: "index.html" },
    { text: "Products", link: "products.html" },
    { text: "About Us", link: "about.html" },
    { text: "Contact us", link: "contact.html" },
    { text: "Login", link: "login.html" },
    { text: "Register", link: "register.html" }
];

let loggedInArray = [
    { text: "Home", link: "index.html" },
    { text: "Products", link: "products.html" },
    { text: "About Us", link: "about.html" },
    { text: "Contact us", link: "contact.html" },
    { text: "My Profile", link: "profile.html" },
    { text: "My Cart 🛒", link: "cart.html" },
    { text: "Logout", link: "logout.html" }
];


const navbarController = {
    isUserLoggedIn: false, // You would check auth status (e.g., check for a token)
    userRole: null, // 'admin', 'user', etc.

    // Backend se user info fetch karo
    async fetchUserInfo() {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                this.isUserLoggedIn = false;
                return;
            }

            const response = await fetch('/api/user/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const userData = await response.json();
                this.isUserLoggedIn = true;
                this.userRole = userData.role; // backend se role milega
                if (this.userRole === 'ADMIN')
                    loggedInArray.push({ text: "Admin Dashboard", link: "admin.html" })
            } else {
                this.isUserLoggedIn = false;
                localStorage.removeItem('authToken');
            }
        } catch (error) {
            console.error('Error fetching user info:', error);
            this.isUserLoggedIn = false;
        }
    },

    getNavItems: function () {
        if (this.isUserLoggedIn) {
            return loggedInArray;
        } else {
            return loggedOutArray;
        }
    },


    render: function () {
        this.fetchUserInfo();
        const navItems = this.getNavItems();
        const navElement = document.querySelector("#navbar-list"); // Assuming you have a <ul id="navbar-list">

        if (navElement)
            navElement.innerHTML = "";

        if (navElement)
            navItems.forEach(item => {
                navElement.innerHTML += `<li><a href="${item.link}">${item.text}</a></li>`;
            });
    }
};

// You would then call navbarController.render() when the page loads
// and after the user logs in or out.
document.addEventListener("DOMContentLoaded", function () {

    fetch("../navbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar").innerHTML = data;
            navbarController.render();

        })
        .catch(error => console.error("Error loading navbar:", error));

});
