import React, { useState,useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
const emaiiReducer=(state,action)=>{
  if(action.type=='useInput'){
    return {value:action.val,isValid:action.val.includes('@')}
  }
  if(action.type=='useBlur')
  {
    return{value:state.value,isValid:state.value.includes('@')}
  }
  return {value:'',isValid:false}

}
const passwordReducer=(state,action)=>{
  if(action.type=='Input')
  {
    return{value:action.val,isValid:action.val.trim().length > 6}
  }
  if(action.type=='Blur')
  {
    return{value:state.value,isValid:state.value.trim().length>6}
  }
  return {value:'',isValid:false}
}
const Login = (props) => {
  //const [enteredEmail, setEnteredEmail] = useState('');
  //const [emailIsValid, setEmailIsValid] = useState();
  //const [enteredPassword, setEnteredPassword] = useState('');
  //const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const[emailState,dispactEmail]=useReducer(emaiiReducer,{value:'',isValid:null})
  const [passwordState,dispatchPassword]=useReducer(passwordReducer,{value:'',isValid:null})

  const emailChangeHandler = (event) => {
    dispactEmail({type:'useInput',val:event.target.value})

    setFormIsValid(
      emailState.isValid && passwordState.isValid
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type:'Input',val:event.target.value})

    setFormIsValid(
      passwordState.isValid&& emailState.isValid
    );
  };

  const validateEmailHandler = () => {
    dispactEmail({type:'useBlur'})
  
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type:'Blur'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
        type="email"
        id="email"
        label="Email"
        value={emailState.value}
        isvalid={emailState.isValid}
        onChange={emailChangeHandler}
        onBlur={validateEmailHandler}
        />
        <Input
        type="password"
        id="password"
        label="Password"
        value={passwordState.value}
        isvalid={passwordState.isValid}
        onChange={passwordChangeHandler}
        onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
