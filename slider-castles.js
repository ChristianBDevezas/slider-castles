const data = [
  {
    img: "./img/peles-royal-romania.jpg",
    name: "Peles Royal - Romania",
    number: 1,
  },
  {
    img: "./img/czech-republic-lednice.jpg",
    name: "Lednice - Czech Republic",
    number: 2,
  },
  {
    img: "./img/neuschwanstein-germany.jpg",
    name: "Neuschwanstein - Germany",
    number: 3,
  },
  {
    img: "./img/chenonceau-france.jpg",
    name: "Chenonceau - France",
    number: 4,
  },
  {
    img: "./img/rastatt-germany.jpg",
    name: "Rastatt - Germany",
    number: 5,
  },
];

const container = document.querySelector(".slider__container");
const sliderButtons = document.querySelector(".slider__buttons");

// copy the data array of objects to a new variable
let technologies = [...data];

// if length is 2, add copies of slides
if(data.length === 2) technologies = [...data, ...data];

// populate container with map method
container.innerHTML = technologies.map((technology, slideIndex) => {
    const { img, name, number } = technology;
    let position = "next";

    if(slideIndex === 0) position = "active";

    if(slideIndex === technologies.length - 1) position = "last";

    if(data.length <= 1) position = "active";

    return `<article class="slide ${position}">
            <img src=${img} class="img" alt="${name}"/>
            <h4>${name}</h4>
            <p class="number">${number} / ${data.length}</p>
            </article>`;
}).join("");

// populate container with forEach method
// technologies.forEach((technology, slideIndex) => {
//   const { img, name, number } = technology;
//     let position = "next";

//     if(slideIndex === 0) position = "active";

//     if(slideIndex === technologies.length - 1) position = "last";

//     if(data.length <= 1) position = "active";

//     container.innerHTML += 
//     `<article class="slide ${position}">
//          <img src=${img} class="img" alt="${name}"/>
//          <h4>${name}</h4>
//          <p class="number">${number} / ${data.length}</p>
//     </article>`;
// });

// selecting the title of slides
const titleSlides = document.querySelectorAll(".slide h4");

let index = 0;

// populate buttons
sliderButtons.innerHTML = `
  <button class="btn prev-btn">
    <i class="fas fa-chevron-left"></i>
  </button>

  <button class="btn next-btn">
    <i class="fas fa-chevron-right"></i>
  </button>
`;

const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");

// if length is 1 hide buttons
if(data.length === 1) {
  nextBtn.style.display = "none";
  prevBtn.style.display = "none";
}

const moveSlider = (type) => {
  // get all three slides active, last and next
  const active = document.querySelector(".active");
  const last = document.querySelector(".last");
  let next = active.nextElementSibling;
  
  // avoid to run out of next siblings (when active one doesn't have the next sibling)
  if(!next) next = container.firstElementChild;
  console.log(next);
  
  // when we have multiple classes, we can specify which class using brackets
  active.classList.remove("active");
  last.classList.remove("last");
  next.classList.remove("next");

  if(type === "previous") {
    active.classList.add("next");
    last.classList.add("active");
    next = last.previousElementSibling;

    if(!next) next = container.lastElementChild;
    
    next.classList.remove("next");
    next.classList.add("last");
    
    // when type === "previous" the function has to return so the next block of code is not executed
    return;
  }

  active.classList.add("last");
  last.classList.add("next");
  next.classList.add("active");
};

// check length of index
const checkLength = () => {
  if(index > titleSlides.length - 1) index = 0;
  if(index < 0) index = titleSlides.length - 1;
}

// show current slide index
const showCurrentTitle = () => {
  titleSlides[index].classList.add("current");
  setTimeout(() => titleSlides[index].classList.remove("current"), 850);
  console.log(index, titleSlides[index]);
}

// 
prevBtn.addEventListener("click", () => {
  moveSlider("previous");
  index--;
  checkLength();
  showCurrentTitle();
});

nextBtn.addEventListener("click", () => {
  moveSlider();
  index++;
  checkLength();
  showCurrentTitle();
});