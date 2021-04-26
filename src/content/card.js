function cardCreation(cardContent) {
  let cardBox = document.createElement("div");
  cardBox.classList.add("cardBox");

  let videoBox = document.createElement("div");
  videoBox.classList.add("videoBox");
  cardBox.append(videoBox);

  let videoPara = document.createElement("p");
  videoPara.classList.add("videoPara");
  videoBox.append(videoPara);
  videoPara.textContent = cardContent.text;

  return cardBox;
}

export { cardCreation };
