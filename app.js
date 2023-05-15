//Element locations
const $searchText = $("#userInput");
const $memeBucket = $(".memeContainer");

//Event Handlers
const $searchGif = $("#searchGif").on("click", findGif);
const $removeGif = $("#removeGif").on("click", removeAllGifs);

//API REQUESTS
async function findGif(e) {
  e.preventDefault();
  //Base case for search input
  if ($searchText.val() == "") return alert("Please enter a search");

  let searchVal = $searchText.val();
  //clear textarea
  $searchText.val("");
  try {
    const res = await axios.get("https://api.giphy.com/v1/gifs/search", {
      params: { q: searchVal, api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym" },
    });
    //Add Images to memeContainer
    addGif(res.data);
    //Clear settings
    $searchText.val("");
  } catch (error) {
    alert(error);
  }
}

//Function handlers
function addGif(res) {
  let dataLength = res.data.length;
  let pickRandom = Math.floor(Math.random() * dataLength);
  let $newImg = $("<img>", {
    src: res.data[pickRandom].images.original.url,
    alt: $searchText.val(),
    className: "memeContainer",
  });

  $memeBucket.append($newImg);
}
function removeAllGifs(e) {
  $(".memeContainer").empty();
}
console.log("Let's get this party started!");
