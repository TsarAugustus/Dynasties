import generateNames from './generateNames.js';
import calculateChildChance from './calculateChildChance.js';
export default function(args, year) {
    let mutateChance = 0;
    if(args === 'member' && Math.random <= 0.1) {
        mutateChance = 1;
    }
    let person = {
        name: generateNames(args, mutateChance),
        birth: year,
        alive: true,
        chanceToHaveChildren: calculateChildChance(args),
        children: [],
        parents: undefined,
        
    }
    
    return person;
}