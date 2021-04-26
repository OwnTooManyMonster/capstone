import { cardCreation } from "./src/content/card.js";
import { cardContent } from "./src/content/cardContent.js";

let mainArea = document.querySelector(".mainArea");

for (let i = 0; i < cardContent.length; i++) {
  let cardBox = cardCreation(cardContent[i]);
  mainArea.append(cardBox);
}
