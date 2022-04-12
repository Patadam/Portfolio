// GSAP Registration
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

// Variables
const projects = document.querySelectorAll(".project-li");
const cta = document.querySelector("#hero-cta");

// CTA scroll button on the landing page scrolls down 100vh to the main content.
cta.addEventListener("click", () => {
  document.querySelector("main").scrollIntoView();
});

function percentToPixel(element, percentage) {
  let Width = element.offsetWidth;
  let DistanceFromSide = element.offsetLeft;
  return Width + DistanceFromSide;
}

// Projects animating into the page with scroll.
let timeline = gsap
  .timeline({
    scrollTrigger: {
      scrub: true,
      trigger: projects[0],
    },
    defaults: { duration: 2, delay: 0.6 },
  })

  //.fromTo(projects[0], { x: -1 * percentToPixel(projects[0]), opacity: 0.6 }, { x: 0, opacity: 1 })
  //.fromTo(projects[1], { x: percentToPixel(projects[1]), opacity: 0.6 }, { x: 0, opacity: 1 })
  //.fromTo(projects[2], { x: -1 * percentToPixel(projects[2]), opacity: 0.6 }, { x: 0, opacity: 1 });

  .fromTo(projects[0], { x: -80, opacity: 0.2 }, { x: 0, opacity: 1 })
  .fromTo(projects[1], { x: 80, opacity: 0.2 }, { x: 0, opacity: 1 })
  .fromTo(projects[2], { x: -80, opacity: 0.2 }, { x: 0, opacity: 1 });

// Toggles the Theme of the web page

const toggle = document.querySelector("#theme-toggle");
const HTML = document.querySelector("html");
const Icon = document.querySelector("#toggle-icon");

// changes the html attribute data-theme when clicked.
function toggleTheme() {
  let currentState = HTML.getAttribute("data-theme"); // finds the current theme of the page
  currentState == "dark" ? (newstate = "light") : (newstate = "dark"); // toggles the theme betwene ligth and dark
  HTML.setAttribute("data-theme", newstate); // applies the new theme to the html attribute
  Icon.innerHTML = newstate + "_mode"; // updates the icon displayed on the page
  toggle.setAttribute("checked", newstate); // updates the checkbox
  return newstate; // returns the new theme of the page to the calling instnace.
}

toggle.addEventListener("click", () => {
  let theme = toggleTheme();
  //document.cookie = `data-theme=${theme}; path=/`; // sets the cookie when the theme is changed.
});

(function defaultSetup() {
  // collects the cookie from cache and changes the default light theme to dark if theme is dark.
  //document.cookie.split(";").includes("data-theme=dark") ? toggleTheme() : "dark";
})();

const mobileNav = document.querySelector(".mobile-nav-wrapper");
const mobileNavClose = document.querySelector("#mobile-nav-control");
mobileNavClose.addEventListener("click", () => {
  if (mobileNav.classList.contains("hidden")) {
    mobileNav.classList.remove("hidden");
    mobileNavClose.innerHTML = "close";
  } else {
    mobileNav.classList.add("hidden");
    mobileNavClose.innerHTML = "menu";
  }
});

const links = mobileNav.querySelectorAll("li a");
links.forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.add("hidden");
    mobileNavClose.innerHTML = "menu";
  });
});

const db = [
  {
    title: "Algorithms Visualiser",
    subtitle: "Personal Project and Learning Exercise",
    type: "Next.js Website",
    description: "This project is currently in the works. There is nothing to show here yet.",
    link_live: "https://algorithms.patadamrich.com",
    link_source: "https://github.com",
    img: "/static/images/cafe.webp",
  },
  {
    title: "Tasty Roads",
    subtitle: "Resturant Website",
    type: "Static Website",
    description:
      "Tasty Road is a resturant website based off the local business 'Tasty Road'. This is a mock-up site not used by the resturant. Hosted on Netlify. Built with TailwindCSS.",
    link_live: "https://tastyroad.patadamrich.com",
    link_source: "https://github.com/Patadam/tastyroads",
    img: "/static/images/restaurant.webp",
  },
  {
    title: "Personal Blog",
    subtitle: "My Personal Next.js Blog",
    type: "Next.js Website",
    description: "This project is currently in the works. There is nothing to show here yet.",
    link_live: "https://blog.patadamrich.com",
    link_source: "https://github.com",
    img: "/static/images/gym.webp",
  },
];

const popup = document.querySelector(".card-wrapper");
const cardClose = popup.querySelector(".card-close");
const extraProjects = document.querySelectorAll(".extra-project-li");
extraProjects.forEach((element, index) => {
  element.addEventListener("click", () => {
    popup.classList.remove("hidden");
    setValue(index);
  });
});

cardClose.addEventListener("click", () => {
  popup.classList.add("hidden");
});

const backButton = popup.querySelector(".back");
backButton.addEventListener("click", (e) => {
  e.preventDefault();
  let currentIndex = backButton.getAttribute("current");
  if (currentIndex > 0) {
    setValue(currentIndex - 1);
  }
});

const forwardButton = popup.querySelector(".forward");
forwardButton.addEventListener("click", (e) => {
  e.preventDefault();
  let currentIndex = forwardButton.getAttribute("current");
  if (currentIndex < 2) {
    setValue(parseInt(currentIndex) + 1);
  }
});

const dots = popup.querySelectorAll(".dot");
const cardNav = popup.querySelectorAll(".card-nav li");

function setValue(index) {
  let content = popup.querySelector(".card-content");
  // Set content
  content.querySelector(".title").innerHTML = db[index].title;
  content.querySelector(".sub-title").innerHTML = db[index].subtitle;
  content.querySelector(".description").innerHTML = db[index].type;
  content.querySelector(".text").innerHTML = db[index].description;
  popup.querySelector(".image").setAttribute("src", db[index].img);
  // links
  content.querySelector(".live").setAttribute("href", db[index].link_live);
  content.querySelector(".source").setAttribute("href", db[index].link_source);
  // nav
  content.querySelector(".back").setAttribute("current", index);
  content.querySelector(".forward").setAttribute("current", index);
  // dots & numbers
  dots.forEach((element, i) => {
    if (i == index) {
      element.classList.add("bg-blue");
    } else if (element.classList.contains("bg-blue")) {
      element.classList.remove("bg-blue");
    }
  });
  // numbers
  cardNav.forEach((ele, ind) => {
    console.log(ele);
    if (ind == index) {
      ele.classList.add("blue");
    } else if (ele.classList.contains("blue")) {
      ele.classList.remove("blue");
    }
  });
}
