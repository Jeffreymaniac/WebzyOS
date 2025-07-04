export async function terminalExecute(txtcmd) {
  if (txtcmd.startsWith('help') || txtcmd.startsWith('/help')) {
    return `<li>Here is a list of commands that can help you:
      <ul>
        <li>/help : gives you help</li>
        <li>/today : tells you the date and time of right now</li>
        <li>/calculate (math problem): allows you to do math. (math problem) accepts numbers, +, -, /, *, ^, parentheses, and some functions like sqrt(). Execute /mathHelp for more info.</li>
        <li>/mathHelp : shows you how to write valid (math problem)s</li>
        <li>/slope (x1,y1),(x2,y2) : return the mathematical slope between two points.</li>
        <li>/alert (message) : performs a JS alert() that alerts you the message you typed</li>
        <li>/clearLocalStorage : clears all localStorage</li>
        <li>/storageQuota : shows you how much storage this OS can use</li>
        <li>/downloadApp (url.xml) : downloads an app from an XML file on the internet and stores it. Be careful though, apps can do anything they want.</li>
        <li>/cowsay (message) : makes a text cow say your message</li>
        <li>/confetti : launches a confetti effect</li>
        <li>/snow (duration in milliseconds): makes it snow for however many milliseconds you want. By default it's 15 seconds (15000 milliseconds).</li>
        <li>/emoji : launches a new emoji picker</li>
        <li>/color : launches a new color picker</li>
        <li>/random color : returns a random color and the color picker too for convenience</li>
        <li>/random emoji : returns a random emoji</li>
        <li>/random insult : returns a random evil insult</li>
        <li>/random number : returns a random number from 1-100</li>
        <li>/random number from (min) to (max) : returns a random number from your custom numbers instead of just 1-100</li>
        <li>/random fact : returns a random fun fact</li>
        <li>/random dadJoke : returns a random dad joke</li>
        <li>/convertToBinary or /encodeBinary (string) : type something for it to be converted to binary</li>
        <li>/decodeBinary (binary string) : type binary for it to be unconverted/decoded</li>
        <li>/ip : Tells you your IP address</li>
        <li>/userAgent: Tells you your user agent</li>
      </ul>
    </li>`;
  }

  switch (true) {
    case txtcmd.startsWith('/alert'): {
      const msg = txtcmd.slice(7);
      if(msg.toLowerCase().trim()=='your mom'){return"<li>Error: that message is too heavy to alert</li>"}
      alert(msg);
      return `<li>You have been alerted the string: ${msg}</li>`;
    }
case txtcmd.startsWith('/random'): {
  const msg = txtcmd.trim();

  if (msg == '/random dadJoke') {
    try {
      // Fetch a random dad joke
      const joke = 'Random dad joke: ' + await window.randomDadJoke();
      return `<li>${joke}</li>`;
    } catch (error) {
      console.error('Error fetching dad joke:', error);
      return `<li>Oops, something went wrong!</li>`;
    }
  }
if (msg == '/random insult') {
  const response = await fetch('https://evilinsult.com/generate_insult.php?lang=en&type=json');
  if (!response.ok) {
    return `<li>❌ Failed to fetch insult. Try again later.</li>`;
  }
  const data = await response.json();
  const insult = data.insult || "You’ve been insulted... somehow.";
  return `<li>Insult: ${insult}</li>`;
}

  if (msg == '/random color') {
    // Generate random color
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return `<li>Random color: ${randomColor}</li>`;
  }

  if (msg == '/random emoji') {
    // Random emoji from valid emoji ranges
    const emojiRanges = [
      { start: 0x1F600, end: 0x1F64F }, // Emoticons
      { start: 0x1F300, end: 0x1F5FF }, // Misc Symbols and Pictographs
      { start: 0x1F680, end: 0x1F6FF }, // Transport and Map Symbols
      { start: 0x1F700, end: 0x1F77F }, // Alchemical Symbols
      { start: 0x1F780, end: 0x1F7FF }, // Geometric Shapes Extended
      { start: 0x1F800, end: 0x1F8FF }, // Supplemental Arrows-C
      { start: 0x1F900, end: 0x1F9FF }, // Supplemental Symbols and Pictographs
      { start: 0x1FA00, end: 0x1FA6F }, // Chess Symbols
      { start: 0x1FA70, end: 0x1FAFF }, // Symbols and Pictographs Extended-A
      { start: 0x2600, end: 0x26FF },   // Miscellaneous Symbols
      { start: 0x2700, end: 0x27BF },   // Dingbats
      { start: 0x2300, end: 0x23FF },   // Miscellaneous Technical
      { start: 0x2B50, end: 0x2B50 }    // Stars
    ];

    let randomEmoji;
    do {
      const randomRange = emojiRanges[Math.floor(Math.random() * emojiRanges.length)];
      const randomEmojiCodePoint = randomRange.start + Math.floor(Math.random() * (randomRange.end - randomRange.start + 1));
      randomEmoji = String.fromCodePoint(randomEmojiCodePoint);
    } while (!/[\p{Emoji}\u200D\u2640\u2642]/gu.test(randomEmoji));

    return `<li>Random emoji: ${randomEmoji}</li>`;
  }

  if (msg == '/random number') {
    // Generate random number within a range
    const randomNumber = Math.floor(Math.random() * 100) + 1; // 1 to 100
    return `<li>Random number (from 1 to 100): ${randomNumber}. For custom ranges type something like /random number from 1 to 100 . Change the numbers to what you want.</li>`;
  }
  if (msg.startsWith('/random number from')) {
  const regex = /from (-?\d+(\.\d+)?) to (-?\d+(\.\d+)?)/;
  const match = msg.match(regex);

  if (match && match[1] && match[3]) {
    const min = parseFloat(match[1]);
    const max = parseFloat(match[3]);

    if (!isNaN(min) && !isNaN(max) && min < max) {
      const customRandomNumber = Math.random() * (max - min) + min;
      const formattedNumber = customRandomNumber.toFixed(4); // Round to 4 decimal places
      return `<li>Random decimal (from ${min} to ${max}): ${formattedNumber}</li>`;
    } else {
      return `<li>Invalid range. Make sure your minimum is less than your maximum.</li>`;
    }
  } else {
    return `<li>Incorrect syntax. Use /random number from <min> to <max>. For example: /random number from -1.5 to 2.75</li>`;
  }
}

  if (msg == '/random fact') {
    // Fetch a random fact
    const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
    const data = await response.json();
    return `<li>Random fact: ${data.text}</li>`;
  }

  return `<li>Incorrect syntax. Try /random dadJoke, /random color, /random emoji, /random number, or /random fact.</li>`;
}



      break;
case txtcmd.trim() === '/today': {
  const now = new Date();

  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  const timeOptions = {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: !window.is24HourFormat, // false = 24h, true = 12h
    timeZoneName: 'short'
  };

  const formattedDate = now.toLocaleDateString('en-US', dateOptions);
  const formattedTime = now.toLocaleTimeString('en-US', timeOptions);

  return `<li>📅 Today is ${formattedDate} 🕒 ${formattedTime}</li>`;
}
    case txtcmd.trim()==='/ip': {
function getLocalIP() {
    return new Promise((resolve, reject) => {
        var pc = new (window.RTCPeerConnection ||
                      window.mozRTCPeerConnection ||
                      window.webkitRTCPeerConnection)({
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
        });

        var ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;

        pc.createDataChannel("");

        pc.createOffer().then(offer =>
            pc.setLocalDescription(offer)
        ).catch(reject);

        pc.onicecandidate = function(event) {
            if (
                event &&
                event.candidate &&
                event.candidate.candidate &&
                event.candidate.candidate.match(ipRegex)
            ) {
                resolve('<li>' + event.candidate.candidate.match(ipRegex)[0] + '</li>');
                pc.onicecandidate = null;
            }
        };
    });
}

      return await getLocalIP();
          }
    case txtcmd.trim()==='/userAgent': {
      return '<li>'+navigator.userAgent+'</li>';
    }

    case txtcmd.startsWith('/confetti'): {
      if (txtcmd === '/confetti') {
        window.canvasConfetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        return '<li>Confetti launched</li>';
      }
      break;
    }
    case txtcmd.startsWith('/snow'): {
      if (txtcmd == '/snow') {
        window.snow();
        return '<li>The snow snowed!</li>';
      } else {
        var dur = parseInt(txtcmd.slice(6).trim());
        window.snow(dur);
        return '<li>The snow snowed! And the snow snowed for ' + dur + 'milliseconds!</li>';
      }
      break;
    }
    case txtcmd.startsWith('/emoji'): {
      if (txtcmd == '/emoji') {
        return '<li> <em-emoji-picker></em-emoji-picker> </li> <li>New emoji-mart picker created</li>';
      }
      break;
    }
    case txtcmd.startsWith('/color'): {
      if (txtcmd == '/color') {
        return '<li> <shop-color-picker></shop-color-picker> </li> <li>New shop-color-picker created</li>';
      }
      break;
    }
    case txtcmd.startsWith('/cowsay '): {
      return '<br><pre class="cowsay">'+window.cowsayTag`${txtcmd.slice(7).trim()}`+'</pre><br>';
    }
    case txtcmd.startsWith('/clearLocalStorage'): {
      localStorage.clear();
      return '<li>localStorage has been cleared.</li>';
    }
case txtcmd.startsWith('/calculate '): {
  const mathEx = txtcmd.slice(11).trim();

  try {
    const context = {
  phi: (1 + Math.sqrt(5)) / 2,
  goldenRatio:(1 + Math.sqrt(5)) / 2,
  infinity: Infinity,
  Infinity: Infinity,
  negativeInfinity: -Infinity,
  NegativeInfinity: -Infinity,
  catalan:0.915965594177219,
  silverRatio:(1+Math.SQRT2),
  pi: Math.PI,
  e: Math.E,
  sqrt: Math.sqrt,
  cbrt: Math.cbrt || function(x) { return Math.pow(x, 1 / 3); },
  cos: Math.cos,
  sin: Math.sin,
  tan: Math.tan,
  acos: Math.acos,
  asin: Math.asin,
  atan: Math.atan,
  abs: Math.abs,
  log: Math.log,
  log10: Math.log10 || ((x) => Math.log(x) / Math.LN10),
  exp: Math.exp,
  round: Math.round,
  floor: Math.floor,
  ceil: Math.ceil,
  min: Math.min,
  max: Math.max,
  random: Math.random,
  pow: Math.pow,

  mean: (...args) => args.reduce((a, b) => a + b, 0) / args.length,
  average: (...args) => args.reduce((a, b) => a + b, 0) / args.length,

  median: (...args) => {
    const sorted = [...args].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0
      ? (sorted[mid - 1] + sorted[mid]) / 2
      : sorted[mid];
  }
};


    // Convert ^ to ** for exponentiation
    const safeExpr = mathEx.replace(/\^/g, '**');

    // Only allow safe characters: digits, math ops, letters, parentheses, commas, spaces
    if (!/^[\d+\-*/().,^a-zA-Z0-9_ ,]+$/.test(safeExpr)) {
      return `<li>Error: Invalid characters in expression.</li>`;
    }

    // Secure function call with scoped variables
    const func = new Function(...Object.keys(context), `return (${safeExpr});`);
    const result = func(...Object.values(context));

    return `<li>Result: ${result}</li>`;
  } catch (err) {
    return `<li>Error in calculation: ${err.message}</li>`;
  }
}
  
break;
    case txtcmd.startsWith('/downloadApp '): {
      const url = txtcmd.slice(13).trim();
      try {
        const res = await fetch(url);
        if (!res.ok) {
          return `<li>Failed to fetch: ${res.statusText}</li>`;
        }
        const xmlText = await res.text();
        const parsed = window.apps.parseAppCode(xmlText);
        // Try to get appFileID from URL or use a fallback name
        const appFileID = url.split('/').pop().split('.')[0] || `unnamedApp${Math.round(Math.random()*15)}`;
        window.apps.downloadAppAs(appFileID, xmlText);
        return `<li>App "${appFileID}" downloaded successfully. Version: ${parsed.version}</li>`;
      } catch (err) {
        return `<li>Error downloading app: ${err.message}</li>`;
      }
    }
break;
case txtcmd.startsWith('/convertToBinary ') || txtcmd.startsWith('/encodeBinary '): {
  const input = txtcmd.startsWith('/convertToBinary ') ? txtcmd.slice('/convertToBinary '.length).trim() : txtcmd.slice('/encodeBinary '.length).trim(); // get string after command
  const binary = Array.from(input)
    .map(char => char.charCodeAt(0).toString(2).padStart(8, '0')) // char -> binary
    .join(' '); // space-separated binary

  return `<li>Binary of "${input}": <code>${binary}</code></li>`;
}
case txtcmd.startsWith('/decodeBinary '): {
  const binaryStr = txtcmd.slice('/decodeBinary '.length).trim(); // remove the command part

  try {
    const decoded = binaryStr
      .split(/\s+/) // split by spaces
      .map(bin => String.fromCharCode(parseInt(bin, 2))) // binary → decimal → char
      .join('');

    return `<li>Decoded text: <strong>${decoded}</strong></li>`;
  } catch (err) {
    return `<li>Invalid binary input. Use space-separated 8-bit binary values. More error info: ${err}</li>`;
  }
}
case msg.startsWith('/emojiFlag'): {
  const regex = /\/emojiFlag\s*\(?\s*([a-zA-Z\s]{2,})\s*\)?/;
  const match = msg.match(regex);

  if (match) {
    let input = match[1].trim().toLowerCase();

    // Special symbolic flag terms
    const specialFlags = {
      "gay": "🏳️‍🌈",
      "pride": "🏳️‍🌈",
      "rainbow": "🏳️‍🌈",
      "trans": "🏳️‍⚧️",
      "transgender": "🏳️‍⚧️",
      "pirate": "🏴‍☠️",
      "checkers": "🏁",
      "checkered": "🏁",
      "chequered": "🏁",
      "white": "🏳️",
      "surrender": "🏳️",
      "black": "🏴",
      "triangular":"🚩",
      "red":"🚩",
      "crossed":"🎌",
      "outline":"⚐",
      "filled":"⚑",
      "golf":"⛳"
    };

    if (specialFlags[input]) {
      return `<li>Flag for "<b>${input}</b>": ${specialFlags[input]}</li>`;
    }

    // Mapping of country names to ISO codes
    const countryToCode = {
      "united states": "US",
      "canada": "CA",
      "united kingdom": "GB",
      "germany": "DE",
      "france": "FR",
      "spain": "ES",
      "italy": "IT",
      "japan": "JP",
      "south korea": "KR",
      "china": "CN",
      "brazil": "BR",
      "mexico": "MX",
      "australia": "AU",
      "india": "IN",
      "russia": "RU",
      "nigeria": "NG",
      "south africa": "ZA",
      "argentina": "AR",
      "sweden": "SE",
      "norway": "NO",
      "netherlands": "NL",
      "new zealand": "NZ",
      "uae": "AE",
      "uk": "GB"
    };

    // Check if input is 2-letter ISO code
    let code = input.length === 2 && /^[a-z]{2}$/.test(input) ? input.toUpperCase() : countryToCode[input];

    if (!code) {
      return `<li>❌ Unknown country or flag keyword. Try /emojiFlag (Japan), /emojiFlag (pirate), or /emojiFlag (rainbow)</li>`;
    }

    // Convert ISO code to regional indicator flag emoji
    const flagEmoji = code
      .split('')
      .map(c => String.fromCodePoint(c.charCodeAt(0) + 127397))
      .join('');

    return `<li>Emoji flag for <b>${code}</b>: ${flagEmoji}</li>`;
  } else {
    return `<li>❌ Invalid syntax. Use /emojiFlag (Country or Flag Name). Example: /emojiFlag (transgender)</li>`;
  }
}

case txtcmd.startsWith('/slope'): {
  const msg = txtcmd.trim();

  // Match format: /slope (x1,y1),(x2,y2)
  const regex = /\/slope\s*\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)\s*,\s*\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)/;
  const match = msg.match(regex);

  if (match) {
    const x1 = parseFloat(match[1]);
    const y1 = parseFloat(match[2]);
    const x2 = parseFloat(match[3]);
    const y2 = parseFloat(match[4]);

    if (x1 === x2) {
      return `<li>Vertical line – slope is undefined (x = ${x1})</li>`;
    }

    const slope = (y2 - y1) / (x2 - x1);
    return `<li>Slope between (${x1}, ${y1}) and (${x2}, ${y2}) is <b>${slope.toFixed(4)}</b></li>`;
  } else {
    return `<li>Incorrect format. Use /slope (x1,y1),(x2,y2). Example: /slope (0,-2),(2,4)</li>`;
  }
}

    default:
      return '<li>Unknown command. Type /help for help.</li>';
  }
}
export function iframe(url) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<app version="V0.1">
  <markup>
    <div>
      <iframe style="width:100%;height:100%;border:0" src='${url}'>
      </iframe>
    </div>
  </markup>
</app>`;
}
export var terminalApp = `<?xml version="1.0" encoding="UTF-8"?>
<app version="V0.1">
  <markup>
    <div style="color:white;background-color:black;padding-left:12px;font-family:'Fira Code'">
      <ul id="terminalApp-output">
        <li>Hello and welcome to the terminal app. Commands are written in a Minecraft-style command syntax. Type /help for help</li>
      </ul>
      <form onsubmit="window.runTerminalCommand(event)">
        <input id="terminalApp-input1" placeholder="type commands here" style="font:inherit;min-width:50%" />
        <input type="submit" value="Submit" style="font:inherit" />
      </form>
    </div>
  </markup>
</app>`;



export var calculatorApp = `<?xml version="1.0" encoding="UTF-8"?>
<app version="V0.1">
    <markup>
        <div style="font-family:Roboto,inherit">
        <h1>Calculator</h1>
        <form onsubmit="event.preventDefault(); 
                (async function() {
                  const result = await window.runTerminalThing('/calculate ' + document.getElementById('calculatorApp-input1').value);
                  document.getElementById('calculatorApp-output1').innerHTML = result;
                })();">
    <input id="calculatorApp-input1" placeholder="type math here" style="font:inherit;min-width:50%" />
    <input type="submit" value="Submit" style="font:inherit" />
</form>
        <div style="min-width:20%">
        <span id="calculatorApp-output1">Output</span>
        </div>

        </div>
    </markup>
</app>`;

export var notesApp = `<?xml version="1.0" encoding="UTF-8"?>
<app version="V0.1">
    <markup>
        <div>
            <button>Make new note</button>
            
<textarea>

</textarea>
        </div>
    </markup>
</app>`;

export var appstoreApp = `<?xml version="1.0" encoding="UTF-8"?>
<app version="V0.1">
    <markup>
        <div>
            <input /><button>Submit</button>
        </div>
    </markup>
</app>`;

export var settingsApp = `<?xml version="1.0" encoding="UTF-8"?>
<app version="V0.1">
    <markup>
        <div>
            <input /><button>Submit</button>
        </div>
    </markup>
</app>`;

export var calendarApp = `<?xml version="1.0" encoding="UTF-8"?>
<app version="V0.1">
    <markup>
        <div>
            <input /><button>Submit</button>
        </div>
    </markup>
</app>`;
export var drawingApp = `<?xml version="1.0" encoding="UTF-8"?>
<app version="V0.1">
    <markup>
        <div style="font-family:Roboto,inherit">
      <div style="width:100%;height:10%;padding: 1rem;display: flex;gap: 1rem;align-items: left;background-color: darkslateblue">
      <div style="margin:0;padding:0;display:flex;align-items:left">
        <button id="drawingApp-save" style="margin-right:0">Save as:</button>
          <select style="margin-left:0;float:left" id="drawingApp-format">
            <option value="png">PNG</option>
            <option value="jpeg">JPG</option>
            <option value="webp">WebP</option>
          </select>
          </div>
        <button style="float:left" id="drawingApp-clear">Clear</button>
      </div>
    
<div style="margin:0;padding:0;width:100%;height:90%;display:flex">
<div style="height:100%;width:80%;margin:0;background-color:lightblue;background-image:linear-gradient(to top, lightblue, gray);display:flex;justify-content: center;align-items: center">
        <canvas width="1600" height="900" id="drawingApp-canvas"></canvas>
  </div>
        <div style="width:20%;height:100%;background-color:darkslateblue;color:white;padding:.5%;overflow:scroll">
        <label>Brush Size: <input type="number" id="drawingApp-size" min="1" max="40" value="4" /></label>
        <p>Brush color</p>
        <shop-color-picker id="drawingApp-color" value="#000000"></shop-color-picker>
        </div>
        
        </div>
    </div>
    </markup>
</app>`;

export var browserApp = `<?xml version="1.0" encoding="UTF-8"?>
<app version="V0.1">
    <markup>
        <div>
            <div id="browserApp-tabs">
            <button>+</button>
            </div>
            <div id="browserApp-urlbar">
            
            <div style="browserApp-searchbar">
            <input type="url" />
            <button>Search</button>
            </div>
            
            </div>
            <div id='browserApp-displays'>
            
            </div>
        </div>
    </markup>
</app>`;
