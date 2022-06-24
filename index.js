import { API_ID } from "./config.js"
import { API_KEY } from "./config.js"

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form')
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    fetchFood(e.target.food.value, e.target.mealtype.value)
    form.reset()
  })
})

function fetchFood(foodName, mealtype) {
  fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${foodName}&app_id=${API_ID}&app_key=${API_KEY}&mealType=${mealtype}`)
    .then(res => res.json())
    .then(data => {
      const foodContainer = document.querySelector('#foodContainer')
      const pagination = document.querySelector('#pagination')

      let current_page = 1
      let item_per_page = 4
      
      pagedArr(data.hits, foodContainer, item_per_page, current_page)
      //setupPagination(data.hits, pagination, item_per_page, current_page)
      
    })
}

function pagedArr(array, tagName, item_per_page, current_page) {
  tagName.innerHTML = ''
  current_page --
  let start = current_page * item_per_page;
  let end = start + item_per_page;
  let pagedArray = array.slice(start, end)
  for (let i = 0; i <= pagedArray.length; i++) {
    renderArr(array[i].recipe, tagName)
  }
}

function renderArr(array, tagName) {

}