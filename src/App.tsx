
import { ComboBox } from './Combobox.tsx';
import './style.css';

const options = [
  'Aman',
  'Bhushan',
  'Chetan',
  'Daksh',
  'Ela',
  'Faiz',
  'Gohar',
  'Himesh',
];

function App() {
  return (
    <div className="app">
      <h1>Select Name</h1>
      <ComboBox options={options} />
    </div>
  );
}

export default App;
