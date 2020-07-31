const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
// console.log(seats);
// console.log([...seats]);
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
let ticketPrice = +movieSelect.value;
console.log(movieSelect);
//console.log(typeof ticketPrice);

populateUI();

//update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  console.log(selectedSeats);

  //to find the selected seats index
  const seatsIndexArr = [...selectedSeats].map((seat) => {
    return [...seats].indexOf(seat);
  });
  //console.log(seatsIndexArr);

  //localStorage

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndexArr));

  //change the text content
  const selectedSeatsCount = selectedSeats.length;
  count.textContent = selectedSeatsCount;
  total.textContent = selectedSeatsCount * ticketPrice;
}

//save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

//show data from localstorage
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  console.log(selectedSeats);
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

//movie select event
movieSelect.addEventListener("change", (event) => {
  // console.log(event.target.value);
  ticketPrice = +event.target.value;
  setMovieData(event.target.selectedIndex, +event.target.value);
  updateSelectedCount();
});

//seat click event
container.addEventListener("click", function (event) {
  if (
    event.target.classList.contains("seat") &&
    !event.target.classList.contains("occupied")
  ) {
    //console.log(event.target);
    event.target.classList.toggle("selected");
  }

  updateSelectedCount();
});

updateSelectedCount();
