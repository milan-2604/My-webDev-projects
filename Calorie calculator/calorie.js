const calorieCounter = document.getElementById('calorie-counter');//form
const budgetNumberInput = document.getElementById('budget');//budget input
const entryDropdown = document.getElementById('entry-dropdown');//select element
const addEntryButton = document.getElementById('add-entry');//add entry button
const clearButton = document.getElementById('clear');//clear button
const output = document.getElementById('output');//empty output div
let isError = false;

function cleanInputString(str) {//clearing input str if it consist any + - or white space in it, would be replaced by empty str
  const regex = /[+-\s]/g;
  return str.replace(regex, '');
}

function isInvalidInput(str) {//checking if it consist too large values
  const regex = /\d+e\d+/i;
  return str.match(regex);// this would return something like this [ '3e10', index: 13, input: 'The value is 3e10', groups: undefined ]
  //it would be whole no. like 3e10 not just e or E coz used \d [0to9] + represents could be any amount of digits like 3 or 333
}

function addEntry() {
  const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`);//ok so here the 'entryDropdown.vlaue' will be the value of selected item in our select section, and then we are adding a '#' in front of it which makes it a id,  each selcet option has its fieldset so this id would target that specific fieldset, and everyfield set has a input container insede it(div), so its basically targeting that empty div
  const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1;//so basically targetInputContainer is that empty div that you have in your fieldset, then 'querySelectorAll' will find all input that has type="text", then '.length' would tell how many of them is there and then we add +1 to it for our current 'entryNumber', lets say we have no input element inside in our empty div we press add entry so this would do no. of inputs which is 0 + 1 that is 1 so at our first entry it would show Entry name 1
  const HTMLString = `
  <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
  <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name" />
  <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
  <input
    type="number"
    min="0"
    id="${entryDropdown.value}-${entryNumber}-calories"
    placeholder="Calories"
  />`;//this is basically adding all the required labels and input we would need when we press add entry button
  //so above entryDropdown.value is the value of selected element for ex- breakfast entryNumber is no. of text inputs + 1
  //so we are assinging unique id for our input elements using interpolate for ex- for breakfast it would be :-
  //<label for="breakfast-1-name">Entry 1 Name</label> see breakfast and 1 is interpoliated in it so it would be unique for each entry
  //<input type="text" id="breakfast-1-name" placeholder="Name" />
  // and so on
  // next is label for your calorie input 
  // and next is input element to input you calories in numbers
  targetInputContainer.insertAdjacentHTML('beforeend', HTMLString);//and then finally added that all elements in our empty div input container
}

function calculateCalories(e) {//here we are just gonna calculate the entered calories
  e.preventDefault();//Stops the form from doing its default behavior (which would refresh the page
  //🎯 If your function is being run because of an event (like a click, submit, keypress, etc.) — and you need info or control — add e to the function.
  isError = false;// it's a flag
  //“If there's any error in the inputs, don't do the math — just stop here.”

  const breakfastNumberInputs = document.querySelectorAll("#breakfast input[type='number']");//collects calories in brakfast, breakfast is the id of fieldset so it targets input number type i.e breakfast calories
  const lunchNumberInputs = document.querySelectorAll("#lunch input[type='number']");//targets all lunch calories
  const dinnerNumberInputs = document.querySelectorAll("#dinner input[type='number']");//targets all dinner calories
  const snacksNumberInputs = document.querySelectorAll("#snacks input[type='number']");//targets all snacks calories
  const exerciseNumberInputs = document.querySelectorAll("#exercise input[type='number']");//targets all exercise calories

  const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);//we used a get calories function which we would define later to calculate totall breakfast calories
  const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
  const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
  const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
  const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
  const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);

  if (isError) {
    return;
  }

  const consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
  const remainingCalories = budgetCalories - consumedCalories + exerciseCalories;
  const surplusOrDeficit = remainingCalories < 0 ? 'Surplus' : 'Deficit';//if remaining calories is less than 0 than we are eating are surplus otherwise deficiit
  output.innerHTML = `
  <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}</span>
  <hr>
  <p>${budgetCalories} Calories Budgeted</p>
  <p>${consumedCalories} Calories Consumed</p>
  <p>${exerciseCalories} Calories Burned</p>
  `;

  output.classList.remove('hide');//this is remove the 'hide' class from  your output div and hide is set to display none in css so it wasnt displaying but now it would
}

function getCaloriesFromInputs(list) {//this is where extracting calories from inputs
    //int this list would be like breakfast lunch or dinner whatever we want to pass
  let calories = 0;//lets say currently breakfast calories is at 0

  for (const item of list) {//this would loop throught each input type numbers for calories
    const currVal = cleanInputString(item.value);//cleans that value removes - + or white spaces this funciton we defined at thee start of our code
    const invalidInputMatch = isInvalidInput(currVal);//check if input is invalid through invalidInput function that we defined at the start of our code

    if (invalidInputMatch) {
      alert(`Invalid Input: ${invalidInputMatch[0]}`);//${invalidInputMatch[0]} is the exact text from the input that matched the invalid pattern (like 3e10).
      // we are doing [0] so it would only return the input element coz when we use match() it returns an array like [ '3e10', index: 13, input: 'The value is 3e10', groups: undefined ]
      isError = true;//set the flag true that invalid element is found
      return null;//It immediately exits the current function (getCaloriesFromInputs), returning null.
      //Nothing below this return inside the same function will run.
    }
    calories += Number(currVal);//Even though your input field has type="number", 
    // the .value you get from an input element is always a string in JavaScript.
  }
  return calories;
}

function clearForm() {//to clear out all inputs we added
  const inputContainers = Array.from(document.querySelectorAll('.input-container'));
//Array.from() converts array-like or iterable objects (like NodeList) into a real JavaScript Array.
  for (const container of inputContainers) {//now we are looping through each input element in our array
    container.innerHTML = '';//we directly wouldnt been able do it becoz querySelectorAll returns a nodelist and .innerHTML is invalid in it
  }

  budgetNumberInput.value = '';
  output.innerText = '';
  output.classList.add('hide');
}

addEntryButton.addEventListener("click", addEntry);
calorieCounter.addEventListener("submit", calculateCalories);
clearButton.addEventListener('click',clearForm);