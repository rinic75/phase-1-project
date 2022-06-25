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
      setupPageBttn(data.hits, pagination, item_per_page, current_page)
      
    })
}

function pagedArr(array, tagName, item_per_page, current_page) {
  tagName.innerHTML = ''
  current_page--
  let start = current_page * item_per_page;
  let end = start + item_per_page;
  let pagedArray = array.slice(start, end)
  for (let i = 0; i < pagedArray.length; i++) {
    renderArr(pagedArray[i].recipe)
  }
}

function setupPageBttn(array, tagName, item_per_page, current_page) {
  tagName.innerHTML = ''
  let page_count = Math.ceil(array.length / item_per_page)
  for (let i = 1; i <= page_count; i++) {
    const bttn = document.createElement('button')
    bttn.setAttribute('value', i)
    bttn.textContent = i
    bttn.addEventListener('click', (e) => {
      ingredContainer.innerHTML = ''
      current_page = e.target.value
      pagedArr(array, foodContainer, item_per_page, current_page)
    })
    tagName.append(bttn)
  }
}

function renderArr(array, tagName) {
  const img = document.createElement('img')
  const foodList = document.createElement('div')
  const h3 = document.createElement('h3')
  const mainP = document.createElement('p')
  img.src = array.images.THUMBNAIL.url
  img.alt = "No Image"
  foodList.id = "foodList"
  h3.textContent = array.label
  mainP.textContent = `Cuisine Type : ${array.cuisineType}`
  foodList.append(img, h3, mainP)
  foodContainer.append(foodList)
  h3.addEventListener('click', () => {
    const ingredContainer = document.querySelector('#ingredContainer')
    ingredContainer.innerHTML = ''
    ingredContainer.textContent = "INGREDIENTS"
    array.ingredientLines.forEach(ingred => {
      const asideP = document.createElement('p')
      asideP.textContent = ingred
      ingredContainer.append(asideP)
    })
  })
}

function sortBttn(array) {
  const div = document.querySelector('#sortbttn')
  div.innerHTML = `
  <label for="dietlabel">Which one is good for</label>
  <select name="dietlabel" id="dietlabel">
        <option></option>
        <option value="Balanced">Balanced</option>
        <option value="High-Fiber">High Fiber</option>
        <option value="Low-Carb">Low Carb</option>
        <option value="Low-Fat">Low Fat</option>
        <option value="Low-Sodium">Low Sodium</option>
  </select>
  `
}