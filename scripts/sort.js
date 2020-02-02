const sortNumericUpAlt = document.querySelector('.sort-numeric-up-alt');
const sortNumericUp = document.querySelector('.sort-numeric-up');
const sortPriorityDown = document.querySelector('.sort-priority-down');
const sortPriorityUp = document.querySelector('.sort-priority-up');

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

const priorityVal = (val) => {
  if (val === 'Low priority') {
    return 0;
  } else if (val === 'High priority') {
    return 2;
  } else {
    return 1;
  }
}

function sort(priority, val = 'down') {
  if (priority) {
    if (val === 'up') {
      sortPriorityDown.classList.remove('active');
      sortPriorityUp.classList.add('active');
    } else {
      sortPriorityDown.classList.add('active');
      sortPriorityUp.classList.remove('active');
    }
    sortNumericUpAlt.classList.remove('active');
    sortNumericUp.classList.remove('active');
  } else {
    if (val === 'up') {
      sortNumericUpAlt.classList.add('active');
      sortNumericUp.classList.remove('active');
    } else {
      sortNumericUpAlt.classList.remove('active');
      sortNumericUp.classList.add('active');
    }
    sortPriorityDown.classList.remove('active');
    sortPriorityUp.classList.remove('active');
  }

  localStorage.setItem('sortNumericUpAlt', sortNumericUpAlt.classList.contains('active'));
  localStorage.setItem('sortNumericUp', sortNumericUp.classList.contains('active'));
  localStorage.setItem('sortPriorityDown', sortPriorityDown.classList.contains('active'));
  localStorage.setItem('sortPriorityUp', sortPriorityUp.classList.contains('active'));

  if (!currentTasks.children.length) {
    return;
  }
  const list = currentTasks.querySelectorAll('li');
  const arrSort = [];
  let textA = '';
  let textB = '';
  const parent = list[0].parentNode;
  for (let i = 0; i < list.length; i++) {
    arrSort.push(parent.removeChild(list[i]));
  }
  arrSort.sort((nodeA, nodeB) => {
    if (priority) {
      textA = priorityVal(nodeA.querySelector('div>small').textContent);
      textB = priorityVal(nodeB.querySelector('div>small').textContent);
    } else {
      textA = nodeA.querySelector('div small+small').textContent;
      textB = nodeB.querySelector('div small+small').textContent;
    }
    if (val === 'up') {
      if (textA < textB) return 1;
      if (textA > textB) return -1;
    } else {
      if (textA < textB) return -1;
      if (textA > textB) return 1;
    }
    return 0;
  })
    .forEach(function (node) {
      parent.appendChild(node)
    });
};

sortNumericUpAlt.addEventListener('click', () => {
  sort(false, 'up');
}, true);

sortNumericUp.addEventListener('click', () => {
  sort(false);
}, true);

sortPriorityDown.addEventListener('click', () => {
  sort(true);
}, true);

sortPriorityUp.addEventListener('click', () => {
  sort(true, 'up');
}, true);
