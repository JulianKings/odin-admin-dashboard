// Declarations
const root = document.querySelector(':root');
const contentBox = document.querySelector('.content');
// night mode
const nightModeHandler = document.querySelector(".night-mode");
let nightMode = false;
// night mode help
const langIcon = document.querySelector(".language-selector");
const interactIcons = document.querySelectorAll('.section-content-card-icons');

// notifications
const notificationIcon = document.querySelector(".notification-bell");
const notificationBox = document.querySelector('.notification-box');
let notificationShown = false;
const exitNotification = document.querySelector('.exit-notification');

// events
const todayBox = document.querySelector('.section-events-today');
const todayDate = (new Date());

// media navigation menu
const mediaBox = document.querySelector('.media-menu')
const mediaButton = document.querySelector('.media-menu-button');
let navBoxShown = false;


// update date
todayBox.textContent = `${todayDate.getHours()}:${todayDate.getMinutes()} ${todayDate.getUTCDate()}/${1+todayDate.getMonth()}/${todayDate.getFullYear()}`;


// reposition checks
if(notificationShown)
{
    if(scrollbarVisible(contentBox))
    {
        notificationBox.style['right'] = '15px';
    } else {
        notificationBox.style['right'] = '0';
    }
}

window.addEventListener("resize", (event) => {
    if(notificationShown)
    {
        if(scrollbarVisible(contentBox))
        {
            notificationBox.style['right'] = '15px';
        } else {
            notificationBox.style['right'] = '0';
        }
    }
});

notificationBox.addEventListener("transitionend", (event) => {
    if(notificationShown)
    {
        if(scrollbarVisible(contentBox))
        {
            notificationBox.style['right'] = '15px';
        } else {
            notificationBox.style['right'] = '0';
        }
    }
});

// Handlers
nightModeHandler.addEventListener("click", (event) => {

    nightMode = !nightMode;
    if(nightMode)
    {
        nightModeHandler.innerHTML = `<img src="image/sun.svg" />`;
        notificationIcon.innerHTML = `<img src="image/bell-white.svg" />` +
                                    `<div class="notification-count">6</div>`;
        interactIcons.forEach((icon) => {
            icon.innerHTML = `<a href="#"><img src="image/star-white.svg" /></a>` +
                                `<a href="#"><img src="image/bookmark-white.svg" /></a>` +
                                `<a href="#"><img src="image/share-white.svg" /></a>`;
        });
        langIcon.innerHTML = `EN<img src="image/chevron-down-white.svg" />`;
        exitNotification.innerHTML = '<img src="image/x-white.svg" />';
        root.style.setProperty('--background-color', '#323336');
        root.style.setProperty('--text-color', 'white');
        root.style.setProperty('--background-white', 'black');
        root.style.setProperty('--text-a-hover-color', '#2b2828');
        root.style.setProperty('--text-span-color', '#cccaca');
    } else {
        nightModeHandler.innerHTML = `<img src="image/moon.svg" />`;
        notificationIcon.innerHTML = `<img src="image/bell.svg" />` +
                                    `<div class="notification-count">6</div>`;
        langIcon.innerHTML = `EN<img src="image/chevron-down.svg" />`;
        interactIcons.forEach((icon) => {
            icon.innerHTML = `<a href="#"><img src="image/star.svg" /></a>` +
                                `<a href="#"><img src="image/bookmark.svg" /></a>` +
                                `<a href="#"><img src="image/share.svg" /></a>`;
        });
        exitNotification.innerHTML = '<img src="image/x.svg" />';
        root.style.setProperty('--background-color', '#e5e7eb');
        root.style.setProperty('--text-color', 'black');
        root.style.setProperty('--background-white', 'white');
        root.style.setProperty('--text-a-hover-color', '#2b2828');
        root.style.setProperty('--text-span-color', '#615c5c');
    }
});

// notifications

exitNotification.addEventListener("click", (event) => {
    removeNotification(event);
});

notificationIcon.addEventListener("click", (event) => {
    if(!notificationShown)
    {
        notificationShown = true;
        notificationBox.style['width'] = 'auto';
        notificationBox.style['display'] = 'grid';
        if(scrollbarVisible(contentBox))
        {
            notificationBox.style['right'] = '15px';
        } else {
            notificationBox.style['right'] = '0';
        }
    } else {
        removeNotification(event);
    }
});

// nav box

mediaButton.addEventListener("click", (event) => {
    if(!navBoxShown)
    {
        showNavBox(event);
    } else {
        removeNavBox(event);
    }
});

// helpers
function scrollbarVisible(element) {
    return element.scrollHeight > element.clientHeight;
}

async function removeNotification(event) {
    if(notificationShown)
    {
        notificationShown = false;
        notificationBox.style['right'] = '-25rem';
        await new Promise(resolve => setTimeout(resolve, 600));
        notificationBox.style['display'] = (notificationShown) ? 'grid' : 'none';
    }
}

async function removeNavBox(event) {
    if(navBoxShown)
    {
        navBoxShown = false;
        mediaBox.style['bottom'] = '-25rem';
        await new Promise(resolve => setTimeout(resolve, 1000));
        mediaBox.style['display'] = (navBoxShown) ? 'block' : 'none';
    }
}

async function showNavBox(event) {
    if(!navBoxShown)
    {
        navBoxShown = true;
        mediaBox.style['display'] = (navBoxShown) ? 'block' : 'none';
        await new Promise(resolve => setTimeout(resolve, 100));
        mediaBox.style['bottom'] = (navBoxShown) ? '0' : '-25rem';
    }
}