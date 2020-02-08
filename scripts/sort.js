const sortNumericUpAlt = document.querySelector('.sort-numeric-up-alt');
const sortNumericUp = document.querySelector('.sort-numeric-up');
const sortPriorityDown = document.querySelector('.sort-priority-down');
const sortPriorityUp = document.querySelector('.sort-priority-up');
const sortPriorityLow = document.querySelector('.sort-priority-low');
const sortPriorityMedium = document.querySelector('.sort-priority-medium');
const sortPriorityHigh = document.querySelector('.sort-priority-high');

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

if (localStorage.getItem('sortPriorityLow') === 'true') {
  filter('low');
}

if (localStorage.getItem('sortPriorityMedium') === 'true') {
  filter('medium');
}

if (localStorage.getItem('sortPriorityHigh') === 'true') {
  filter('high');
}

function filter(val, status = 'false') {
  if (val === 'low') {
    if (!sortPriorityLow.classList.contains('active')) {
      sortPriorityLow.classList.add('active');
      sortPriorityMedium.classList.remove('active');
      sortPriorityHigh.classList.remove('active');
    } else {
      sortPriorityLow.classList.remove('active');
    }
  } else if (val === 'medium') {
    if (!sortPriorityMedium.classList.contains('active')) {
      sortPriorityMedium.classList.add('active');
      sortPriorityLow.classList.remove('active');
      sortPriorityHigh.classList.remove('active');
    } else {
      sortPriorityMedium.classList.remove('active');
    }
  } else if (val === 'high') {
    if (!sortPriorityHigh.classList.contains('active')) {
      sortPriorityHigh.classList.add('active');
      sortPriorityLow.classList.remove('active');
      sortPriorityMedium.classList.remove('active');
    } else {
      sortPriorityHigh.classList.remove('active');
    }
  }
  if (currentTasks.children.length) {
    const listCur = currentTasks.querySelectorAll('li');
    const parentCur = listCur[0].parentNode;
    const arrSortCur = [];
    for (let i = 0; i < listCur.length; i++) {
      let curPruority = listCur[i].children[0].children[0].children[1].children[0].innerText.split(' ')[0].toLowerCase();
      if (curPruority !== val) {
        arrSortCur.push(parentCur.removeChild(listCur[i]));
      }
    }
    arrSortCur.forEach(function (node) {
      filterTasks.appendChild(node)
    });
  }
  if (filterTasks.children.length) {
    const listFilt = filterTasks.querySelectorAll('li');
    const parentFilt = listFilt[0].parentNode;
    const arrSortFilt = [];
    for (let i = 0; i < listFilt.length; i++) {
      let curPruority = listFilt[i].children[0].children[0].children[1].children[0].innerText.split(' ')[0].toLowerCase();
      if (status && curPruority === val) {
        arrSortFilt.push(parentFilt.removeChild(listFilt[i]));
      } else if (!status) {
        arrSortFilt.push(parentFilt.removeChild(listFilt[i]));
      }
    }
    arrSortFilt.forEach(function (node) {
      currentTasks.appendChild(node)
    });
  }
  localStorage.setItem('sortPriorityLow', sortPriorityLow.classList.contains('active'));
  localStorage.setItem('sortPriorityMedium', sortPriorityMedium.classList.contains('active'));
  localStorage.setItem('sortPriorityHigh', sortPriorityHigh.classList.contains('active'));
}

function sort(priority, val = 'down') {
  const priorityVal = (val) => {
    if (val === 'Low priority') {
      return 0;
    } else if (val === 'High priority') {
      return 2;
    } else {
      return 1;
    }
  }
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
}

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

sortPriorityLow.addEventListener('click', () => {
  filter('low', !sortPriorityLow.classList.contains('active'));
}, true);

sortPriorityMedium.addEventListener('click', () => {
  filter('medium', !sortPriorityMedium.classList.contains('active'));
}, true);

sortPriorityHigh.addEventListener('click', () => {
  filter('high', !sortPriorityHigh.classList.contains('active'));
}, true);
