const startСalculation = document.getElementById('start');
const budgetValue = document.getElementsByClassName('budget-value')[0];
const daybudgetValue = document.getElementsByClassName('daybudget-value')[0];
const levelValue = document.getElementsByClassName('level-value')[0];
const expensesValue = document.getElementsByClassName('expenses-value')[0];
const optionalExpenses = document.getElementsByClassName('optionalexpenses-value')[0];
const incomeValue = document.getElementsByClassName('income-value')[0];
const monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0];
const yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0];

const expensesItem = document.getElementsByClassName('expenses-item');
const expensesBtn = document.getElementsByTagName('button')[0];

const optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item');
const optionalExpensesBtn = document.getElementsByClassName('optionalexpenses-btn')[0];
const countBudgetbBtn = document.querySelector('.count-budget-btn');

const chooseInCome = document.querySelector('.choose-income');
const checkSavings = document.querySelector('#savings');
const sumValue = document.querySelector('.choose-sum');
const percentPercent = document.querySelector('.choose-percent');
const yearValue = document.querySelector('.year-value');
const monthValue = document.querySelector('.month-value');
const dayValue = document.querySelector('.day-value');


let money, time;

startСalculation.addEventListener('click', function(){
    
    time = prompt('Введите дату в формате YYYY-MM-DD');
    money = +prompt('Ваш доход на месяц ?');
    
    while(isNaN(money) || money == '' || money == null){
        money = prompt('Ваш доход?');
    }

    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();//Если интуп то работает с вэйлу а не с текс контент
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDay();
});

expensesBtn.addEventListener('click', function(){
    let sum = 0;

    for (let i = 0; i < expensesItem.length; i++) {
        let a = expensesItem[i].value; // наименования
        let b = expensesItem[++i].value; // цена
    
        if (typeof(a) === 'string' && (typeof(a)) !=null && (typeof(b)) !=null
        && a != '' && b != '' && a.length < 50) {
            appData.expenses[a] = b; // новый объект наименование - цена
            sum += +b; // сумма
        }else{
            i = i - 1;
        }
    }
    expensesValue.textContent = sum;
});

optionalExpensesBtn.addEventListener('click', function(){
    for (let i = 0; i < optionalExpensesItem.length; i++){
        let opt = optionalExpensesItem[i].value;
        appData.optionalExpenses[i] = opt;
        optionalExpenses.textContent += appData.optionalExpenses[i] +' ';
    }
});

countBudgetbBtn.addEventListener('click', function(){

    if(appData.budget != undefined){
        appData.moneyPerDay = (appData.budget / 30).toFixed();
        daybudgetValue.textContent = appData.moneyPerDay;
    
        if(appData.moneyPerDay < 100) {
            levelValue.textContent = 'Минимальный уровень достатка';
        }else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000){
            levelValue.textContent = 'Средний уровень достатка';
        }else if (appData.moneyPerDay > 2000) {
            levelValue.textContent = 'Высокий уровень достатка';
        }else {
            levelValue.textContent = 'error';
        }
    }else {
        daybudgetValue.textContent = 'Произошла ошибка';
    }
});

chooseInCome.addEventListener('input', function (){
    let items = chooseInCome.value;
    appData.income = items.split(', ');
    incomeValue.textContent = appData.income;
});


checkSavings.addEventListener('click', function(){
    if(appData.savings == true){
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

sumValue.addEventListener('input', function(){
    if(appData.savings == true ){
        let sum = +sumValue.value,
            percent = +percentPercent.value;
        appData.monthIncome = sum/100/12 * percent;
        appData.yearIncome = sum/100 * percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

percentPercent.addEventListener('input', function(){
    if(appData.savings == true ){
        let sum = +sumValue.value,
            percent = +percentPercent.value;
        appData.monthIncome = sum/100/12 * percent;
        appData.yearIncome = sum/100 * percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});


let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses:{},
    income: [],
    savings: false
};