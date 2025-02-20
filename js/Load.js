function addCardItem(parent, data) {
    let title = data.title || "TemporaryTitle";
    let cardImage = data.cardImage || "temp.png";

    let item = document.createElement("div");
    item.className = `card`;
    item.id = data.pageID;
    item.style.backgroundImage = `url(content/${data.pageID}/${cardImage})`;
    item.innerHTML = `<h2 class="card-title">${title}</h2>`;
    item.addEventListener("click",loadproject)

    parent.appendChild(item);
}

function loadAll() {
    let sortedData = page_data.slice().sort((a, b) => (a["title"] > b["title"] ? 1 : -1));
    let parent = document.getElementById("allCards");
    sortedData.forEach(item => {
        addCardItem(parent, item);
    })
}

function loadproject() {
    let card = this
    id = card.id
    window.location.href = "project.html?urlID="+id
}

loadAll();