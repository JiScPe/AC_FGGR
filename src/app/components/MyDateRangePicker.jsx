// components/DateRangePicker.js
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { th } from "date-fns/locale";

const MyDateRangePicker = ({ onChange, value, visible }) => {
  return (
    <div style={{ display: visible ? 'block' : 'none' }}>
      <DateRangePicker onChange={onChange} ranges={value} locale={th}/>
    </div>
  );
};

export default MyDateRangePicker;
