const toc = document.getElementById("toc");
const searchInput = document.getElementById("searchInput");
const chapters = [...document.querySelectorAll(".chapter")];

const chapterLinks = chapters.map((chapter) => {
  const title = chapter.dataset.title || chapter.querySelector("h2")?.textContent || "Chapter";
  const link = document.createElement("a");
  link.href = `#${chapter.id}`;
  link.textContent = title;
  toc.appendChild(link);
  return { chapter, link, title: title.toLowerCase() };
});

const setActiveLink = () => {
  const scrollPosition = window.scrollY + 120;
  let active = chapterLinks[0];

  for (const item of chapterLinks) {
    if (item.chapter.offsetTop <= scrollPosition) {
      active = item;
    }
  }

  chapterLinks.forEach(({ link }) => link.classList.remove("active"));
  active?.link.classList.add("active");
};

const filterChapters = () => {
  const value = searchInput.value.trim().toLowerCase();
  chapterLinks.forEach(({ chapter, link, title }) => {
    const match = title.includes(value);
    chapter.style.display = match ? "block" : "none";
    link.style.display = match ? "block" : "none";
  });
};

window.addEventListener("scroll", setActiveLink);
window.addEventListener("load", setActiveLink);
searchInput.addEventListener("input", filterChapters);
