// Import data from separate files
import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'
import{updateShowMore,themeColour,updateShowMoreButton,addCancelEventListener,addHeaderClickListener,handleListCloseClick, act }from'./module.js';
// Initial state variables
let page = 1;
let matches = books
// Create document fragment for efficient DOM manipulation
const starting = document.createDocumentFragment()
// Loop through a subset of books for initial display (based on BOOKS_PER_PAGE)
for (const { author, id, image, title } of matches.slice(0, BOOKS_PER_PAGE)) {
    const element = document.createElement('button')
    element.classList = 'preview'
    element.setAttribute('data-preview', id)
// Generate book preview HTML content
    element.innerHTML = `
        <img
            class="preview__image"
            src="${image}"
        />
        
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
    `

    starting.appendChild(element)
}
// Append initial book previews to the list container
document.querySelector('[data-list-items]').appendChild(starting)
// Generate options for genre filter (including "All Genres")
const genreHtml = document.createDocumentFragment()
const firstGenreElement = document.createElement('option')
firstGenreElement.value = 'any'
firstGenreElement.innerText = 'All Genres'
genreHtml.appendChild(firstGenreElement)

for (const [id, name] of Object.entries(genres)) {
    const element = document.createElement('option')
    element.value = id
    element.innerText = name
    genreHtml.appendChild(element)
}
// Append genre options to the genre select element
document.querySelector('[data-search-genres]').appendChild(genreHtml)
// Generate options for author filter (including "All Authors")
const authorsHtml = document.createDocumentFragment()
const firstAuthorElement = document.createElement('option')
firstAuthorElement.value = 'any'
firstAuthorElement.innerText = 'All Authors'
authorsHtml.appendChild(firstAuthorElement)

for (const [id, name] of Object.entries(authors)) {
    const element = document.createElement('option')
    element.value = id
    element.innerText = name
    authorsHtml.appendChild(element)
}
// Append author options to the author select element
document.querySelector('[data-search-authors]').appendChild(authorsHtml)

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.querySelector('[data-settings-theme]').value = 'night'
  themeColour("night")
} else {
    document.querySelector('[data-settings-theme]').value = 'day'
   themeColour("day")
}
// Update "Show More" button state based on initial book count
  updateShowMoreButton(books,page,BOOKS_PER_PAGE,matches.length); 
 // Add event listeners for closing overlays 
  addCancelEventListener('[data-search-cancel]', '[data-search-overlay]');
  addCancelEventListener('[data-settings-cancel]', '[data-settings-overlay]');
  // Add event listeners for opening overlays on header clicks
  addHeaderClickListener('[data-header-search]', '[data-search-overlay]', '[data-search-title]');
  addHeaderClickListener('[data-header-settings]', '[data-settings-overlay]');
  // Add event listener for closing the book list container
  handleListCloseClick();  
// Event listener for submitting the theme settings form
document.querySelector('[data-settings-form]').addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const { theme } = Object.fromEntries(formData)

    if (theme === 'night') {
        themeColour('night')
    } else {
       themeColour('day')
    }
    
    document.querySelector('[data-settings-overlay]').open = false
})
// Event listener for submitting the search form
document.querySelector('[data-search-form]').addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    const result = []
  // Loop through all books
    for (const book of books) {
        let genreMatch = filters.genre === 'any'

        for (const singleGenre of book.genres) {
            if (genreMatch) break;
            if (singleGenre === filters.genre) { genreMatch = true }
        }
// Check if the book matches all filters (title, author, genre)
        if (
            (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) && 
            (filters.author === 'any' || book.author === filters.author) && 
            genreMatch
        ) {
            result.push(book)
        }
    }

    page = 1;
    matches = result
 // Update list message visibility based on search results
    if (result.length < 1) {
        document.querySelector('[data-list-message]').classList.add('list__message_show')
    } else {
        document.querySelector('[data-list-message]').classList.remove('list__message_show')
    }

    document.querySelector('[data-list-items]').innerHTML = ''
  // Create a document fragment for efficient DOM manipulation
    const newItems = document.createDocumentFragment()
 // Loop through a subset of filtered books for initial display (based on BOOKS_PER_PAGE)
    for (const { author, id, image, title } of result.slice(0, BOOKS_PER_PAGE)) {
        const element = document.createElement('button')
        element.classList = 'preview'
        element.setAttribute('data-preview', id)
     // Generate book preview HTML content
        element.innerHTML = `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>
        `

        newItems.appendChild(element)
    }
// Append the fragment containing book previews to the list container
    document.querySelector('[data-list-items]').appendChild(newItems)
 // Disable "Show More" button if there are no more books to display   
    document.querySelector('[data-list-button]').disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 1
 // Call function to update "Show More" button state (likely based on remaining books)   
    updateShowMore(books,page,BOOKS_PER_PAGE)
 //  // Scroll to the top of the page smoothly
    window.scrollTo({top: 0, behavior: 'smooth'});
// Close the search overlay after submitting the form    
    document.querySelector('[data-search-overlay]').open = false
})

document.querySelector('[data-list-button]').addEventListener('click', () => {
    const fragment = document.createDocumentFragment()

    for (const { author, id, image, title } of matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)) {
        const element = document.createElement('button')
        element.classList = 'preview'
        element.setAttribute('data-preview', id)
    
        element.innerHTML = `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>
        `

        fragment.appendChild(element)
    }

    document.querySelector('[data-list-items]').appendChild(fragment)
    page += 1
    updateShowMore(books,page,BOOKS_PER_PAGE)
})

document.querySelector('[data-list-items]').addEventListener('click', (event) => {
    const pathArray = Array.from(event.path || event.composedPath())
    let active = null

    for (const node of pathArray) {
        if (active) break

        if (node?.dataset?.preview) {
            let result = null
    
            for (const singleBook of books) {
                if (result) break;
                if (singleBook.id === node?.dataset?.preview) result = singleBook
            } 
        
            active = result
        }
    }
    act(active) ;})

    // Function to toggle theme based on the saved preference
function themeSwitch() {
    const toggle = localStorage.getItem("toggle") === "enabled";
    document.body.classList.toggle("toggle", toggle);
}

// Function to save theme preference to local storage
function saveThemePreference(theme) {
    localStorage.setItem("theme", theme);
}
// 
// Function to save toggle state to local storage
function saveToggleState(toggleState) {
    localStorage.setItem("toggle", toggleState);
}

// Function to apply theme based on saved preference
function applyTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        themeColour(savedTheme);
        Object.values(document.querySelectorAll("[data-settings-theme] option")).map(element=>{
            if(savedTheme === element.value){element.selected = true;}
        })
    }
}

// Function to handle form submission for theme settings
function handleThemeSettingsFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { theme } = Object.fromEntries(formData);

    themeColour(theme);
    saveThemePreference(theme); // Save theme preference to local storage

    document.querySelector("[data-settings-overlay]").open = false;
}

// Function to handle toggling theme state and save it to local storage
function handleThemeToggleClick() {
    const toggleState = document.body.classList.toggle("toggle");
    saveToggleState(toggleState ? "enabled" : "disabled");
}

// Register event listener for 'DOMContentLoaded' to apply saved theme
document.addEventListener('DOMContentLoaded', () => {
    themeSwitch();
    applyTheme();
});
handleThemeToggleClick()
// Register event listener for submitting theme settings form
document.querySelector("[data-settings-form]").addEventListener("submit", handleThemeSettingsFormSubmit);

// Register event listener for theme toggle button click
document.querySelector("[data-settings-theme]").addEventListener("click", handleThemeToggleClick);


