function saveGame() {
    // Grab saved values from localStorage (set by village.html)
    const level = parseInt(localStorage.getItem("level") || "1", 10);
    const currentXP = parseInt(localStorage.getItem("currentXP") || "0", 10);
    const currentPage = window.location.pathname; // Save the current page's path

    const gameState = {
        level: level,
        currentXP: currentXP,
        currentPage: currentPage
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(gameState, null, 2));
    const dlAnchorElem = document.createElement("a");
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "savegame.json");
    dlAnchorElem.click();
}

function loadGame() {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "application/json";
    fileInput.style.display = "none"; // Hide the input element
    document.body.appendChild(fileInput);

    fileInput.onchange = e => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = event => {
            try {
                const loadedData = JSON.parse(event.target.result);
                if (loadedData.level !== undefined && loadedData.currentXP !== undefined) {
                    localStorage.setItem("level", loadedData.level);
                    localStorage.setItem("currentXP", loadedData.currentXP);
                    alert("Game loaded successfully! The page will now update.");
                    if (loadedData.currentPage) {
                        window.location.href = loadedData.currentPage;
                    } else {
                        window.location.reload();
                    }
                } else {
                    alert("Invalid save game file.");
                }
            } catch (error) {
                alert("Error parsing save file.");
            }
        };
        reader.readAsText(file);
        // Remove file input from DOM after use
        document.body.removeChild(fileInput);
    };
    fileInput.click();
}

// Expose functions globally so others can use them.
window.saveSystem = {
    saveGame,
    loadGame
};