/* 

Prototype Refactor

1. Copy and paste your code or the solution from yesterday

2. Your goal is to refactor all of this code to use ES6 Classes. The console.log() statements should still return what is expected of them.

*/

class GameObject
{
    constructor(gObjAttrs)
    {
        this.createdAt = gObjAttrs.createdAt;
        this.name = gObjAttrs.name;
        this.dimensions = gObjAttrs.dimensions;
    }
    destroy() {return `${this.name} was removed from the game`;}
}

class CharacterStats extends GameObject
{
    constructor(charStatAttrs)
    {
        super(charStatAttrs);
        this.healthPoints = charStatAttrs.healthPoints;
    }
    takeDamage() {return `${this.name} took damage`;}
}

class Humanoid extends CharacterStats
{
    constructor(hmndAttrs)
    {
        super(hmndAttrs);
        this.team = hmndAttrs.team;
        this.weapons = hmndAttrs.weapons;
        this.language = hmndAttrs.language;
    }
    greet() {return `${this.name} offers a greeting in ${this.language}`;}
}

const mage = new Humanoid({
    createdAt: new Date(),
    dimensions: {
        length: 2,
        width: 1,
        height: 1,
    },
    healthPoints: 5,
    name: 'Bruce',
    team: 'Mage Guild',
    weapons: [
        'Staff of Shamalama',
    ],
    language: 'Common Tongue',
});

const swordsman = new Humanoid({
    createdAt: new Date(),
    dimensions: {
        length: 2,
        width: 2,
        height: 2,
    },
    healthPoints: 15,
    name: 'Sir Mustachio',
    team: 'The Round Table',
    weapons: [
        'Giant Sword',
        'Shield',
    ],
    language: 'Common Tongue',
});

const archer = new Humanoid({
    createdAt: new Date(),
    dimensions: {
        length: 1,
        width: 2,
        height: 4,
    },
    healthPoints: 10,
    name: 'Lilith',
    team: 'Forest Kingdom',
    weapons: [
        'Bow',
        'Dagger',
    ],
    language: 'Elvish',
});

console.log(mage.createdAt); // Today's date
console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
console.log(swordsman.healthPoints); // 15
console.log(mage.name); // Bruce
console.log(swordsman.team); // The Round Table
console.log(mage.weapons); // Staff of Shamalama
console.log(archer.language); // Elvish
console.log(archer.greet()); // Lilith offers a greeting in Elvish.
console.log(mage.takeDamage()); // Bruce took damage.
console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.

class Villain extends Humanoid
{
    constructor(vlnAttrs)
    {
        super(vlnAttrs);
        this.xp = vlnAttrs.xp;
        this.AC = vlnAttrs.AC;
        this.hitBon = vlnAttrs.hitBon;
        this.dmgDice = vlnAttrs.dmgDice;
        this.dmgBon = vlnAttrs.dmgBon;
    }
    attack(heroObj)
    {
        let dmgCalc = function()
        {
            let dmg = 0;
            for(let i=0; i < this.dmgDice; i++)
            {
                dmg +=Math.floor(1 + Math.random()*6);
            }
            dmg += this.dmgBon;
            return dmg;
        } 
        
        let attResolve = function()
        {
            let hitRoll = this.hitBon + Math.floor(1+Math.random()*19);
            // console.log(hitRoll);
            if (hitRoll >= heroObj.AC)
            {
                let dmg = dmgCalc.call(this);
                heroObj.healthPoints -= dmg;
                if (heroObj.healthPoints <= 0)
                {
                    console.log(`${this.name} slayed the hero!\n`); 
                    console.log(`hero hp: ${heroObj.healthPoints}\n`);
                    console.log(heroObj.destroy());
                }
                else
                {
                    console.log(`${this.name} hit the hero for ${dmg}!\n`); 
                    console.log(`hero hp: ${heroObj.healthPoints}\n`);
                } 
            }
            else
            {
                console.log(`${this.name} missed the hero!\n`); 
            }
        }
        attResolve.call(this);
    }
}

class Hero extends Humanoid
{
    constructor(heroAttrs)
    {
        super(heroAttrs);
        this.xpTot = 0;
        this.level = 1;
        this.strength = heroAttrs.strength;
        this.agility = heroAttrs.agility;
        this.intellect = heroAttrs.intellect;
        this.gold = heroAttrs.gold;
        this.AC = heroAttrs.AC;
        this.weapons = heroAttrs.weapons; 
        this.limit = 0;
        this.hitBon = heroAttrs.hitBon;
        this.dmgDice = heroAttrs.dmgDice;
        this.dmgBon = heroAttrs.dmgBon;
    }
    mainAttack(vlnObj)
    {
        let limit = this.limit;
        let limitString = ""
        {
            let dmgCalc = function()
            {
                let dmg = 0;

                if(limit < 4)
                {
                    for(let i=0; i <this.dmgDice; i++)
                    {
                        dmg +=Math.floor(1 + Math.random()*6);
                    }
                    limit +=1;
                }
                else 
                {
                    dmg += this.dmgDice*6; limit = 0;
                    limitString = "with a limit attack ";
                }
                
                dmg += this.dmgBon;
                
                return dmg;
            } 
            
            let attResolve = function()
            {
                
                let hitRoll = this.hitBon + Math.floor(1+Math.random()*19);
                // console.log(hitRoll);
                if (hitRoll >= vlnObj.AC)
                {
                    let dmg = dmgCalc.call(this);
                    vlnObj.healthPoints -= dmg;
                    if (vlnObj.healthPoints <= 0)
                    {
                        console.log(`${this.name} slayed the ${vlnObj.name}!\n`); 
                        console.log(`Villain hp: ${vlnObj.healthPoints}\n`);
                        console.log(vlnObj.destroy());
                    }
                    else
                    {
                        console.log(`${this.name} hit the ${vlnObj.name} ${limitString}for ${dmg}!\n`); 
                        console.log(`Villain hp: ${vlnObj.healthPoints}\n`);
                    } 
                }
                else
                {
                    console.log(`${this.name} missed the ${vlnObj.name}!\n`); 
                }
            }
            attResolve.call(this);
            this.limit = limit;
        }
    }
}



let dragon = new Villain(
    {
    createdAt: new Date(),
    dimensions: {
    length: 5,
    width: 3,
    height: 4
    },
    healthPoints: 150,
    name: "Dragon",
    team: "Dragonkin",
    weapons: ["Claw", "Bite", "Breath"],
    hitBon: 8,
    dmgDice: 2,
    dmgBon: 3,
    AC: 14,
    language: "Draconic",
    xp: 1000
    }
);

let greenTooth = new Hero(
{
    createdAt: new Date(),
    strength: 5,
    agility: 3,
    intellect: 2,
    gold: 0,
    AC: 16,
    dimensions:
    {
    length: 1,
    width: 2,
    height: 4
    },
    healthPoints: 35,
    name: "Greentooth",
    team: "Small Town Bumpkins",
    weapons: ["Dagger", "Fist"],
    language: "Common",
    hitBon: 9,
    dmgDice: 5,
    dmgBon: 5
});



let greenDragToggle = 0;
function fight()
{
    console.log("\n\n*******************************\n     Greentooth Vs Dragon!\n\n");
    let attWait = setInterval(() => 
    {
        if (greenTooth.healthPoints > 0 && dragon.healthPoints > 0)
        {
            if (greenDragToggle === 0)
            {
                greenTooth.mainAttack(dragon);
                console.log('-----------------------\n');
            }
            else
            {
                dragon.attack(greenTooth);
                console.log('-----------------------\n');
            }
            greenDragToggle === 0 ? greenDragToggle = 1 : greenDragToggle = 0;
        }
        else 
        {
            if (greenTooth.healthPoints <= 0) {console.log("Game Over");}
            else                              {console.log("Victory!");}
            clearInterval(attWait);
        }
    }, 1000);
}
fight();