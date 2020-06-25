import React, { useState, useEffect } from 'react';
import '../styles/form.scss';
import { login } from '../redux/middlewares/authMiddlewares';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { message} from 'antd';


function Login() {
  const error = useSelector(state => state.authReducer.error);
  const isAuth = useSelector(state => state.authReducer.isAuth);
  const userType = useSelector(state => state.authReducer.userType);
  const [redirect, setRedirect] = useState('')
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(isAuth)
    if (isAuth) {
      if (userType === 'coach') {
        message.success('You successfully rconnected to your account as a coach.', 2.5)
        setRedirect(<Redirect to='/dashboardAdmin' />)
      } 
      else if (userType === 'player') {
        message.success('You successfully connected to your account as a player.', 2.5)
        setRedirect(<Redirect to='/dashboardPlayer' />)
      }
        
    } else {
      setRedirect(<Redirect to='/login' />)
    }
  } ,[isAuth])

  function setupAlert() {
    let ans;

    if (error !== '') {
      ans = (
        <div className='alert alert-danger alert-dismissible' role='alert'>
          <button type='button' className='close' data-dismiss='alert'>&times;</button>
          {error}
        </div>
      );
    } else {
      ans = null;
    };

    return ans;
  };


  function submit(e) {
    e.preventDefault();
    let type = document.getElementById('type').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    dispatch(login(email, password, type))   
  };

  return (
    <div>
      {setupAlert()}

      <form className="form-auth p-4 mt-3 mb-3 rounded" action="/action_page.php" onSubmit={submit}>

        <div className="form-group">
          <label htmlFor="email">You are:</label>
          <select type="email" className="form-control" placeholder="Enter email" id="type">
            <option value="coach">Coach</option>
            <option value="player">Player</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="email">Username:</label>
          <input type="email" className="form-control" placeholder="Enter email" id="email" />
        </div>

        <div className="form-group">
          <label htmlFor="pwd">Password:</label>
          <input type="password" className="form-control" placeholder="Enter password" id="password" />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>

      </form>
      {redirect}
    </div>
  );
};

export default Login;
