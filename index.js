const modal = document.getElementById('exampleModal');
const currentTasks = document.getElementById('currentTasks');
const completedTasks = document.getElementById('completedTasks');
const viewBorder = document.querySelector('.view-border');

const state = {
  viewList: '',
  inputColorApp: '',
  sortNumericUpAlt: '',
  sortNumericUp: '',
  sortPriorityDown: '',
  sortPriorityUp: '',
  currentTasks: '',
  completedTasks: '',
};

if (!!localStorage.getItem('currentTasks') === true) {
  currentTasks.innerHTML = localStorage.getItem('currentTasks');
}

if (!!localStorage.getItem('completedTasks') === true) {
  completedTasks.innerHTML = localStorage.getItem('completedTasks');
}

const currentNumberOfTask = () => {
  const countTask = currentTasks.children.length;
  currentTasks.previousElementSibling.innerHTML = `ToDo (${countTask})`;
  const countCompleted = completedTasks.children.length;
  completedTasks.previousElementSibling.innerHTML = `Completed (${countCompleted})`;
}

const currentTime = () => {
  let time = new Date();
  let getHours = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
  let getMinutes = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
  let getDate = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
  let getMonth = time.getMonth() < 10 ? '0' + time.getMonth() : time.getMonth();
  return `${getHours}.${getMinutes} ${getDate}.${getMonth}.${time.getFullYear()}`;
}

const currentPriority = (val) => {
  for (const property of val) {
    if (property.children[0].checked) {
      property.children[0].checked = false;
      return `${property.children[0].id} priority`;
    }
  }
}

document.addEventListener('submit', (event) => {
  if (event.target.type = 'submit') {
    const modalBackdrop = document.querySelector('.modal-backdrop');
    const newTask = document.createElement('li');
    newTask.className = 'list-group-item d-flex w-100 mb-2';
    newTask.style.backgroundColor = event.target.children[3].children[1].children[0].value;
    newTask.innerHTML =
      `<div class="w-100 mr-2">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">${event.target.children[0].children[1].children[0].value}</h5>
        <div>
          <small class="mr-2">${currentPriority(event.target.children[2].children[0].children[1].children)}</small>
          <small>${currentTime()}</small>
        </div>
      </div>
      <p class="mb-1 w-100">${event.target.children[1].children[1].children[0].value}</p>
    </div>
    <div class="dropdown m-2 dropleft">
      <button class="btn btn-secondary h-100" type="button" id="dropdownMenuItem1" data-toggle="dropdown"
        aria-haspopup="true" aria-expanded="false">
        <i class="fas fa-ellipsis-v" aria-hidden="true"></i>
      </button>
      <div class="dropdown-menu p-2 flex-column" aria-labelledby="dropdownMenuItem1">
        <button type="button" class="btn btn-success w-100">Complete</button>
        <button type="button" class="btn btn-info w-100 my-2">Edit</button>
        <button type="button" class="btn btn-warning w-100 my-2">Go ToDo</button>
        <button type="button" class="btn btn-danger w-100">Delete</button>
      </div>
    </div>`;
    event.target.children[0].children[1].children[0].value = '';
    event.target.children[1].children[1].children[0].value = '';
    currentTasks.appendChild(newTask);
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', true);
    modal.setAttribute('aria-modal', false);
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
    document.body.removeChild(modalBackdrop);
    currentNumberOfTask();
    event.preventDefault();
  }
});

document.addEventListener('click', ({ target }) => {
  if (target.classList[1] === 'btn-success') {
    completedTasks.appendChild(target.parentNode.parentNode.parentNode);
    target.parentNode.children[0].style.display = 'none';
    target.parentNode.children[1].style.display = 'none';
    target.parentNode.children[2].style.display = 'block';
  }
  if (target.classList[1] === 'btn-warning') {
    currentTasks.appendChild(target.parentNode.parentNode.parentNode);
    target.parentNode.children[0].style.display = 'block';
    target.parentNode.children[1].style.display = 'block';
    target.parentNode.children[2].style.display = 'none';
  }
  // if (target.classList[1] === 'btn-info') {
  //   const btnEdit = document.querySelector('.btn-edit');
  //   const btnAdd = document.querySelector('.btn-add');
  //   modal.classList.add('show');
  //   modal.style.display = 'block';
  //   modal.removeAttribute('aria-hidden');
  //   modal.setAttribute('aria-modal', true);
  //   document.body.classList.add('modal-open');
  //   document.body.appendChild(modalBackdrop);
  //   btnEdit.style.display = 'block';
  //   btnAdd.style.display = 'none';
  // }
  if (target.classList[1] === 'btn-danger') {
    target.parentNode.parentNode.parentNode.parentNode.removeChild(target.parentNode.parentNode.parentNode);
  }
  currentNumberOfTask();
})

window.addEventListener('beforeunload', function (e) {
  if (!currentTasks.children.length) {
    localStorage.setItem('currentTasks', '');
  } else {
    localStorage.setItem('currentTasks', currentTasks.innerHTML);
  }
  if (!completedTasks.children.length) {
    localStorage.setItem('completedTasks', '');
  } else {
    localStorage.setItem('completedTasks', completedTasks.innerHTML);
  }
});

currentNumberOfTask();
