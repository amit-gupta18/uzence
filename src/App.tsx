import { DataTable } from './components/DataTable'
import type { Column } from './components/DataTable'
import { InputField } from './components/InputField'
import './App.css'
import { useState } from 'react';
// import { useState } from 'storybook/internal/preview-api';
// import { useState } from 'react';

function App() {
  const [value, setValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  interface User {
    id: number;
    name: string;
    age: number;
    email: string;
  }

  const userColumns: Column<User>[] = [
    { key: "name", title: "Name", dataIndex: "name", sortable: true },
    { key: "age", title: "Age", dataIndex: "age", sortable: true },
    { key: "email", title: "Email", dataIndex: "email" },
  ];

  const users: User[] = [
    { id: 1, name: "Rohit", age: 20, email: "rohit@example.com" },
    { id: 2, name: "Amit", age: 21, email: "amit@example.com" },
  ];


  return (
    <>
      <div className='text-center text-2xl'>
        This is a react + ts + tw app.
      </div>
      <div className='flex flex-col space-y-4 w-lg m-8 border-amber-950 border-2 p-4 rounded-2xl'>
        <div className='text-2xl text-center'>InputField Component</div>
        <InputField label='name' value={value}  placeholder='Enter your name' onChange={handleInputChange} variant='ghost' size='sm' disabled={true} />
        <InputField invalid={true} label='place' value={value}  placeholder='Enter your place' onChange={handleInputChange} variant='outlined' size='md' theme='dark' errorMessage='This field is required' />
        <InputField  label='age' value={value}  placeholder='Enter your age' onChange={handleInputChange} variant='outlined' size='lg' loading={true} />
        <InputField label='password' type='password' value={value}  placeholder='Enter your password' onChange={handleInputChange} variant='filled' size='lg'  />
        <div className='text-2xl text-center'>DataTable Component</div>
        <div className="p-6">
          <DataTable
            data={users}
            columns={userColumns}
            loading={false}
            selectable
            onRowSelect={(rows) => console.log("Selected rows:", rows)}
          />
        </div>

      </div>
    </>
  )
}

export default App

