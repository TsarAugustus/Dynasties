let dynastyList = [];
let dynastyNames;
let names;

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

let numerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 
                'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX',
                'XXI', 'XXII', 'XXIII', 'XXIV', 'XXV', 'XXVI', 'XXVII', 'XXVIII', 'XXIX', 'XXX'];

function generateNames(args) {
  let newWords = [];
  let vowel = ['a', 'e', 'i', 'o', 'u'];
  let consonant = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];
  //generate 30 random words
  for(let i=0; i < 30; i++) {
    let currentWord = [];

    //generates word length. longer words are less likely
    let wordLength = Math.floor(Math.pow(Math.random() * (3 - 2) + 2, Math.random() * (2.2 - 1.5) + 1.5)); //idk what the right length is, but this is close
    let chance;
    chance = Math.random();

    //I don't like the current word generation. Need more looking into.
    for(let j=0; j < wordLength; j++) {
      if(j >= 2) {
        for(let letter of consonant) {
          if(currentWord[j-1] === letter) {
            chance = 0;
            break;
          }
        }
      }

      if(chance < 0.5) {
        currentWord.push(vowel[Math.floor(Math.random() * vowel.length)]);
        chance = Math.random()
      } else {
        currentWord.push(consonant[Math.floor(Math.random() * consonant.length)]);
        chance = Math.random()
      }

    }
    currentWord = currentWord.join('');
    newWords[i] = currentWord.charAt(0).toUpperCase() + currentWord.slice(1);
  }
  if(args === 'dynastyNames') {
    dynastyNames = newWords;
  } else {
    names = newWords;
  }
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
      element.classList.add('hidden') 
      if(member[dynasty].founder) {
        text = member[dynasty].name + ' ' + conversion(member[dynasty].iteration) + ' founded this dynasty in ' + member[dynasty].reignStart;
      } else {
        text = member[dynasty].name + ' ' + conversion(member[dynasty].iteration) + ' was next in line to the throne of ' + member[dynasty-1].name + ' ' + (numerals[member[dynasty-1].iteration - 1]) + '. Their reign started on ' + member[dynasty].reignStart;
      }
      text = text + '. They were born on ' + member[dynasty].birth + ', and died on ' + member[dynasty].death;
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
        console.log('in here')
        e.stopPropagation();
      })
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
    generateNames('dynastyNames');
    dynasty.name = dynastyNames[Math.floor(Math.random() * dynastyNames.length)];
    //then generate the members of the dynastyList
    for(let j=0; j<heirAmt; j++) {
      if(j == 0) {
        generateNames();
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

document.getElementById('formSubmit').addEventListener('click', function(e) {
  let dynastyAmt = document.form.dynastyAmt.value;
  let memberAmt = document.form.memberAmt.value;
  generateDynasty(dynastyAmt, memberAmt)

  e.preventDefault();
});
