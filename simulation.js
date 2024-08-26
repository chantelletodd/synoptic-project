let mapImg; // Variable to hold the map image
let points = [
  [0, 80],
  [100, 27],
  [200, 32],
  [250, 110],
  [300, 200],
  [350, 312],
  [400, 390],
  [450, 420],
  [500, 445],
  [550, 520],
  [600, 600]
]; // Array to hold the coordinates

let radius = 10; // Radius of the circles
let rainfallData; // Variable to hold rainfall data
let selectedDate = 0; // Index of the selected date
let dates = [];

function preload() {
  // Load the CSV file containing rainfall data
  rainfallData = loadTable('your_file.csv', 'csv', 'header', () => {
    // Callback function executed when the file is loaded
    // Filter the data to include only the entries recorded on the 1st, 11th and 21st of each month
    for (let i = 0; i < rainfallData.getRowCount(); i++) {
      let date = new Date(rainfallData.getString(i, 'date'));
      if (date.getDate() == 1 || date.getDate() == 11 || date.getDate() == 21) {
        dates.push(rainfallData.getRow(i));
      }
    }
  });

  // Load the map image
  mapImg = loadImage('map_image2.png');
}

function setup() {
  // Changed back the resolution to origional as otherwise it doesnt scale the points to map the river
  let canvas = createCanvas(800, 600);
  canvas.parent('sketch-container'); // Attach canvas to the sketch-container

  // Create a slider to select the date
  let dateSlider = createSlider(0, dates.length - 1, 0);
  dateSlider.parent('slider-container'); // Attach slider to the slider-container
  dateSlider.style('width', '90%');
  dateSlider.input(updateDate);

  // Set the flag to update the map
  updateMap();
}

function updateDate() {
  selectedDate = this.value(); // Update the selected date
  updateMap(); // Update the map
}

function updateMap() {
  // Clear the background
  background(255);

  // Display the map
  image(mapImg, 0, 0, width, height);

  // Draw circles at each coordinate with radius based on rainfall
  noStroke(); // No stroke
  for (let i = 0; i < points.length; i++) {
    let rainfall = parseFloat(dates[selectedDate].getString('r1h'));
    let circleRadius = map(rainfall, 0, 100, 5, 50); // Map rainfall to circle radius
    fill(0, 0, 255, 100); // Blue color with transparency
    ellipse(points[i][0], points[i][1], circleRadius * 2, circleRadius * 2); // Draw circle at each coordinate
  }

  // Display the selected date
  let currentDate = new Date(dates[selectedDate].getString('date'));
  textSize(16);
  fill(0);
  textAlign(LEFT, CENTER);
  text('Selected Date: ' + currentDate.toDateString(), 10, height - 20);
}

// resize canvas when window resizes // This also breaks the point mapping So I got rid of it
// function windowResized() {
//   resizeCanvas(windowWidth * 0.7, windowHeight * 0.5);
//   updateMap();
// }
