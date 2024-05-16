# Book connect documentation
- ## script.js
 1) ## Imports:

- Description: Importing necessary data and functions from separate files.
- #### Modules Imported:
- books: Array - Contains book data.
- authors: Object - Contains author data.
- genres: Object - Contains genre data.
- BOOKS_PER_PAGE: Number - Constant representing the number of books per page.
- #### Functions:
- updateShowMore: Updates the "Show More" button text and remaining count.
- themeColour: Sets the document color scheme based on the theme type.
- updateShowMoreButton: Updates the "Show More" button state based on book count and filtered 
  results.
- addCancelEventListener: Adds a click event listener to close overlays using a cancel button.
- addHeaderClickListener: Adds a click event listener to open overlays from header elements.
- handleListCloseClick: Adds a click event listener to close the book list container.
- act: Handles displaying details of a clicked book.
2) ## Initial State Setup:

- Description: Sets initial state variables and generates initial book previews, genre options, and author options.
- #### Initial State Variables:
- page: Number - Represents the current page number.
- matches: Array - Contains initially matched books based on filters.
- #### Functions:
- Creates initial book previews, genre options, and author options.
- Sets initial theme based on user preference.
3) ## Event Listeners:

- Description: Registers event listeners for various user interactions.
- #### Event Listeners:
 - Theme settings form submission.
 - Search form submission.
 - "Show More" button click.
- Book preview click.
4) ## Theme Handling:

- Description: Functions related to theme handling, including saving theme preference to local storage and applying saved theme.
- #### Functions:
 - themeSwitch: Toggles theme based on saved preference.
 - saveThemePreference: Saves theme preference to local storage.
 - saveToggleState: Saves toggle state to local storage.
 - applyTheme: Applies theme based on saved preference.
 - handleThemeSettingsFormSubmit: Handles form submission for theme settings.
 - handleThemeToggleClick: Handles toggling theme state and saves it to local storage.
- #### Event Listeners:
- Theme settings form submission.
- Theme toggle button click.
5) ## Document Load Event:

- Description: Applies saved theme when the document is loaded.
  # modules.js 
1) ## updateShowMore(books, page, BOOKS_PER_PAGE):

- Description: This function updates the text and remaining count displayed on the "Show More" button.
- #### Parameters:
- books: Array - The array of book data.
- page: Number - The current page number.
- BOOKS_PER_PAGE: Number - The constant representing the number of books per page.
2) ## themeColour(type=''):

- Description: This function sets the document color scheme based on the provided theme type.
- #### Parameters:
- type: String (optional) - The theme type, either "night" or default.
3) ##  updateShowMoreButton(books, page, BOOKS_PER_PAGE, filteredBooksLength):

- Description: This function updates the state of the "Show More" button based on the number of books and filtered results.
- #### Parameters:
- books: Array - The array of book data.
- page: Number - The current page number.
- BOOKS_PER_PAGE: Number - The constant representing the number of books per page.
- filteredBooksLength: Number - The length of the filtered books array.
4) ## addCancelEventListener(cancelButtonSelector, overlaySelector):

- Description: This function adds a click event listener to a cancel button in overlays to close them.
- #### Parameters:
- cancelButtonSelector: String - The CSS selector for the cancel button.
- overlaySelector: String - The CSS selector for the overlay element.
5) ## addHeaderClickListener(headerSelector, overlaySelector, focusSelector = null):

- Description: This function adds a click event listener to header elements to open overlays, optionally focusing on a specified element.
- #### Parameters:
- headerSelector: String - The CSS selector for the header element.
- overlaySelector: String - The CSS selector for the overlay element.
- focusSelector: String (optional) - The CSS selector for the element to focus on after opening the overlay.
6) ## handleListCloseClick():

- Description: This function adds a click event listener to close buttons in the book list container to hide it.
- Parameters: None.
7) ## act(active):

- Description: This function is likely called to display details of a clicked book.
Parameters:
- active: Object - The details of the clicked book, including title, author, published date, description, and image.
