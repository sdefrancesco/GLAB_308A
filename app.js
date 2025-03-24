const adventurer = {
    name: "Robin",
    health: 10,
    inventory: ["sword", "potion", "artifact"],
    companion: {
        name: "Leo",
        type: "Cat",
        companion: {
            name: "Frank",
            type: "Flea",
            belongings: [
                "hat",
                "sunglasses"
            ]
        }
    },
    roll (mod = 0) {
        const result = Math.floor(Math.random() * 20) + 1 + mod;
        console.log(`${this.name} rolled a ${result}.`)
    }
}

let inventory = adventurer.inventory
inventory.forEach((item) => {
    console.log(item)
})    


console.log(adventurer.roll())

class Character {
    // Static property to represent max health
    static MAX_HEALTH = 100;

    constructor(name) {
        this.name = name;
        this.health = Character.MAX_HEALTH; // Use static property for health
        this.inventory = [];
        this.roll = (mod = 0) => {
            const result = Math.floor(Math.random() * 20) + 1 + mod;
            console.log(`${this.name} rolled a ${result}.`);
        };
    }

    // Static method example for calculating damage (could be used for any Character)
    static calculateDamage(diceRoll) {
        return diceRoll + 5; // An arbitrary calculation for damage
    }
}

class Adventurer extends Character {
    // Static property for the roles
    static ROLES = ["Fighter", "Healer", "Wizard"];

    constructor(name, role) {
        super(name);

        // Check if the role is valid based on the static ROLES array
        if (!Adventurer.ROLES.includes(role)) {
            throw new Error(`${role} is not a valid role.`);
        }

        // Assign the role to the adventurer
        this.role = role;

        // Every adventurer starts with a bed and 50 gold coins
        this.inventory.push("bedroll", "50 gold coins");
    }

    // Adventurers can scout ahead
    scout() {
        console.log(`${this.name} is scouting ahead...`);
        super.roll();
    }

    // Adventurer can duel another adventurer
    duel(opponent) {
        console.log(`${this.name} is challenging ${opponent.name} to a duel!`);

        // Duel until one adventurer's health is 50 or below
        while (this.health > 50 && opponent.health > 50) {
            // Roll for both adventurers
            const thisRoll = Math.floor(Math.random() * 20) + 1;
            const opponentRoll = Math.floor(Math.random() * 20) + 1;

            // determine who has the lower roll
            if (thisRoll < opponentRoll) {
                this.health -= 1; // Subtract 1 health from this adventurer
                console.log(`${this.name} rolled ${thisRoll}. ${opponent.name} rolled ${opponentRoll}.`);
                console.log(`${this.name}'s health is now ${this.health}.`);
            } else if (thisRoll > opponentRoll) {
                opponent.health -= 1; // Subtract 1 health from opponent
                console.log(`${opponent.name} rolled ${opponentRoll}. ${this.name} rolled ${thisRoll}.`);
                console.log(`${opponent.name}'s health is now ${opponent.health}.`);
            } else {
                console.log(`It's a tie! ${this.name} rolled ${thisRoll} and ${opponent.name} rolled ${opponentRoll}.`);
            }
        }

        // declare the winner
        if (this.health > 50) {
            console.log(`${this.name} wins the duel!`);
        } else {
            console.log(`${opponent.name} wins the duel!`);
        }
    }

    //  list all roles for adventurers
    static listRoles() {
        console.log("Available roles:", Adventurer.ROLES.join(", "));
    }
}


class Companion extends Character {
    constructor(name, type, belongings) {
        super(name);
        this.type = type;
        this.inventory.push(belongings);
    }

    introduce() {
        console.log(`Hi, I'm ${this.name}`);
    }
}


console.log(Character.MAX_HEALTH); // 100



Adventurer.listRoles(); 


const damage = Character.calculateDamage(10);
console.log("Damage dealt:", damage); 

// const robin = new Adventurer("Robin");
// robin.inventory = ["sword", "potion", "artifact"];
// robin.companion = new Companion("Leo");
// robin.companion.type = "Cat";
// robin.companion.companion = new Companion("Frank");
// robin.companion.companion.type = "Flea";
// robin.companion.companion.inventory = ["small hat", "sunglasses"];
// 
// console.log(robin)



class AdventurerFactory {  
    constructor (role) {
        this.role = role;
        this.adventurers = [];
    }
    generate (name) {
        const newAdventurer = new Adventurer(name, this.role);
        this.adventurers.push(newAdventurer);
    }
    findByIndex (index) {
        return this.adventurers[index];
    }
    findByName (name) {
        return this.adventurers.find((a) => a.name === name);
    }
}

const healers = new AdventurerFactory("Healer");
const robin = healers.generate("Robin");

try {
    const adventurer1 = new Adventurer("Eldrin", "Fighter");
    const adventurer2 = new Adventurer("Kara", "Wizard");
    
    // Start a duel between them
    adventurer1.duel(adventurer2);
} catch (error) {
    console.error(error.message);
}


try {
    const adventurer = new Adventurer("Kara", "Mage");
} catch (error) {
    console.error(error.message); 
}