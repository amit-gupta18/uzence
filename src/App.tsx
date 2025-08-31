import DataTable from './components/DataTable'
import { InputField } from './components/InputField'
import './App.css'
// import { useState } from 'storybook/internal/preview-api';
import { useState } from 'react';

function App() {

  const [value , setValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      <div className='text-center text-2xl'>
        This is a react + ts + tw app.
      </div>
      <div className='flex flex-col space-y-4 w-lg m-8 border-amber-950 border-2 p-4 rounded-2xl'>
        <InputField label='name' value={value}  placeholder='Enter your name' onChange={handleInputChange} variant='ghost' size='sm' disabled={true} />
        <InputField invalid={true} label='place' value={value}  placeholder='Enter your place' onChange={handleInputChange} variant='outlined' size='md' theme='dark' errorMessage='This field is required' />
        <InputField  label='age' value={value}  placeholder='Enter your age' onChange={handleInputChange} variant='outlined' size='lg' loading={true} />
        <InputField label='password' type='password' value={value}  placeholder='Enter your password' onChange={handleInputChange} variant='filled' size='lg'  />

      </div>
      <DataTable />
    </>
  )
}
    
export default App

