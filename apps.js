export const list = [
    {
        name:'Terminal',
        img:'https://upload.wikimedia.org/wikipedia/commons/b/b3/Terminalicon2.png',
        appFileID:'terminal',
        currentVersion:'V0.2'
    },
    {
        name:'Settings',
        img:'https://cdn-icons-png.flaticon.com/512/9265/9265823.png',
        appFileID:'settings',
        currentVersion:'V0.1'
    },
    {
        name:'Browser',
        img:'https://cdn-icons-png.flaticon.com/512/8911/8911291.png',
        appFileID:'browser',
        currentVersion:'V0.1'
    },
    {
        name:'NoteShare',
        img:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_Notes_icon.svg/2048px-Apple_Notes_icon.svg.png',
        appFileID:'notes',
        currentVersion:'V0.1'
    },
    {
        name:'To Do List',
        img:'https://jeffreymaniac.github.io/2DoListApp/favicon.jpeg',
        appFileID:'todolist',
        currentVersion:'V0.1'
    },
    {
        name:'Calculator',
        img:'https://wallpapers.com/images/hd/calculator-app-icon-r7m10ao43yqireeq-2.jpg',
        appFileID:'calculator',
        currentVersion:'V0.1'
    },
    {
        name:'Drawing',
        img:'https://images.icon-icons.com/1632/PNG/512/62911paintbrush_109234.png',
        appFileID:'drawing',
        currentVersion:'V0.1'
    },
    {
        name:'Liveweave',
        img:'https://d1hbpr09pwz0sk.cloudfront.net/logo_url/liveweavecom-a59f1a2d',
        appFileID:'liveweave',
        currentVersion:'V0.1'
    },
    {
        name:'Pictochat',
        img:'https://pict.chat/favicon.ico',
        appFileID:'pictochat',
        currentVersion:'V0.1'
    },
    {
        name:'HTML5 Test',
        img:'https://html5test.com/images/icons/favicon-32x32.png',
        appFileID:'html5test',
        currentVersion:'V0.1'
    },
    {
        name:'Photopea',
        img:'https://www.photopea.com/promo/icon512.png',
        appFileID:'photopea',
        currentVersion:'V0.1'
    },
    {
        name:'Desmos',
        img:'https://www.desmos.com/apple-touch-icon.png',
        appFileID:'desmos',
        currentVersion:'V0.1'
    },
    {
        name:'Emoji Table',
        img:'https://em-content.zobj.net/source/apple/419/grinning-face-with-smiling-eyes_1f604.png',
        appFileID:'emojitable',
        currentVersion:'V0.1'
    },
    {
        name:'Sketchpad',
        img:'https://sketch.io/media/favicons/apple-touch-icon-180x180.png',
        appFileID:'sketchpad',
        currentVersion:'V0.1'
    },
    {
        name:'Drift Hunters',
        img:'https://drifthuntersunblocked.github.io/images/logo.png',
        appFileID:'drifthunters',
        currentVersion:'V0.1'
    },
    {
        name:'Survival Craft',
        img:'https://lh6.googleusercontent.com/C9MlpEFX1v3mPnkpHQWEbzvUamK3Kzn4_Pps6Kwh0NoIRqhpNSV0p0RIyRL9SeIx3wkc2JD-JwIhvzVpAxiKabeNAW8F-lpbiyMy99XfDtNVa3GJ9zDaBLZmxhyne47Bew=w1280',
        appFileID:'survival-craft',
        currentVersion:'V0.1'
    },
    {
        name:'Brick Tetris',
        img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRisWzUWWbTeugxYj5WvZKCZ7uk0th8tySXtQ&s',
        appFileID:'brick-tetris',
        currentVersion:'V0.1'
    },
    {
        name:'Bullet Master',
        img:'https://store-images.s-microsoft.com/image/apps.61197.14084405975553480.d5f38c49-bfa1-4a06-984b-15989a3e9dfc.ddc6b494-0c95-48c3-ada5-3ae4b797cbe8?mode=scale&q=90&h=200&w=200&background=%230078D7',
        appFileID:'bullet-master',
        currentVersion:'V0.1'
    },
    {
        name:'Run 3',
        img:'https://lh3.googleusercontent.com/DV-VMjPR3iO6P65N4IT9I_xFIHfCSh8yRjS5ohIKDj0vXbR8NIH52fhY2EzETaZfUviJJ8AFaa8bqcmxe9TXGJ6BBmOWQYIfMIZQlKSM_Yx94x-BmlozyrjQZpcyLgjnVQ=w1280',
        appFileID:'run3',
        currentVersion:'V0.1'
    },
];

export function parseAppCode(xmlText) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, "application/xml");

  // Check for XML parsing errors
  const parseError = xmlDoc.querySelector("parsererror");
  if (parseError) {
    throw new Error("Invalid XML format");
  }

  const appElement = xmlDoc.documentElement;

  // Check if root element is <app>
  if (appElement.tagName !== "app") {
    throw new Error("Root element must be <app>");
  }

  const version = appElement.getAttribute("version").trim();

  // Validate version
  if (!version || !/^V\d+(\.\d+)?$/.test(version)) {
    throw new Error("Attribute 'version' must start with 'V' followed by a positive number (e.g., V1, V1.2)");
  }

  // Get inner XML of <markup>
  const markupEl = appElement.getElementsByTagName('markup')[0];
  if (!markupEl) {
    throw new Error("<markup> tag is missing in <app>");
  }

  const serializer = new XMLSerializer();
  let innerXML = "";
  for (let child of markupEl.childNodes) {
    innerXML += serializer.serializeToString(child);
  }

  return {
    html: innerXML,
    version: version,
  };
}

export function downloadAppAs(appFileID,code,updateMode,placeFrom) {
    let app = localStorage.getItem('app_'+appFileID);
    if(!app) {
    localStorage.setItem('app_'+appFileID,code);
    }  else {
        if(!!updateMode) {
        localStorage.setItem('app_'+appFileID,placeFrom);
        }
    }
}
export function fetchApplicationFile(appFileID) {
    let app = localStorage.getItem('app_'+appFileID);
    if(!!app) {
        return localStorage.getItem('app_'+appFileID);
    } else {
        throw new Error('App '+appFileID+' is not already downloaded into localStorage, so it cant be fetched :(');
    } 
}
export function checkIfAppExists(appFileID) {
    let app = localStorage.getItem('app_'+appFileID);
    return !!app;
    } 