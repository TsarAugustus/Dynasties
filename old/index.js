import { neutral } from './neutral.js';

const generateSex = () => {
    return Math.random() > 0.5 ? 'Male' : 'Female';
}

const generateEumelanin = () => {
    const euTotal = Math.random();
    return { total: euTotal, gene: euTotal > 0.7 ? 'Black' : 'Brown'}
}

const generatePheomelanin = () => {
    const pheoTotal = Math.random();
    return { total: pheoTotal, gene: pheoTotal > 0.7 ? 'Yellow' : 'Red'}
}

const generateHairColor = (eumelanin, pheomelanin) => {
    const thresh = 0.9;
    
    const euGene = eumelanin.gene;
    const eu = eumelanin.total;
    const euThresh = 0.2;
    
    // const pheoGene = pheomelanin.gene;
    const pheo = pheomelanin.total;
    const auburnThresh = 0.8;
    const redThresh = 0.67;

    if(eu && pheo > thresh) { return 'Blonde' }
    if(eu && pheo < thresh) {
        if(eu > pheo || pheo - eu > 0.2) {
            if(euGene === 'Brown' && pheo > auburnThresh) { return 'Auburn' }
            return euGene;
        }
    }
    if(pheo > eu) {
        if(pheo < redThresh && eu < euThresh) { return 'Red'; }
    }
    return `Grey`
}

const generateHair = (eumelanin, pheomelanin) => {
   const color = generateHairColor(eumelanin, pheomelanin);
    return { color }
}

const generateEyeColor = (melanin) => {
    //these thresholds are similar to human eye color distributions
    const amberThresh = 0.5;
    const hazelThresh = 0.6;
    const greenThresh = -0.65;
    const greyThresh = -0.5;
    const albinism = 0.99;
    if(melanin >= albinism || Math.abs(melanin) >= Math.abs(albinism)) { return melanin > albinism ? 'Red' : 'Violet' }
    if(melanin >= -0.3) {
        if(melanin >= hazelThresh) { return 'Hazel'}
        if(melanin >= amberThresh) { return 'Amber'}
        return 'Brown';
    } 
    if(melanin < 0) {
        if(melanin <= greenThresh) { return 'Green' }
        if(melanin <= greyThresh) { return 'Grey' }
        return 'Blue';
    }
}

const generateEye = (eumelanin, pheomelanin) => {
    //this is not how melanin is 'calculated' irl, i hope
    const melaninLevel = eumelanin.total - pheomelanin.total;
    const color = generateEyeColor(melaninLevel);
    return { color }
}

const generateSkinColor = (melaninLevel) => {
    if(melaninLevel >= 0) {
        return 'Dark';
    } else {
        return 'Light';
    }
}

const generateSkin = (eumelanin, pheomelanin) => {
    const melaninLevel = eumelanin.total - pheomelanin.total;
    const color = generateSkinColor(melaninLevel);
    return { color }
}

const generateTraits = () => {
    return { neutral: neutral[Math.floor(Math.random() * neutral.length)] }
}

const createName = (iterations, nameList) => {
    const nameLength = Math.floor(Math.random() * 10) + 1
    let name = '';
    for(let i=0; i < nameLength; i++) {
        const letters = ['a', 'b', 'c', 'd', 'e'];
        const newLetter = letters[Math.floor(Math.random() * letters.length)];
        name += newLetter;
    }
    const newNameList = nameList.concat(name);
    console.log(nameList)
    return (iterations === nameList.length) ? nameList : createName(iterations, newNameList)
}

const generateOrigin = (iterations) => {
    const origins = createName(iterations / 2, []);
    return origins;
}

const generatePerson = (iterations, personList) => {
    const eumelanin = generateEumelanin();
    const pheomelanin = generatePheomelanin();

    const sex = generateSex();
    const hair = generateHair(eumelanin, pheomelanin);
    const eye = generateEye(eumelanin, pheomelanin);
    const skin = generateSkin(eumelanin, pheomelanin);
    const traits = generateTraits();
    const origin = generateOrigin(iterations);
    
    const newPersonList = personList.concat({
        sex,
        hair,
        eye,
        skin,
        traits,
        origin
    })
    // const newPersonList = personList.concat(person)
    return (iterations < personList.length) ? personList : generatePerson(iterations, newPersonList)
}

console.log(generatePerson(0, []))

// let personList = {};
// const personIterations = 100;

// for(let i = -1; i<personIterations; i++) {
//     const person = generatePerson();
//     if(!personList.sex) {
//         personList.sex = {}
//     } else if(!personList.sex[person.sex]) {
//         personList.sex[person.sex] = 1;
//     } else {
//         personList.sex[person.sex]++;
//     }

//     if(!personList.hair) {
//         personList.hair = {};
//     } else if(!personList.hair[person.hair.color]) {
//         personList.hair[person.hair.color] = {total: 1, percentage: 0};
//     } else {
//         personList.hair[person.hair.color].total++;
//         personList.hair[person.hair.color].percentage = (
//             Math.round((personList.hair[person.hair.color].total / personIterations) * 100)
//         );
//     }

//     if(!personList.eye) {
//         personList.eye = {};
//     } else if(!personList.eye[person.eye.color]) {
//         personList.eye[person.eye.color] = {total: 1, percentage: 0 }
//     } else {
//         personList.eye[person.eye.color].total++;
//         personList.eye[person.eye.color].percentage = (
//             Math.round((personList.eye[person.eye.color].total / personIterations) * 100)
//         );
//     }

//     if(!personList.skin) {
//         personList.skin = {};
//     } else if(!personList.skin[person.skin.color]) {
//         personList.skin[person.skin.color] = {total: 1, percentage: 0 }
//     } else {
//         personList.skin[person.skin.color].total++;
//         personList.skin[person.skin.color].percentage = (
//             Math.round((personList.skin[person.skin.color].total / personIterations) * 100)
//         );
//     }
//     if(!personList.traits) {
//         personList.traits = {};
//     } else if(!personList.traits[person.traits.neutral]) {
//         personList.traits[person.traits.neutral] = { total: 1, percentage: 0 }
//     } else {
//         personList.traits[person.traits.neutral].total++;
//         personList.traits[person.traits.neutral].percentage = (
//             Math.round((personList.traits[person.traits.neutral].total) / personIterations)
//         )
//     }

// }
// console.log(personList)//JSON.stringify(personList, null, 4));
