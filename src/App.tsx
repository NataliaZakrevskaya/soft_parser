import React, {useState} from 'react';
import './static/css/global.css';
import {formatDate} from "./utils/helpers/date";
import {Calendar} from "./components";


const options = ['Сегодня', 'Вчера', 'Последние 4 дня', 'Пользовательский']


export const App: React.FC = () => {

    const sixDaysAgo = new Date();
    sixDaysAgo.setDate(sixDaysAgo.getDate() - 6);

    const [firstDay, setFirstDay] = React.useState<Date>(sixDaysAgo);
    const [secondDay, setSecondDay] = React.useState<Date | null>(new Date());
    const [activeOption, setActiveOption] = useState<number>(3)

    const changeFirstDay = (day: Date) => {
        setFirstDay(day)
    }
    const changeSecondDay = (day: Date | null) => {
        setSecondDay(day)
    }

    return (
        <div className='app__container'>
            <div className='calendar__container'>
                <div className='info__container'>
                    <div className='container__options'>
                        {options.map((option: string, index) => (
                            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
                            <div key={index}
                                 className={activeOption === index ? 'option__container__active' : 'option__container'}
                                 onClick={() => setActiveOption(index)}>
                                <p className={activeOption === index ? 'option__body__active' : 'option__body'}>{option}</p>
                            </div>
                        ))}
                    </div>
                    <div className='calendar__wrapper'>


                          <Calendar
                              firstDay={firstDay}
                              secondDay={secondDay}
                              changeFirstDay={changeFirstDay}
                              changeSecondDay={changeSecondDay}
                          />


                    </div>
                </div>
                <div className='controls__container'>
                    <div className='date__container'>
                        <p className='date_item'>{firstDay ? formatDate(firstDay, 'DD/MM/YYYY') : ''} - {secondDay ? formatDate(secondDay, 'DD/MM/YYYY') : ''}</p>
                    </div>

                    <div className='btn__container'>
                        <button className='button__cancel'>Отмена</button>
                        <button className='button__apply'>Применить</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;