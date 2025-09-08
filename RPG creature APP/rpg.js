const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');
const creatureName = document.getElementById('creature-name');
const creatureId = document.getElementById('creature-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const types = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const specialName = document.getElementById('special-name');
const specialDescription = document.getElementById('special-description');

const getCreature = async ()=>{
    try{
        const creatureNameOrId = searchInput.value.toLowerCase();
        const response = await fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${creatureNameOrId}`);
        const data = await response.json();

        creatureName.textContent = `${data.name.toUpperCase()}`;
        creatureId.textContent= `${data.id}`;
        weight.textContent= `${data.weight}`;
        height.textContent = `${data.height}`;
        specialName.textContent = data.special.name;
specialDescription.textContent = data.special.description;
        hp.textContent= data.stats[0].base_stat;
        attack.textContent = data.stats[1].base_stat;
        defense.textContent = data.stats[2].base_stat;
        specialAttack.textContent = data.stats[3].base_stat;
        specialDefense.textContent = data.stats[4].base_stat;
        speed.textContent = data.stats[5].base_stat;

        types.innerHTML = data.types?.map((obj) =>
  `<span class="type ${obj.name}">${obj.name}</span>`
).join('') || '';

    }
    catch(err){
        resetDisplay();
        alert('creature not found!!');
        console.log(`creature not found: ${err}`);
    }

};

const resetDisplay = ()=>{
    
     creatureName.textContent = "";
        creatureId.textContent= "";
        weight.textContent= "";
        height.textContent = "";
        types.innerHTML="";
        hp.textContent= "";
        attack.textContent = "";
        defense.textContent = "";
        specialAttack.textContent = "";
        specialDefense.textContent ="";
        speed.textContent = "";
}

searchForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    getCreature();
});