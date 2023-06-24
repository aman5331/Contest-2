function fetchDataWithThen() {
  fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
  )
    .then((response) => response.json())
    .then((data) => {
      renderTable(data);
      handleSearch(data);
      handleSort(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Function to fetch data from the API using async/await
async function fetchDataWithAsyncAwait() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
    );
    const data = await response.json();
    renderTable(data);
    handleSearch(data);
    handleSort(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Function to render the table rows
function renderTable(data) {
  const tableBody = document.querySelector("#dataTable tbody");
  tableBody.innerHTML = ""; // Clear existing rows

  data.forEach((item) => {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td><img src="${item.image}" alt="${item.name}"></td>
        <td>${item.name}</td>
        <td>${item.id}</td>
        <td>${item.symbol}</td>
        <td>${item.current_price}</td>
        <td>${item.total_volume}</td>
        <td>${item.market_cap}</td>
        <td>${item.percentage_change}</td>
      `;

    tableBody.appendChild(row);
  });
}

// Function to handle search input changes
function handleSearch(data) {
  const searchInput = document.querySelector("#searchInput");

  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredData = data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.symbol.toLowerCase().includes(searchTerm)
    );
    renderTable(filteredData);
  });
}

// Function to handle sorting buttons
function handleSort(data) {
  const sortMarketCapButton = document.querySelector("#sortMarketCapButton");
  const sortPercentageChangeButton = document.querySelector(
    "#sortPercentageChangeButton"
  );

  sortMarketCapButton.addEventListener("click", () => {
    const sortedData = [...data].sort((a, b) => a.market_cap - b.market_cap);
    renderTable(sortedData);
  });

  sortPercentageChangeButton.addEventListener("click", () => {
    const sortedData = [...data].sort(
      (a, b) =>
        parseFloat(a.percentage_change) - parseFloat(b.percentage_change)
    );
    renderTable(sortedData);
  });
}

// Call the functions
fetchDataWithThen();
// OR
// fetchDataWithAsyncAwait();
