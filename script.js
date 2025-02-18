async function fetchCountries() {
  const response = await fetch("/api/countries");
  const countries = await response.json();
  const countryList = document.getElementById("country-list");

  countries.forEach((country) => {
    const countryCard = document.createElement("div");
    countryCard.classList.add("col-md-4");
    countryCard.innerHTML = `  
            <div class="card">  
                <img src="${country.image}" class="card-img-top" alt="${country.name}">  
                <div class="card-body">  
                    <h5 class="card-title">${country.name}</h5>  
                    <p class="card-text">Population: ${country.population}</p>  
                    <button onclick="fetchTechnologies(${country.id})" class="btn btn-primary">View Technologies</button>  
                </div>  
            </div>  
        `;
    countryList.appendChild(countryCard);
  });

  // Example of initializing a chart
  const ctx = document.getElementById("countryChart").getContext("2d");
  const chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: countries.map((c) => c.name),
      datasets: [
        {
          label: "Population (millions)",
          data: countries.map((c) => Number(c.population.split(" ")[0]) * 1000), // converting to millions for chart
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

async function fetchTechnologies(countryId) {
  const response = await fetch(`/api/technologies/${countryId}`);
  const technologies = await response.json();
  alert(JSON.stringify(technologies, null, 2)); // Showing fetched technologies in an alert box for demonstration
}

// Fetch countries when the page loads
document.addEventListener("DOMContentLoaded", fetchCountries);
