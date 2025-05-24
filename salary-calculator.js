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
            value: premiumPercent + ' %',
            amount: premiumSalary
        });
    }
    
    // 5. Доплата за вечернее время (20% от базовой ставки)
    const eveningSalary = eveningHours * baseSalary * 0.2;
    if (eveningHours > 0) {
        accruals.push({
            name: 'Доплата за вечернее время',
            value: eveningHours + ' ч',
            amount: eveningSalary
        });
    }
    
    // 6. Доплата за вечер (резерв)
    const eveningReserveSalary = eveningReserve * baseSalary * 0.2;
    if (eveningReserve > 0) {
        accruals.push({
            name: 'Доплата за вечер врезе',
            value: eveningReserve + ' ч',
            amount: eveningReserveSalary
        });
    }
    
    // 7. Доплата за ночное время (40% от базовой ставки)
    const nightSalary = nightHours * baseSalary * 0.4;
    if (nightHours > 0) {
        accruals.push({
            name: 'Доплата за ночное время',
            value: nightHours + ' ч',
            amount: nightSalary
        });
    }
    
    // 8. Доплата за ночь (резерв)
    const nightReserveSalary = nightReserve * baseSalary * 0.4;
    if (nightReserve > 0) {
        accruals.push({
            name: 'Доплата за ночное врезерву',
            value: nightReserve + ' ч',
            amount: nightReserveSalary
        });
    }
    
    // 9. Техническая учеба
    const studySalary = studyHours * baseSalary;
    if (studyHours > 0) {
        accruals.push({
            name: 'Техническая учеба',
            value: studyHours + ' ч',
            amount: studySalary
        });
    }
    
    // 10. Сверхурочные 100%
    const overtime100Salary = overtime100 * baseSalary * 2;
    if (overtime100 > 0) {
        accruals.push({
            name: 'ДоплЗаСверхурочи.100%',
            value: overtime100 + ' ч',
            amount: overtime100Salary
        });
    }
    
    // 11. Сверхурочные 50%
    const overtime50Salary = overtime50 * baseSalary * 1.5;
    if (overtime50 > 0) {
        accruals.push({
            name: 'ДоплЗаСверхурочи.50%',
            value: overtime50 + ' ч',
            amount: overtime50Salary
        });
    }
    
    // 12. Работа в праздники (двойная ставка)
    const holidaySalary = holidayHours * baseSalary * 2;
    if (holidayHours > 0) {
        accruals.push({
            name: 'ОплРабПраздВыхДинВнеГраф',
            value: holidayHours + ' ч',
            amount: holidaySalary
        });
    }
    
    // 13. Выслуга лет
    const senioritySalary = (mainSalary + reserveSalary) * (seniorityPercent / 100);
    if (seniorityPercent > 0) {
        accruals.push({
            name: 'Выслуга лет',
            value: seniorityPercent + ' %',
            amount: senioritySalary
        });
    }
    
    // 14. Надбавка за класс квалификации
    const qualificationSalary = (mainSalary + reserveSalary) * (qualificationBonus / 100);
    if (qualificationBonus > 0) {
        accruals.push({
            name: 'Надбавка за класс квалиф',
            value: qualificationBonus + ' %',
            amount: qualificationSalary
        });
    }
    
    // 15. Персональная надбавка
    const personalBonusSalary = (mainSalary + reserveSalary) * (personalBonus / 100);
    if (personalBonus > 0) {
        accruals.push({
            name: 'Надбавка персональная',
            value: personalBonus + ' %',
            amount: personalBonusSalary
        });
    }
    
    // 16. Оплата питания
    if (foodPayment > 0) {
        accruals.push({
            name: 'Оплата Питания',
            value: '',
            amount: foodPayment
        });
    }
    
    // 17. Оплата по больничному листу (примерно 80% от средней зарплаты)
    const sickSalary = sickDays * baseSalary * 8 * 0.8;
    if (sickDays > 0) {
        accruals.push({
            name: 'Оплата по больн. листу',
            value: sickDays + ' д',
            amount: sickSalary
        });
    }
    
    // 18. Ежегодный отпуск
    const vacationSalary = vacationDays * baseSalary * 8;
    if (vacationDays > 0) {
        accruals.push({
            name: 'Ежегодн.отпуск',
            value: vacationDays + ' д',
            amount: vacationSalary
        });
    }
    
    // 19. Дополнительный отпуск
    const extraVacationSalary = extraVacation * baseSalary * 8;
    if (extraVacation > 0) {
        accruals.push({
            name: 'Дополн.отпуск',
            value: extraVacation + ' д',
            amount: extraVacationSalary
        });
    }
    
    // 20. Разовая выплата
    if (oneTimePayment > 0) {
        accruals.push({
            name: 'Разовая выплата',
            value: '',
            amount: oneTimePayment
        });
    }
    
    // Рассчитываем общую сумму начислений
    const totalAccrued = accruals.reduce((sum, item) => sum + item.amount, 0);
    
    // Рассчитываем удержания
    const deductions = [];
    
    // 1. НДФЛ 13%
    const taxDeduction = parseFloat(document.getElementById('tax-deduction').value) || 0;
    const incomeTax = Math.max(0, (totalAccrued - taxDeduction) * 0.13);
    if (incomeTax > 0) {
        deductions.push({
            name: 'НДФЛ 13%',
            amount: incomeTax
        });
    }
    
    // 2. Профсоюзный взнос (1% от начислений)
    const unionDues = totalAccrued * 0.01;
    if (unionDues > 0) {
        deductions.push({
            name: 'Профсоюзный взнос',
            amount: unionDues
        });
    }
    
    // 3. Аванс (примерно 40% от основной зарплаты)
    const advancePayment = (mainSalary + reserveSalary) * 0.4;
    if (advancePayment > 0) {
        deductions.push({
            name: 'Аванс перечисленный',
            amount: advancePayment
        });
    }
    
    // Рассчитываем общую сумму удержаний
    const totalDeducted = deductions.reduce((sum, item) => sum + item.amount, 0);
    
    // Сумма к выдаче
    const totalToPay = totalAccrued - totalDeducted;
    
    // Обновляем годовую информацию
    document.getElementById('total-income').value = totalAccrued.toFixed(2);
    document.getElementById('year-bonus').value = (totalAccrued * 0.9).toFixed(2); // Примерно 90% от дохода
    
    // Отображаем результаты
    document.getElementById('total-accrued').value = totalAccrued.toFixed(2);
    document.getElementById('total-deducted').value = totalDeducted.toFixed(2);
    document.getElementById('total-to-pay').value = totalToPay.toFixed(2);
    
    // Заполняем таблицы детализации
    const accrualsTable = document.querySelector('#accruals-table tbody');
    accrualsTable.innerHTML = '';
    accruals.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.value}</td>
            <td>${item.amount.toFixed(2)}</td>
        `;
        accrualsTable.appendChild(row);
    });
    
    const deductionsTable = document.querySelector('#deductions-table tbody');
    deductionsTable.innerHTML = '';
    deductions.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.amount.toFixed(2)}</td>
        `;
        deductionsTable.appendChild(row);
    });
    
    // Показываем секцию с результатами
    document.getElementById('result-section').classList.remove('hidden');
}

function getMonthPrefix(monthNumber) {
    const months = [
        'jan', 'feb', 'mar', 'apr', 'may', 'jun',
        'jul', 'aug', 'sep', 'oct', 'nov', 'dec'
    ];
    return months[parseInt(monthNumber) - 1];
}

function fillSampleData() {
    // Заполняем примерными данными для января (как в расчетном листке Полещука И.В.)
    document.getElementById('jan-hours-main').value = '77.68';
    document.getElementById('jan-hours-reserve').value = '8.00';
    document.getElementById('jan-gap-hours').value = '41.98';
    document.getElementById('jan-premium-percent').value = '33.00';
    document.getElementById('jan-evening-hours').value = '34.54';
    document.getElementById('jan-evening-reserve').value = '2.00';
    document.getElementById('jan-night-hours').value = '21.49';
    document.getElementById('jan-study-hours').value = '2.00';
    document.getElementById('jan-holiday-hours').value = '29.12';
    document.getElementById('jan-personal-bonus').value = '10.00';
    document.getElementById('jan-food-payment').value = '1425.00';
    document.getElementById('jan-sick-days').value = '3.00';
          }
