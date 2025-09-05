let text=document.querySelector("#status");
let feeling=document.querySelector("#feeling");
let virtual=document.querySelector("#virtual");
let div_status=document.querySelector("#div-status");
let hungerText=document.querySelector("#hunger");
let happinessText=document.querySelector("#happiness");
let energyText=document.querySelector("#energy-levels");
let button1=document.querySelector("#feed");
let button2=document.querySelector("#play");
let button3=document.querySelector("#sleep");
let energy=50;
let happiness=50;
let hunger=50;
const things=[
    {
        name: "feed",
        "button text": ["Donut","Juice","Home"],
        "button function": [dounut,juice,home],
        text: "You are in \"Kitchen\"!!"
    },
    {
         name: "play",
        "button text": ["Treat Hunt","Fetch","Home"],
        "button function": [treatHunt,playFetch,home],
        text: "You are in  \"Park\"!!"
    },
    {
         name: "do_sleep",
        "button text": ["Short sleep","Long sleep","Home"],
        "button function": [shortSleep,longSleep,home],
        text: "You are in  \"Bedroom\"!!"
    },
    {
         name: "lose",
        "button text": ["Restart!!","Restart!!","Restart!!"],
        "button function": [restart,restart,restart],
        text: "pet died!! 💀 "
    }
];
button1.onclick=feed;
button2.onclick=play;
button3.onclick=sleep;

function update(thing){
    button1.innerText=thing["button text"][0];
    button2.innerText=thing["button text"][1];
    button3.innerText=thing["button text"][2];
    button1.onclick=thing["button function"][0];
    button2.onclick=thing["button function"][1];
    button3.onclick=thing["button function"][2];
    text.innerText=thing.text;
}
function feed(){
    update(things[0]);

}
function play(){
   update(things[1]);
}
function sleep(){
    update(things[2]);
}
function dounut(){
    if(hunger<100){
    feeling.innerText="Your pet is enjoying Dount!! 😋 ";
text.innerText="eating donut";
hunger+=20;
if (hunger > 100) hunger = 100; 
hungerText.innerText=hunger;
energy-=10;
if (energy <= 0) energy = 0;
energyText.innerText=energy;
} else{
    feeling.innerText="Hunger is full 🍽️❌";
    text.innerText="";
}
checkStatus();

}
function juice(){
    if(hunger<100){
    feeling.innerText="Your pet is enjoying Juice!! 😋 ";
text.innerText="drinking juice";
hunger+=10;
if (hunger > 100) hunger = 100;
hungerText.innerText=hunger;
energy-=5;
if (energy <= 0) energy = 0;
energyText.innerText=energy;
} else{
     feeling.innerText="Hunger is full 🍽️❌";
    text.innerText="";
}
checkStatus();

}
function home(){
text.innerText="Back to \"Living Room\"";
button1.innerText="Feed";
button2.innerText="Play";
button3.innerText="Sleep";
button1.onclick=feed;
button2.onclick=play;
button3.onclick=sleep;
checkStatus();
}
function treatHunt(){
    if(happiness<100){
    feeling.innerText="Your pet is hunting treats!! 🐾";
text.innerText="Playing treat hunt";
happiness+=15;
if (happiness > 100) happiness = 100;
happinessText.innerText=happiness;
energy-=10;
if (energy <= 0) energy = 0;
energyText.innerText=energy;
hunger-=5;
if (hunger <= 0) hunger = 0;
hungerText.innerText=hunger;
} else{
     feeling.innerText="Happiness is full";
    text.innerText="";
}
checkStatus();

}
function playFetch(){
    if(happiness<100){
    feeling.innerText="Your pet is enjoying fetch!! 🦴 ";
text.innerText="Playing fetch";
happiness+=20;
if (happiness > 100) happiness = 100;
happinessText.innerText=happiness;
energy-=15;
if (energy <= 0) energy = 0;
energyText.innerText=energy;
hunger-=10;
if (hunger <= 0) hunger = 0;
hungerText.innerText=hunger;
} else{
      feeling.innerText="Happiness is full";
    text.innerText="";
}
checkStatus();

}
function shortSleep(){
    if(energy<100){
    feeling.innerText="🐶💤"
text.innerText="Sleeping 3hr";
energy+=15;
if (energy > 100) energy = 100;
energyText.innerText=energy;
hunger-=5;
if (hunger <= 0) hunger = 0;
hungerText.innerText=hunger;
} else{
      feeling.innerText="Sleep is full";
    text.innerText="";
}
checkStatus();
}
function longSleep(){
    if(energy<100){
    feeling.innerText="🐶💤"
text.innerText="Sleeping 8hr";
energy+=30;
if (energy > 100) energy = 100;
energyText.innerText=energy;
hunger-=10;
if (hunger <= 0) hunger = 0;
hungerText.innerText=hunger;
} else{
       feeling.innerText="Sleep is full";
    text.innerText="";
}
checkStatus();
}


function lose(){
    update(things[3]);
    feeling.innerText="";
    div_status.style.backgroundColor="red";
    div_status.style.color="black";
}
function checkStatus(){
if(hunger<=0 || energy<=0 || happiness<=0){
lose();
}}


function restart(){
    hunger=50;
    happiness=50;
    energy=50;
    hungerText.innerText=hunger;
    happinessText.innerText=happiness;
    energyText.innerText=energy;
    button1.innerText="Feed";
    button2.innerText="Play";
    button3.innerText="Sleep";
    button1.onclick=feed;
    button2.onclick=play;
    button3.onclick=sleep;
    text.innerText="You are in \"Living Room\"";
    feeling.innerText="Your pet is feeling okay 😊";
    div_status.style.backgroundColor="rgb(115, 13, 211)";
    div_status.style.color="rgb(187, 155, 96)";
}