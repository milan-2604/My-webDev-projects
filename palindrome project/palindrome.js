const form = document.getElementById('form-content');
const entry = document.getElementById('text-input');
const checkButton = document.getElementById('check-btn');
const result = document.getElementById('result')

function cleanStr(str){// /[^a-zA-Z0-9]/g we can ues this regex to negate everything beside alphanumeic characters

    const regex = /[^a-zA-Z0-9]/g;
    const cleanedInput= str.toLowerCase().replace(regex,"");
    return cleanedInput;
}
function reverseStr(str){
    return str.split('').reverse().join('');
}

function checkInput(e){
e.preventDefault();
if(entry.value === ""){
  alert('Please input a value.');
  return; 
}

const userInput = cleanStr(entry.value);
const reverseInput = reverseStr(userInput);
if(userInput===reverseInput){
    result.innerText= `${entry.value} is a palindrome.`;
} else{
    result.innerText=   `${entry.value} is not a palindrome.`;
}
result.style.display="block";

}
form.addEventListener('submit',checkInput);
