let player = {
  name: "Dimitri",
  hp: 100,
  inventory: [],
};

let enemy = {};

function log(text) {
  const logBox = document.getElementById("log");
  logBox.innerHTML += `> ${text}<br>`;
  logBox.scrollTop = logBox.scrollHeight;
}

function updateUI() {
  document.getElementById("player-hp").textContent = player.hp;
  document.getElementById("inventory").textContent = player.inventory.join(", ") || "Empty";
  document.getElementById("enemy-name").textContent = enemy.name || "None";
  document.getElementById("enemy-hp").textContent = enemy.hp || 0;
}

function newEnemy() {
  const names = ["NullPointer", "MergeConflict", "Deadline"];
  const name = names[Math.floor(Math.random() * names.length)];
  const hp = Math.floor(Math.random() * 50) + 50;
  enemy = { name, hp };
  log(`A wild ${name} appears with ${hp} HP!`);
  updateUI();
}

function attack() {
  if (!enemy.name) return log("No enemy to attack.");
  const damage = Math.floor(Math.random() * 15) + 5;
  enemy.hp -= damage;
  log(`You hit ${enemy.name} for ${damage} damage.`);
  if (enemy.hp <= 0) {
    log(`${enemy.name} defeated! You found a potion!`);
    player.inventory.push("potion");
    enemy = {};
  } else {
    enemyAttack();
  }
  updateUI();
}

function enemyAttack() {
  const damage = Math.floor(Math.random() * 15) + 3;
  player.hp -= damage;
  log(`${enemy.name} hits you for ${damage} damage.`);
  if (player.hp <= 0) {
    log("You were defeated. Game over.");
    player.hp = 0;
  }
  updateUI();
}

function castSpell(type) {
  if (type === "fireball") {
    if (!enemy.name) return log("No enemy to target.");
    const damage = Math.floor(Math.random() * 25) + 10;
    enemy.hp -= damage;
    log(`You cast Fireball and deal ${damage} damage to ${enemy.name}!`);
    if (enemy.hp <= 0) {
      log(`${enemy.name} defeated! You looted a magic wand!`);
      player.inventory.push("wand");
      enemy = {};
    } else {
      enemyAttack();
    }
  } else if (type === "heal") {
    const heal = Math.floor(Math.random() * 20) + 10;
    player.hp = Math.min(player.hp + heal, 100);
    log(`You heal yourself for ${heal} HP.`);
  }
  updateUI();
}

function useItem() {
  if (player.inventory.includes("potion")) {
    player.hp = Math.min(player.hp + 30, 100);
    log("You used a potion and restored 30 HP.");
    player.inventory.splice(player.inventory.indexOf("potion"), 1);
  } else {
    log("You have no usable items.");
  }
  updateUI();
}

function saveGame() {
  localStorage.setItem("codeQuestPlayer", JSON.stringify(player));
  localStorage.setItem("codeQuestEnemy", JSON.stringify(enemy));
  log("Game saved!");
}

function loadGame() {
  const savedPlayer = JSON.parse(localStorage.getItem("codeQuestPlayer"));
  const savedEnemy = JSON.parse(localStorage.getItem("codeQuestEnemy"));
  if (savedPlayer) player = savedPlayer;
  if (savedEnemy) enemy = savedEnemy;
  log("Game loaded!");
  updateUI();
}

updateUI();
