// ⭐️ Example Challenge START ⭐️

/**Example Task : processFirstItem()
 * This example shows how you might go about solving the rest of the tasks
 * 
 * Use the higher order function processFirstItem below to do the following:
 *  1. Receive an array of strings in a parameter
 *  2. Receive a callback function that takes a string as its argument in a parameter
 *  3. Return the result of invoking the callback function and passing in the FIRST 
 *     element in the array as the argument
 *  
 * The following code is demonstrating a way of completing this task
 * It returns the string `foofoo`
*/

function processFirstItem(stringList, callback) {
  return callback(stringList[0])
}
console.log(processFirstItem(['foo','bar'],function(str){return str+str}));

// ⭐️ Example Challenge END ⭐️


///// M V P ///////

/*Task 1: counterMaker()
  
  Study the code for counter1 and counter2, then answer the questions below.
  
  1. What is the difference between counter1 and counter2?
  
  2. Which of the two uses a closure? How can you tell?
  
  3. In what scenario would the counter1 code be preferable? In what scenario would 
     counter2 be better?  
*/

// counter1 code
function counterMaker() {
  let count = 0;
  return function counter() {
   return count++;
  }
}

const counter1 = counterMaker();

// counter2 code
let count = 0;

function counter2() {
  return count++;
}

/*
  1. counter1 uses a closure and counter2 uses a block-scoped variable
  2. counter1 has a return function nested in another function, with a variable as a parent and the child setting the value, making it so the child inherits the paren't value of 0, but because the function's result is bound to counter1, it increments; but each variable (counter1, counter2, etc) keeps track of it's own count variable, because the parent count can't see the child count (due to closure) while the child inherits the parent value of 0, and returns 1
  3. counter1 is required for when you want multiple variables to keep track of their values, counter2 for when you don't have multiple things to keep track of; counter1 follows DRY methodology; use when possible
*/


/* ⚾️⚾️⚾️ Task 2: inning() ⚾️⚾️⚾️
Use the inning function below to do the following:
  1. Return a random whole number of points between 0 and 2 scored by one team in an inning
  
  For example: invoking inning() should return a numerical score value of 0, 1, or 2
  
NOTE: This will be a callback function for the tasks below
*/

function inning(){
  return Math.floor(Math.random()*3);
}


/* ⚾️⚾️⚾️ Task 3: finalScore() ⚾️⚾️⚾️
Use the finalScore function below to do the following:
  1. Receive the callback function `inning` that was created in Task 2 
  2. Receive a number of innings to be played
  3. After each inning, update the score of the home and away teams
  4. After the last inning, return an object containing the final (total) score of the innings played
  
  For example: invoking finalScore(inning, 9) might return this object:
{
  "Home": 11,
  "Away": 5
}
*/

function finalScore(callback, numInnings){
  let home = 0;
  let away = 0;
  for (let i = 0; i < numInnings; i++){
    away += callback();
    home += callback();
  }
  return {'Away': away, 'Home': home}
}

/* ⚾️⚾️⚾️ Task 4: getInningScore() ⚾️⚾️⚾️
Use the getInningScore() function below to do the following:
  1. Receive a callback function - you will pass in the inning function from task 2 as your argument 
  2. Return an object with a score for home and a score for away that populates from invoking the inning callback function */

function getInningScore(callback) {
  return {'Away': callback(), 'Home': callback()}
}


/* ⚾️⚾️⚾️ Task 5: scoreboard() ⚾️⚾️⚾️
Use the scoreboard function below to do the following:
  1. Receive the callback function `getInningScore` from Task 4
  2. Receive the callback function `inning` from Task 2
  3. Receive a number of innings to be played
  4. Return an array where each of it's index values equals a string stating the
  Home and Away team's scores for each inning.  Not the cummulative score.
  5. If there's a tie at the end of the innings, add this message containing the score to the end of the array:  "This game will require extra innings: Away 12 - Home 12"  (see tie example below)
     If there isn't a tie, add this message to the end of the array: "Final Score: Away 13 - Home 11"  (see no tie example below)
  
  NO TIE example: invoking scoreboard(getInningScore,inning, 9) might return 
  an array of strings like this:
[
  "Inning 1: Away 1 - Home 2", 
  "Inning 2: Away 2 - Home 1",
  "Inning 3: Away 0 - Home 2",
  "Inning 4: Away 2 - Home 2",
  "Inning 5: Away 2 - Home 0", 
  "Inning 6: Away 1 - Home 1", 
  "Inning 7: Away 0 - Home 2", 
  "Inning 8: Away 2 - Home 2",
  "Inning 9: Away 1 - Home 0", 
  "Final Score: Away 11 - Home 12"  
]

  TIE example: invoking scoreboard(getInningScore,inning, 9) might return 
  an array of strings like this:
[
  "Inning 1: Away 1 - Home 1", 
  "Inning 2: Away 2 - Home 2",
  "Inning 3: Away 1 - Home 0", 
  "Inning 4: Away 1 - Home 2", 
  "Inning 5: Away 0 - Home 0", 
  "Inning 6: Away 2 - Home 1", 
  "Inning 7: Away 0 - Home 2", 
  "Inning 8: Away 2 - Home 1",
  "Inning 9: Away 1 - Home 1", 
  "This game will require extra innings: Away 10 - Home 10"
]  
  */

/*
  Notes:
    - afaik correct as per the instructions, but if it were me, i'd get rid of finalScore() completely and do the function calls within scoreboard() so that i can keep track of both individual calls for line-prints, and the total for the end line-print
    - getInningScore and finalScore aren't connected in any way (and the instructions were followed), this is why each inning print and the total values don't match up; this is my reason for wanting to do the above comment
    - inning() itself needs to hold these values so that they can be kept/stored/changed throughout the program; is this a bug or intentional?
*/
const tempArr = [];
function scoreboard(getInningScore, inning, numInnings) {
  for (let i = 0; i < numInnings; i++) {
    tempArr.push(`Inning ${i}: Away ${getInningScore(inning)['Away']} - Home ${getInningScore(inning)['Home']}`);
  }
  tempArr.push(`Final Score: Away ${finalScore(inning, numInnings)['Away']} - Home ${finalScore(inning, numInnings)['Home']}`);
}
scoreboard(getInningScore, inning, 5);
console.log(tempArr);




/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo(){
  //console.log('its working');
  return 'bar';
}
export default{
  foo,
  processFirstItem,
  counter1,
  counter2,
  inning,
  finalScore,
  getInningScore,
  scoreboard,
}
