const teaUrl = 'https://boonakitea.cyclic.app/api/all';

let allTeas = [];

// Fetch tea data from the API
async function fetchTeaData() {
  const response = await fetch(teaUrl);
  const data = await response.json();
  allTeas = data;
  populateFilters(allTeas);
  displayTeas(allTeas);
}
// function for when a tea is clicked
function openModal(tea) {
    const modal = document.getElementById('tea-modal');
    const modalTeaName = document.getElementById('modal-tea-name');
    const modalTeaDetails = document.getElementById('modal-tea-details');

    // clicked image is filled with the informations
    modalTeaName.textContent = tea.name;
    modalTeaDetails.innerHTML = `
    <img class="modal-tea-image" src="${tea.image}" alt="${tea.name}">
    <p><strong>Origin:</strong> ${tea.origin}</p>
    <p><strong>Type:</strong> ${tea.type}</p>
    <p><strong>Caffeine:</strong> ${tea.caffeine}</p>
    <p><strong>Description:</strong> ${tea.description}</p>
    <p><strong>Taste:</strong> ${tea.tasteDescription}</p>
    <div class="text-field-container">
    <hr>
     <div class="additional-comments-container">
    <p><strong>Comment on this tea:</strong></p>
    <textarea id="additional-comments" rows="4" cols="50" placeholder="Write here"></textarea>
    <p><strong>User Comments:</strong></p>
    <div class="comments-container">
      <div class="comment">
        <span class="username">Username1:</span>
        <div class="comment-box">
          This tea has a delightful floral aroma and a smooth, mellow taste.
        </div>
      </div>
      <div class="comment">
        <span class="username">Username2:</span>
        <div class="comment-box">
          The tea leaves a refreshing aftertaste and pairs well with a hint of lemon.
        </div>
      </div>
      <div class="comment">
        <span class="username">Username3:</span>
        <div class="comment-box">
          I love the bold and robust flavor of this tea. It's perfect for starting my day.
        </div>
      </div>
    </div>
  </div>
  `;

    // show the modal
    modal.style.display = 'block';

    // close button
    const closeBtn = document.querySelector('.close');
    closeBtn.addEventListener('click', closeModal);

    // close when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
}

function closeModal() {
    const modal = document.getElementById('tea-modal');
    modal.style.display = 'none';
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
  `;

    // Event handler for tea window
    article.addEventListener('click', () => {
        openModal(tea);
    });
  // Remove img element if the image fails to load
  const imgElement = article.querySelector('img');
  if (imgElement) {
    imgElement.addEventListener('error', () => {
      imgElement.remove();
    });
  }

  return article;
}

function displayTeas(teas) {
  const loadingAnimation = document.getElementById('loading-animation');
  const container = document.getElementById('tea-container');

  // Show loading animation
  loadingAnimation.style.display = 'flex';

  // Clear old teas
  container.innerHTML = '';

  teas.forEach((tea) => {
    const article = createTeaArticle(tea);
    container.appendChild(article);
  });

  // Hide loading animation
  loadingAnimation.style.display = 'none';
}

function filterTeas() {
  const originFilter = document.getElementById('origin-filter').value;
  const caffeineFilter = document.getElementById('caffeine-filter').value;
  const typeFilter = document.getElementById('type-filter').value;

  const filteredTeas = allTeas.filter(tea => {
    return (!originFilter || tea.origin === originFilter)
      && (!caffeineFilter || tea.caffeine === caffeineFilter)
      && (!typeFilter || tea.type === typeFilter);
  });

  populateFilters(filteredTeas); 
  displayTeas(filteredTeas);
}

function populateFilters(teas) {
  populateFilter('origin-filter', teas.map(tea => tea.origin));
  populateFilter('caffeine-filter', teas.map(tea => tea.caffeine));
  populateFilter('type-filter', teas.map(tea => tea.type));
}

function populateFilter(filterId, values) {
  const uniqueValues = [...new Set(values)].sort();
  const select = document.getElementById(filterId);
  
  // Save current selection
  const currentSelection = select.value;
  
  // Clear previous options
  select.innerHTML = '<option value="">All</option>';

  uniqueValues.forEach(value => select.add(new Option(value, value)));
  
  // Restore previous selection, if possible
  select.value = uniqueValues.includes(currentSelection) ? currentSelection : '';
}

function resetFilters() {
  document.getElementById('origin-filter').value = '';
  document.getElementById('caffeine-filter').value = '';
  document.getElementById('type-filter').value = '';
  populateFilters(allTeas);
  displayTeas(allTeas);
}

window.addEventListener('load', fetchTeaData);
document.getElementById('reset-filters').addEventListener('click', resetFilters);
