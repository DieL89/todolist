import React, { useState, useRef }  from 'react';
import { useEffect } from 'react';
import TodosPage from './pages/TodoPage';

function App(): JSX.Element {
  const [userName, changeUserName] = useState<string>('');
  const [password, changePassword] = useState<string>('');

  return (
    <div className="container">
      <Input handler={(e: any) => changeUserName(e.target.value)} value={userName} />
      <Input handler={(e: any) => changePassword(e.target.value)} value={password} />
      {/* <input onChange={(e) => changeUserName(e.target.value)} type="text" name="username" value={userName} />
      <input ref={passwordRef} onChange={(e) => changePassword(e.target.value)} type="text" name="password" value={password} /> */}
    </div>
  );
}

function Input(props: any) {
  console.log(props.value);

  return (<input type="text" name={props.value} onChange={props.handler} />)
}

export default App;
