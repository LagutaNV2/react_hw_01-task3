import React from 'react';
import moment from 'moment';
import 'moment/locale/ru';

const Calendar = ({ date }) => {
  const currentDate = moment(date).locale('ru');

  console.log('Calendar instance locale:', currentDate.locale());
  console.log('Calendar locale:', moment.locale());
  console.log(moment(date).format('LLLL'));
  console.log(moment(date).localeData().longDateFormat('LLLL'));


  const currentDayOfWeek = currentDate.format('dddd');
  const currentDayNum = currentDate.date();
  const currentMonthGenitive = currentDate.format('MMMM');
  const currentYear = currentDate.year();
  const currentMonthNominative = currentDate.format('MMMM').replace(/.$/, '');

  // Генерация массива дней для календаря
  const startOfMonth = currentDate.clone().startOf('month');
  const endOfMonth = currentDate.clone().endOf('month');
  const daysInMonth = currentDate.daysInMonth();

  const firstDayOfWeek = startOfMonth.day() || 7;
  const lastDayOfWeek = endOfMonth.day() || 7;

  // Заполнение массивов днями предыдущего, тек., след. месяцев
  const prevMonthDays = [];
  for (let i = firstDayOfWeek - 1; i > 0; i--) {
    prevMonthDays.push(startOfMonth.clone().subtract(i, 'days').date());
  }
  const currentMonthDays = [];
  for (let i = 1; i <= daysInMonth; i++) {
    currentMonthDays.push(i);
  }
  const nextMonthDays = [];
  for (let i = 1; i <= 7 - lastDayOfWeek; i++) {
    nextMonthDays.push(i);
  }
  const allDays = [
    ...prevMonthDays.map(day => ({ day, type: 'other-month' })),
    ...currentMonthDays.map(day => ({ day, type: 'current-month' })),
    ...nextMonthDays.map(day => ({ day, type: 'other-month' }))
  ];

  // Разделение дней на строки по 7 дней
  const rows = [];
  for (let i = 0; i < allDays.length; i += 7) {
    rows.push(allDays.slice(i, i + 7));
  }

  return (
    <div className="ui-datepicker">

      <div className="ui-datepicker-material-header">
        <div className="ui-datepicker-material-day">{currentDayOfWeek}</div>
        <div className="ui-datepicker-material-date">
          <div className="ui-datepicker-material-day-num">{currentDayNum}</div>
          <div className="ui-datepicker-material-month">{currentMonthGenitive}</div>
          <div className="ui-datepicker-material-year">{currentYear}</div>
        </div>
      </div>

      <div className="ui-datepicker-header">
        <div className="ui-datepicker-title">
          <span className="ui-datepicker-month">{currentMonthNominative}</span>&nbsp;<span className="ui-datepicker-year">{currentYear}</span>
        </div>
      </div>

      <table className="ui-datepicker-calendar">
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col />
          <col className="ui-datepicker-week-end" />
          <col className="ui-datepicker-week-end" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col" title="Понедельник">Пн</th>
            <th scope="col" title="Вторник">Вт</th>
            <th scope="col" title="Среда">Ср</th>
            <th scope="col" title="Четверг">Чт</th>
            <th scope="col" title="Пятница">Пт</th>
            <th scope="col" title="Суббота">Сб</th>
            <th scope="col" title="Воскресенье">Вс</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map(({ day, type }, colIndex) => (
                <td
                  key={colIndex}
                  className={[
                    type === 'other-month' ? 'ui-datepicker-other-month' : '',
                    day === currentDayNum && type === 'current-month' ? 'ui-datepicker-today' : '',
                    colIndex >= 5 ? 'ui-datepicker-week-end' : ''
                  ].join(' ').trim()}
                >
                  {day}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;