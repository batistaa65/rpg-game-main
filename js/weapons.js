
// Function to fetch weapon names from a JSON file and add a weapon with a random name
async function addWeapon() {
    try {
        const response = await fetch('/c:/Users/batis/Documents/vscode/RPG Game/rpg-game/js/weaponNames.json');
        const weaponNames = await response.json();
        const randomIndex = Math.floor(Math.random() * weaponNames.length);
        const weaponName = weaponNames[randomIndex];
        
        // Add the weapon to the game (this part depends on your game's implementation)
        console.log(`Weapon added: ${weaponName}`);
        // ...code to add the weapon to the game...
    } catch (error) {
        console.error('Error fetching weapon names:', error);
    }
}

// Example usage
addWeapon();
