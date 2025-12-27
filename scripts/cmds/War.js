const fs = require("fs");
const path = require("path");

const activeWar = new Map();
const galiFile = path.join(__dirname, "gali.txt");

function readMessages() {
  return fs.readFileSync(galiFile, "utf8")
    .split("\n")
    .map(x => x.trim())
    .filter(Boolean);
}

function warOn(threadID, sendMessage) {
  if (activeWar.has(threadID)) {
    sendMessage(threadID, "⚠️ War already ON");
    return;
  }

  const messages = readMessages();
  let i = 0;

  const interval = setInterval(() => {
    sendMessage(threadID, messages[i]);
    i = (i + 1) % messages.length;
  }, 4000);

  activeWar.set(threadID, interval);
  sendMessage(threadID, "🔥 WAR ON");
}

function warOff(threadID, sendMessage) {
  if (!activeWar.has(threadID)) {
    sendMessage(threadID, "❌ War already OFF");
    return;
  }

  clearInterval(activeWar.get(threadID));
  activeWar.delete(threadID);
  sendMessage(threadID, "🛑 WAR OFF");
}

module.exports = { warOn, warOff };
