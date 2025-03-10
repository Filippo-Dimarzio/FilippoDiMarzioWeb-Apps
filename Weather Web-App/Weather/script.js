
//table

const source = [
  'images/sunset.jpeg',
  'images/fog.jpeg',
  'images/snow.jpeg',
  'images/tornado.jpg',
  'images/rainbow.jpeg'
];

const image = document.querySelector('.weather-icon img'); 
const select = document.querySelector('#weather'); 

select.addEventListener('change', (evt) => {
  let index = evt.target.selectedIndex;
  image.setAttribute('src', source[index]);
});


function changeBackground(weather) {
  document.body.style.backgroundImage = `url('images/${weather}.jpg')`; 
}
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const today = new Date().getDay();
document.querySelector('#day').innerText = `Today is ${daysOfWeek[today]}`;

const callback = () => console.log('Have a wonderful day');

console.log('Now')
setTimeout(callback, 1000)
