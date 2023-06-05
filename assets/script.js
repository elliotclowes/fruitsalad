const fruitForm = document.querySelector("#inputSection form")
const fruitNutrition = document.querySelector("#nutritionSection p")
const fruitList = document.querySelector("#fruitSection ul")

let cal = 0

const addFruit = (fruit) => {
	const li = document.createElement('li') 
	li.textContent = `${fruit.name} of Genus ${fruit.genus}`
	li.addEventListener("click", (e) => {
		e.target.remove()
		cal -= fruit.nutritions.calories
		fruitNutrition.textContent = cal > 0 ? cal : ""
	},{once:true})
	fruitList.appendChild(li)

	cal += fruit.nutritions.calories
	fruitNutrition.textContent = cal
}

const fetchFruitData = async (fruit) => {
	try{
		const resp = await fetch(`https://fruity-api.onrender.com/api/fruits/${fruit}`)
		if (resp.ok){
			const data = await resp.json()
			addFruit(data)
		} else {
			throw "Error: http status code = " + resp.status
		}
	} catch (err) {
		console.log(err)
	}
}

const extractFruit = (e) => {
	e.preventDefault()
	fetchFruitData(e.target.fruitInput.value)
	e.target.fruitInput.value = ""
}

fruitForm.addEventListener("submit", extractFruit)
