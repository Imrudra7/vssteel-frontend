document.addEventListener("DOMContentLoaded", function () {

    fetch("./mainIdx.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("mainIdx").innerHTML = data;
            

        })
        .catch(error => console.error("Error loading main:", error));

});