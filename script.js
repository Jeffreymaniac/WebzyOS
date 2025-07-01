// essentials
import * as u from './helpers.js';
import * as apps from './apps.js';
// fun stuff
import canvasConfetti from 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/+esm';
import emojiMart, {Picker} from 'https://cdn.jsdelivr.net/npm/emoji-mart@5.6.0/+esm';
import cowsayTag from 'https://cdn.jsdelivr.net/npm/cowsay-tag@1.3.3/+esm';
import 'https://unpkg.com/shop-color-picker';
// OS apps and functions
import * as os from './os.js';

window.numberOfOpenWindows=0;
window.canvasConfetti=canvasConfetti;
window.cowsayTag=cowsayTag;
window.snow = function(duration=15000) {
var animationEnd = Date.now() + duration;
var skew = 1;

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

(function frame() {
  var timeLeft = animationEnd - Date.now();
  var ticks = Math.max(200, 500 * (timeLeft / duration));
  skew = Math.max(0.8, skew - 0.001);

  window.canvasConfetti({
    particleCount: 1,
    startVelocity: 0,
    ticks: ticks,
    origin: {
      x: Math.random(),
      // since particles fall down, skew start toward the top
      y: (Math.random() * skew) - 0.2
    },
    colors: ['#ffffff'],
    shapes: ['circle'],
    gravity: randomInRange(0.4, 0.6),
    scalar: randomInRange(0.4, 1),
    drift: randomInRange(-0.4, 0.4)
  });

  if (timeLeft > 0) {
    requestAnimationFrame(frame);
  }
}());
};
window.randomDadJoke=u.randomDadJoke;
window.doSPECIALApp= function (appp) {
if(appp=='drawing') {
const canvas = document.getElementById('drawingApp-canvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('drawingApp-color');
const sizePicker = document.getElementById('drawingApp-size');
const clearBtn = document.getElementById('drawingApp-clear');
const saveBtn = document.getElementById('drawingApp-save');
const changeBg = document.getElementById('drawingApp-bgcolor');
const formatSelect = document.getElementById('drawingApp-format');

let drawing = false;
let lastX = 0;
let lastY = 0;
let color='#00000';
colorPicker.addEventListener('change', () => {
 color=colorPicker.value;
});
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
   
window.addEventListener('resize', function () {
  // commented out because this code has been made useless by CSS and actually just resets the canvas which is unwanted

  // canvas.width = canvas.offsetWidth;
  // canvas.height = canvas.offsetHeight;

  let ofscreenwidth = window.innerWidth * 0.15;

  if (!colorPicker) return;

  const rect = colorPicker.getBoundingClientRect().width;

if(rect!=ofscreenwidth){
  //equation: we want rect to be 100% of its container, which is 15% of screen width. we will use transform for that.
  // so what scale factor will make `rect` equal 15% of screen width?
  // we need rect to equal ofscreenwidth and we will do so by multipying rect by a scaleFactor (rect*scaleFactor) and that number is our scaleFactor that we can use for the transform
 
    //rect * x (scaleFactor) = 15% of the screen

    const scaleFactor = ofscreenwidth/rect;

  colorPicker.style.transform = `scale(${scaleFactor})`;

}
});


// Start drawing
function startDrawing(x, y) {
  drawing = true;
  [lastX, lastY] = [x, y];
}

// Draw line
function drawLine(x, y) {
  if (!drawing) return;
  ctx.strokeStyle = color;
  ctx.lineWidth = sizePicker.value;
  ctx.lineCap = 'round';

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();
  [lastX, lastY] = [x, y];
}

// Stop drawing
function stopDrawing() {
  drawing = false;
}

// Mouse events
canvas.addEventListener('mousedown', e => startDrawing(e.offsetX, e.offsetY));
canvas.addEventListener('mousemove', e => drawLine(e.offsetX, e.offsetY));
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Touch support
canvas.addEventListener('touchstart', e => {
  const rect = canvas.getBoundingClientRect();
  const touch = e.touches[0];
  startDrawing(touch.clientX - rect.left, touch.clientY - rect.top);
}, { passive: false });

canvas.addEventListener('touchmove', e => {
  const rect = canvas.getBoundingClientRect();
  const touch = e.touches[0];
  drawLine(touch.clientX - rect.left, touch.clientY - rect.top);
  e.preventDefault();
}, { passive: false });

canvas.addEventListener('touchend', stopDrawing);
canvas.addEventListener('touchcancel', stopDrawing);

// Clear button
clearBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
function getOrdinal(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function getTimestampedFilename(png) {
  const now = new Date();
  const months = [
    "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
  ];
  const day = now.getDate();
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  const dayWithSuffix = getOrdinal(day);

  return `drawing_${month}-${dayWithSuffix}-${year}.${png}`;
}
   
saveBtn.addEventListener('click', () => {
  const format = formatSelect.value; // png, jpeg, webp
  const mimeType = `image/${format}`;

  const dataURL = canvas.toDataURL(mimeType);
  const approxSizeInBytes = (dataURL.length * 3) / 4;
  const MAX_SIZE = 10 * 1024 * 1024;
  const filename = getTimestampedFilename(format);

  if (approxSizeInBytes <= MAX_SIZE) {
    // Fast Data URL download
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    // Blob fallback for large images
    canvas.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, mimeType);
  }
});

changeBg.addEventListener('change', () => {
// set bg color
function canvasBg(ctx, color) {
  // Save current content
  const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Fill background
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Draw previous content back on top
  ctx.putImageData(imageData, 0, 0);
}

    canvasBg(ctx,changeBg.value);
});

}
if(appp=='settings') {
    function search(searc) {
    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://example.com/')}`)
.then(response => {
if (response.ok) return response.json()
throw new Error('Network response was not ok.')
})
.then(data => {return data.contents});
    }

}
};
// For the navbar:
//Do the time:
let is24HourFormat = false;  // Start with 12-hour format (AM/PM)

function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let ampm = '';

    // If 12-hour format, calculate AM/PM
    if (!is24HourFormat) {
        ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // Adjust hours to 12 if it's 0 (midnight)
    }

    minutes = minutes < 10 ? '0' + minutes : minutes;  // Pad minutes with leading 0 if needed

    let timeString = `${hours}:${minutes}`;
    if (!is24HourFormat) {
        timeString += ` ${ampm}`;
    }

    document.getElementById('time').innerText = timeString;
}

// Toggle between 24-hour and 12-hour format
function toggleTimeFormat() {
    is24HourFormat = !is24HourFormat;
    updateTime();  // Update the time immediately after format change
}

// Update time every minute
setInterval(updateTime, 60000);

// Initial time update
updateTime();

// ---------
// Battery stuff
// Update battery percentage every minute
async function updateBattery() {
    const battery = await u.getBatteryInfo();  // Use the imported function from helpers.js

    if (battery) {
        // Update the span with id 'battery' to show the percentage
        document.getElementById('battery').innerText = `${battery.level<30 ? '🔋' : '🪫'}: ${battery.percentage}`;
    } else {
        document.getElementById('battery').innerText = '🔋: ?%';
    }
}

// Update battery info every 60 seconds
setInterval(updateBattery, 60000);

// Initial battery info update when the page loads
updateBattery();

// Attach startup button handler
document.getElementById('WINstartUp_c1').addEventListener("click", showOSHome);

// Displayer function =
function displayer(txt, x) {
document.body.insertAdjacentHTML('beforeend', `
        <div id="modal" inert>
            <div class="inner"></div>
        </div>
    `);

    const modal = document.getElementById('modal');
    modal.querySelector('.inner').innerHTML = `
        ${!x.disableCloseButton
            ? `<button class="close" onclick="document.getElementById('modal').remove()">&times;</button>`
            : '<button disabled class="close">&times;</button>'}
        <p>${txt}</p>
    `;
    modal.removeAttribute('inert');
}
//download apps
window.terminalExecute=os.terminalExecute;
window.runTerminalCommand = async function (event) {
  event.preventDefault();

  const inputEl = document.getElementById("terminalApp-input1");
  const outputEl = document.getElementById("terminalApp-output");
  const command = inputEl.value.trim();

  if (!command) return;

  const result = await window.terminalExecute(command);

  // Append output
  outputEl.insertAdjacentHTML("beforeend", result);
  inputEl.value = '';
};
// is not for the terminal app, but instead other apps that wanna run commands
window.runTerminalThing = async function (command) {
  const commandd = command.trim();

  if (!commandd) return;

  const result = await window.terminalExecute(commandd);
  return result;
};

apps.downloadAppAs('terminal',os.terminalApp,true,os.terminalApp);
apps.downloadAppAs('settings',os.settingsApp,true, os.settingsApp);
apps.downloadAppAs('browser',os.browserApp,true, os.browserApp);
apps.downloadAppAs('notes',os.iframe('https://d-herz.github.io/NoteShare/'));
apps.downloadAppAs('calculator',os.calculatorApp,true, os.calculatorApp);
apps.downloadAppAs('drawing',os.drawingApp,true, os.drawingApp);
apps.downloadAppAs('liveweave', os.iframe('https://liveweave.com/'));
apps.downloadAppAs('todolist', os.iframe('//jeffreymaniac.github.io/2DoListApp/'));
apps.downloadAppAs('pictochat', os.iframe('https://pict.chat/'));
apps.downloadAppAs('html5test', os.iframe('https://html5test.com/'));
apps.downloadAppAs('photopea', os.iframe('https://photopea.com/'));
apps.downloadAppAs('desmos', os.iframe('https://desmos.com/calculator'));
apps.downloadAppAs('emojitable', os.iframe('https://projects.iamcal.com/emoji-data/table.htm'));
apps.downloadAppAs('sketchpad', os.iframe('https://sketch.io/sketchpad/'));
apps.downloadAppAs('drifthunters', os.iframe('https://geometrymath.com/games/2023/unity3/drift-hunters/index.html'));
apps.downloadAppAs('survival-craft', os.iframe('https://storage.googleapis.com/freezenova/all/2022/unity/survival-craft/pre-gg.html'));
apps.downloadAppAs('run3', os.iframe('https://storage.googleapis.com/freezenova/all/2023/construct/192/run-3-space/pre-gg.html'));
apps.downloadAppAs('brick-tetris', os.iframe('https://storage.googleapis.com/freezenova/all/2024/unity2/brick-tetris/pre-gg.html'));
apps.downloadAppAs('bullet-master', os.iframe('https://geometrymath.com/games/2023/freezenova.com/bullet-master/index.html'));

// Show OS Home
function showOSHome() {
    canvasConfetti({
  particleCount: 100,
  startVelocity: 30,
  spread: 360,
  origin: {
    x: Math.random(),
    // since they fall down, start a bit higher than random
    y: Math.random() - 0.2
  }
});
    document.getElementById('WINstartUp').remove();
    let el = document.createElement('div');
    el.setAttribute('id', 'WINoshome');
    el.setAttribute('class', 'fullWIN');

    let appsHTML = '<div>';
    document.documentElement.classList.remove('start');
    document.documentElement.classList.add('os');

    apps.list.forEach(function (item, num) {
        appsHTML += `<div class="appICON" id="appICON${num}" onclick="doApp(${num})" role="button">
            <img src="${item.img}" alt="${item.name}" />
            <p>${item.name}</p>
        </div>`;
    });

    appsHTML += '</div>';
    el.innerHTML += appsHTML;
    document.body.appendChild(el);

}
// Add icon to navbar
function putNewIconInNavbar(app,linked) {
    const middle = document.querySelector('#navbar .center');
    middle.insertAdjacentHTML('afterbegin', `
    <img src='${app.img}' data-app="ico_${linked}" title="${app.name}"  onclick='document.getElementById("${linked}").style.display = "block"' />
    `);
}
//close app
window.closeApp = function (linked) {
 document.getElementById('afID_'+linked).remove();
window.numberOfOpenWindows--;


};
// Run an App
function doApp(num) {
    function makeDraggable(windowElement, handleElement) {
    let offsetX = 0, offsetY = 0;
    let isDragging = false;

    handleElement.addEventListener('mousedown', function (e) {
        e.preventDefault();
        isDragging = true;

        // Get initial mouse position and offset
        const rect = windowElement.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    function onMouseMove(e) {
        if (!isDragging) return;
        e.preventDefault();

        // Move the window
        windowElement.style.position = 'absolute';
        windowElement.style.left = `${e.clientX - offsetX}px`;
        windowElement.style.top = `${e.clientY - offsetY}px`;
        windowElement.style.zIndex = 1000; // Ensure it's on top
    }

    function onMouseUp() {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
}

    const app = apps.list[num];
    if (!apps.checkIfAppExists(app.appFileID)) {
        displayer('App is not installed');
    } else {
        try {
            let theID = app.appFileID;
            if(document.getElementById('afID_'+theID)) {
                // prevent having 2 or more windows with the same ID, which will make them no longer draggable and break the app
                theID+=u.randomness();
            }
            window.numberOfOpenWindows++;
            var windowNumber=window.numberOfOpenWindows;
            document.body.insertAdjacentHTML('beforeend', `
                <div class="runningApplication" id='afID_${theID}' >
                    <div class="top">
                        <span>Application: ${app.name}</span>
                        <div class="window-buttons">
                            <button
                            class="window-button minimize-btn"
                            title="Minimize"
                            onclick="this.closest('.runningApplication').style.display = 'none';"
                            >
  &#128469;
</button>
                            <button class="window-button fullscreen-btn" title="Fullscreen"
                            onclick="this.closest('.runningApplication').style.left = '0px'; this.closest('.runningApplication').style.top = '0px';"
                            >
  &#128470;
</button>

                            <button class="window-button close-btn" title="Close" onclick="window.closeApp('${theID}')">&times;</button>
                        </div>
                    </div>
                    <div class="appContent"></div>
                </div>
            `);

            let appWindow = document.getElementById('afID_' + theID);
            let appContent = appWindow.getElementsByClassName('appContent')[0];

            // Make the window draggable by its top bar
            makeDraggable(appWindow, appWindow.querySelector('.top'));

            let parsedAppCode = apps.parseAppCode(apps.fetchApplicationFile(app.appFileID));
            appContent.innerHTML = parsedAppCode.html || '<p>App is not working correctly</p>';
            putNewIconInNavbar(apps.list[num],'afID_'+theID);
            window.doSPECIALApp(app.appFileID);
           
        } catch (e) {
            displayer("Failed to load app: " + e.message);
        }
    }
}

// the lancher
function displayLauncher() {
    displayer('dd');
}
// Expose stuff globally (for inline onclick):
window.showOSHome = showOSHome;
window.doApp = doApp;
window.displayer = displayer;
window.displayLauncher=displayLauncher;
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      await navigator.serviceWorker.register('/sw.js');
      console.log('Service worker registered');
    } catch (err) {
      console.error('Service worker registration failed:', err);
    }
  });
}
