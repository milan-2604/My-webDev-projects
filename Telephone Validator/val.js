const userInput = document.getElementById('user-input');
const result = document.getElementById('results-div');
const checkBtn = document.getElementById('check-btn');
const clearBtn = document.getElementById('clear-btn');

const testInput =(str)=>{
    const regex = /^(1\s?)?(\(\d{3}\)|\d{3})([\s-]?)\d{3}([\s-]?)\d{4}$/;
 return regex.test(str);
}

const checkFunction = () => {
  const input = userInput.value;
  if (input === "") {
    alert("Please provide a phone number");
    return;
  }

  if (testInput(input)) {
    result.innerHTML += `<p>Valid US number: ${input}</p>`;
  } else {
    result.innerHTML += `<p>Invalid US number: ${input}</p>`;
  }
};
checkBtn.addEventListener('click',checkFunction);
clearBtn.addEventListener('click',()=>{
    result.innerHTML="";
    userInput.value="";
})

