const checkBoxList = document.querySelectorAll('.custom-checkbox')
const inputFields = document.querySelectorAll('.goal-input')
const errorLabel = document.querySelector('.error-label')
const progressLabel = document.querySelector('.progress-label')
const progressBar = document.querySelector('.progress-bar')
const progressValue = document.querySelector('.progress-value')
const quote = document.querySelector('.quote') 

document.addEventListener('DOMContentLoaded', function(){
  const moreTasksButton = document.querySelector('.show-more-tasks');
  const inputFourth = document.querySelector('#fourth')
  const inputFifth = document.querySelector('#fifth')
  moreTasksButton.addEventListener('click', function(){
  
    inputFourth.style.display = 'block';
    inputFifth.style.display = 'block';
    moreTasksButton.style.display = 'none';
  });
})

const allQuotes = [
  'Focus on the step in front of you, not the whole staircase!',
  'Believe yo can, and you are halfway there.',
  'Keep going you are getting there',
  'Whoa! You just completed all the goals, time for chill :D',
]

const allQuotesBottom = [
    ' "Move one step ahead, today!" ',
    ' "Only you can change your destiny." ',
    ' "Be the energy you want to attract." ',
    ' "Look forward with hope, not backwards with regret." ',
]



// const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {           /******* ("||") because of OR symbol If the data is found in this local storage then all objects is coming in this goal and if data is not found it will give empty object******/
//   first: {
//     name: '',
//     completed: false,
//   },
//   second: {
//     name: '',
//     completed: false,
//   },
//   third: {
//     name: '',
//     completed: false,
//   },
// }            

const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {}

let completedGoalsCount = Object.values(allGoals).filter(
  (goal) => goal.completed
).length

progressValue.style.width = `${(completedGoalsCount / inputFields.length) * 100}%`
progressValue.firstElementChild.innerText = `${completedGoalsCount}/${inputFields.length} completed`
progressLabel.innerText = allQuotes[completedGoalsCount]
quote.innerText = allQuotesBottom[completedGoalsCount]

checkBoxList.forEach((checkbox) => {
  checkbox.addEventListener('click', (e) => {
    const allGoalsAdded = [...inputFields].every(function (input) {
      return input.value
    })

    if (allGoalsAdded) {
      checkbox.parentElement.classList.toggle('completed')
      const inputId = checkbox.nextElementSibling.id
      allGoals[inputId].completed = !allGoals[inputId].completed
      completedGoalsCount = Object.values(allGoals).filter(
        (goal) => goal.completed
      ).length

      progressValue.style.width = `${(completedGoalsCount / inputFields.length) * 100}%`
      progressValue.firstElementChild.innerText = `${completedGoalsCount}/${inputFields.length} completed`
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

