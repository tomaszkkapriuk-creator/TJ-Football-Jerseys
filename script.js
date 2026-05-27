document.addEventListener("DOMContentLoaded", function () {

    const input = document.getElementById("searchInput");
    const products = document.querySelectorAll(".product");

    if (!input) return;

    input.addEventListener("input", function () {
        const value = input.value.toLowerCase().trim();

        products.forEach(product => {
            const text = product.innerText.toLowerCase();

            if (text.includes(value)) {
                product.style.display = "flex";
            } else {
                product.style.display = "none";
            }
        });
    });

});


document.addEventListener("DOMContentLoaded", function () {

    const fake = document.getElementById("fakeSearch");
    const real = document.getElementById("realSearch");
    const input = document.getElementById("searchInput");

    // klik w animację -> zamiana na input
    if (fake) {
        fake.addEventListener("click", function () {
            fake.classList.add("hidden");
            real.classList.remove("hidden");

            setTimeout(() => {
                input.focus();
            }, 100);
        });
    }

});


document.addEventListener("DOMContentLoaded", function () {
    const phrases = [
        "Real Madrid T-shirt",
        "Barcelona Away",
        "Chelsea FC",
        "Liverpool home",
        "AC Milan",
        "Bayern München 2025-2026",
        "Manchester United"
    ];

    const typingText = document.getElementById("typing-text");

    // Jeśli element nie istnieje, nic nie rób
    if (!typingText) return;

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];

        if (!deleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentPhrase.length) {
                deleting = true;
                setTimeout(typeEffect, 1000); // pauza po wpisaniu całego tekstu
                return;
            }
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                deleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
            }
        }

        setTimeout(typeEffect, deleting ? 50 : 100);
    }

    // Uruchom animację
    typeEffect();
});


// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// =======================
// ZMIANA KOSZULEK
// =======================
function changeKit(select) {

  const product = select.closest(".product");
  if (!product) return;

  const type = select.value;
  const team = product.dataset.product;

  const front = product.querySelector(".front");
  const back = product.querySelector(".back");

  if (!front || !back) return;

  front.src = `${team}-${type}-front.webp`;
  back.src = `${team}-${type}-back.webp`;
}

// =======================
// DODAWANIE DO KOSZYKA
// =======================
function addToCart(button, name, price) {

  const productDiv = button.closest(".product");
  if (!productDiv) return;

  const sizeSelect = productDiv.querySelector(".size");
  if (!sizeSelect) return;

  const size = sizeSelect.value;

  if (!size) {
    alert("Wybierz rozmiar!");
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({
    name,
    price,
    size
  });

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Dodano do koszyka");

  // tylko odśwież koszyk jeśli jesteś na stronie koszyka
  showSummary();
}


// =======================
// PODSUMOWANIE KOSZYKA (JEDYNA FUNKCJA RENDERUJĄCA)
// =======================
function showSummary() {

  const summaryDiv = document.getElementById("summary");
  const dostawaSelect = document.getElementById("dostawa");

  if (!summaryDiv) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  summaryDiv.innerHTML = "";

  if (cart.length === 0) {
    summaryDiv.innerHTML = "<p>Koszyk jest pusty</p>";
    return;
  }

  let total = 0;

  const title = document.createElement("h3");
  title.textContent = "Produkty:";
  summaryDiv.appendChild(title);

  cart.forEach(item => {
    const p = document.createElement("p");
    p.textContent = `${item.name} (Rozmiar ${item.size}) - ${item.price} zł`;
    summaryDiv.appendChild(p);
    total += item.price;
  });

  // dostawa
  let deliveryCost = 0;

  if (dostawaSelect) {
    switch (dostawaSelect.value) {
      case "Kurier InPost": deliveryCost = 9; break;
      case "Paczkomat InPost": deliveryCost = 7; break;
      case "Kurier DPD": deliveryCost = 11; break;
      case "Punkt ORLEN Paczka": deliveryCost = 8; break;
      case "Kurier DHL": deliveryCost = 12; break;
    }
  }

  const final = total + deliveryCost;

  const finalSum = document.createElement("h3");
  finalSum.textContent = `Łącznie: ${final.toFixed(2)} zł`;

  summaryDiv.appendChild(finalSum);
}


// =======================
// ZŁOŻENIE ZAMÓWIENIA
// =======================
function placeOrder() {

  const imie = document.getElementById("imie").value;
  const adres = document.getElementById("adres").value;
  const email = document.getElementById("email").value;
  const dostawa = document.getElementById("dostawa").value;
  const platnosc = document.getElementById("platnosc").value;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("Koszyk jest pusty!");
    return;
  }

  if (!imie || !adres || !email || !dostawa || !platnosc) {
    alert("Wypełnij wszystkie dane!");
    return;
  }

  const pickup = document.getElementById("pickupPoint")?.value;

  if (
    (dostawa === "Paczkomat InPost" || dostawa === "Punkt ORLEN Paczka") &&
    !pickup
  ) {
    alert("Podaj punkt odbioru!");
    return;
  }

  const sum = cart.reduce((a, b) => a + b.price, 0);

  alert(
    `Zamówienie złożone!\n\n` +
    `Imię: ${imie}\n` +
    `Adres: ${adres}\n` +
    `Email: ${email}\n` +
    `Dostawa: ${dostawa}\n` +
    `Płatność: ${platnosc}\n` +
    `Suma: ${sum} zł`
  );

  localStorage.removeItem("cart");
  location.reload();
}


// =======================
// POKAZ / UKRYJ PACZKOMAT
// =======================
function togglePickupPoint() {

  const dostawa = document.getElementById("dostawa");
  const box = document.getElementById("pickupPointBox");

  if (!dostawa || !box) return;

  box.style.display =
    (dostawa.value === "Paczkomat InPost" ||
     dostawa.value === "Punkt ORLEN Paczka")
      ? "block"
      : "none";
}


// =======================
// CZYSZCZENIE KOSZYKA
// =======================
function clearCart() {
  localStorage.removeItem("cart");
  location.reload();
}


// =======================
// INIT (TYLKO JEDNO WYWOŁANIE)
// =======================
document.addEventListener("DOMContentLoaded", function () {
  showSummary();
});

