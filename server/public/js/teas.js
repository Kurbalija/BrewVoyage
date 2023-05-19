const teaUrl = 'https://boonakitea.cyclic.app/api/all';

// Fetch tea data from the API
async function fetchTeaData() {
  const response = await fetch(teaUrl);
  const data = await response.json();
  return data;
}

// Create a tea article element based on the tea object
function createTeaArticle(tea) {
  const article = document.createElement('article');
  article.innerHTML = `
    <h2>${tea.name}</h2>
    ${tea.image ? `<img src="${tea.image}" alt="${tea.name}">` : ''}
    ${tea.origin ? `<p><strong>Origin:</strong> ${tea.origin}</p>` : ''}
    ${tea.type ? `<p><strong>Type:</strong> ${tea.type}</p>` : ''}
    ${tea.caffeine ? `<p><strong>Caffeine:</strong> ${tea.caffeine}</p>` : ''}
    ${tea.description ? `<p><strong>Description:</strong> ${tea.description}</p>` : ''}
    ${tea.tasteDescription ? `<p><strong>Taste:</strong> ${tea.tasteDescription}</p>` : ''}
    ${tea.colorDescription ? `<p><strong>Color:</strong> ${tea.colorDescription}</p>` : ''}
  `;

  // Remove img element if the image fails to load
  const imgElement = article.querySelector('img');
  if (imgElement) {
    imgElement.addEventListener('error', () => {
      // Image failed to load
      imgElement.remove();
    });
  }

  return article;
}

// Display teas on the webpage
async function displayTeas() {
  const loadingAnimation = document.getElementById('loading-animation');
  const teas = await fetchTeaData();
  const container = document.getElementById('tea-container');

  // Show loading animation
  loadingAnimation.style.display = 'flex';

  teas.forEach((tea) => {
    const article = createTeaArticle(tea);
    container.appendChild(article);
  });

  // Hide loading animation
  loadingAnimation.style.display = 'none';
}

// Invoke the function to display teas after the page has loaded
window.addEventListener('load', displayTeas);
