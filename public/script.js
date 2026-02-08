// Tiny island vibe effects 🌴✨

document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 10;
  const y = (e.clientY / window.innerHeight - 0.5) * 10;

  document.querySelector(".container").style.transform =
    `translate(${x}px, ${y}px)`;
});

// Friendly console credit 😄
console.log(
  "Island Song - Ti ki ti ki 🌴\n" +
  "Song: 8-bitbowserJr7432 (zelda_life)\n" +
  "Website: Luis"
);
