
const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
const switcher = document.querySelector(".dark-light-switcher");
const desktopNav = document.querySelector(".desktop-nav");
const mobileNav = document.querySelector('.mobile-nav')
// create dark/light mode switcher based on the size of the device screen

function modeSwiterElement () {
    let li = document.createElement('li')
    li.innerHTML = `
    <input type="checkbox" id="theme-switch" />
    <label for="theme-switch" class="theme-switch-label">
    <span class="theme-switch-icon"></span>
    </label>`
    return li
}

if (screenWidth <= 768 ) {  
    mobileNav.prepend(modeSwiterElement())
} else {
    desktopNav.append(modeSwiterElement ())
}


// Select Element
const themeSwitch = document.getElementById('theme-switch');
const searchButton = document.querySelector("nav .desktop-nav .link-search");
const closeButton = document.querySelector(".search-container .link-close");
const searchContainer = document.querySelector(".search-container");
const overlay = document.querySelector(".overlay");
const desktopSearchInput = document.querySelector(".search-container .search-bar input")
const navContainer = document.querySelector(".nav-container");
const menuIconContainer = document.querySelector("nav .menu-icon-container")
const searchInput = document.querySelector(".mobile-search-container input");
const searchBar = document.querySelector(".mobile-search-container .search-bar");
const nav = document.querySelector(".nav-container nav");
const cancelBtn = document.querySelector(".mobile-search-container .cancel-btn")
const crossbarContainer = document.querySelector('#skills .crossbar-container');


// #### Dark/Light Mode Switcher 

// Check if there is a saved preference and apply it on page load



window.addEventListener('DOMContentLoaded', function () {
    const savedTheme = localStorage.getItem('theme');
  
    if (savedTheme === 'light') {
      document.body.classList.add('light');
      themeSwitch.checked = true;
    }
  
  });
  
// Store the theme preference when the switch is toggled 
themeSwitch.addEventListener('change', function () {
if (this.checked) {
    document.body.classList.add('light');
    localStorage.setItem('theme', 'light');
} else {
    document.body.classList.remove('light');
    localStorage.setItem('theme', 'dark');
}
});



// Desktop Navigation - Search and close button function
searchButton.addEventListener("click", () => {
    desktopNav.classList.add("hide");
    searchContainer.classList.remove("hide");
    overlay.classList.add("show");
    desktopSearchInput.focus()
})
closeButton.addEventListener("click", () => {
    desktopNav.classList.remove("hide");
    searchContainer.classList.add("hide");
    overlay.classList.remove("show")
    desktopSearchInput.value = "";
})
overlay.addEventListener("click", () => {
    desktopNav.classList.remove("hide");
    searchContainer.classList.add("hide");
    overlay.classList.remove("show");
    desktopSearchInput.value = "";
})

// Mobile Version

menuIconContainer.addEventListener("click", ()=> {
    navContainer.classList.toggle("active")
})

desktopNav.addEventListener("click", (e)=> {
    if(searchBar.classList.contains('active')) {
        e.preventDefault()
    } else {
        navContainer.classList.toggle("active")
    }
})

searchInput.addEventListener("click", () => {
    searchBar.classList.add("active");
    nav.classList.add("move-up");
    desktopNav.classList.add("move-down")
    // desktopNav.addEventListener("click", (event)=> {
    //     event.preventDefault();
    // })
})
cancelBtn.addEventListener("click", () => {
    searchBar.classList.remove("active");
    nav.classList.remove("move-up");
    desktopNav.classList.remove("move-down");
    searchInput.value = "";
})

// the infinite scroll in skills section
// Get elements
const carousel = document.querySelector('.carousel');
const forwardBtn = document.querySelector('.forward-btn');
const backwardBtn = document.querySelector('.backward-btn');
const playBtn = document.querySelector('.play-btn');
const stopBtn = document.querySelector('.stop-btn');

// Variables
let intervalId;
let isPlaying = false;

// Functions
function moveCarousel() {
  const logoWidth = carousel.firstElementChild.offsetWidth + parseInt(getComputedStyle(carousel.firstElementChild).marginRight);
  carousel.style.transform = `translateX(-${logoWidth}px)`;
  carousel.appendChild(carousel.firstElementChild);
}

function forward() {
  if (!isPlaying) {
    moveCarousel();
  } else {
    isPlaying = false;
    clearInterval(intervalId);
  }
}

function backward() {
  if (!isPlaying) {
    const lastLogo = carousel.lastElementChild;
    const firstLogo = carousel.firstElementChild;
    carousel.insertBefore(lastLogo, firstLogo);
    carousel.style.transform = `translateX(-${lastLogo.offsetWidth}px)`;
  } else {
    isPlaying = false;
    clearInterval(intervalId);
  }

}

function play() {
  if (!isPlaying) {
    isPlaying = true;
    intervalId = setInterval(moveCarousel, 900); // Adjust the delay (in milliseconds) between logo transitions as needed
  }
}

function stop() {
  if (isPlaying) {
    isPlaying = false;
    clearInterval(intervalId);
  }
}

// Event listeners
forwardBtn.addEventListener('click', forward);
backwardBtn.addEventListener('click', backward);
playBtn.addEventListener('click', play);
stopBtn.addEventListener('click', stop);

// window.addEventListener('DOMContentLoaded', function () {
//   // when the page load , the play btn run
// })
// Change Copyright Year in footer auto
const theYear = document.querySelector("[year]")
theYear.textContent = ` ${new Date().getFullYear()}`
