export default function(args, mutate) {
    let newWords = [];
    let vowel = ['a', 'e', 'i', 'o', 'u'];
    let consonant = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];
    let wordCount = 1;
    if(args === 'dynasty') {
        wordCount = 1;
    }

    //generate 30 random words
    for(let i=0; i < wordCount; i++) {
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
    // }
    if(args === 'dynasty') {
        return newWords[0];
    } else if(args === 'founder') {
        return newWords[0]
    } else if (args === 'member') {
        return newWords[0]
    }
    
    // return newWords
    // console.log(newWords)
    // return currentWord;
    // if(args === 'dynastyNames') {
    //   dynastyNames = newWords;
    // } else {
    //   names = newWords;
    }
}