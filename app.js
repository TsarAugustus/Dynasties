let dynastyList = [];
let dynastyNames = ['a', 'b', 'c', 'd', 'e', 'f'];
let names = ['John', 'Nick', 'Steve', 'Phil', 'Bob'];
let numerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

function displayDynasty() {
  let member = dynastyList[0].members;
  for(let dynasty in member) {
    let text;
    let element = document.createElement('span')
    if(member[dynasty].founder) {
      text = member[dynasty].name + ' ' + numerals[0] + ' founded this dynasty in ' + member[dynasty].reignStart;
    } else {
      text = member[dynasty].name + ' ' + numerals[member[dynasty].iteration - 1] + ' was next in line to the throne of ' + member[dynasty-1].name + ' ' + (numerals[member[dynasty-1].iteration - 1]);
    }
    text = text + '. They were born on ' + member[dynasty].birth + ', and died on ' + member[dynasty].death;
    element.innerHTML = text + '</br>' + '</br>';
    document.getElementById('dynasty').appendChild(element);
    console.log(dynasty)
  }
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
      iteration: 1
    };

    if(memberIteration >= 1) {
      let mutateChance = Math.random();
      newChild.birth = Math.floor(Math.random() * (dynasty.members[memberIteration - 1].death - (dynasty.members[memberIteration - 1].birth + 14)) + (dynasty.members[memberIteration - 1].birth + 14));
      newChild.death = newChild.birth + (Math.floor(Math.random() * (70 - 14) + 14))
      newChild.age = (newChild.death - newChild.birth);
      if(mutateChance >= 0.9) {
        console.log('mutation');
        newChild.name = names[Math.floor(Math.random() * names.length)]
      } else {
        newChild.name = dynasty.preferredRulerNames[Math.floor(Math.random() * dynasty.preferredRulerNames.length)].name;
      }
      childArray.push(newChild);
    } else {
      let mutateChance = Math.random();
      newChild.birth = Math.floor(Math.random() * (dynasty.members[memberIteration].death - (dynasty.members[memberIteration].birth + 14)) + (dynasty.members[memberIteration].birth + 14));
      newChild.death = newChild.birth + (Math.floor(Math.random() * (70 - 14) + 14))
      newChild.age = (newChild.death - newChild.birth);
      if(mutateChance >= 0.9) {
        console.log('mutation');
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
    console.log('no name')
    return false;
  }
  // console.log(checkNames())
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

function generateDynasty(uniqueDynasties, heirAmt) {
  //first, generate the individual dynasty (not including members)
  for(let i=0; i<uniqueDynasties; i++) {
    let dynasty = {
      name: undefined,
      members: [{
        name: undefined,
        birth: undefined,
        death: undefined,
        reignStart: undefined,
        reignEnd: undefined,
        founder: undefined,
        iteration: undefined,
        children: []
      }],
      preferredRulerNames: [{
        name: undefined,
        iteration: undefined
      }]
    }

    dynasty.name = dynastyNames[Math.floor(Math.random() * dynastyNames.length)];
    //then generate the members of the dynastyList
    for(let j=0; j<heirAmt; j++) {
      if(j == 0) {
        let member = dynasty.members[j];
        member.name = names[Math.floor(Math.random() * names.length)];
        member.birth = Math.floor(Math.random() * (2000 - 0) + 0);
        let minReign = member.birth + 14;
        member.death = member.birth + Math.floor(Math.random() * (70 - 14) + 14);
        member.reignStart = member.birth + Math.floor(Math.random() * (member.death - minReign) + 14);
        member.reignEnd = member.death;
        let prn = { name: member.name, iteration: 1 }
        dynasty.preferredRulerNames[0] = prn;
        member.founder = true;
        member.iteration = 1;
        member.children = generateChildren(dynasty, j);
      } else {
        let member = {
          name: undefined,
          birth: undefined,
          death: undefined,
          reignStart: undefined,
          reignEnd: undefined,
          founder: undefined,
          iteration: undefined,
          children: []
        };


        let previousMember = dynasty.members[j-1];
        let previousHeir = previousMember.children[0];
        member.name = previousHeir.name;
        member.birth = previousHeir.birth;
        member.death = previousHeir.death;
        member.reignStart = previousMember.death;
        member.reignEnd = member.death;
        member.founder = false;
        member.iteration = previousHeir.iteration;
        member.children = generateChildren(dynasty, j);
        dynasty.members.push(member)
      }
    }
    dynastyList.push(dynasty)
  }

  displayDynasty();
}
// let form = document.getElementById('form')
document.getElementById('formSubmit').addEventListener('click', function(e) {
  let dynastyAmt = document.form.dynastyAmt.value;
  let memberAmt = document.form.memberAmt.value;
  generateDynasty(dynastyAmt, memberAmt)

  e.preventDefault();
  // document.getElementById('dynastyForm').value
})

// generateDynasty(1, 5);
