const fruitForm = document.querySelector("#inputSection form")
const fruitNutrition = document.querySelector("#nutritionSection p")
const fruitList = document.querySelector("#fruitSection ul")

let cal = 0;

const addFruit = async (fruit) => {
    const photoRes = await fetch(
      `https://pixabay.com/api/?key=37050205-5c5be08f93fbd5e25e5a507d3&q=${fruit.name}&image_type=photo&category=food&orientation=horizontal&safesearch=true`
    )
    const photos = await photoRes.json()
    const randomNum = Math.floor(Math.random() * photos.hits.length)
    const randomPhoto = photos.hits[randomNum].largeImageURL
    
    const li = document.createElement("li")
    li.style.display = "flex"
    li.style.alignItems = "center"
    
    const image = document.createElement("img")
    image.src = randomPhoto
    image.alt = fruit.name
    image.style.maxWidth = "125px"
    image.style.marginRight = "15px"
    
    const text = document.createElement("p")
    text.textContent = `${fruit.name} of Genus ${fruit.genus}`
  
    li.appendChild(image)
    li.appendChild(text)
  
    li.addEventListener(
      "click",
      (e) => {
        li.remove();
        cal -= fruit.nutritions.calories
        fruitNutrition.textContent = cal > 0 ? cal : ""
      },
      { once: true }
    );
  
    fruitList.appendChild(li)
    cal += fruit.nutritions.calories
    fruitNutrition.textContent = cal
  }
 

const fetchFruitData = async (fruit) => {
  try {
    const resp = await fetch(
      `https://elliotsfruitapi.onrender.com/fruits/${fruit}`
    );

    if (resp.ok) {
      const data = await resp.json()
      addFruit(data)
    } else {
      throw "Error: http status code = " + resp.status
    }
  } catch (err) {
    console.log(err)
  }
};

const extractFruit = (e) => {
  e.preventDefault()
  fetchFruitData(e.target.fruitInput.value)
  e.target.fruitInput.value = ""
};

fruitForm.addEventListener("submit", extractFruit)
