// Import book data, author data, genre data, and books per page constant from a separate file
import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'
// Function to update the "Show More" button text and remaining book count
export function updateShowMore(books,page,BOOKS_PER_PAGE){
    document.querySelector('[data-list-button]').innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${(books.length - (page * BOOKS_PER_PAGE)) > 0 ? (books.length - (page * BOOKS_PER_PAGE)) : 0})</span>
`
};
// Function to set the document color scheme based on a theme type
export function themeColour(type=''){
 // If no theme type is provided, return without modification
if (!type){return;}
 // Set document styles based on the theme type ("night" or default)
if(type==='night'){
    document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
    document.documentElement.style.setProperty('--color-light', '10, 10, 20');
}else{
    document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
    document.documentElement.style.setProperty('--color-light', '255, 255, 255');
}
}
// Function to update the "Show More" button state based on book count and filtered results
export function updateShowMoreButton(books,page,BOOKS_PER_PAGE,filteredBooksLength) {
// Select the "Show More" button element   
    const button = document.querySelector('[data-list-button]');
// Calculate the remaining number of filtered books (considering edge cases) 
    const remaining = Math.max(filteredBooksLength - (page * BOOKS_PER_PAGE), 0);
 // Disable the button if there are no more books to display   
    button.disabled = remaining < 1;
  // Update the "Show More" button text and remaining count
    updateShowMore(books,page,BOOKS_PER_PAGE)
  }
// Function to add a click event listener for closing overlays using a cancel button 
 export function addCancelEventListener(cancelButtonSelector, overlaySelector) {
// Select the cancel button element Close the overlay when the cancel button is clicked
    document.querySelector(cancelButtonSelector).addEventListener('click', () => {
    // Close the overlay when the cancel button is clicked
        document.querySelector(overlaySelector).open = false;
    });
}

// Function to add a click event listener for opening overlays from header elements
export function addHeaderClickListener(headerSelector, overlaySelector, focusSelector = null) {
// Select the header element
    const header = document.querySelector(headerSelector);
// Select the header element
    const overlay = document.querySelector(overlaySelector);
// Select the optional focus element (if provided)
    const focusElement = focusSelector ? document.querySelector(focusSelector) : null;
// Add a click event listener to the header
    header.addEventListener('click', () => {
        overlay.open = true;
// If a focus element is provided, set focus on it after opening the overlay       
        if (focusElement) {
            focusElement.focus();
        }
    });
}
// Function to add a click event listener for closing the book list container  
 export function handleListCloseClick() {
// Select the close button element for the book list container add a click event listener to the close button  
    document.querySelector('[data-list-close]').addEventListener('click', () => {
// Close the active book list container when the close button is clicked
      document.querySelector('[data-list-active]').open = false;
    });
  }
// Function to handle displaying details of a clicked book (implementation likely defined elsewhere) 
export function act(active) {
// Check if a book is selected (active)
    if (active) {
        document.querySelector('[data-list-active]').open = true;
        document.querySelector('[data-list-blur]').src = active.image;
        document.querySelector('[data-list-image]').src = active.image;
        document.querySelector('[data-list-title]').innerText = active.title;
        document.querySelector('[data-list-subtitle]').innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`;
        document.querySelector('[data-list-description]').innerText = active.description;
    }
}
