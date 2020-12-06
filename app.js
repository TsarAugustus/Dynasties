let dynastyList = [];
let dynastyNames;
let names;
import * as leaderTypes from './leaderTypes.js';
import * as personalityTypes from './adjectives.js';
import * as healthTypes from './health.js';
import createDynasty from './createDynasty.js';

//shamelessly stole from stack overflow
//https://stackoverflow.com/questions/9083037/convert-a-number-into-a-roman-numeral-in-javascript
function conversion(num) {
  if (isNaN(num))
        return NaN;
    var digits = String(+num).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
               "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
               "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}



function displayDynasty() {
  for(let i=0; i<dynastyList.length; i++) {
    let dynastyDiv = document.createElement('div');
    dynastyDiv.id = i;
    dynastyDiv.classList.add('collapsable');
    dynastyDiv.innerHTML = '<p>Dynasty of ' + dynastyList[i].name + '</p>';
    let member = dynastyList[i].members;
    for(let dynasty in member) {
      let text;
      let element = document.createElement('p');
      element.id = 'member-'+ dynastyList[i].name + '-' + dynasty;
      element.classList.add('hidden');
      if(member[dynasty].founder) {
        text = member[dynasty].name + ' ' + conversion(member[dynasty].iteration) + ' founded this dynasty in ' + member[dynasty].reignStart;
        let pt = member[dynasty].traits.personalityTrait.name;
        let lt = member[dynasty].traits.leaderTrait.name;
        let ht = member[dynasty].traits.healthTrait.name;
        text = text + '</br> They were known to be ' + pt + ' towards others, and  took a liking to the ' + lt + '\'s of their realm. Commoners would remark about their ' + ht + ' figure';
      } else {
        text = member[dynasty].name + ' ' + conversion(member[dynasty].iteration) + ' was next in line to the throne of ' + member[dynasty-1].name + ' ' + conversion(member[dynasty - 1].iteration) + '. Their reign started on ' + member[dynasty].reignStart;
      }
      text = text + '. </br> They were born on ' + member[dynasty].birth + ', and died on ' + member[dynasty].death;
      element.innerHTML = text + '</br>';
      dynastyDiv.appendChild(element);
    }
    document.getElementById('dynastyList').appendChild(dynastyDiv);
  }

  let coll = document.getElementsByClassName('collapsable');
  function expand(i, bool) {
    for(let j=0; j < dynastyList[coll[i].id].members.length; j++) {
      let member = document.getElementById('member-' + dynastyList[coll[i].id].name + '-' + j);
      if(bool) {
        member.classList.remove('hidden');
      } else {
        member.classList.add('hidden'); 
      }
      

      member.addEventListener('click', function(e) { //this is necessary to stop the child elements from affecting the parents

        let children = dynastyList[coll[i].id].members[j].children;
        if(!member.classList.contains('showChildren')) {
          member.classList.add('showChildren');
          for(let k=0; k < children.length; k++) {
            let childElement = document.createElement('span');
            childElement.innerHTML = children[k].name;
            childElement.classList.add('child');
            childElement.addEventListener('click', function(e) {
              // stops the children from collapsing the parent.
              // probably a better and more efficient way to do this
              // TODO: FIX HOW MANY EVENT LISTENERS AND LOOPS THERE ARE
              e.stopPropagation();
            })
            member.appendChild(childElement);
          }
        } else {
          member.classList.remove('showChildren');
          for(let k=0; k < children.length; k++) {
            member.removeChild(member.lastChild);
          }
        }
        let childrenArray = [];
        e.stopPropagation();
      });
    }
  }

  //first, iterate through all collapsable items
  for(let i=0; i<coll.length;i++) {
    coll[i].addEventListener('click', function() { 
      //then find the members inside that dynasty
      // then apply the expand class, if it has been clicked
      if(!coll[i].classList.contains('expand')) {
        // member.classList.add('hidden');
        coll[i].classList.add('expand')
        expand(i, true)
      } else {
        // member.classList.remove('hidden');
        coll[i].classList.remove('expand');
        expand(i, false);
      }
    });
  }
}

function calculateHealth(dynastyName, iteration, args) {  
  //generate overall health ==========
  let healthNum = Math.random();
  let personalityTraitChance = Math.random();
  
  //variables for controlling the 'randomness'
  let healthy = 0.5; // healthy stuff
  let healthyPos = 0.3;
  let healthyNeut = 0.4;

  let neutral = 0.3; //neutral stuff
  let neutralPos = 0.8;
  let neutralNeut = 0.2;

  //ill is always less than neutral
  let illPos = 0.9;
  let illNeut = 0.5;

  //mutation stuff
  let mutateChance = 0.3;

  // ===============================

  let previousMemberHealth = undefined;
  let memberTraits = {
    leaderTrait: {
      name: undefined,
      type: undefined
    },
    personalityTrait: {
      name: undefined,
      type: undefined
    },
    healthTrait: {
      name: undefined,
      type: undefined
    }
  };

  //gets called for the founder, and whenever a mutation happens
  function newTraits() {
    //essentially, if healthNum is above the healthy var, then the character is healthy
    //otherwise, if they are  above the neutral range, but not healthy, then they are neutral
    // or they are ill, if they are below the neutral threshold
    if(healthNum >= healthy) { //healthy
      memberTraits.healthTrait.type = 'positive';
      if(personalityTraitChance >= healthyPos) {
        memberTraits.personalityTrait.type = 'positive';
      } else if (personalityTraitChance >= healthyNeut) {
        memberTraits.personalityTrait.type = 'neutral';
      } else {
        memberTraits.personalityTrait.type = 'negative';
      }
    } else if(healthNum >= neutral) { //neutral 
      memberTraits.healthTrait.type = 'neutral';
      if(personalityTraitChance >= neutralPos) {
        memberTraits.personalityTrait.type = 'positive';
      } else if (personalityTraitChance >= neutralNeut) {
        memberTraits.personalityTrait.type = 'neutral';
      } else {
        memberTraits.personalityTrait.type = 'negative';
      }
    } else { //ill
      memberTraits.healthTrait.type = 'negative';
      if(personalityTraitChance >= illPos) {
        memberTraits.personalityTrait.type = 'positive';
      } else if (personalityTraitChance >= illNeut) {
        memberTraits.personalityTrait.type = 'neutral';
      } else {
        memberTraits.personalityTrait.type = 'negative';
      }
    }
    let netScore = 0;
    for(let traitType in memberTraits) {
      if(traitType != 'leaderTrait') {
        if(memberTraits[traitType].type === 'positive') {
          netScore = netScore + 0.5;
        } else if (memberTraits[traitType].type === 'negative') {
          netScore = netScore - 0.5;
        }
      }
    }
  
    //probably a better way
    //but I also need to fix how traits are applied
    //TODO: FIX ALL THIS
    if(netScore > 0.5) { //good healthy leader
      memberTraits.leaderTrait.type = 'full-good';
    } else if (netScore === 0.5) { //good semi competent
      memberTraits.leaderTrait.type = 'semi-good';
    } else if (netScore === 0) { //neutral
      memberTraits.leaderTrait.type = 'true-neutral';
    } else if (netScore === -0.5) { //bad semi competent
      memberTraits.leaderTrait.type = 'semi-bad';
    } else { //evil and sickly
      memberTraits.leaderTrait.type = 'full-bad';
    }

    memberTraits.leaderTrait.name = leaderTypes.types[memberTraits.leaderTrait.type][Math.floor(Math.random() * leaderTypes.types[memberTraits.leaderTrait.type].length)];
    memberTraits.personalityTrait.name = personalityTypes.types[memberTraits.personalityTrait.type][Math.floor(Math.random() * personalityTypes.types[memberTraits.personalityTrait.type].length)];
    memberTraits.healthTrait.name = healthTypes.types[memberTraits.healthTrait.type][Math.floor(Math.random() * healthTypes.types[memberTraits.healthTrait.type].length)];
  }

  //if there is a parent, get their traits
  if(args === 'founder') { //if founder
    console.log('in here')
    newTraits();
  } else if(args != 'founder' && args === true) { //if child of founder
    //Get the parent personality type
    if(iteration >= 1) {
      console.log(dynastyName.members[iteration])
    }
    
    // console.log('ay')
    
    // console.log(dynastyName.members[prevMemberIteration])
    // memberTraits.personalityTrait.type = dynastyName.members[iteration].traits.personalityTrait.type
    // memberTraits.healthTrait.type = dynastyName.members[iteration].traits.healthTrait.type
    // memberTraits.leaderTrait.type = dynastyName.members[iteration].traits.leaderTrait.type
    // //Get some new adjectives and such
    // memberTraits.leaderTrait.name = leaderTypes.types[memberTraits.leaderTrait.type][Math.floor(Math.random() * leaderTypes.types[memberTraits.leaderTrait.type].length)];
    // memberTraits.personalityTrait.name = personalityTypes.types[memberTraits.personalityTrait.type][Math.floor(Math.random() * personalityTypes.types[memberTraits.personalityTrait.type].length)];
    // memberTraits.healthTrait.name = healthTypes.types[memberTraits.healthTrait.type][Math.floor(Math.random() * healthTypes.types[memberTraits.healthTrait.type].length)];
  } else {
    //mutation
    newTraits();
  }
  console.log(memberTraits)
  return memberTraits;
} 

function generateChildren(dynasty, memberIteration) {
  let childArray = [];
  let numChildren = Math.floor(Math.random() * 5) + 1;
  for(let i=0; i<numChildren; i++) {
    let newChild = {
      name: undefined,
      birth: undefined,
      death: undefined,
      age: undefined,
      heir: false,
      traits: undefined,
      parents: [],
      iteration: 1
    };

    //TODO: FIX MUTATIONS
    if(memberIteration >= 1) { //succeeding members
      let mutateChance = Math.random();
      newChild.birth = Math.floor(Math.random() * (dynasty.members[memberIteration - 1].death - (dynasty.members[memberIteration - 1].birth + 14)) + (dynasty.members[memberIteration - 1].birth + 14));
      newChild.death = newChild.birth + (Math.floor(Math.random() * (70 - 14) + 14))
      newChild.age = (newChild.death - newChild.birth);
      newChild.parents = findParents(dynasty, memberIteration, false)
      if(mutateChance >= 0.9) {
        newChild.name = names[Math.floor(Math.random() * names.length)]
      } else {
        //the first born should naturally be named after the parent
        //but this does generate closer to natural history succession
        if(memberIteration >=2 && childArray.length < 1 && Math.random() > 0.4) {
          newChild.name = dynasty.members[memberIteration -2].name;
        } else {
          newChild.name = dynasty.preferredRulerNames[Math.floor(Math.random() * dynasty.preferredRulerNames.length)].name;
        }
        newChild.traits = calculateHealth(dynasty, memberIteration);
      }
      childArray.push(newChild);
    } else { //founder child info
      let mutateChance = Math.random();
      newChild.birth = Math.floor(Math.random() * (dynasty.members[memberIteration].death - (dynasty.members[memberIteration].birth + 14)) + (dynasty.members[memberIteration].birth + 14));
      newChild.death = newChild.birth + (Math.floor(Math.random() * (70 - 14) + 14))
      newChild.age = (newChild.death - newChild.birth);
      newChild.parents = findParents(dynasty, memberIteration, false);
      newChild.traits = calculateHealth(dynasty, memberIteration, true)
      if(mutateChance >= 0.9) {
        newChild.name = names[Math.floor(Math.random() * names.length)]
      } else {
        newChild.name = dynasty.preferredRulerNames[Math.floor(Math.random() * dynasty.preferredRulerNames.length)].name;
      }
      childArray.push(newChild);
    }
  }
  childArray.sort((a, b) => parseFloat(b.age) - parseFloat(a.age));
  function checkNames(heirName) {
    for(let i=0; i < dynasty.preferredRulerNames.length; i++) {
      if(heirName === dynasty.preferredRulerNames[i].name) {
        return dynasty.preferredRulerNames[i];
      }
    }

    return false;
  }

  if(checkNames(childArray[0].name) === false) {
    let newPrn = {
      name: childArray[0].name,
      iteration: 1
    }
    dynasty.preferredRulerNames.push(newPrn)
  } else if(checkNames(childArray[0].name)) {

    checkNames(childArray[0].name).iteration++;
    childArray[0].iteration = checkNames(childArray[0].name).iteration;
  }

  childArray[0].heir = true;
  return childArray;
}

function findParents(dynastyName, iteration, args) {

  //if this is the founder, generate a mythos
  if(args === true) {
    return {name: 'The Gods'}
  } else if(args === false && dynastyName.members[iteration - 1] != undefined) { //or, return the previous member if not the founder
    return dynastyName.members[iteration -1];
  } else if(args === false && iteration === 0 ) { // this bit check if it is the children of the founder, and assigns the parents accordingly
    return dynastyName.members[0];
  }
}


// console.log(createDynasty())
document.getElementById('formSubmit').addEventListener('click', function(e) {
  createDynasty(document.form.years.value)
  e.preventDefault();
});
