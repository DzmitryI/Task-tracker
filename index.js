const modal = document.getElementById('exampleModal');
const currentTasks = document.getElementById('currentTasks');
const completedTasks = document.getElementById('completedTasks');
const filterTasks = document.getElementById('filterTasks');
const viewBorder = document.querySelector('.view-border');
const btnEdit = document.querySelector('.btn-edit');
const btnAdd = document.querySelector('.btn-add');

const state = {
  viewList: '',
  inputColorApp: '',
  sortNumericUpAlt: '',
  sortNumericUp: '',
  sortPriorityDown: '',
  sortPriorityUp: '',
  sortPriorityLow: '',
  sortPriorityMedium: '',
  sortPriorityHigh: '',
  currentTasks: '',
  completedTasks: '',
  filterTasks: '',
};

if (!!localStorage.getItem('currentTasks') === true) {
  currentTasks.innerHTML = localStorage.getItem('currentTasks');
}

if (!!localStorage.getItem('completedTasks') === true) {
  completedTasks.innerHTML = localStorage.getItem('completedTasks');
}

if (!!localStorage.getItem('filterTasks') === true) {
  filterTasks.innerHTML = localStorage.getItem('filterTasks');
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
  let getSeconds = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
  let getDate = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
  let getMonth = time.getMonth() < 10 ? '0' + time.getMonth() : time.getMonth();
  return `${getHours}.${getMinutes}.${getSeconds} ${getDate}.${getMonth}.${time.getFullYear()}`;
}

const currentPriority = (val) => {
  for (const property of val) {
    if (property.children[0].checked) {
      property.children[0].checked = false;
      return `${property.children[0].id} priority`;
    }
  }
}

const rgb2hex = (rgb) => {
  rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  function hex(x) {
    return ("0" + parseInt(x).toString(16)).slice(-2);
  }
  return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

document.addEventListener('submit', (event) => {
  if (event.target.type = 'submit') {
    const modalBackdrop = document.querySelector('.modal-backdrop');
    const newTask = document.createElement('li');
    newTask.className = 'list-group-item d-flex w-100 mb-2';
    newTask.id = (+new Date).toString(16);
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
    modal.children[0].children[0].children[0].children[0].innerText = 'Add task';
    btnEdit.style.display = 'none';
    btnAdd.style.display = 'inline-block';
    modal.setAttribute('aria-hidden', true);
    modal.setAttribute('aria-modal', false);
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
    document.body.removeChild(modalBackdrop);
    currentNumberOfTask();

    if (localStorage.getItem('sortNumericUpAlt') === 'true') {
      sort(false, 'up');
    }

    if (localStorage.getItem('sortNumericUp') === 'true') {
      sort(false);
    }

    if (localStorage.getItem('sortPriorityDown') === 'true') {
      sort(true);
    }

    if (localStorage.getItem('sortPriorityUp') === 'true') {
      sort(true, 'up');
    }

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
  if (target.classList[1] === 'btn-info') {
    modal.classList.add('show');
    modal.style.display = 'block';
    modal.removeAttribute('aria-hidden');
    modal.setAttribute('aria-modal', true);
    document.body.classList.add('modal-open');
    btnEdit.style.display = 'inline-block';
    btnAdd.style.display = 'none';
    modal.setAttribute('data-id', target.parentElement.parentElement.parentElement.id);
    modal.children[0].children[0].children[0].children[0].innerText = 'Edd task';
    modal.children[0].children[0].children[1].children[0].children[0].children[1].children[0].value =
      target.parentElement.parentElement.parentElement.children[0].children[0].children[0].innerText;
    modal.children[0].children[0].children[1].children[0].children[1].children[1].children[0].value =
      target.parentElement.parentElement.parentElement.children[0].children[1].innerText;
    const curPriority = target.parentElement.parentElement.parentElement.children[0].children[0].children[1].innerText.split(' ')[0];
    switch (curPriority) {
      case "Low":
        modal.children[0].children[0].children[1].children[0].children[2].children[0].children[1].children[0].children[0].checked = true;
        break;
      case "Medium":
        modal.children[0].children[0].children[1].children[0].children[2].children[0].children[1].children[1].children[0].checked = true;
        break;
      case "High":
        modal.children[0].children[0].children[1].children[0].children[2].children[0].children[1].children[2].children[0].checked = true;
        break;
      default:
        break;
    }
    modal.children[0].children[0].children[1].children[0].children[3].children[1].children[0].value =
      rgb2hex(target.parentElement.parentElement.parentElement.style.backgroundColor);

  }
  if (target.classList[1] === 'btn-danger') {
    target.parentNode.parentNode.parentNode.parentNode.removeChild(target.parentNode.parentNode.parentNode);
  }
  if (target.parentElement.classList[0] === 'close' || target.classList[0] === 'btn-close') {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', true);
    modal.setAttribute('aria-modal', false);
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');

  }
  if (target.classList[0] === 'btn-edit') {
    const curTask = document.getElementById(`${modal.getAttribute('data-id')}`);
    curTask.children[0].children[0].children[0].innerText = target.parentElement.parentElement.parentElement.children[0].children[1].children[0].value;
    target.parentElement.parentElement.parentElement.children[0].children[1].children[0].value = '';
    curTask.children[0].children[1].innerText = target.parentElement.parentElement.parentElement.children[1].children[1].children[0].value;
    target.parentElement.parentElement.parentElement.children[1].children[1].children[0].value = '';
    curTask.children[0].children[0].children[1].children[0].innerText = currentPriority(target.parentElement.parentElement.parentElement.children[2].children[0].children[1].children);
    curTask.children[0].children[0].children[1].children[1].innerText = currentTime();
    curTask.style.backgroundColor = target.parentElement.parentElement.parentElement.children[3].children[1].children[0].value;
    target.parentElement.parentElement.parentElement.children[3].children[1].children[0].value = "#9bed64";
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', true);
    modal.setAttribute('aria-modal', false);
    modal.style.display = 'none';
    modal.children[0].children[0].children[0].children[0].innerText = 'Add task';
    btnEdit.style.display = 'none';
    btnAdd.style.display = 'inline-block';
    document.body.classList.remove('modal-open');
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
  if (!filterTasks.children.length) {
    localStorage.setItem('filterTasks', '');
  } else {
    localStorage.setItem('filterTasks', filterTasks.innerHTML);
  }
});

currentNumberOfTask();
