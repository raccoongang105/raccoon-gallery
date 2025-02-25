document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.getElementById("gallery");
    const loadMoreBtn = document.getElementById("loadMore");
    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector(".nav-menu");

    navToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    function fetchRaccoon() {
        fetch("https://api.racc.lol/v1/raccoon?json=true")
            .then(response => {
                if (!response.ok) throw new Error(`Image fetch error! Status: ${response.status}`);
                return response.json();
            })
            .then(imageData => {
                if (!imageData.success || !imageData.data || !imageData.data.url) {
                    throw new Error("Invalid image response: No URL found");
                }

                return fetch("https://api.racc.lol/v1/fact")
                    .then(response => {
                        if (!response.ok) throw new Error(`Fact fetch error! Status: ${response.status}`);
                        return response.json();
                    })
                    .then(factData => {
                        console.log("Fact Response:", factData);
                        return { imageData, factData };
                    });
            })
            .then(({ imageData, factData }) => {
                const raccoonDiv = document.createElement("div");
                raccoonDiv.classList.add("raccoon-item");

                const img = document.createElement("img");
                img.src = imageData.data.url;
                img.alt = "A sneaky raccoon";
                img.onerror = () => {
                    console.error(`Image failed to load: ${imageData.data.url}`);
                    img.replaceWith(document.createTextNode("Image broke: " + imageData.data.url));
                };

                const fact = document.createElement("p");
                fact.classList.add("fact");
                fact.textContent = factData.data?.fact || "No fact available.";

                raccoonDiv.appendChild(img);
                raccoonDiv.appendChild(fact);
                gallery.appendChild(raccoonDiv);
            })
            .catch(error => {
                console.error("Fetch error:", error);
                const errorMsg = document.createElement("p");
                errorMsg.textContent = "Raccoon on the loose! Couldn’t load image or fact.";
                errorMsg.style.color = "#ff007a";
                errorMsg.style.fontSize = "1.2rem";
                errorMsg.style.textAlign = "center";
                gallery.appendChild(errorMsg);
            });
    }

    loadMoreBtn.addEventListener("click", fetchRaccoon);
});