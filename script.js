const checkBoxList = document.querySelectorAll('.custom-checkbox')
const inputFields = document.querySelectorAll('.goal-input')
const errorLabel = document.querySelector('.error-label')
const progressLabel = document.querySelector('.progress-label')
const progressBar = document.querySelector('.progress-bar')
const progressValue = document.querySelector('.progress-value')
const quote = document.querySelector('.quote') 


const allQuotes = [
  'Focus on the step in front of you, not the whole staircase!',
  'Believe you can, and you are halfway there.',
  'Keep going you are getting there',
  'Impressive work! You are making great strides',
  'Incredible effort! You are crushing it',
  'Outstanding work! You are unstoppable!',
  'Well Done! Your dedication shines through in your results.',
]

const allQuotesBottom = [
    ' "Move one step ahead, today!" ',
    ' "Only you can change your destiny." ',
    ' "Be the energy you want to attract." ',
    ' "The stronger one wins, thats all" ',
    ' "Look forward with hope, not backwards with regret." ',
    ' "Make sacrifices for your dreams, or your dreams will become the sacrifice" ',
]       

const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {}

let completedGoalsCount = Object.values(allGoals).filter(
  (goal) => goal.completed
).length

progressValue.style.width = `${(completedGoalsCount / Object.values(allGoals).length) * 100}%`
progressValue.firstElementChild.innerText = `${completedGoalsCount}/${Object.values(allGoals).length} completed`
progressLabel.innerText = allQuotes[completedGoalsCount]
quote.innerText = allQuotesBottom[completedGoalsCount]

checkBoxList.forEach((checkbox) => {
  checkbox.addEventListener('click', (e) => {
    let count = 0;
    inputFields.forEach((inp) => {
      if(inp.value) {
        count++;
      }
    })
    if (count > 4) {
      checkbox.parentElement.classList.toggle('completed')
      const inputId = checkbox.nextElementSibling.id
      allGoals[inputId].completed = !allGoals[inputId].completed
      completedGoalsCount = Object.values(allGoals).filter(
        (goal) => goal.completed
      ).length

      progressValue.style.width = `${(completedGoalsCount / Object.values(allGoals).length) * 100}%`
      progressValue.firstElementChild.innerText = `${completedGoalsCount}/${Object.values(allGoals).length} completed`
      progressLabel.innerText = allQuotes[completedGoalsCount]
      quote.innerText = allQuotesBottom[completedGoalsCount]

      localStorage.setItem('allGoals', JSON.stringify(allGoals))
    } else {
      progressBar.classList.add('show-error')
    }
  })
})

inputFields.forEach((input) => {
  if (allGoals[input.id]) {
    input.value = allGoals[input.id].name

    if (allGoals[input.id].completed) {
      input.parentElement.classList.add('completed')
    }
  }

  input.addEventListener('focus', () => {
    progressBar.classList.remove('show-error')
  })

  input.addEventListener('input', (e) => {
    if (allGoals[input.id] && allGoals[input.id].completed) {
      input.value = allGoals[input.id].name
      return
    }

    if (allGoals[input.id]) {
      allGoals[input.id].name = input.value
    } else {
      allGoals[input.id] = {
        name: input.value,
        completed: false,
      }
    }

    localStorage.setItem('allGoals', JSON.stringify(allGoals))
  })
})
 function showMore() {
   const hiddenGoal = document.querySelectorAll('.goal-hidden') // 1
   if (hiddenGoal.length === 1) {
     const showMoreButton = document.querySelector('.show-more-tasks');
     showMoreButton.style.display = 'none';
   }
   hiddenGoal[0].classList.remove('goal-hidden'); // 1 -> remove hidden class
 }

 const allTemp = Object.values(allGoals);

 if (allTemp.length === 4) {
   const hiddenGoal = document.querySelectorAll('.goal-hidden');
   hiddenGoal[0].classList.remove('goal-hidden');
 }
else if (allTemp.length === 5) {
   const hiddenGoal = document.querySelectorAll('.goal-hidden');
   hiddenGoal[0].classList.remove('goal-hidden');
   hiddenGoal[1].classList.remove('goal-hidden');
   const showMoreButton = document.querySelector('.show-more-tasks');
   showMoreButton.style.display = 'none';
 }

function resetLocalStorage(){
  localStorage.clear();
  location.reload();  //Refresh the page
}

document.querySelector('.reset-button').addEventListener('click', resetLocalStorage);