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
