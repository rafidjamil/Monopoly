const Players = [
    { name: "Mustafa", balance: 1500, tossScore: null, token: null, position: 0, properties: [] },
    { name: "Usama", balance: 1500, tossScore: null, token: null, position: 0, properties: [] }
];

const Bank = {
    name: "Bank",
    balance: 10000,
    transactions: []
};

const spaces = [
    { name: "Go", price: 0, type: "Corner", rent: 0, owner: null },
    { name: "Mediterranean Ave.", price: 60, type: "Brown", rent: 20, owner: null },
    { name: "Community Chest", price: 0, type: "Card Space", rent: 0, owner: null },
    { name: "Baltic Ave.", price: 60, type: "Brown", rent: 20, owner: null },
    { name: "Income Tax", price: 200, type: "Tax Space", rent: 20, owner: null },
    { name: "Reading Railroad", price: 200, type: "Railroad", rent: 50, owner: null },
    { name: "Oriental Ave.", price: 100, type: "Light Blue", rent: 30, owner: null },
    { name: "Chance", price: 0, type: "Card Space", rent: 0, owner: null },
    { name: "Vermont Ave.", price: 100, type: "Light Blue", rent: 30, owner: null },
    { name: "Connecticut Ave.", price: 120, type: "Light Blue", rent: 40, owner: null },
    { name: "Jail", price: 0, type: "Corner", rent: 0, owner: null },
    { name: "St. Charles Place", price: 140, type: "Pink", rent: 50, owner: null },
    { name: "Electric Company", price: 150, type: "Utility", rent: 20, owner: null },
    { name: "States Ave.", price: 140, type: "Pink", rent: 50, owner: null },
    { name: "Virginia Ave.", price: 160, type: "Pink", rent: 60, owner: null },
    { name: "Pennsylvania Railroad", price: 200, type: "Railroad", rent: 50, owner: null },
    { name: "St. James Place", price: 180, type: "Orange", rent: 70, owner: null },
    { name: "Community Chest", price: 0, type: "Card Space", rent: 0, owner: null },
    { name: "Tennessee Ave.", price: 180, type: "Orange", rent: 70, owner: null },
    { name: "New York Ave.", price: 200, type: "Orange", rent: 80, owner: null },
    { name: "Free Parking", price: 0, type: "Corner", rent: 0, owner: null },
    { name: "Kentucky Ave.", price: 220, type: "Red", rent: 90, owner: null },
    { name: "Chance", price: 0, type: "Card Space", rent: 0, owner: null },
    { name: "Indiana Ave.", price: 220, type: "Red", rent: 90, owner: null },
    { name: "Illinois Ave.", price: 240, type: "Red", rent: 100, owner: null },
    { name: "B. & O. Railroad", price: 200, type: "Railroad", rent: 50, owner: null },
    { name: "Atlantic Ave.", price: 260, type: "Yellow", rent: 110, owner: null },
    { name: "Ventnor Ave.", price: 260, type: "Yellow", rent: 110, owner: null },
    { name: "Water Works", price: 150, type: "Utility", rent: 20, owner: null },
    { name: "Marvin Gardens", price: 280, type: "Yellow", rent: 120, owner: null },
    { name: "Go To Jail", price: 0, type: "Corner", rent: 0, owner: null },
    { name: "Pacific Ave.", price: 300, type: "Green", rent: 130, owner: null },
    { name: "North Carolina Ave.", price: 300, type: "Green", rent: 130, owner: null },
    { name: "Community Chest", price: 0, type: "Card Space", rent: 0, owner: null },
    { name: "Pennsylvania Ave.", price: 320, type: "Green", rent: 150, owner: null },
    { name: "Short Line", price: 200, type: "Railroad", rent: 50, owner: null },
    { name: "Chance", price: 0, type: "Card Space", rent: 0, owner: null },
    { name: "Park Place", price: 350, type: "Dark Blue", rent: 175, owner: null },
    { name: "Luxury Tax", price: 100, type: "Tax Space", rent: 0, owner: null },
    { name: "Boardwalk", price: 400, type: "Dark Blue", rent: 200, owner: null }
];

const bankBtn = document.getElementById("bankButton");
const bankModal = document.getElementById("bankModal");
const closeBankModal = document.getElementById("closeBankModal");

bankBtn.addEventListener("click", () => {
    updateBankInfo();
    bankModal.style.display = "flex";
});

closeBankModal.addEventListener("click", () => {
    bankModal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === bankModal) {
        bankModal.style.display = "none";
    }
});

function updateBankInfo() {
    const bankBalance = document.getElementById("bankBalance");
    const bankInfoBox = document.getElementById("bankInfoBox");

    bankBalance.innerText = `Total Bank Cash: $${Bank.balance}`;

    let infoHTML = "<h4>Transaction History:</h4>";

    if (Bank.transactions.length === 0) {
        infoHTML += `<p><em>No transactions recorded yet.</em></p>`;
    } else {
        Bank.transactions.slice().reverse().forEach(tx => {
            infoHTML += `<p>${tx}</p>`;
        });
    }

    bankInfoBox.innerHTML = infoHTML;
}

const propertyModal = document.getElementById("propertyModal");
const closePropertyModal = document.getElementById("closePropertyModal");

closePropertyModal.addEventListener("click", () => {
    propertyModal.style.display = "none";
    if (game.gameStarted) {
        game.updateMoveButtons();
    }
});

window.addEventListener("click", (e) => {
    if (e.target === propertyModal) {
        propertyModal.style.display = "none";
        if (game.gameStarted) {
            game.updateMoveButtons();
        }
    }
});

class Monopoly {
    constructor(players) {
        this.players = players;
        this.tossWinner = null;
        this.tossLoser = null;
        this.currentSelector = null;
        this.sellModalOpen = false;
        this.currentPlayerIndex = 0;
        this.gameStarted = false;
        this.pendingActionSpace = null;
    }


    getRandomDice() {
        return Math.floor(Math.random() * 6) + 1;
    }

    showPlayers() {
        document.getElementById("player1Name").innerText = this.players[0].name;
        document.getElementById("player1Cash").innerText = `$${this.players[0].balance}`;
        document.getElementById("player2Name").innerText = this.players[1].name;
        document.getElementById("player2Cash").innerText = `$${this.players[1].balance}`;
    }

    updatePlayerDisplay() {
        this.players.forEach((player, index) => {
            document.getElementById(`player${index + 1}Cash`).innerText = `$${player.balance}`;
        });
    }

    updateMoveButtons() {
        const btn1 = document.getElementById("move1");
        const btn2 = document.getElementById("move2");

        if (this.currentPlayerIndex === 0) {
            btn1.disabled = false;
            btn1.classList.add('active-turn');
            btn1.classList.remove('inactive-turn');

            btn2.disabled = true;
            btn2.classList.add('inactive-turn');
            btn2.classList.remove('active-turn');
        } else {
            btn2.disabled = false;
            btn2.classList.add('active-turn');
            btn2.classList.remove('inactive-turn');

            btn1.disabled = true;
            btn1.classList.add('inactive-turn');
            btn1.classList.remove('active-turn');
        }
    }

    toss(playerIndex) {
        const player = this.players[playerIndex];
        const sidebar = playerIndex === 0 ? document.querySelector(".sidebar-left") : document.querySelector(".sidebar-right");
        const d1 = this.getRandomDice();
        const d2 = this.getRandomDice();
        const total = d1 + d2;
        player.tossScore = total;

        document.getElementById("dice1").value = d1;
        document.getElementById("dice2").value = d2;
        document.getElementById("result").value = total;

        sidebar.innerHTML = `<p>${player.name}, you rolled <strong>${d1}</strong> + <strong>${d2}</strong> = <strong>${total}</strong></p>`;

        if (playerIndex === 0) {
            this.currentPlayerIndex = 1;
            document.querySelector(".sidebar-right").innerHTML = `<p>Take your move for toss.</p>`;
        }

        this.updateMoveButtons();

        if (this.players[0].tossScore !== null && this.players[1].tossScore !== null) {
            this.decideTossWinner();
        }
    }

    decideTossWinner() {
        const p1 = this.players[0];
        const p2 = this.players[1];

        if (p1.tossScore > p2.tossScore) {
            this.tossWinner = p1;
            this.tossLoser = p2;
            this.currentPlayerIndex = 0;
            document.querySelector(".sidebar-left").innerHTML += `<p><strong>You won the toss! Choose your token first.</strong></p>`;
            document.querySelector(".sidebar-right").innerHTML += `<p>${p2.name}, wait for your turn.</p>`;
        } else if (p2.tossScore > p1.tossScore) {
            this.tossWinner = p2;
            this.tossLoser = p1;
            this.currentPlayerIndex = 1;
            document.querySelector(".sidebar-right").innerHTML += `<p><strong>You won the toss! Choose your token first.</strong></p>`;
            document.querySelector(".sidebar-left").innerHTML += `<p>${p1.name}, wait for your turn.</p>`;
        } else {
            document.querySelector(".sidebar-left").innerHTML += `<p><strong>It's a tie! Roll again.</strong></p>`;
            document.querySelector(".sidebar-right").innerHTML += `<p><strong>It's a tie! Roll again.</strong></p>`;
            this.players[0].tossScore = null;
            this.players[1].tossScore = null;
            document.getElementById("move1").disabled = false;
            document.getElementById("move2").disabled = true;
            return;
        }

        setTimeout(() => this.openTokenModal(), 2000);
    }

    openTokenModal() {
        document.getElementById("tokenModal").style.display = "flex";
        this.currentSelector = this.tossWinner;
        document.getElementById("tokenTitle").innerText = `${this.currentSelector.name}, choose your token`;
        this.updateHoverColor();
    }

    selectToken(token, imgSrc) {
        if (this.currentSelector.token) return;

        this.currentSelector.token = { name: token, img: imgSrc };

        const tokenImg = document.querySelector(`.token[data-token="${token}"]`);
        tokenImg.style.opacity = "0.4";
        tokenImg.style.pointerEvents = "none";

        if (this.currentSelector === this.tossWinner) {
            this.currentSelector = this.tossLoser;
            document.getElementById("tokenTitle").innerText = `${this.currentSelector.name}, choose your token`;
            this.updateHoverColor();
        } else {
            this.showSelectedTokens();
            document.getElementById("tokenModal").style.display = "none";
        }
    }

    showSelectedTokens() {
        const p1 = this.players[0];
        const p2 = this.players[1];

        document.getElementById("p1TokenBox").innerHTML = `<img src="${p1.token.img}" width="50" height="50">`;
        document.getElementById("p2TokenBox").innerHTML = `<img src="${p2.token.img}" width="50" height="50">`;

        document.querySelector(".sidebar-left").innerHTML = `<p>${p1.name} chose <strong>${p1.token.name}</strong>. Game started!</p>`;
        document.querySelector(".sidebar-right").innerHTML = `<p>${p2.name} chose <strong>${p2.token.name}</strong>.</p>`;

        document.getElementById("move1").onclick = () => this.movePlayer(0);
        document.getElementById("move2").onclick = () => this.movePlayer(1);

        this.currentPlayerIndex = this.tossWinner === p1 ? 0 : 1;
        this.gameStarted = true;

        this.updateMoveButtons();

        document.getElementById("dice1").value = "";
        document.getElementById("dice2").value = "";
        document.getElementById("result").value = "";

        this.updateTokenPosition(0);
        this.updateTokenPosition(1);
    }

    movePlayer(playerIndex) {
        if (this.pendingActionSpace) {
            const space = this.pendingActionSpace;
            this.pendingActionSpace = null;
            this.openPropertyModal(space, playerIndex);
            return;
        }

        const player = this.players[playerIndex];
        const d1 = this.getRandomDice();
        const d2 = this.getRandomDice();
        const total = d1 + d2;

        document.getElementById("dice1").value = d1;
        document.getElementById("dice2").value = d2;
        document.getElementById("result").value = total;

        const allBoxes = document.querySelectorAll('.human');
        const totalSpaces = allBoxes.length;
        player.position = (player.position + total) % totalSpaces;

        this.updateTokenPosition(playerIndex);

        const space = spaces[player.position];
        const sidebar = playerIndex === 0 ? document.querySelector(".sidebar-left") : document.querySelector(".sidebar-right");

        sidebar.innerHTML = `<p>${player.name} rolled ${d1} + ${d2} = ${total}</p>
                            <p>Landed on <strong>${space.name}</strong></p>`;

        let requiresDecision = false;

        if (space.type === "Tax Space") {
            this.handleTax(player, space, sidebar);
        } else if (space.price > 0 && space.type !== "Corner" && space.type !== "Card Space") {
            this.openPropertyModal(space, playerIndex);
            requiresDecision = true;
        } else {
            sidebar.innerHTML += `<p><em>Nothing to do here.</em></p>`;
        }

        if (!requiresDecision) {
            this.currentPlayerIndex = 1 - this.currentPlayerIndex;
            this.updateMoveButtons();
        }
    }

    handleTax(player, space, sidebar) {
        const taxAmount = space.price;
        if (player.balance >= taxAmount) {
            player.balance -= taxAmount;
            Bank.balance += taxAmount;
            this.updatePlayerDisplay();

            const transaction = `<strong>${player.name}</strong> paid ${taxAmount} in ${space.name}`;
            Bank.transactions.push(transaction);

            sidebar.innerHTML += `<p>${player.name} paid ${taxAmount} in taxes.</p>`;
            console.log(`${player.name} paid ${taxAmount} in ${space.name}`);
        } else {
            sidebar.innerHTML += `<p>You do not have enough cash ($${taxAmount}) to pay taxes!</p>`;
            this.pendingActionSpace = space;
        }
    }

    updateTokenPosition(playerIndex) {
        const player = this.players[playerIndex];
        const allBoxes = document.querySelectorAll(".human");
        const playerClass = `.token-p${playerIndex + 1}`;

        allBoxes.forEach((box) => {
            const oldToken = box.querySelector(playerClass);
            if (oldToken) oldToken.remove();
        });

        const newBox = allBoxes[player.position];
        const img = document.createElement("img");
        img.src = player.token.img;
        img.width = 30;
        img.height = 30;
        img.classList.add(`token-p${playerIndex + 1}`);
        img.style.position = 'absolute';

        const targetDivs = newBox.querySelectorAll("div[style]");

        if (targetDivs.length > 0) {
            const targetDiv = playerIndex === 0 ? targetDivs[0] : targetDivs[1];
            if (targetDiv) {
                targetDiv.appendChild(img);
            } else {
                newBox.appendChild(img);
            }
        } else {
            newBox.appendChild(img);
        }
    }

    updateHoverColor() {
        const oldStyle = document.getElementById("hoverStyle");
        if (oldStyle) oldStyle.remove();
        const style = document.createElement("style");
        style.id = "hoverStyle";
        const hoverColor = this.currentSelector === this.players[0] ? "rgba(34,197,94,0.5)" : "rgba(239,68,68,0.5)";
        style.innerHTML = `.token { transition: background-color .3s ease, box-shadow .3s ease; border-radius: 10px; }
                           .token:hover { background-color: ${hoverColor}; box-shadow: 0 0 10px ${hoverColor}; }`;
        document.head.appendChild(style);
    }

    openPropertyModal(space, playerIndex) {
        const modal = document.getElementById("propertyModal");
        const propertyName = document.getElementById("propertyName");
        const propertyStatus = document.getElementById("propertyStatus");
        const buyBtn = document.getElementById("buyProperty");
        const rentBtn = document.getElementById("payRent");
        const closeBtn = document.getElementById("closePropertyModal");

        const player = this.players[playerIndex];
        const originalPlayerIndex = playerIndex;

        propertyName.innerText = space.name;

        const finalizeTurn = () => {
            modal.style.display = "none";
            this.pendingActionSpace = null;
            this.currentPlayerIndex = 1 - originalPlayerIndex;
            this.updateMoveButtons();
        };

        closeBtn.onclick = () => {
            modal.style.display = "none";
            this.pendingActionSpace = space;
            this.updateMoveButtons();
        };

        window.onclick = null;
        window.onclick = (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
                this.pendingActionSpace = space;
                this.updateMoveButtons();
                window.onclick = null;
            }
        };

        if (!space.owner) {
            propertyStatus.innerText = `Price: $${space.price} | Rent: $${space.rent}`;
            buyBtn.style.display = "inline-block";
            rentBtn.style.display = "inline-block";

            buyBtn.innerText = `Buy for $${space.price}`;
            rentBtn.innerText = `Pay Rent $${space.rent} to Bank`;

            buyBtn.onclick = () => {
                this.buyPropertyFromBank(space, player, modal, finalizeTurn);
            };

            rentBtn.onclick = () => {
                this.payRentToBank(space, player, modal, finalizeTurn);
            };

        } else if (space.owner === player) {
            propertyStatus.innerText = `You own this property!`;
            buyBtn.style.display = "none";
            rentBtn.style.display = "none";

            setTimeout(finalizeTurn, 1000);

            modal.style.display = "flex";
            return;

        } else {
            const owner = space.owner;
            propertyStatus.innerText = `Owned by ${owner.name} | Rent: $${space.rent}`;
            buyBtn.style.display = "none";
            rentBtn.style.display = "inline-block";
            rentBtn.innerText = `Pay Rent $${space.rent} to ${owner.name}`;

            rentBtn.onclick = () => {
                this.payRentToPlayer(space, player, modal, finalizeTurn);
            };
        }

        modal.style.display = "flex";
    }

    buyPropertyFromBank(space, player, modal, finalizeTurn) {
        if (player.balance >= space.price) {
            player.balance -= space.price;
            Bank.balance += space.price;
            space.owner = player;
            player.properties.push(space);

            this.updatePlayerDisplay();

            const transaction = `<strong>${player.name}</strong> bought <strong>${space.name}</strong> for ${space.price}`;
            Bank.transactions.push(transaction);

            document.getElementById("propertyStatus").innerText = `${player.name} bought ${space.name} for ${space.price}!`;
            setTimeout(finalizeTurn, 1000);

        } else {
            document.getElementById("propertyStatus").innerText = `You do not have enough cash ($${space.price}) to buy this!`;
            this.pendingActionSpace = space;
        }
    }

    payRentToBank(space, player, modal, finalizeTurn) {
        if (player.balance >= space.rent) {
            player.balance -= space.rent;
            Bank.balance += space.rent;
            this.updatePlayerDisplay();

            const transaction = `<strong>${player.name}</strong> paid ${space.rent} rent for <strong>${space.name}</strong> to Bank`;
            Bank.transactions.push(transaction);

            document.getElementById("propertyStatus").innerText = `${player.name} paid $${space.rent} rent to Bank`;
            setTimeout(finalizeTurn, 1000);
        } else {
            document.getElementById("propertyStatus").innerText = `You do not have enough cash ($${space.rent}) to pay Bank rent!`;
            this.pendingActionSpace = space;
        }
    }

    payRentToPlayer(space, player, modal, finalizeTurn) {
        const owner = space.owner;

        if (player.balance >= space.rent) {
            player.balance -= space.rent;
            owner.balance += space.rent;
            this.updatePlayerDisplay();

            document.getElementById("propertyStatus").innerText = `${player.name} paid $${space.rent} rent to ${owner.name}`;
            setTimeout(finalizeTurn, 1000);
        } else {
            document.getElementById("propertyStatus").innerText = `You do not have enough cash ($${space.rent}) to pay rent to ${owner.name}!`;
            this.pendingActionSpace = space;
        }
    }

    openSellMenu(playerIndex, btnElement) {
        const player = this.players[playerIndex];
        const containerId = playerIndex === 0 ? 'p1MenuContainer' : 'p2MenuContainer';
        const container = document.getElementById(containerId);

        if (container.innerHTML !== '') {
            container.innerHTML = '';
            return;
        }

        document.getElementById('p1MenuContainer').innerHTML = '';
        document.getElementById('p2MenuContainer').innerHTML = '';

        if (player.properties.length === 0) {
            const tooltip = document.createElement('div');
            tooltip.className = 'seller-menu';
            tooltip.innerHTML = '<p style="text-align:center; color:gray; font-size:11px;">No properties owned.</p>';
            container.appendChild(tooltip);
            setTimeout(() => container.innerHTML = '', 2000);
            return;
        }

        let listHTML = '';
        player.properties.forEach(prop => {
            const sellPrice = Math.floor(prop.price * 0.75);
            listHTML += `
                <div class="menu-item">
                    <div style="text-align:left;">
                        <span style="font-weight:bold; display:block;">${prop.name}</span>
                        <span style="color:#666; font-size:9px;">Get: $${sellPrice}</span>
                    </div>
                    <button class="btn-menu-sell" onclick="game.initiateSale('${prop.name}', ${playerIndex})">
                        Sell
                    </button>
                </div>
            `;
        });

        container.innerHTML = `
            <div class="seller-menu">
                <div style="display:flex; justify-content:space-between; border-bottom:1px solid #eee; padding-bottom:5px; margin-bottom:5px;">
                    <span style="font-weight:bold; font-size:11px; color:black;">Your Properties</span>
                    <span style="cursor:pointer; color:red; font-size:10px;" onclick="document.getElementById('${containerId}').innerHTML=''">✖</span>
                </div>
                <div style="max-height: 150px; overflow-y: auto;">
                    ${listHTML}
                </div>
            </div>
        `;
    }

    initiateSale(propertyName, sellerIndex) {
        document.getElementById('p1MenuContainer').innerHTML = '';
        document.getElementById('p2MenuContainer').innerHTML = '';

        const seller = this.players[sellerIndex];
        const buyerIndex = sellerIndex === 0 ? 1 : 0;
        const buyer = this.players[buyerIndex];
        const property = seller.properties.find(p => p.name === propertyName);

        const discountedPrice = Math.floor(property.price * 0.75);

        this.openBuyerOfferModal(property, seller, buyer, discountedPrice);
    }

    executeSale(property, seller, buyer, price, offerModal) {
        if (buyer.balance >= price) {
            buyer.balance -= price;
            seller.balance += price;
            seller.properties = seller.properties.filter(p => p.name !== property.name);
            buyer.properties.push(property);
            property.owner = buyer;

            this.updatePlayerDisplay();

            offerModal.querySelector('.compact-modal-content').innerHTML = `
                <h3 style="color:#2f855a; font-size:16px;">Sale Successful!</h3>
                <p style="margin-top:10px;">${buyer.name} bought ${property.name} from ${seller.name} for $${price}.</p>
            `;
            setTimeout(() => offerModal.remove(), 2000);
        } else {
            offerModal.querySelector('.compact-modal-content').innerHTML = `
                <h3 style="color:#e53e3e; font-size:16px;">Sale Failed!</h3>
                <p style="margin-top:10px;">${buyer.name} does not have enough cash ($${price}).</p>
                <button onclick="document.getElementById('offerModal').remove()" class="btn-cancel w-full mt-4">Close</button>
            `;
        }
    }

    openBuyerOfferModal(property, seller, buyer, playerSalePrice) {
        const offerModal = document.createElement('div');
        offerModal.className = 'compact-modal';
        offerModal.id = 'offerModal';

        const originalPrice = property.price; // Original Price
        const bankBuyPrice = Math.floor(property.price / 2); // Mortgage Value

        offerModal.innerHTML = `
            <div class="compact-modal-content">
                <h3 style="margin:0 0 10px 0; font-size:16px; color:black;">Offer for You!</h3>
                
                <div style="background:#f7fafc; padding:10px; border-radius:8px; font-size:13px; margin-bottom:15px;">
                    <p style="margin:5px 0; color:black;"><strong>${seller.name}</strong> is selling this property:</p>
                    <p style="color:#2b6cb0; font-weight:bold; font-size:15px; margin:5px 0;">${property.name}</p>
                    <hr style="border:0; border-top:1px solid #e2e8f0; margin:8px 0;">
                    
                    <!-- Original Price is included here -->
                    <div style="display:flex; justify-content:space-between; margin-bottom: 5px; font-weight: 500;">
                        <span style="color:black;">Original Property Price:</span> <span style="color:#4a5568;">$${originalPrice}</span>
                    </div>

                    <div style="display:flex; justify-content:space-between; margin-bottom: 5px;">
                        <span style="color:black;">${buyer.name}'s Sale Price (75%):</span> <span style="color:gray;">$${playerSalePrice}</span>
                    </div>
                    <div style="display:flex; justify-content:space-between; font-weight:bold; color:#2f855a;">
                        <span>Price to Sell to Bank (Mortgage):</span> <span>$${bankBuyPrice}</span>
                    </div>
                </div>

                <div class="btn-action-group">
                    <button id="btnConfirmBuy" class="btn-confirm">Buy ($${playerSalePrice})</button>
                    <button id="btnSkipBuy" class="btn-cancel">Sell to Bank ($${bankBuyPrice})</button>
                </div>
            </div>
        `;

        document.body.appendChild(offerModal);

        document.getElementById('btnConfirmBuy').onclick = () => {
            this.executeSale(property, seller, buyer, playerSalePrice, offerModal);
        };

        document.getElementById('btnSkipBuy').onclick = () => {
            this.executeBankBuy(property, seller, bankBuyPrice, offerModal);
        };
    }

    executeBankBuy(property, seller, price, offerModal) {
        Bank.balance -= price;
        seller.balance += price;

        seller.properties = seller.properties.filter(p => p.name !== property.name);
        property.owner = null;

        this.updatePlayerDisplay();

        const transaction = `<strong>${seller.name}</strong> sold <strong>${property.name}</strong> to Bank for $${price} (50% mortgage value)`;
        Bank.transactions.push(transaction);

        offerModal.querySelector('.compact-modal-content').innerHTML = `
            <h3 style="color:#2f855a; font-size:16px;">Mortgage Successful!</h3>
            <p style="margin-top:10px;">${property.name} sold to Bank for $${price}.</p>
        `;
        setTimeout(() => offerModal.remove(), 2000);
    }
    forfeitGame(imageElement) {
        // 1. Check if the game has started (this.gameStarted is set to true in showSelectedTokens)
        if (!this.gameStarted || this.gameOver) {
            // If the game hasn't started or is already over, display a temporary message
            this.displayTemporaryMessage("Game hasn't started yet! Please complete the toss and token selection.", 2000);
            return;
        }

        // --- (Original Forfeit Logic Starts Here) ---

        // Determine the players based on the current turn (optional, but a logical choice for the loser)
        const forfeitingPlayerIndex = this.currentPlayerIndex;
        const winnerPlayerIndex = 1 - forfeitingPlayerIndex;

        const forfeitingPlayer = this.players[forfeitingPlayerIndex];
        const winningPlayer = this.players[winnerPlayerIndex];

        this.gameOver = true; // Set a flag to stop further moves

        // 2. Create and Apply the semi-transparent red overlay
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(255, 0, 0, 0.5)'; // Light translucent red
        overlay.style.zIndex = '1000'; // Ensure it's on top
        overlay.id = 'forfeit-overlay';
        document.body.appendChild(overlay);

        // 3. Display the modal showing the winner and loser
        const modal = document.createElement('div');
        modal.className = 'compact-modal'; // Reusing your existing modal class for basic styling
        modal.style.zIndex = '1001';
        modal.innerHTML = `
        <div class="compact-modal-content" style="background: white; padding: 20px; border-radius: 10px; text-align: center;">
            <h2 style="color: #e53e3e; font-size: 24px; margin-bottom: 10px;">Game Over!</h2>
            <p style="font-size: 18px; margin-bottom: 20px; color:black;">
                <strong style="color:black;">${forfeitingPlayer.name}</strong> clicked the Monopoly and LOST!
            </p>
            <h3 style="color: #2f855a; font-size: 20px;">Winner: ${winningPlayer.name} 🏆</h3>
            <button onclick="window.location.reload()" style="margin-top: 20px; padding: 10px 20px; border: none; border-radius: 5px; background: #4299e1; color: white; cursor: pointer;">
                Restart Game
            </button>
        </div>
    `;
        document.body.appendChild(modal);

        // 4. Disable game interaction
        document.getElementById("move1").disabled = true;
        document.getElementById("move2").disabled = true;
        imageElement.style.pointerEvents = 'none';
    }


    displayTemporaryMessage(message, duration) {
        const tempMsg = document.createElement('div');
        tempMsg.style.position = 'fixed';
        tempMsg.style.top = '50%';
        tempMsg.style.left = '50%';
        tempMsg.style.transform = 'translate(-50%, -50%)';
        tempMsg.style.padding = '15px 30px';
        tempMsg.style.background = '#f6e05e';
        tempMsg.style.color = '#2d3748';
        tempMsg.style.borderRadius = '8px';
        tempMsg.style.zIndex = '1000';
        tempMsg.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        tempMsg.innerText = message;
        document.body.appendChild(tempMsg);

        setTimeout(() => {
            tempMsg.remove();
        }, duration);
    }
}

const game = new Monopoly(Players);

window.onload = () => {
    game.showPlayers();

    const btn1 = document.getElementById("move1");
    const btn2 = document.getElementById("move2");

    btn1.disabled = false;
    btn1.classList.add('active-turn');

    btn2.disabled = true;
    btn2.classList.add('inactive-turn');

    document.querySelectorAll(".token").forEach(token => {
        token.addEventListener("click", (e) => {
            const tokenName = e.target.dataset.token;
            const imgSrc = e.target.src;
            game.selectToken(tokenName, imgSrc);
        });
    });
};