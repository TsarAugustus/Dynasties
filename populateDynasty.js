import createPerson from './createPerson.js'
export default function(dynasty, yearsToSimulate) {
    let minimumAge = 14;
    
    // let years = yearsToSimulate + 1;
    //if the years is less than the minAge, then dont simulate
    if(yearsToSimulate < minimumAge) {
        return false;
    }
    let i;
    let member = {
        alive: undefined,
        heir: undefined
    };
    let deathChance = 0;
    for(i=1; i<yearsToSimulate+1; i++) {
        //break the loop
        if(i>yearsToSimulate) {
            break;
        }

        //generate founder
        if(i===1) {
            member = createPerson('founder', i);
            dynasty.preferredRulerNames.push(member.name);
        }

        if(member.alive === false && member.heir) {
            member = member.heir;
        }
        if(member.age >= minimumAge && Math.random() <= member.chanceToHaveChildren) {
            // console.log('yeah')
            member.children.push(createPerson('member', i));
            let heir = member.children.filter(function(child) {
                return child.alive === true;
            });
            let newHeir;
            let newHeirAge = 0;
            for(let j=0; j<heir.length; j++) {
                // console.log(heir[j])
                if(heir[j].age >= newHeirAge) {
                    newHeir = heir[j];
                    newHeirAge = heir[j].age;
                }
            }
            member.heir = newHeir;
            member.chanceToHaveChildren = member.chanceToHaveChildren / 2;
            // console.log('CHILD IS BORN', member)
            
        }
        member.age = i - member.birth;
        deathChance = deathChance + Math.random();
        if((Math.random() * 100) + 14 <= (deathChance * (member.age / 100))) {
            member.alive = false;
            member.death = i;
            // console.log('dead?')
        }
        for(let child of member.children) {
            child.age = i - child.birth;
            // console.log(member)
            child.parents = member;
            if(child.age >= minimumAge && Math.random() <= child.chanceToHaveChildren) {
                // console.log(child.age)
                child.chanceToHaveChildren = child.chanceToHaveChildren / 2;
                child.children.push(createPerson('member', i));
            }
            if((Math.random() * 100) + 14 <= (deathChance * (child.age / 100))) {
                child.alive = false;
                child.death = i;
                // console.log('dead?')
            }

            if(child.children) {
                for(let childsChild of child.children) {
                    if((Math.random() * 100) + 14 <= (deathChance * (childsChild.age / 100))) {
                        childsChild.alive = false;
                        childsChild.death = i;
                        // console.log('dead?')
                    }
                    childsChild.age = i - childsChild.birth;
                }
            }
            
        }
        console.log(member)
    }
    
}