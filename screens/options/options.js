// filepath: /c:/Users/batis/Documents/vscode/RPG Game/rpg-game/screens/options/options.js

// Save Game: Collect game state (using the leveling system API) and download as JSON.
document.getElementById('saveGame').addEventListener('click', () => {
    saveSystem.saveGame();
});

// Load Game: Allow the user to select a JSON file and update localStorage with the saved game state.
document.getElementById('loadGame').addEventListener('click', () => {
    saveSystem.loadGame();
});

document.getElementById('resetGame').addEventListener('click', () => {
    localStorage.clear();
    alert('Game reset successfully!');
    window.location.reload();
});