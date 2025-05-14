const listContainer = document.querySelector('.listContainer')
let list = [];
const btn = document.querySelector('.add')

function loadWebSite() {
  for (let i = 0; i < localStorage.length; i++) {
    let key = JSON.parse(localStorage.key(i));
    let value = JSON.parse(localStorage.getItem(key));
    let add = {
      id: key,
      name: value
    };
    list.push(add);
  }
  displayList(list);
}

window.onload = () => {
  loadWebSite();
}

function savaeTodos(arr) {
  arr.map(item => {
    localStorage.setItem(JSON.stringify(item.id), JSON.stringify(item.name));
  })
}

function handelDeleteObj(id) {
  // console.log(id);
  let deleteFilter = list.filter(obj => {
    return obj.id !== id;
  })
  list = deleteFilter;
  displayList(list);
  localStorage.clear();
  savaeTodos(list);
}

function displayList(arr) {
  listContainer.innerHTML = '';
  arr.map(item => {
    let divElm = document.createElement('div')
    divElm.classList.add('list')
    divElm.innerHTML = `<p>${item.name}</p>`
    let btnDelete = document.createElement('button');
    btnDelete.innerText = '❌';
    divElm.appendChild(btnDelete);
    btnDelete.onclick = () => {
      handelDeleteObj(item.id);
      btnDelete.on
    }
    listContainer.append(divElm);
  })
}

function addValueToList() {
  let value = document.querySelector('#input');
  if (value.value == '') return;
  let add = {
    id: Date.now(),
    name: value.value
  };
  list.unshift(add)
  displayList(list);
  localStorage.clear();
  savaeTodos(list);
  value.value = '';
}

btn.addEventListener('click', () => { addValueToList(); })