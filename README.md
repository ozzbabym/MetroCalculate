# Приложение для подсчета зарплаты машинистов метро

Я создам веб-приложение на JavaScript для расчета зарплаты машинистов электропоездов Московского метрополитена, учитывая все поля из предоставленных расчетных листков.

## HTML структура

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Расчет зарплаты машиниста метро</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            color: #333;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        h1, h2 {
            color: #2c3e50;
        }
        .form-section {
            background-color: #f9f9f9;
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 5px;
            border-left: 4px solid #3498db;
        }
        .form-row {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 10px;
        }
        .form-group {
            margin-right: 20px;
            margin-bottom: 10px;
        }
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        input, select {
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            width: 200px;
        }
        button {
            background-color: #3498db;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }
        button:hover {
            background-color: #2980b9;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
        .result-section {
            margin-top: 30px;
            padding: 20px;
            background-color: #e8f4fc;
            border-radius: 5px;
        }
        .hidden {
            display: none;
        }
        .month-tabs {
            display: flex;
            margin-bottom: 20px;
        }
        .month-tab {
            padding: 10px 20px;
            background-color: #eee;
            margin-right: 5px;
            cursor: pointer;
            border-radius: 5px 5px 0 0;
        }
        .month-tab.active {
            background-color: #3498db;
            color: white;
        }
        .month-content {
            display: none;
        }
        .month-content.active {
            display: block;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Расчет зарплаты машиниста электропоезда</h1>
        
        <div class="form-section">
            <h2>Общая информация</h2>
            <div class="form-row">
                <div class="form-group">
                    <label for="employee-name">ФИО сотрудника</label>
                    <input type="text" id="employee-name" placeholder="Например: Иванов И.И.">
                </div>
                <div class="form-group">
                    <label for="employee-id">Табельный номер</label>
                    <input type="text" id="employee-id" placeholder="Например: 13001897">
                </div>
                <div class="form-group">
                    <label for="position">Должность</label>
                    <input type="text" id="position" value="Машинист электропоезда" readonly>
                </div>
                <div class="form-group">
                    <label for="department">Подразделение</label>
                    <input type="text" id="department" value="Лок. бригады-машинисты электропоездов" readonly>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="base-salary">Оклад/тарифная ставка (руб.)</label>
                    <input type="number" id="base-salary" value="520.17">
                </div>
                <div class="form-group">
                    <label for="work-plan">План: смен/часов</label>
                    <input type="text" id="work-plan" placeholder="Например: 25,00/150,15">
                </div>
                <div class="form-group">
                    <label for="work-fact">Факт: смен/часов</label>
                    <input type="text" id="work-fact" placeholder="Например: 16,00/105,15">
                </div>
            </div>
        </div>

        <div class="month-tabs">
            <div class="month-tab active" data-month="1">Январь</div>
            <div class="month-tab" data-month="2">Февраль</div>
            <div class="month-tab" data-month="3">Март</div>
            <div class="month-tab" data-month="4">Апрель</div>
            <div class="month-tab" data-month="5">Май</div>
            <div class="month-tab" data-month="6">Июнь</div>
            <div class="month-tab" data-month="7">Июль</div>
            <div class="month-tab" data-month="8">Август</div>
            <div class="month-tab" data-month="9">Сентябрь</div>
            <div class="month-tab" data-month="10">Октябрь</div>
            <div class="month-tab" data-month="11">Ноябрь</div>
            <div class="month-tab" data-month="12">Декабрь</div>
        </div>

        <div class="month-content active" data-month="1">
            <div class="form-section">
                <h2>Начисления за январь</h2>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="jan-hours-main">Часы по тарифной ставке</label>
                        <input type="number" id="jan-hours-main" step="0.01" placeholder="Часы">
                    </div>
                    <div class="form-group">
                        <label for="jan-hours-reserve">Часы по тарифной ставке (резерв)</label>
                        <input type="number" id="jan-hours-reserve" step="0.01" placeholder="Часы">
                    </div>
                    <div class="form-group">
                        <label for="jan-gap-hours">Разрывные часы</label>
                        <input type="number" id="jan-gap-hours" step="0.01" placeholder="Часы">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="jan-premium-percent">Ежемесячная премия (%)</label>
                        <input type="number" id="jan-premium-percent" step="0.01" placeholder="Процент">
                    </div>
                    <div class="form-group">
                        <label for="jan-evening-hours">Доплата за вечернее время (часы)</label>
                        <input type="number" id="jan-evening-hours" step="0.01" placeholder="Часы">
                    </div>
                    <div class="form-group">
                        <label for="jan-evening-reserve">Доплата за вечер (резерв) (часы)</label>
                        <input type="number" id="jan-evening-reserve" step="0.01" placeholder="Часы">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="jan-night-hours">Доплата за ночное время (часы)</label>
                        <input type="number" id="jan-night-hours" step="0.01" placeholder="Часы">
                    </div>
                    <div class="form-group">
                        <label for="jan-night-reserve">Доплата за ночь (резерв) (часы)</label>
                        <input type="number" id="jan-night-reserve" step="0.01" placeholder="Часы">
                    </div>
                    <div class="form-group">
                        <label for="jan-study-hours">Техническая учеба (часы)</label>
                        <input type="number" id="jan-study-hours" step="0.01" placeholder="Часы">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="jan-overtime-100">Сверхурочные 100% (часы)</label>
                        <input type="number" id="jan-overtime-100" step="0.01" placeholder="Часы">
                    </div>
                    <div class="form-group">
                        <label for="jan-overtime-50">Сверхурочные 50% (часы)</label>
                        <input type="number" id="jan-overtime-50" step="0.01" placeholder="Часы">
                    </div>
                    <div class="form-group">
                        <label for="jan-holiday-hours">Работа в праздники (часы)</label>
                        <input type="number" id="jan-holiday-hours" step="0.01" placeholder="Часы">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="jan-seniority-percent">Выслуга лет (%)</label>
                        <input type="number" id="jan-seniority-percent" step="0.01" placeholder="Процент">
                    </div>
                    <div class="form-group">
                        <label for="jan-qualification-bonus">Надбавка за класс квалификации (%)</label>
                        <input type="number" id="jan-qualification-bonus" step="0.01" placeholder="Процент">
                    </div>
                    <div class="form-group">
                        <label for="jan-personal-bonus">Персональная надбавка (%)</label>
                        <input type="number" id="jan-personal-bonus" step="0.01" placeholder="Процент">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="jan-food-payment">Оплата питания (руб.)</label>
                        <input type="number" id="jan-food-payment" step="0.01" placeholder="Рубли">
                    </div>
                    <div class="form-group">
                        <label for="jan-sick-days">Оплата по больничному листу (дни)</label>
                        <input type="number" id="jan-sick-days" step="0.01" placeholder="Дни">
                    </div>
                    <div class="form-group">
                        <label for="jan-vacation-days">Ежегодный отпуск (дни)</label>
                        <input type="number" id="jan-vacation-days" step="0.01" placeholder="Дни">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="jan-extra-vacation">Дополнительный отпуск (дни)</label>
                        <input type="number" id="jan-extra-vacation" step="0.01" placeholder="Дни">
                    </div>
                    <div class="form-group">
                        <label for="jan-one-time-payment">Разовая выплата (руб.)</label>
                        <input type="number" id="jan-one-time-payment" step="0.01" placeholder="Рубли">
                    </div>
                </div>
            </div>
        </div>

        <!-- Аналогичные блоки для других месяцев (февраль-декабрь) -->
        <!-- Для краткости в примере показан только январь -->

        <div class="form-section">
            <h2>Годовые накопления</h2>
            <div class="form-row">
                <div class="form-group">
                    <label for="total-income">Общая сумма дохода (руб.)</label>
                    <input type="number" id="total-income" step="0.01" readonly>
                </div>
                <div class="form-group">
                    <label for="year-bonus">Сумма для годовой премии (руб.)</label>
                    <input type="number" id="year-bonus" step="0.01" readonly>
                </div>
                <div class="form-group">
                    <label for="tax-deduction">Налоговый вычет на иждивенцев (руб.)</label>
                    <input type="number" id="tax-deduction" step="0.01" value="0">
                </div>
            </div>
        </div>

        <button id="calculate-btn">Рассчитать зарплату</button>

        <div class="result-section hidden" id="result-section">
            <h2>Результаты расчета</h2>
            <div class="form-row">
                <div class="form-group">
                    <label for="total-accrued">Итого начислено (руб.)</label>
                    <input type="number" id="total-accrued" step="0.01" readonly>
                </div>
                <div class="form-group">
                    <label for="total-deducted">Итого удержано (руб.)</label>
                    <input type="number" id="total-deducted" step="0.01" readonly>
                </div>
                <div class="form-group">
                    <label for="total-to-pay">К выдаче на руки (руб.)</label>
                    <input type="number" id="total-to-pay" step="0.01" readonly>
                </div>
            </div>
            
            <h3>Детализация начислений</h3>
            <table id="accruals-table">
                <thead>
                    <tr>
                        <th>Вид оплаты</th>
                        <th>Часы/дни/%</th>
                        <th>Начислено (руб.)</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Заполняется JavaScript -->
                </tbody>
            </table>
            
            <h3>Детализация удержаний</h3>
            <table id="deductions-table">
                <thead>
                    <tr>
                        <th>Вид удержания</th>
                        <th>Сумма (руб.)</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Заполняется JavaScript -->
                </tbody>
            </table>
        </div>
    </div>

    <script src="salary-calculator.js"></script>
</body>
</html>
```

## JavaScript код (salary-calculator.js)

```javascript
document.addEventListener('DOMContentLoaded', function() {
    // Переключение между месяцами
    const monthTabs = document.querySelectorAll('.month-tab');
    monthTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Удаляем активный класс у всех вкладок и контента
            monthTabs.forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.month-content').forEach(c => c.classList.remove('active'));
            
            // Добавляем активный класс к выбранной вкладке и контенту
            this.classList.add('active');
            const month = this.getAttribute('data-month');
            document.querySelector(`.month-content[data-month="${month}"]`).classList.add('active');
        });
    });
    
    // Кнопка расчета
    document.getElementById('calculate-btn').addEventListener('click', calculateSalary);
    
    // Заполняем примерными данными для демонстрации
    fillSampleData();
});

function calculateSalary() {
    // Получаем базовые данные
    const baseSalary = parseFloat(document.getElementById('base-salary').value) || 0;
    
    // Получаем активный месяц
    const activeMonthTab = document.querySelector('.month-tab.active');
    const activeMonth = activeMonthTab.getAttribute('data-month');
    const monthName = activeMonthTab.textContent;
    
    // Получаем данные для активного месяца
    const hoursMain = parseFloat(document.getElementById(`${getMonthPrefix(activeMonth)}-hours-main`).value) || 0;
    const hoursReserve = parseFloat(document.getElementById(`${getMonthPrefix(activeMonth)}-hours-reserve`).value) || 0;
    const gapHours = parseFloat(document.getElementById(`${getMonthPrefix(activeMonth)}-gap-hours`).value) || 0;
    const premiumPercent = parseFloat(document.getElementById(`${getMonthPrefix(activeMonth)}-premium-percent`).value) || 0;
    const eveningHours = parseFloat(document.getElementById(`${getMonthPrefix(activeMonth)}-evening-hours`).value) || 0;
    const eveningReserve = parseFloat(document.getElementById(`${getMonthPrefix(activeMonth)}-evening-reserve`).value) || 0;
    const nightHours = parseFloat(document.getElementById(`${getMonthPrefix(activeMonth)}-night-hours`).value) || 0;
    const nightReserve = parseFloat(document.getElementById(`${getMonthPrefix(activeMonth)}-night-reserve`).value) || 0;
    const studyHours = parseFloat(document.getElementById(`${getMonthPrefix(activeMonth)}-study-hours`).value) || 0;
    const overtime100 = parseFloat(document.getElementById(`${getMonthPrefix(activeMonth)}-overtime-100`).value) || 0;
    const overtime50 = parseFloat(document.getElementById(`${getMonthPrefix(activeMonth)}-overtime-50`).value) || 0;
    const holidayHours = parseFloat(document.getElementById(`${getMonthPrefix(activeMonth)}-holiday-hours`).value) || 0;
    const seniorityPercent = parseFloat(document.getElementById(`${getMonthPrefix(activeMonth)}-seniority-percent`).value) || 0;
    const qualificationBonus = parseFloat(document.getElementById(`${getMonthPrefix(activeMonth)}-qualification-bonus`).value) || 0;
    const personalBonus = parseFloat(document.getElementById(`${getMonthPrefix(activeMonth)}-personal-bonus`).value) || 0;
    const foodPayment = parseFloat(document.getElementById(`${getMonthPrefix(activeMonth)}-food-payment`).value) || 0;
    const sickDays = parseFloat(document.getElementById(`${getMonthPrefix(activeMonth)}-sick-days`).value) || 0;
    const vacationDays = parseFloat(document.getElementById(`${getMonthPrefix(activeMonth)}-vacation-days`).value) || 0;
    const extraVacation = parseFloat(document.getElementById(`${getMonthPrefix(activeMonth)}-extra-vacation`).value) || 0;
    const oneTimePayment = parseFloat(document.getElementById(`${getMonthPrefix(activeMonth)}-one-time-payment`).value) || 0;
    
    // Рассчитываем начисления
    const accruals = [];
    
    // 1. Повременная оплата по тарифной ставке
    const mainSalary = hoursMain * baseSalary;
    if (hoursMain > 0) {
        accruals.push({
            name: 'Повр.опл. по тариф.став',
            value: hoursMain + ' ч',
            amount: mainSalary
        });
        
        // Доплата за трудное время 12%
        const difficultTime12 = mainSalary * 0.12;
        if (difficultTime12 > 0) {
            accruals.push({
                name: 'В т.ч.ПовОплТрВр 12,00%',
                value: hoursMain + ' ч',
                amount: difficultTime12
            });
        }
    }
    
    // 2. Повременная оплата по тарифной ставке (резерв)
    const reserveSalary = hoursReserve * baseSalary;
    if (hoursReserve > 0) {
        accruals.push({
            name: 'Повр.опл. тариф.ст.РЕЗЕРВ',
            value: hoursReserve + ' ч',
            amount: reserveSalary
        });
        
        // Доплата за трудное время 8%
        const difficultTime8 = reserveSalary * 0.08;
        if (difficultTime8 > 0) {
            accruals.push({
                name: 'В т.ч.ПовОплТрВр 8,00%',
                value: hoursReserve + ' ч',
                amount: difficultTime8
            });
        }
    }
    
    // 3. Разрывные часы (примерно 1.5 от базовой ставки)
    const gapSalary = gapHours * baseSalary * 1.5;
    if (gapHours > 0) {
        accruals.push({
            name: 'Разрывные часы',
            value: gapHours + ' ч',
            amount: gapSalary
        });
    }
    
    // 4. Ежемесячная премия
    const premiumSalary = (mainSalary + reserveSalary + gapSalary) * (premiumPercent / 100);
    if (premiumPercent > 0) {
        accruals.push({
            name: 'ЕжемПремЛокВр',
  
