// Function to load data from Wikipedia API based on a given topic
async function loadWikiData(topic) {
  // Construct the API URL with the topic parameter
  const url = `https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&prop=extracts|pageimages&exintro&explaintext&piprop=original&titles=${encodeURIComponent(topic)}`;

  // Fetch data from the API
  const response = await fetch(url);
  const data = await response.json();

  // Extract relevant information from the API response
  const pages = data.query.pages;
  const pageId = Object.keys(pages)[0];
  const content = pages[pageId].extract;
  const imageUrl = pages[pageId].original ? pages[pageId].original.source : '';

  // Get the content div element
  const contentDiv = document.querySelector(".content");

  // Clear the content of the div
  contentDiv.innerHTML = '';

  // Create and append new content to the div
  const h1 = document.createElement('h1');
  const selectedText = this.textContent; // Get the selected li text
  h1.textContent = selectedText;
  contentDiv.appendChild(h1);

  if (imageUrl) {
    const img = document.createElement('img');
    img.src = imageUrl;
    contentDiv.appendChild(img);
  }

  const p = document.createElement('p');
  p.textContent = content;
  contentDiv.appendChild(p);
}

// Wait for the window to load before attaching event listeners
window.onload = function () {
  // Get all the list items within the sidenav
  const listItems = document.querySelectorAll(".sidenav ul li a");

  // Attach a click event listener to each list item
  listItems.forEach((item) => {
    item.addEventListener("click", function (event) {
      event.preventDefault();
      // Get the topic from the data-custom-value attribute
      const topic = item.getAttribute("data-custom-value");
      // Call the loadWikiData function with the topic as the argument
      loadWikiData.call(this, topic); // Pass the selected li element as 'this'
    });
  });
};
