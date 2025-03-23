import './css/main.css';
import './App.css'

import React from 'react';
import Calendar from './components/Calendar';
import moment from 'moment';
import 'moment/dist/locale/ru';

// import 'moment/locale/ru';
// import ru from 'moment/locale/ru';

console.log('Available locales:', moment.locales());
// moment.locale('ru', ru);
moment.locale('ru');
console.log('Тест формата:', moment().format('dddd MMMM'));

function App() {
  return (
    <div id="root">
      <Calendar date={moment(new Date())} />
    </div>
  );
}

export default App;
