// Computes the total XP needed to reach a specific level
// XP_total(L) = 31.27 × [ L^(2 + 0.1·ln(L)) – 1 ]
function getXPThreshold(lvl) {
    // Round the calculated threshold to the nearest whole number.
    return Math.round(31.27 * (Math.pow(lvl, 2 + 0.1 * Math.log(lvl)) - 1));
}

// Player's current level and XP (for the current level)
let level = 1;
let currentXP = 0;

// Save progress to localStorage
function saveProgress() {
    localStorage.setItem("level", level);
    localStorage.setItem("currentXP", currentXP);
}

// Load progress from localStorage
function loadProgress() {
    const storedLevel = localStorage.getItem("level");
    const storedXP = localStorage.getItem("currentXP");
    if (storedLevel !== null && storedXP !== null) {
        level = parseInt(storedLevel, 10);
        currentXP = parseInt(storedXP, 10);
    }
}

// Updates the DOM elements associated with XP progress and current level
function updateXPDisplay() {
    // XP required to complete the current level:
    const xpForNextLevel = getXPThreshold(level + 1) - getXPThreshold(level);

    // Updating the level text above the level bar
    const levelTextEl = document.querySelector('.level-text');
    if (levelTextEl) {
        levelTextEl.textContent = "Level " + level;
    }

    // Updating the XP text and level bar progress
    const xpTextEl = document.querySelector('.xp-text');
    const levelProgressEl = document.querySelector('.level-progress');
    if (xpTextEl && levelProgressEl) {
        xpTextEl.textContent = `${currentXP} / ${Math.floor(xpForNextLevel)} XP`;
        const progressPercent = Math.min((currentXP / xpForNextLevel) * 100, 100);
        levelProgressEl.style.width = progressPercent + "%";
    }
}

// Adds XP and checks if the player should level up.
// On leveling up, subtract the XP threshold so that excess XP carries over.
function addXP(amount) {
    currentXP += amount;
    console.log(`Added ${amount} XP, total XP: ${currentXP}`);
    
    let xpForNextLevel = getXPThreshold(level + 1) - getXPThreshold(level);
    
    // Level up as long as currentXP exceeds or equals the required XP.
    while (currentXP >= xpForNextLevel) {
        currentXP -= xpForNextLevel;
        level++;
        console.log(`Leveled up! Now at level ${level}`);
        xpForNextLevel = getXPThreshold(level + 1) - getXPThreshold(level);
    }
    
    // Save updated progress to localStorage and update the display
    saveProgress();
    updateXPDisplay();
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    loadProgress();
    updateXPDisplay();
});

// Expose functions to be used elsewhere (if needed)
window.levelingSystem = {
    addXP: addXP,
    getXPThreshold: getXPThreshold,
    getLevel: () => level,
    getCurrentXP: () => currentXP,
    updateXPDisplay: updateXPDisplay,
};