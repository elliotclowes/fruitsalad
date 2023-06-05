const fruitForm = document.querySelector("#inputSection form");
const fruitNutrition = document.querySelector("#nutritionSection p");
const fruitList = document.querySelector("#fruitSection ul");

let cal = 0;

const addFruit = async (fruit) => {
  const photoRes = await fetch(
    `https://pixabay.com/api/?key=37050205-5c5be08f93fbd5e25e5a507d3&q=${fruit}&image_type=photo&category=food`
  );
  const photos = await photoRes.json();
  console.log(photos);
  const randomNum = Math.floor(Math.random() * photos.hits.length);
  const randomPhoto = photos.hits[randomNum].largeImageURL;
  const li = document.createElement("li");
  const image = document.createElement("img");
  image.src = randomPhoto;
  image.alt = fruit.name;
  fruitList.append(image);
  li.textContent = `${fruit.name} of Genus ${fruit.genus}`;
  li.addEventListener(
    "click",
    (e) => {
      e.target.remove();
      cal -= fruit.nutritions.calories;
      fruitNutrition.textContent = cal > 0 ? cal : "";
    },
    { once: true }
  );
  fruitList.appendChild(li);

  cal += fruit.nutritions.calories;
  fruitNutrition.textContent = cal;
};

const fetchFruitData = async (fruit) => {
  try {
    const resp = await fetch(
      `https://fruity-api.onrender.com/api/fruits/${fruit}`
    );

    if (resp.ok) {
      const data = await resp.json();
      addFruit(data);
    } else {
      throw "Error: http status code = " + resp.status;
    }
  } catch (err) {
    console.log(err);
  }
};

const extractFruit = (e) => {
  e.preventDefault();
  fetchFruitData(e.target.fruitInput.value);
  e.target.fruitInput.value = "";
};

fruitForm.addEventListener("submit", extractFruit);
