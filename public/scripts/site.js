let navOpen = false;
let header = document.getElementsByTagName("header")[0];
let headerNav = document.getElementById("header-nav");
let navContainer = document.getElementById("nav-container");
let naviToggle = document.getElementById("naviToggle");

document.getElementById("naviToggle").addEventListener("click", function () {
    if (navOpen) {
        headerNav.style.display = "";
        navContainer.style.display = "";
        navContainer.style.flexDirection = "";
        console.log(navOpen);
        navOpen = false;
    } else {
        console.log(navOpen);
        headerNav.ontoggle = true;
        console.log(headerNav);
        headerNav.style.display = "block";
        navContainer.style.display = "flex";
        navContainer.style.flexDirection = "column";
        navOpen = true;
    }
});

addEventListener("resize", (event) => {
    navContainer.style.display = "";
    headerNav.style.display = "";
    navContainer.style.display = "";
    navContainer.style.flexDirection = "";
    navOpen = false;
});
