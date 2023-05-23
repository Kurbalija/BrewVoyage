async function loadWikiData(topic) {
    const url = `https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&prop=extracts|pageimages&exintro&explaintext&piprop=original&titles=${encodeURIComponent(topic)}`;
  
    const response = await fetch(url);
    const data = await response.json();
  
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];
    const content = pages[pageId].extract;
    const imageUrl = pages[pageId].original ? pages[pageId].original.source : '';
  
    // get content div
    const contentDiv = document.querySelector(".content");
  
    // clear content
    contentDiv.innerHTML = '';
  
    // create and append new content
    const h1 = document.createElement('h1');
    h1.textContent = topic;
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
  
  window.onload = function() {
    const listItems = document.querySelectorAll(".sidenav ul li a");
  
    listItems.forEach((item) => {
      item.addEventListener("click", function (event) {
        event.preventDefault();
        loadWikiData(event.target.textContent);
      });
    });
  };
  