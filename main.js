// const person = {
//     name: {
//         first: undefined,
//         middle: undefined,
//         last: undefined,
//         nickname: undefined
//     },
//     mother: undefined,
//     father: undefined
// }

//make X amount of people
//create fake mothers/fathers for these initial people

let nationList = {};
let personList = {};
let year = 0;

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function generateName(range) {
    const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];  
    const nameRange = (range ? range : 7);
    let newName = '';

    for(let i=0; i<nameRange; i++) {
        const newLetter = pickRandom(alphabet);
        newName += newLetter;
    }
    return newName;
}

function generateNation() {
    const nation = {
        name: generateName(10),
        population: 0,
        ruler: {
            name: undefined
        }
    }
    return nation;
}

function generateSex() {
    const sexes = ['male', 'female'];
    const newSex = pickRandom(sexes);
    return newSex;
}

function pickNation(personInfo) {
    const pickedNation = pickRandom(Object.values(nationList));
    
    if(nationList[pickedNation.name].population === 0 || nationList[pickedNation.name].ruler === undefined) {
        nationList[pickedNation.name].ruler = personInfo;
        if(personInfo.sex === 'male') {
            personInfo.name.status = 'King';
        } else {
            personInfo.name.status = 'Queen'
        }
    }
    //must be after a king/queen is created
    const rulerName =   nationList[pickedNation.name].ruler.name.first + 
                        nationList[pickedNation.name].ruler.name.middle + 
                        nationList[pickedNation.name].ruler.name.last;
    
    if(!nationList[pickedNation.name].ruler.spouse && nationList[pickedNation.name].population > 0 && nationList[pickedNation.name].ruler.sex !== personInfo.sex) {        
        personList[rulerName].spouse = personInfo;
        personInfo.spouse = personList[rulerName];
        console.log('SPOUSE', personInfo, nationList[pickedNation.name].ruler);
    }

    nationList[pickedNation.name].population++;
    return pickedNation;
}

function generateFertility() {
    const newFertilityPercentage = Math.floor(Math.random() * (100 - 0));
    return newFertilityPercentage;
}

function generateMortality() {
    const newMortalityPercentage = Math.floor(Math.random() * (100 - 0));
    return newMortalityPercentage;
}

function generatePerson(parentInfo) {
    let year = undefined;
    let parent1 = undefined;
    let parent2 = undefined;
    if(parentInfo) {
        year = parentInfo[0];
        parent1 = parentInfo[1];
        console.log(parent1)
        parent2 = parentInfo[2];
    }

    this.mother = undefined;
    this.father = undefined;
    this.sex = generateSex();
    this.fertility = generateFertility();
    this.mortality = generateMortality();
    this.name = {
        first: generateName(),
        middle: generateName(),
        last: generateName(),
        status: undefined,
        nickname: undefined,
        iteration: undefined
    };
    this.ruler = undefined;
    this.spouse = undefined;
    this.nation = pickNation(this);
    this.children = undefined;
    this.birth = (parentInfo ? parentInfo[0] : 0);
    this.death = undefined;

    if(this.nation.ruler === this) {
        this.ruler = this.nation;
    }
    return this;
}

function tick(tickAmount) {
    console.log('Year ' + year);
    let tempPersonList = {...personList};
    
    for(let person in tempPersonList) {
        if(tempPersonList[person].spouse && year - tempPersonList[person].birth > 16 && tempPersonList[person].fertility + tempPersonList[person].spouse.fertility > 100) {
            const parentInfo = [year, personList[person], personList[person].spouse];
            
            while(tempPersonList[person] && tempPersonList[person].spouse || tempPersonList[person]) {
                if(tempPersonList[person].spouse) {
                    delete tempPersonList[person].spouse;
                } 
                
                if(tempPersonList[person]) {
                    delete tempPersonList[person];
                }
            }
            
            generatePerson(parentInfo);
        }
    }

    if(tickAmount > 0) {
        year++; 
        tick(tickAmount - 1);
    }
}

function init() {
    const initialPeople = 10;
    // const initialNations = Math.round(initialPeople / 10);
    const initialNations = 1;

    //generate nations
    for(let i=0; i<initialNations; i++) {
        const newNation = generateNation();
        nationList[newNation.name] = newNation;
    }

    //generate initial people
    for(let i=0; i<initialPeople; i++) {
        const person = new generatePerson();
        personList[person.name.first + person.name.middle + person.name.last] = person;
        // console.log(person);
    }

    tick(18);
}

init();