import generateNames from './generateNames.js';
import populateDynasty from './populateDynasty.js'
export default function(yearsToSimulate) {
    // function generateDynasty(uniqueDynasties, heirAmt) {
    //first, generate the individual dynasty (not including members)
    let dynasty = {
        name: generateNames('dynasty'),
        preferredRulerNames: [],
        members: []
    };

    dynasty.members = populateDynasty(dynasty, yearsToSimulate);
    // console.log(dynasty)
    return dynasty;
}
//     for(let i=0; i<uniqueDynasties; i++) {
//         let dynasty = {
//         name: undefined,
//         members: [{
//             name: undefined,
//             birth: undefined,
//             death: undefined,
//             reignStart: undefined,
//             reignEnd: undefined,
//             founder: undefined,
//             traits: undefined,
//             iteration: undefined,
//             children: [],
//             parents: []
//         }],
//         preferredRulerNames: [{
//             name: undefined,
//             iteration: undefined
//         }]
//         }
//         generateNames('dynastyNames');
//         generateNames();
//         dynasty.name = dynastyNames[Math.floor(Math.random() * dynastyNames.length)];
//         //then generate the members of the dynastyList
//         for(let j=0; j<heirAmt; j++) {
    
//         //generate founding member
//         let member = {
//             name: undefined,
//             birth: undefined,
//             death: undefined,
//             reignStart: undefined,
//             reignEnd: undefined,
//             founder: undefined,
//             iteration: undefined,
//             children: [],
//             parents: []
//             };
//         if(j == 0) {
//             // let member = dynasty.members[j];
//             member.name = names[Math.floor(Math.random() * names.length)];
//             member.birth = Math.floor(Math.random() * (2000 - 0) + 0);
//             let minReign = member.birth + 14;
//             member.death = member.birth + Math.floor(Math.random() * (70 - 14) + 14);
//             member.reignStart = member.birth + Math.floor(Math.random() * (member.death - minReign) + 14);
//             member.reignEnd = member.death;
//             let prn = { name: member.name, iteration: 1 }
//             dynasty.preferredRulerNames[0] = prn;
//             member.founder = true;
//             member.iteration = 1;
//             member.traits = calculateHealth(dynasty, j, 'founder');
//             member.children = generateChildren(dynasty, j);
//             member.parents = findParents(dynasty, j, true);
//             dynasty.members[j] = member;
//         } else {
            
//             let previousMember = dynasty.members[j-1];
//             let previousHeir = previousMember.children[0];
//             let previousAge = previousMember.death - previousMember.birth
            
//             member.name = previousHeir.name;
//             member.birth =  previousMember.birth + Math.floor(Math.random() * (previousAge + 14) + 14);
//             member.death = member.birth + Math.floor(Math.random() * 80);
//             member.reignStart = previousMember.death;
//             member.reignEnd = member.death;
//             member.founder = false;
//             member.iteration = previousHeir.iteration;
//             member.children = generateChildren(dynasty, j);
//             member.parents = findParents(dynasty, j, false)
//             member.traits = calculateHealth(dynasty, j, true)
//             dynasty.members[j] = member
//             // console.log(previousMember.death - previousMember.birth)
//             console.log(member)
//         }
//         }
//         dynastyList.push(dynasty)
//     }
//     return 
//     // displayDynasty();
// }