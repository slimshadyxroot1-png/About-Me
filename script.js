// my site script

// the little terminal
const out = document.getElementById("term-out");
const form = document.getElementById("term-form");
const input = document.getElementById("term-in");

const history = [];
let historyPos = 0;

// every command gives back a list of lines to print
const commands = {
  help: () => [
    "Commands you can try:",
    "  whoami     who I am",
    "  interests  what I like",
    "  projects   things I've built",
    "  github     my GitHub link",
    "  clear      clean the screen",
  ],
  whoami: () => [
    "Diwas Ghimire",
    "Student and self-taught programmer from Dang, Nepal.",
  ],
  interests: () => [
    "programming, hardware, ethical hacking, learning new things",
  ],
  projects: () => [
    "Root Studio - a music production app that runs in the browser",
  ],
  github: () => [
    { text: "github.com/slimshadyxroot1-png", href: "https://github.com/slimshadyxroot1-png" },
  ],
  clear: () => {
    out.innerHTML = "";
    return [];
  },
};

function addLine(line, className) {
  const p = document.createElement("p");
  if (typeof line === "object") {
    const a = document.createElement("a");
    a.textContent = line.text;
    a.href = line.href;
    if (line.href.startsWith("http")) {
      a.target = "_blank";
      a.rel = "noopener";
    }
    p.appendChild(a);
  } else {
    p.textContent = line;
  }
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
  const value = input.value;
  if (value.trim()) {
    history.push(value);
    historyPos = history.length;
  }
  run(value);
  input.value = "";
});

// up and down arrows bring back old commands
input.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && historyPos > 0) {
    historyPos--;
    input.value = history[historyPos];
    e.preventDefault();
  } else if (e.key === "ArrowDown") {
    historyPos = Math.min(historyPos + 1, history.length);
    input.value = history[historyPos] || "";
    e.preventDefault();
  }
});

// click anywhere on the terminal to start typing
document.getElementById("term").addEventListener("click", () => input.focus());
