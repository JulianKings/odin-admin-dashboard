// Declarations
const root = document.querySelector(':root');
const contentBox = document.querySelector('.content');
// night mode
const nightModeHandler = document.querySelector(".night-mode");
let nightMode = false;
// night mode help
const notificationIcon = document.querySelector(".notification-bell");
const langIcon = document.querySelector(".language-selector");
const interactIcons = document.querySelectorAll('.section-content-card-icons');

// notifications
const notificationBox = document.querySelector('.notification-box');
let notificationShown = false;
const exitNotification = document.querySelector('.exit-notification');


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