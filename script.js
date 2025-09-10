document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter-box");

  counters.forEach(box => {
    const countSpan = box.querySelector(".count");
    const clickBtn = box.querySelector(".clickBtn");
    const resetBtn = box.querySelector(".resetBtn");
    const activeBox = box.querySelector(".activeBox");
    const nameBox = box.querySelector(".nameBox");

    const id = box.dataset.id;

    // Load saved data
    const savedData = JSON.parse(localStorage.getItem(id)) || { count: 0, name: "" };
    countSpan.textContent = savedData.count;
    nameBox.value = savedData.name;

    // Save function
    const saveData = () => {
      localStorage.setItem(id, JSON.stringify({ 
        count: parseInt(countSpan.textContent), 
        name: nameBox.value 
      }));
    };

    // Click button
    clickBtn.addEventListener("click", () => {
      countSpan.textContent = parseInt(countSpan.textContent) + 1;
      saveData();
    });

    // Reset button
    resetBtn.addEventListener("click", () => {
      countSpan.textContent = 0;
      saveData();
    });

    // Save name on change
    nameBox.addEventListener("input", saveData);

    // Keyboard (Enter / Space)
    document.addEventListener("keydown", (e) => {
      if (activeBox.checked && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        countSpan.textContent = parseInt(countSpan.textContent) + 1;
        saveData();
      }
    });
  });
});
