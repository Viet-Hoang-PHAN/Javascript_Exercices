'use strict'

function Character () {

    this.pseudo;
    this.healthPoint;
    this.strength;
    this.defense;


}

let hero = new Character();


document.querySelector('button').addEventListener('click', function (evt) {
    event.preventDefault();
    
    hero.pseudo = document.getElementById('pseudo').value;
    hero.healthPoint = +document.getElementById('health').value;
    hero.strength = +document.getElementById('strength').value;
    hero.defense = +document.getElementById('defense').value;
    
    document.querySelector('form').style.display = 'none'

    console.log(hero)
})

console.log(hero)