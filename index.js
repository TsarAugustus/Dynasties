const generateSex = () => {
    return Math.random() > 0.5 ? 'Male' : 'Female';
}

const generateHair = (eumelanin, pheomelanin) => {
    const thresh = 0.9;
    const auburnThresh = 0.8;
    const redThresh = 0.67;
    const euThresh = 0.2;

    const euGene = eumelanin.gene;
    const eu = eumelanin.total;
    if(eu && pheomelanin > thresh) { return 'Blonde' }
    if(eu && pheomelanin < thresh) {
        if(eu > pheomelanin || pheomelanin - eu > 0.2) {
            if(euGene === 'Brown' && pheomelanin > auburnThresh) { return 'Auburn' }
            return euGene;
        }
    }
    if(pheomelanin > eu) {
        if(pheomelanin < redThresh && eu < euThresh) { return 'Red'; }
    }
    return `Grey`
}

const generateEumelanin = () => {
    const euTotal = Math.random();
    return { total: euTotal, gene: euTotal > 0.7 ? 'Black' : 'Brown'}
}

const generatePheomelanin = () => {
    return Math.random();
}

const generatePerson = () => {
    const sex = generateSex();
    const eumelanin = generateEumelanin();
    const pheomelanin = generatePheomelanin();
    const hair = generateHair(eumelanin, pheomelanin)
    return hair;
}


//simple testing purposes for data distribution
//TODO: make functional

// let list = [];
// let hairList = {};

// for(let i=0; i<1000; i++) {
//     list.push(generatePerson())
// }
// for(let i=0;i<list.length;i++) {
//     if(!hairList[list[i]]) {
//         hairList[list[i]] = {total: 0, percent: 0 };
//     }
//     hairList[list[i]].total++;
//     hairList[list[i]].percent = hairList[list[i]].total / list.length * 100;
// }
// console.log(hairList)
