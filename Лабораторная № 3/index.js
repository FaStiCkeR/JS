// Шаг 1.
/**
* @param {name} название предмета
* @param {weight} вес предмета
* @param {rarity} редкость предмета (common, uncommon, rare, legendary)
*/
class Item {
    constructor(name, weight, rarity) {
        this.name = name;
        this.weight = weight;
        this.rarity = rarity;
    }

    /**
     * Возвращает строку с информацией о предмете
     * @returns {string} строка вида "название | вес | редкость"
     */
    getInfo() {
        return this.name + " | " + this.weight + " | " + this.rarity;
    }

    /**
     * Изменяет вес предмета
     * @param {number} newWeight - новый вес
     */
    setWeight(newWeight) {
        this.weight = newWeight;
    }
}

// const sword = new Item("Steel Sword", 3.5, "rare");
// console.log(sword.getInfo());
// sword.setWeight(4.0);

// Шаг 2.
    /**
     * @param {name} название предмета
     * @param {weight} вес предмета
     * @param {rarity} редкость предмета (common, uncommon, rare, legendary)
     * @param {damage} урон оружия
     * @param {durability} прочность (от 0 до 100).
     */
class Weapon extends Item {
    constructor(name, weight, rarity, damage, durability) {
        super(name, weight, rarity);
        this.damage = damage;
        this.durability = durability;
    }

    /**
     * Прочность - 10
     * @returns {number}
     */
    use() {
        if (this.durability > 0) return this.durability -= 10;
    }

    /**
     * Прочность = 100
     * @returns {number}
     */
    repair() {
        return this.durability = 100;
    }

    /**
     * Вывод информации в виде строки, добавляя damage и durability
     * @returns {string}
     */
    getInfo() {
        return super.getInfo() + " | " + this.damage + " | " + this.durability;
    }
}

// const bow = new Weapon("Longbow", 2.0, "uncommon", 15, 100);
// console.log(bow.getInfo());
// bow.use();
// console.log(bow.durability); // должно уменьшиться
// bow.repair();

// Шаг 3.

const book = new Item('Book', 1, "uncommon");
const healthPotion = new Item('Health Potion', 0.5, "common");
const manaPotion = new Item("Mana Potion", 0.5, "common");

// console.log(book.getInfo());
// book.setWeight(1.5);
// console.log(book.getInfo());

const scythe = new Weapon("Scythe", 2, "uncommon", 10, 98);
const katana = new Weapon('Katana', 3, "legendary", 100, 100);
const branch = new Weapon("Branch", 1, "legendary", 100, 20);

// console.log(katana.getInfo());
// katana.use();
// katana.setWeight(1.5)
// console.log(katana.getInfo());
// katana.repair();
// console.log(katana.getInfo());

// Шаг 4.

// ?. оператор.
// console.log(katana.source.town)
// console.log(katana?.source?.town);
// console.log(katana.source)

function ItemCLassFunc(name, weight, rarity) {
    this.name = name;
    this.weight = weight;
    this.rarity = rarity;

    ItemCLassFunc.prototype.getInfo = function () {
        return this.name + " | " + this.weight + " | " + this.rarity;
    }

    ItemCLassFunc.prototype.SetWeight = function (newWeight) {
        return this.weight = newWeight;
    }
}

function WeaponClassFunc(name, weight, rarity, damage, durability) {
    ItemCLassFunc.call(this, name, weight, rarity);
    this.damage = damage;
    this.durability = durability;
}

WeaponClassFunc.prototype = Object.create(ItemCLassFunc.prototype);
WeaponClassFunc.prototype.constructor = WeaponClassFunc;
WeaponClassFunc.prototype.use = function () {
    return this.durability -= 10;
}

WeaponClassFunc.prototype.repair = function () {
    return this.durability = 100;
}

WeaponClassFunc.prototype.getInfo = function () {
    return ItemCLassFunc.prototype.getInfo.call(this) + " | " + this.damage + " | " + this.durability;
}

Weapon.prototype.repair = function () {
    return this.durability = 100;
}
