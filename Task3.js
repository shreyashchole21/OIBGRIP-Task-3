document.addEventListener('DOMContentLoaded', () => {

    //List item addition

    const form = document.getElementById('add-item-form');

    form.addEventListener('submit', (event) => {
        addItem();
        event.preventDefault();
    });

    function addItem() {
        const list = document.getElementById('list'),
            inputLine = document.getElementById('input-line'),
            listItem = document.createElement('LI'),
            textContent = inputLine.value.trim();

        listItem.insertAdjacentHTML("beforeend", `<span>${textContent}</span>`);
        listItem.classList.add('toggle-item-gently');
        list.appendChild(listItem);
        setTimeout(() => listItem.classList.remove(('toggle-item-gently')));
        inputLine.value = '';
    }

    //List-item deletion

    const list = document.getElementById('list');

    list.addEventListener('click', (event) => {
        let deleteBtn = event.target.closest('.btn.delete-item');
        if (!deleteBtn) return;
        let listItem = deleteBtn.parentNode;
        listItem.classList.add('toggle-item-gently');
        setTimeout(() => list.removeChild(listItem), 200);
    });

    // List-item cross-out

    list.addEventListener('click', (event) => {
        const listItem = event.target.closest('LI');
        if (!listItem) return;

        crossOut(listItem);
        toggleDeleteBtn(listItem);
    });

    function crossOut(target) {
        const textLine = target.querySelector('span');
        textLine.classList.toggle('checked');
    }

    function toggleDeleteBtn(target) {
        let deleteBtn = target.querySelector('.btn.delete-item');

        if (!deleteBtn) {
            deleteBtn = document.createElement('DIV');
            deleteBtn.className = 'btn delete-item';
            deleteBtn.innerHTML = '&times';
            target.append(deleteBtn);
        } else {
            target.removeChild(deleteBtn);
        }
    }

    //Add date

    (function showCurrentDate() {
        const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
              monthsNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
              dateToday = new Date();

        document.querySelector('.day').textContent = '' + dateToday.getDate();
        document.querySelector('.month').textContent = monthsNames[dateToday.getMonth()];
        document.querySelector('.year').textContent = '' + dateToday.getFullYear();
        document.querySelector('.day-of-week').textContent = weekDays[dateToday.getDay()];
    })();
});