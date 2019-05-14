'use strict'


class Character {
    // Construction des personnages. On part sur un nom et deux stats, _healthPoint et _strength, générées aléatoirement
    constructor(playerName) {
        this._name = playerName;
        this._strength;
        this.setHealthPoint();
        this._totalDamage = 0;
    }
    // Définition des méthodes utlisables par les personnages.
    // En premier lieu, la génération des deux stats.

    setHealthPoint() {
        // Cette méthode de calcul permets d'avoir un nombre aléatoire entre 250 et 500
        // On oublie pas que Math.random() génère un nombre DECIMAL entre 0 et 1
        // D'où l'utilisation de Math.floor() pour avoir un nombre ENTIER
        this._healthPoint = Math.floor(Math.random() * (800 - 500) + 500);
    }
    setStrenght(stat) {
        this._strength = stat;
    }

    // Définition des méthodes pour attaquer un ennemi.
    // 3 façons aléatoires d'attaquer : 
    //      Attaque normal, basé sur la variable _strength
    //      Attaque critique, basé sur la variable _strength + des dégâts supplémentaires entre 50 et 100 + un multiplicateur de 2 et 25% de chance de la provoquer
    //      Ataque mega critique, basé sur la variable _strength + des dégâts supplémentaires entre 100 et 150 + un multiplicateur de 3 et 2.5% de chance de la provoquer

    attack(ennemy) {
        this._criticalChance = Math.floor(Math.random() * 4);
        this._megaCriticalChance = Math.floor(Math.random() * 10)
        if ((this._criticalChance == 2) && (this._megaCriticalChance !== 2)) {
            this.criticalAttack(ennemy);
        }
        else if ((this._criticalChance == 2) && (this._megaCriticalChance == 2)) {
            this.megaCriticalAttack(ennemy);
        }
        else {
            ennemy._healthPoint -= this._strength;
            this._totalDamage += this._strength;
        }
    }

    criticalAttack(ennemy) {
        this._critical = this._strength+Math.floor(Math.random() * (100-50) + 50)*2;
        ennemy._healthPoint -= this._critical;
        this._totalDamage += this._critical;
    }

    megaCriticalAttack(ennemy) {
        this._megaCritical = this._strength+Math.floor(Math.random() * (150 - 100) + 100)*3;
        ennemy._healthPoint -= this._megaCritical;
        this._totalDamage += this._megaCritical;
    }


    // Affichage du combat
    // On crée l'élément HTML <p></p> dans la <div> ayant pour ID #logCombat
    // On génère un affichage pour chaque type d'attaque selon le déroulement du combat et un aperçu de leurs _healthPoint au fil du temps
    display(ennemy) {
        // Déclaration de variable pour pouvoir créer des éléments HTML.
        let p = document.createElement('p');
        let spanAttack = document.createElement('span'); // IMPORTANT de différencier les <span>
        let spanHealth = document.createElement('span'); // si on veut personnaliser les chiffres
        let br = document.createElement('br');
        logCombat.append(p);
        if (this._criticalChance !== 2) {
            p.append(`${this._name} a infligé `, spanAttack, ` point de dégâts à ${ennemy._name}`, br); // On ajoute la balise <span> à l'endroit où les chiffres vont s'afficher
            spanAttack.setAttribute('id', 'attack'); // On ajoute un attribut ID dont la valeur est 'attack' à la balise span (<span id = 'attack'></span>)
            spanAttack.append(`${this._strength}`); // Et enfin on ajoute notre chiffre dans cette balise
        }
        else if ((this._criticalChance == 2) && (this._megaCriticalChance !== 2)) {
            p.append(`COUP CRITIQUE ! ${this._name} a infligé `, spanAttack, ` point de dégâts à ${ennemy._name}`, br);
            spanAttack.setAttribute('id', 'critAttack');
            spanAttack.append(`${this._critical}`);
        }
        else if ((this._criticalChance == 2) && (this._megaCriticalChance == 2)) {
            p.append(`MEGA COUP CRITIQUE ! ${this._name} a infligé `, spanAttack, ` point de dégâts à ${ennemy._name}`, br);
            spanAttack.setAttribute('id', 'megaCritAttack');
            spanAttack.append(`${this._megaCritical}`);
        }
        if (ennemy._healthPoint > 0) {
            p.append(`${ennemy._name} lui reste `, spanHealth, ` point de vie`);
            spanHealth.setAttribute('id', 'health');
            spanHealth.append(`${ennemy._healthPoint}`);
        }
        else if ((ennemy._healthPoint > -100) && (ennemy._healthPoint<0)){
            p.append(`${ennemy._name} a été totalement exterminé`);
        }
        else if (ennemy._healthPoint < -200) {
            p.append(`${ennemy._name} a été annihilé de la surface de la planète`);
        }
        else {
            p.append(`${ennemy._name} a été vaincu`);
        }
    }
    displayHealthPoint(ennemy) {
        healthPointPlayers.append(`${this._name} commence le combat avec ${this._healthPoint} point de vie`);
        healthPointPlayers.append(document.createElement('br'));
        healthPointPlayers.append(`${ennemy._name} commence le combat avec ${ennemy._healthPoint} point de vie`);
    }

    displayTotalDamage(ennemy) {
        let p = document.createElement('p');
        let br = document.createElement('br');
        resume.append(p);
        p.append(`Dégâts totaux de ${this._name} = ${this._totalDamage}`,br,`Dégâts totaux de ${ennemy._name} = ${ennemy._totalDamage}`)
    }

    // Déroulement du combat
    // Ici le combat est totalement aléatoire
    // A chaque tour, une variable (turn) détermine aléatoirement qui peut attaquer
    // Mais aussi, la force de l'attaquant est déterminé aléatoirement sur une puissance de 0 à 100
    // Ce qui fait que dans la fonction attack(), une nouvelle valeur d'attaque sera calculé à chaque tour
    // Puis on affiche le résultat du tour
    fight(ennemy) {
        this.displayHealthPoint(ennemy);
        while ((this._healthPoint > 0) && (ennemy._healthPoint > 0)) {
            let turn = Math.round(Math.random());
            if (turn == 1) {
                this.setStrenght(Math.floor(Math.random() * 100));
                this.attack(ennemy);
                this.display(ennemy);
                console.log(this);
            }
            else {
                ennemy.setStrenght(Math.floor(Math.random() * 100));
                ennemy.attack(this);
                ennemy.display(this);
                console.log(ennemy);
            }
        }
        this.displayTotalDamage(ennemy);
    }
}


// On crée nos deux joueurs à partir de Character en lui donnant bien les paramètres qui lui faut
let player1 = new Character('Max');
let player2 = new Character('Bob');

// Initialisation du combat
player1.fight(player2);