// Get the date in eastern time
const easternTime = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
})


// Convert the date to hash signature
async function hashStringSHA256(message) {
  // Encode the string as a Uint8Array (UTF-8 encoding is standard)
  const msgBuffer = new TextEncoder().encode(message);

  // Hash the message using SHA-256
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

  // Convert the ArrayBuffer to a hexadecimal string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');

  return hashHex;
}

// Determine if duck day or bunny day based on last char in hash
console.log("Today's date:", easternTime)

hashStringSHA256(easternTime).then(hash => {

  console.log("Hash signature of date:", hash);

  const lastChar = hash[hash.length - 1];

  console.log("Last character:", lastChar)

  // Get character code of the char

  const codeFromChar = lastChar.charCodeAt(0);

  console.log("Integer code from char:", codeFromChar)

  // Check if even or odd - bunny day if even duck day if odd
  
  isBunnyDay = codeFromChar % 2 === 0;

  // Redefine has signature to use later
  hashSignature = hash;

  console.log("Is even:", isBunnyDay)

  startBunnyDuck();

});

const dynamicBgColor = "#ffffff";
document.body.style.backgroundColor = dynamicBgColor;

function updatePageTheme(imageType) {
    let newColor = "#f4f4f4"; // Default color from your CSS

    if (imageType === "bunny") {
        newColor = "#ffb6c1"; // Light pink for bunny
    } else if (imageType === "duck") {
        newColor = "#ffffe0"; // Light yellow for duck
    } else if (imageType === "christmas") {
        newColor = "#e97451"
    } else if (imageType === "bday") {
        newColor = "#abcdef"
    } else if (imageType === "anniversary") {
        newColor = "#ffc0cb"
    }

    // Apply the new color
    document.body.style.backgroundColor = newColor;
}

function startBunnyDuck() {

  // Get the date without the year to check if special day
  const dateNoYear = easternTime.split('/').slice(0, 2).join('/');

  console.log("Date without year:", dateNoYear)

  let imageType = "NaN";

  // Logic for duck or bunny day
  if (dateNoYear === '12/25') {

    imageType = "christmas";

    myTitleText = "Merry Christmas!";
    // Select the christmas bunny pic
    localImageSource = 'special_images/christmas_bunnies.webp';

  }
  else if (dateNoYear === '10/05') {

    imageType = "bday";

    myTitleText = "Happy Birthday!";
    // Select birthday bunny pic
    localImageSource = 'special_images/birthday_bunny.jpg';

  }
  else if (dateNoYear === '10/19') {

    imageType = "anniversary";

    myTitleText = "Happy Anniversary!";
    // Select kissing bunnies pic
    localImageSource = 'special_images/bunnies_kissing.jpg'

  }
  else if (isBunnyDay) {

    imageType = "bunny";

    myTitleText = "Today is a Bunny Day!";
    // Select bunny pic based on hash signature
    const hashInt = parseInt(hashSignature.substring(0,8), 16);

    const index = hashInt % RABBIT_FILES.length;

    const fileName = RABBIT_FILES[index];

    localImageSource = "./sorted_ducks_and_bunnies_dataset/rabbit/" + fileName;

  } else {

    imageType = "duck";

    myTitleText = "Today is a Duck Day!";
    // Select bunny pic based on hash signature
    const hashInt = parseInt(hashSignature.substring(0,8), 16);

    const index = hashInt % DUCK_FILES.length;

    const fileName = DUCK_FILES[index];

    localImageSource = "./sorted_ducks_and_bunnies_dataset/duck/" + fileName;
    
  }

  // Set background color
  updatePageTheme(imageType);

  // Get the random bunny/duck image
  //const localImageSource = './sorted_ducks_and_bunnies_dataset/duck/0.661_039ac59de8424fbc.jpg'; 

  // Title element
  const titleElement = document.getElementById('title-text');
  titleElement.innerText = myTitleText;

  // Image element
  const imgContainer = document.getElementById('image-container');
  const imgElement = document.createElement('img');

  // Set the attributes (source and alt text)
  imgElement.src = localImageSource;
  imgElement.alt = "A photo of a duck or bunny";

  // Append the image to the container
  imgContainer.appendChild(imgElement);

}

