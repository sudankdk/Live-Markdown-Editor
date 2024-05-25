import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

document.addEventListener("DOMContentLoaded", () => {
  const markdownInput = document.getElementById("markdown-input");
  const htmlPreview = document.getElementById("html-preview");
  const themeBox = document.getElementById("themeBox");

  function updatePreview() {
    const markdownText = markdownInput.value;
    htmlPreview.innerHTML = marked(markdownText);
  }

  markdownInput.addEventListener("input", () => {
    updatePreview();
    saveContent();
  });
  updatePreview();

  themeBox.addEventListener("change", () => {
    document.body.className = "";
    const selectedTheme = themeBox.options[themeBox.selectedIndex].className;
    document.body.classList.add(`${selectedTheme}-theme`);
    saveTheme(selectedTheme);
  });

  function saveContent() {
    localStorage.setItem("markdown", markdownInput.value);
  }

  function loadContent() {
    const savedMarkdown = localStorage.getItem("markdown");
    if (savedMarkdown) {
      markdownInput.value = savedMarkdown;
      updatePreview();
    }
  }

  function saveTheme(theme) {
    localStorage.setItem("theme", theme);
  }

  function loadTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.body.classList.add(`${savedTheme}-theme`);
      const options = themeBox.options;
      for (let i = 0; i < options.length; i++) {
        if (options[i].className === savedTheme) {
          themeBox.selectedIndex = i;
          break;
        }
      }
    }
  }

  loadContent();
  loadTheme();

  document.getElementById("export-md").addEventListener("click", () => {
    const blob = new Blob([markdownInput.value], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "content.md";
    a.click();
    URL.revokeObjectURL(url);
  });

  document.getElementById("export-html").addEventListener("click", () => {
    const blob = new Blob([htmlPreview.innerHTML], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "content.html";
    a.click();
    URL.revokeObjectURL(url);
  });
});
