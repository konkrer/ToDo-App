'use strict' 


const btnAdd = document.querySelector('#btnAdd');
const ol = document.querySelector('ol');

if (localStorage.getItem('olJSON')!==undefined) {
    ol.innerHTML = JSON.parse(localStorage.getItem('olJSON'));
}

btnAdd.addEventListener('click', function(e) {
    e.preventDefault();
    const input = e.target.previousElementSibling;
    const makeFirst = e.target.nextElementSibling.checked;

    const li = document.createElement('li');
    const textDiv = document.createElement('div');
    const btnSpan = document.createElement('span');
    const btnDone = document.createElement('button');
    const btnRemove = document.createElement('button');
    const btnUp = document.createElement('button');
    const btnDown = document.createElement('button');

    btnDone.innerText = 'Done';
    btnDone.className = 'btnDone btn';
    btnRemove.innerText = 'Remove';
    btnRemove.className = 'btnRemove btn';
    btnUp.innerText = '+';
    btnUp.className = "btnUp btn"
    btnDown.innerText = "-";
    btnDown.className = 'btnDown btn';

    textDiv.style.display = 'inline-block';

    textDiv.innerText = input.value;
    btnSpan.append(btnDone, btnUp, btnDown, btnRemove);
    li.append(textDiv, btnSpan);
    if (makeFirst) ol.prepend(li)
    else ol.append(li);

    input.value = "";
    saveToLocal();
});

ol.addEventListener('click', function(e) {
    const targ = e.target;
    const btnType = targ.classList[0];
    const li = targ.parentElement.parentElement;

    switch(btnType) {
        case 'btnDone':
            targ.parentElement.parentElement.firstElementChild.classList.toggle('strike-out');
            break;
        case 'btnRemove':
            li.remove();
            break;
        case 'btnUp':
            swapUp(li);
            break;
        case 'btnDown':
            swapDown(li);
            break;
        default:
            break;
    }

    saveToLocal();
})

function swapUp(li) {
    const above = li.previousElementSibling;
    if (above===null) return;
    const abvHtml = above.innerHTML;
    above.innerHTML = li.innerHTML;
    li.innerHTML = abvHtml;
}

function swapDown(li) {
    const below = li.nextElementSibling;
    if (below===null) return;
    const belowHtml = below.innerHTML;
    below.innerHTML = li.innerHTML;
    li.innerHTML = belowHtml;
}

function saveToLocal() {
    const olJSON = JSON.stringify(ol.innerHTML);
    localStorage.setItem('olJSON', olJSON);
}