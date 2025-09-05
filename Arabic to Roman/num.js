const userInput = document.getElementById('number');
const convertBtn = document.getElementById('convert-btn');
const result = document.getElementById('output');

function arabicToRoman(num) {
    const romanMap = [
        { value: 1000, symbol: 'M' },
        { value: 900, symbol: 'CM' },
        { value: 500, symbol: 'D' },
        { value: 400, symbol: 'CD' },
        { value: 100, symbol: 'C' },
        { value: 90, symbol: 'XC' },
        { value: 50, symbol: 'L' },
        { value: 40, symbol: 'XL' },
        { value: 10, symbol: 'X' },
        { value: 9, symbol: 'IX' },
        { value: 5, symbol: 'V' },
        { value: 4, symbol: 'IV' },
        { value: 1, symbol: 'I' }
    ];

    let result = '';
    for (let i = 0; i < romanMap.length; i++) {
        while (num >= romanMap[i].value) {
            result += romanMap[i].symbol;
            num -= romanMap[i].value;
        }
    }
    return result;
}


const checkInput = ()=>{
   const intInput = parseInt(userInput.value);
   if(intInput<1){
    result.innerText='Please enter a number greater than or equal to 1';
    result.classList.remove('hide');
    return;
   } else if(isNaN(intInput)){
    result.innerText="Please enter a valid number";
    result.classList.remove('hide');
    return;
   } else if(intInput>=4000){
    result.innerText="Please enter a number less than or equal to 3999";
    result.classList.remove('hide');
    return;
   } else{
    
   result.innerText= arabicToRoman(intInput);
   result.classList.remove('hide');
   }

}
convertBtn.addEventListener('click',checkInput);
userInput.addEventListener('keydown',(e)=>{
if(e.key==="Enter"){
    checkInput();
}
});