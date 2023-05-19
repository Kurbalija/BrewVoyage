# BrewVoyage

BrewVoyage is a web application that offers a delightful journey into the world of tea. It provides a range of features to explore and appreciate the art of tea, from discovering teahouses to accessing comprehensive tea information.

## Features

- **Teahouse map & weather information:** Provides users with a map of teahouses and current weather conditions.
- **Listing of all teas:** Displays teas in cards using a [Tea API](https://boonaki.me/tea-api), allowing users to click on a card to open a site with more information about that specific tea. The cards also have a hollowed star in the top right corner, which can be clicked to favorite the tea.
- **Favourites Tab:** A dedicated section where users can view all their favorited teas in card format.
- **Review section:** The review section is integrated within the tea information, appearing at the bottom. Each tea has a unique ID, and when a tea is listed, the system will display all reviews submitted by other users. Reviews can be changed and deleted (PUT & DELETE).
- **Session Management:** Users can create an account using JWT (JSON Web Token) for authentication and session management.
- **Database:** The database will store login credentials, review strings, and favorite boolean values. SQLite will be used as the technology for its simplicity, alternatively, H2 can be used as an alternative.
- **Tea wiki:** A comprehensive collection of information about tea, including types of tea, tea cultivation, tea processing, tea flavors and aroma profiles, tea brewing methods, tea accessories, health benefits of tea, tea ceremonies, tea culture and traditions, tea and food pairings, tea storage and preservation, specialty teas, and tea history.

## Requirements

### MUST

- **M1:** The backend (BE) of the system must be an individual component.
- **M2:** The frontend (FE) of the system must be an individual component implemented using HTML5, CSS, and JS.
- **M3:** The communication between FE and BE components must be implemented using HTTP(S).
- **M4:** The communication between FE and BE components must be implemented using asynchronous data transfer (AJAX).
- **M5:** The HTTP endpoints of the BE component must return the data either as JSON or as XML.
- **M6:** The HTTP endpoints of the BE component must manage resources using HTTP methods GET, POST, PUT, and DELETE, each method at least on one HTTP endpoint.
- **M7:** The HTTP endpoints of the FE component must consume resources using HTTP methods GET, POST, PUT, and DELETE from at least one HTTP endpoint.
- **M8:** The system must consume at least one external REST web service.
- **M9:** The system must implement session management (Login, sessionID, JWT, ...).

### SHOULD

- **S1:** The system should consume at least two external REST web services.
- **S2:** The system should offer a second individual FE component that communicates with at least three HTTP endpoints of the BE component.
- **S3:** The FE component should be designed in a way that it is w3c compliant (<https://validator.w3.org/>).

### COULD

- **C1:** The system could consume at least three external REST web services.
- **C2:** The HTTP endpoints of the BE component could return the data as JSON and XML.
- **C3:** The BE component of the system could provide a PATCH HTTP endpoint, which is consumed by the FE component.
