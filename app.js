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
    constructor ( name ) {
        this.name = name
        this.health = 100
        this.inventory = []
        this.roll = (mod = 0) => {
            const result = Math.floor(Math.random() * 20) + 1 + mod;
            console.log(`${this.name} rolled a ${result}.`)
        }
    }
}

class Adventurer extends Character {
    constructor (name, role) {
      super(name);
      // Adventurers have specialized roles.
      this.role = role;
      // Every adventurer starts with a bed and 50 gold coins.
      this.inventory.push("bedroll", "50 gold coins");
    }
    // Adventurers have the ability to scout ahead of them.
    scout () {
      console.log(`${this.name} is scouting ahead...`);
      super.roll();
    }
}


const robin = new Adventurer("Robin");
robin.inventory = ["sword", "potion", "artifact"];
robin.companion = new Character("Leo");
robin.companion.type = "Cat";
robin.companion.companion = new Character("Frank");
robin.companion.companion.type = "Flea";
robin.companion.companion.inventory = ["small hat", "sunglasses"];




  class Companion extends Character {
    constructor(name, type, belongings, introduce ) {
        super(name)
        this.type = type
        this.inventory.push(belongings)
    }
    introduce () {
        console.log(`Hi im ${this.name}`)
    } 
  }


  console.log(robin)
//   part 4