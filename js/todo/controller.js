import Model from "./model.js";
import View from "./view.js";

const model = new Model();
const view = new View(model.tasks);

// Добавление задачи
view.elements.form.addEventListener('submit', (e) => {
    e.preventDefault(); // отмена обновления страницы при отправке формы
    const newTask = model.addTask(view.elements.input.value); //создание новой задачи
    view.renderTask(newTask);
    view.clearInput();
});

// Нажатие на Чекбокс || кнопку удалить
view.elements.tasksList.addEventListener('click', (e)=>{
    
    // Проверка клика по чекбоксу
    if(e.target.getAttribute('type') === 'checkbox'){
       const id =  e.target.closest('.todo-item').dataset.id;
       const task = model.findTask(id)
       model.changeStatus(task);
       view.changeStatus(task);
    }
    
    // Клик по кнпопке удалить
    if(e.target.hasAttribute('data-delete')) {
        const id =  e.target.closest('.todo-item').dataset.id;
        const task = model.findTask(id);
        model.removeTask(task);
        view.removeTast(task);
    }
})


// model.addTask('Заверстать страницу');
// model.addTask('Записать урок');
// model.addTask('Написать код');
// model.doneTask(model.tasks[1]);
// console.log(model);






