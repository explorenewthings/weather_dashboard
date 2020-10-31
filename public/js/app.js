// fetch("http://localhost:3000/weather?address=london").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

const form = document.querySelector("form");
const search = document.querySelector("input");
const box = document.querySelector("#value");
//console.log(box);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  const url = "http://localhost:3000/weather?address=" + location;
  fetch(url).then((response) => {
    response.json().then((data) => {
      console.log(data);
      const para = document.createElement("p");
      para.textContent = data.Longitude;
      box.appendChild(para);
    });
  });
});
