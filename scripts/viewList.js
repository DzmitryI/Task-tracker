const viewList = document.querySelector('.view-list');

if (localStorage.getItem('viewList') === 'true') {
  clickViewList();
} else {
  clickViewBorder();
}

function clickViewList() {
  currentTasks.style.display = 'block';
  completedTasks.style.display = 'block';
  viewList.classList.add('active');
  viewBorder.classList.remove('active');
  localStorage.setItem('viewList', true);
}

function clickViewList() {
  currentTasks.style.display = 'block';
  completedTasks.style.display = 'block';
  viewList.classList.add('active');
  viewBorder.classList.remove('active');
  localStorage.setItem('viewList', true);
}

viewList.addEventListener('click', clickViewList, true);

function clickViewBorder() {
  currentTasks.style.display = 'grid';
  currentTasks.style.gridTemplateColumns = '1fr 1fr';
  currentTasks.style.columnGap = '7px';
  currentTasks.style.rowGap = '0';
  completedTasks.style.display = 'grid';
  completedTasks.style.gridTemplateColumns = '1fr 1fr';
  completedTasks.style.columnGap = '7px';
  completedTasks.style.rowGap = '0';
  viewList.classList.remove('active');
  viewBorder.classList.add('active');
  localStorage.setItem('viewList', false);
}

viewBorder.addEventListener('click', clickViewBorder, true);
