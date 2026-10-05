// Week 7: Interactive Portfolio
// Your mission: Add JavaScript interactivity to your static portfolio!

// ============================================
// PART 1: SMOOTH SCROLL NAVIGATION (15 min)
// ============================================

// TODO: Select all navigation links
// Hint: Use querySelectorAll with the class '.nav-link'
const navLinks = document.querySelectorAll('.nav-link'); // Replace null with your selector

// TODO: Add click event listeners to each nav link
// Hint: Use forEach to loop through navLinks
// For each link:
//   1. Add 'click' event listener
//   2. Prevent default link behavior (preventDefault)
//   3. Get the href attribute to find target section
//   4. Use scrollIntoView() to smoothly scroll to that section
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// BONUS: Update active nav link on scroll
// TODO: Add scroll event listener to window
// Hint: As user scrolls, highlight the nav link for the current section
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));

            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
});


// ============================================
// PART 2: PROJECT FILTERING (20 min)
// ============================================

// TODO: Select all filter buttons
// Hint: Use querySelectorAll with the class '.filter-btn'
const filterButtons = document.querySelectorAll('.filter-btn'); // Replace null with your selector

// TODO: Select all project cards
// Hint: Use querySelectorAll with the class '.project-card'
const projectCards = document.querySelectorAll('.project-card'); // Replace null with your selector

// TODO: Add click event listeners to filter buttons
// For each button:
//   1. Add 'click' event listener
//   2. Remove 'active' class from all buttons
//   3. Add 'active' class to clicked button
//   4. Get the data-filter attribute from clicked button
//   5. Filter project cards based on their data-category attribute
//      - If filter is 'all', show all cards
//      - Otherwise, show only cards matching the filter
//   6. Use style.display to show ('block') or hide ('none') cards
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.dataset.filter;

        projectCards.forEach(card => {
            const cardCategory = card.dataset.category;

            if (filterValue === 'all' || cardCategory === filterValue) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Hint: To get a data attribute, use element.dataset.filter or element.getAttribute('data-filter')


// ============================================
// PART 3: MOBILE MENU TOGGLE (10 min)
// ============================================

// TODO: Select the mobile menu toggle button
// Hint: Use querySelector with the class '.nav-toggle'
const navToggle = document.querySelector('.nav-toggle'); // Replace null with your selector

// TODO: Select the navigation menu
// Hint: Use querySelector with the class '.nav-menu'
const navMenu = document.querySelector('.nav-menu'); // Replace null with your selector

// TODO: Add click event listener to toggle button
// When clicked:
//   1. Toggle 'active' class on navMenu
//   2. Toggle 'active' class on navToggle (for hamburger animation)
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// BONUS: Close menu when a nav link is clicked
// TODO: Add click listeners to nav links to close the mobile menu
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});


// ============================================
// PART 4: SKILL ANIMATIONS (15 min)
// ============================================

// TODO: Select all skill progress bars
// Hint: Use querySelectorAll with the class '.skill-progress'
const skillBars = document.querySelectorAll('.skill-progress'); // Replace null with your selector

// TODO: Create a function to animate skills when they come into view
// Hint: Add a scroll event listener
// When skills section is visible:
//   1. For each skill bar, animate its width from 0 to the --skill-level value
//   2. Use the style property to set the width
//   3. Add a CSS transition for smooth animation
function animateSkills() {
    const skillsSection = document.querySelector('#skills');
    const skillsPosition = skillsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight * 0.85;

    if (skillsPosition < screenPosition) {
        skillBars.forEach(bar => {
            const skillLevel = bar.style.getPropertyValue('--skill-level');
            bar.style.width = skillLevel; // CSS transition (in styles.css) animates this
        });
    }
}

window.addEventListener('scroll', animateSkills);
animateSkills(); // Run once on load in case skills are already visible

// Advanced: Use Intersection Observer for better performance (optional)


// ============================================
// PART 5: FORM VALIDATION (20 min)
// ============================================

// TODO: Select the contact form
// Hint: Use querySelector with the id '#contact-form'
const contactForm = document.querySelector('#contact-form'); // Replace null with your selector

// TODO: Select form inputs
const nameInput = document.querySelector('#name'); // querySelector for #name
const emailInput = document.querySelector('#email'); // querySelector for #email
const messageInput = document.querySelector('#message'); // querySelector for #message

const MAX_MESSAGE_LENGTH = 300; // used by Extension 2 (character counter)

// TODO: Create validation functions

// Function to validate email format
function isValidEmail(email) {
    // Hint: Use a simple regex or check for @ and .
    // Example: return email.includes('@') && email.includes('.');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email); // Replace with actual validation
}

// Function to show error message
function showError(input, message) {
    // TODO:
    // 1. Create a span element for error message
    // 2. Set its textContent to the message
    // 3. Add a class 'error-message' for styling
    // 4. Append it after the input field
    // Hint: Use createElement, classList.add, and appendChild
    clearError(input); // avoid stacking duplicate messages

    const error = document.createElement('span');
    error.textContent = message;
    error.classList.add('error-message');

    input.insertAdjacentElement('afterend', error);
    input.classList.add('error');
    input.classList.remove('success');
}

// Function to clear error message
function clearError(input) {
    // TODO:
    // 1. Find the error message element (next sibling)
    // 2. Remove it from the DOM
    // Hint: Use querySelector or nextElementSibling and remove()
    const error = input.nextElementSibling;
    if (error && error.classList.contains('error-message')) {
        error.remove();
    }
    input.classList.remove('error');
}

// TODO: Add 'input' event listeners for real-time validation
// For name input:
//   - Check if value length > 0
//   - Show/clear error accordingly
nameInput.addEventListener('input', () => {
    if (nameInput.value.trim().length < 2) {
        showError(nameInput, 'Name must be at least 2 characters');
    } else {
        clearError(nameInput);
        nameInput.classList.add('success');
    }
});

// For email input:
//   - Check if email is valid using isValidEmail()
//   - Show/clear error accordingly
emailInput.addEventListener('input', () => {
    if (!isValidEmail(emailInput.value.trim())) {
        showError(emailInput, 'Please enter a valid email address');
    } else {
        clearError(emailInput);
        emailInput.classList.add('success');
    }
});

// For message input:
//   - Check if value length > 10
//   - Show/clear error accordingly
messageInput.addEventListener('input', () => {
    if (messageInput.value.trim().length < 10) {
        showError(messageInput, 'Message must be at least 10 characters');
    } else if (messageInput.value.length > MAX_MESSAGE_LENGTH) {
        showError(messageInput, `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer`);
    } else {
        clearError(messageInput);
        messageInput.classList.add('success');
    }
});

// TODO: Add 'submit' event listener to form
// When submitted:
//   1. Prevent default form submission
//   2. Validate all fields
//   3. If all valid:
//      - Show success message
//      - Clear form fields
//   4. If invalid:
//      - Show error messages
//      - Don't submit
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    if (nameInput.value.trim().length < 2) {
        showError(nameInput, 'Name must be at least 2 characters');
        isValid = false;
    }

    if (!isValidEmail(emailInput.value.trim())) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
    }

    if (messageInput.value.trim().length < 10) {
        showError(messageInput, 'Message must be at least 10 characters');
        isValid = false;
    } else if (messageInput.value.length > MAX_MESSAGE_LENGTH) {
        showError(messageInput, `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer`);
        isValid = false;
    }

    if (!isValid) return;

    const oldMsg = contactForm.querySelector('.success-message');
    if (oldMsg) oldMsg.remove();

    const successMsg = document.createElement('div');
    successMsg.classList.add('success-message');
    successMsg.textContent = 'Thank you! Your message has been sent successfully.';
    contactForm.appendChild(successMsg);

    setTimeout(() => {
        contactForm.reset();
        successMsg.remove();
        document.querySelectorAll('.success').forEach(input => {
            input.classList.remove('success');
        });
        messageInput.dispatchEvent(new Event('input')); // reset character counter
        clearError(messageInput);
    }, 3000);
});


// ============================================
// EXTENSION ACTIVITIES (after Parts 1 to 5)
// ============================================

// See the README's "Extension Activities" section: three tiers of tasks with
// the requirement, what done looks like, one hint, and why it matters.
// No code is given for them on purpose. Add your extension code below Part 5.

// --- Tier 1-1 + Tier 2-4: Filter count + search box combined with buttons ---
const filterCount = document.querySelector('#filter-count');
const searchInput = document.querySelector('#project-search');

function applyFilters() {
    const activeButton = document.querySelector('.filter-btn.active');
    const category = activeButton ? activeButton.dataset.filter : 'all';
    const query = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    projectCards.forEach(card => {
        const matchesCategory = category === 'all' || card.dataset.category === category;

        let matchesSearch = query === '';
        card.querySelectorAll('.project-tag').forEach(tag => {
            if (tag.textContent.toLowerCase().includes(query)) {
                matchesSearch = true;
            }
        });

        if (matchesCategory && matchesSearch) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    filterCount.textContent = `Showing ${visibleCount} of ${projectCards.length} projects`;
}

// Runs after Part 2's listener, so the final view uses button + search together
filterButtons.forEach(button => {
    button.addEventListener('click', applyFilters);
});
searchInput.addEventListener('input', applyFilters);
applyFilters();

// --- Tier 1-2: Character counter on the message box ---
const charCounter = document.querySelector('#char-counter');

messageInput.addEventListener('input', () => {
    const count = messageInput.value.length;
    charCounter.textContent = `${count} / ${MAX_MESSAGE_LENGTH}`;
    charCounter.classList.toggle('error', count > MAX_MESSAGE_LENGTH);
});

// --- Tier 2-3: Theme toggle that remembers ---
const themeToggle = document.querySelector('#theme-toggle');

function getSavedTheme() {
    try {
        return localStorage.getItem('theme') || 'light';
    } catch (err) {
        return 'light';
    }
}

function updateThemeLabel() {
    const isDark = document.body.classList.contains('dark');
    themeToggle.textContent = isDark ? '☀️ Light' : '🌙 Dark';
}

if (getSavedTheme() === 'dark') {
    document.body.classList.add('dark');
}
updateThemeLabel();

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const theme = document.body.classList.contains('dark') ? 'dark' : 'light';
    try {
        localStorage.setItem('theme', theme);
    } catch (err) {
        // storage unavailable - theme still works for this visit
    }
    updateThemeLabel();
});

// --- Tier 3-5: Project details without leaving the page ---
const projectDialog = document.querySelector('#project-dialog');
const dialogTitle = projectDialog.querySelector('.dialog-title');
const dialogDescription = projectDialog.querySelector('.dialog-description');
const dialogTags = projectDialog.querySelector('.dialog-tags');
const dialogClose = projectDialog.querySelector('.dialog-close');

function closeProjectDialog() {
    if (projectDialog.open) projectDialog.close();
}

projectCards.forEach(card => {
    card.addEventListener('click', (event) => {
        if (event.target.closest('a')) return; // let Live Demo / Code links work

        const clickedCard = event.currentTarget;
        dialogTitle.textContent = clickedCard.querySelector('.project-title').textContent;
        dialogDescription.textContent = clickedCard.querySelector('.project-description').textContent;

        dialogTags.innerHTML = '';
        clickedCard.querySelectorAll('.project-tag').forEach(tag => {
            const span = document.createElement('span');
            span.classList.add('project-tag');
            span.textContent = tag.textContent;
            dialogTags.appendChild(span);
        });

        projectDialog.showModal();
    });
});

dialogClose.addEventListener('click', closeProjectDialog);

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeProjectDialog();
});


// ============================================
// HELPFUL TIPS & REMINDERS
// ============================================

// DOM Selection:
// - querySelector() returns first matching element
// - querySelectorAll() returns NodeList of all matching elements
// - Use forEach() to loop through NodeList

// Event Listeners:
// - addEventListener('event', function)
// - Common events: 'click', 'submit', 'input', 'scroll'
// - Use event.preventDefault() to stop default behavior

// Class Manipulation:
// - classList.add('classname')
// - classList.remove('classname')
// - classList.toggle('classname')

// Style Manipulation:
// - element.style.property = 'value'
// - element.style.display = 'none' or 'block'

// Data Attributes:
// - HTML: data-category="frontend"
// - JS: element.dataset.category or element.getAttribute('data-category')

// Creating Elements:
// - document.createElement('tagname')
// - element.textContent = 'text'
// - element.classList.add('classname')
// - parentElement.appendChild(element)

// Good luck! Remember to test frequently and use console.log() to debug!