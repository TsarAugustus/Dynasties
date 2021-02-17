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

const generatePerson = () => {
    this.sex = generateSex();
    const eumelanin = generateEumelanin();
    const pheomelanin = generatePheomelanin();
    this.hair = generateHair(eumelanin, pheomelanin);
    this.eye = generateEye(eumelanin, pheomelanin);
    return this;
}

let personList = {};
const personIterations = 100;

for(let i = -1; i<personIterations; i++) {
    const person = generatePerson();
    if(!personList.sex) {
        personList.sex = {}
    } else if(!personList.sex[person.sex]) {
        personList.sex[person.sex] = 1;
    } else {
        personList.sex[person.sex]++;
    }

    if(!personList.hair) {
        personList.hair = {};
    } else if(!personList.hair[person.hair.color]) {
        personList.hair[person.hair.color] = {total: 1, percentage: 0};
    } else {
        personList.hair[person.hair.color].total++;
        personList.hair[person.hair.color].percentage = (
            Math.round((personList.hair[person.hair.color].total / personIterations) * 100)
        );
    }

    if(!personList.eye) {
        personList.eye = {};
    } else if(!personList.eye[person.eye.color]) {
        personList.eye[person.eye.color] = {total: 1, percentage: 0 }
    } else {
        personList.eye[person.eye.color].total++;
        personList.eye[person.eye.color].percentage = (
            Math.round((personList.eye[person.eye.color].total / personIterations) * 100)
        );
    }

}

console.log(personList)//JSON.stringify(personList, null, 4));