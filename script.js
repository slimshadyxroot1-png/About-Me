// my site script

// the little terminal
const out = document.getElementById("term-out");
const form = document.getElementById("term-form");
const input = document.getElementById("term-in");

// every command gives back a list of lines to print
const commands = {
  help: () => [
    "Commands you can try:",
    "  whoami   who I am",
    "  clear    clean the screen",
  ],
  whoami: () => [
    "Diwas Ghimire",
    "Student and self-taught programmer from Dang, Nepal.",
  ],
  clear: () => {
    out.innerHTML = "";
    return [];
  },
};

function addLine(line, className) {
  const p = document.createElement("p");
  p.textContent = line;
  if (className) p.className = className;
  out.appendChild(p);
}

function run(raw) {
  const cmd = raw.trim().toLowerCase();
  if (!cmd) return;

  addLine("$ " + raw.trim(), "cmd");

  if (commands[cmd]) {
    commands[cmd]().forEach((line) => addLine(line));
  } else {
    addLine("command not found: " + cmd + ". Try 'help'.");
  }
  out.scrollTop = out.scrollHeight;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  run(input.value);
  input.value = "";
});

// click anywhere on the terminal to start typing
document.getElementById("term").addEventListener("click", () => input.focus());
