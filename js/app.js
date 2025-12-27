const courses = [
  {
    title: "Google Ads Training",
    category: "marketing",
    price: "$100",
    author: "Jerome Bell",
    image: "images/1.png",
  },
  {
    title: "Product Management Fundamentals",
    category: "management",
    price: "$480",
    author: "Marvin McKinney",
    image: "images/2.png",
  },
  {
    title: "HR Management and Analytics",
    category: "hr",
    price: "$200",
    author: "Leslie Alexander",
    image: "images/3.png",
  },
  {
    title: "UX/UI Design from Scratch",
    category: "design",
    price: "$320",
    author: "Guy Hawkins",
    image: "images/4.png",
  },
  {
    title: "Advanced Web Development",
    category: "development",
    price: "$530",
    author: "Jacob Jones",
    image: "images/5.png",
  },
  {
    title: "Digital Marketing Strategy",
    category: "marketing",
    price: "$150",
    author: "Jane Cooper",
    image: "images/6.png",
  },
  {
    title: "People Management Skills",
    category: "management",
    price: "$220",
    author: "Robert Fox",
    image: "images/7.png",
  },
  {
    title: "Recruitment Essentials",
    category: "hr",
    price: "$180",
    author: "Wade Warren",
    image: "images/8.png",
  },
  {
    title: "Frontend Performance",
    category: "development",
    price: "$400",
    author: "Brooklyn Simmons",
    image: "images/9.png",
  },
];

let visibleCount = 6;
let activeCategory = "All";

const grid = document.getElementById("coursesGrid");
const tabs = document.getElementById("tabs");
const searchInput = document.getElementById("searchInput");

const categories = ["All", ...new Set(courses.map((c) => c.category))];

function renderTabs() {
  tabs.innerHTML = categories
    .map((cat) => {
      const count =
        cat === "All"
          ? courses.length
          : courses.filter((c) => c.category === cat).length;

      return `<div class="courses__tab ${
        cat === activeCategory ? "courses__tab--active" : ""
      }" data-cat="${cat}">
      ${cat} <sup>${count}</sup>
    </div>`;
    })
    .join("");
}

function renderCourses() {
  grid.innerHTML = "";

  const filtered = courses
    .filter((c) => activeCategory === "All" || c.category === activeCategory)
    .filter((c) =>
      c.title.toLowerCase().includes(searchInput.value.toLowerCase())
    )
    .slice(0, visibleCount);

  filtered.forEach((c) => {
    grid.innerHTML += `
      <div class="card">
        <div class="card__image">
          <img src="${c.image}" alt="">
        </div>
        <div class="card__body">
          <span class="card__tag card__tag--${c.category.toLowerCase()}">${
      c.category
    }</span>
          <h3 class="card__title">${c.title}</h3>
          <div class="card__meta">
            <span>$${c.price}</span> | by ${c.author}
          </div>
        </div>
      </div>
    `;
  });
}

tabs.addEventListener("click", (e) => {
  if (!e.target.dataset.cat) return;
  activeCategory = e.target.dataset.cat;
  visibleCount = 6;
  renderTabs();
  renderCourses();
});

searchInput.addEventListener("input", renderCourses);

document.getElementById("loadMore").addEventListener("click", () => {
  visibleCount += 3;
  renderCourses();
});

renderTabs();
renderCourses();
