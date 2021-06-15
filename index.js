//algo:
//1. створюємо функцію createTask (input: - / output: undefined), яка зчитує значення input
//якщо воно пусте, то не створює таску, якщо не пусте, то пушить нову таску в масив і робить новий список
//2. вішаємо еventListener з функцією createTask на кнопку create
//3.отримуємо input з чекбоксом і вішаємо на нього еventListener з функцією statusTask
//4. функція statusTask (input: event / output: new arr):
//-перебирає масив
//-перевіряє чи співпадає id елемента з елементом на який клікнули
//-міняє статус done на протилежний

const listElem = document.querySelector('.list');

const tasks = [
  { text: 'Buy milk', done: false },
  { text: 'Pick up Tom from airport', done: false },
  { text: 'Visit party', done: false },
  { text: 'Visit doctor', done: true },
  { text: 'Buy meat', done: true },
];

const renderTasks = (tasksList) => {
  listElem.innerHTML = '';

  const tasksElems = tasksList
    .sort((a, b) => a.done - b.done)
    .map(({ text, done }, index) => {
      const listItemElem = document.createElement('li');
      listItemElem.classList.add('list__item');
      const checkbox = document.createElement('input');

      //console.log(checkbox)
      //console.dir(checkbox)

      checkbox.setAttribute('type', 'checkbox');
      checkbox.setAttribute('data-id', index);
      checkbox.checked = done;
      checkbox.classList.add('list__item-checkbox');
      if (done) {
        listItemElem.classList.add('list__item_done');
      }
      listItemElem.append(checkbox, text);

      return listItemElem;
    });

  listElem.append(...tasksElems);
};

renderTasks(tasks);

//input: - , завжди приймє event (obj)
//output: undefined

//такі функції завжди приймають event, а ми вже вирішуємо користуватись ним чи ні

//неправильно змінювати DOM
//правильний підход для веб
//algo:
//1.get info
//2.modify data
//3.re-render (заново відмалювати данні)
function onCreateTask(event) {
  const inputElem = document.querySelector('.task-input');

  const textInput = inputElem.value;
  if (textInput === '') {
    return;
  }
  tasks.push({ text: textInput, done: false, id: Math.random() });
  renderTasks(tasks);
}

const createBtnEl = document.querySelector('.create-task-btn');
createBtnEl.addEventListener('click', onCreateTask);

//делегування подій- вішаємо обработчик на батьківський елемент і при кліку на дочірний елемент спрацює обработчик.

//input: obj (event)
//output: undefined

function onUpdateTask(event) {
  //перевірка, що клікнули саме на чекбокс
  if (!event.target.classList.contains('list__item-checkbox')) {
    return;
  }

  const index = event.target.dataset.id;
  console.log(index);
  console.log(tasks[index]);
  tasks.map((el) => {
    if (el.id === index) {
      el.id = !index;
    }
  });
  renderTasks(tasks);
}

listElem.addEventListener('click', onUpdateTask);
