function fetchAndDisplay(file) {
  try {
    //fetch the file
    fetch(file)
      .then(response => {
        if (!response.ok) {
          throw new Error('Response was not ok');
        }
        return response.text();
      })
      .then(text => {
        //call display text function
        displayTextAlert(text);
      })
      .catch(onError => {
        console.error(onError);
      });
  } catch (error) {
    console.error(error);
  }
}


function displayTextAlert(text) {

  const lines = text.split('\n');
  const firstLine1 = lines[0];
  const secondLine = lines[1];
  const thirdLine = lines[2];

  //set the content for the elements
  document.getElementById('news-heading').innerHTML = firstLine1;
  document.getElementById('news-desc').innerHTML = secondLine;
  document.getElementById('news-button').innerHTML = thirdLine;
}

fetchAndDisplay('indexbanner.txt')