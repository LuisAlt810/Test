// 🌴 Smooth loader -> main transition
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const container = document.querySelector(".container");

  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";

    setTimeout(() => {
      loader.style.display = "none";
      container.classList.add("show");
    }, 600);
  }, 1800);
});

// 🌊 Gentle island movement
document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 10;
  const y = (e.clientY / window.innerHeight - 0.5) * 10;

  document.querySelector(".container").style.transform =
    `translate(${x}px, ${y}px) scale(1)`;
});

// Console credit 🌴
console.log(
  "🌴 Island Song – Ti ki ti ki\n" +
  "Song: 8-bitbowserJr7432 (zelda_life)\n" +
  "Website by Luis"
);
