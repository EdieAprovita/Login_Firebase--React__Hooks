import React, { useState } from 'react';
import { auth } from '../firebase';
import { withRouter } from 'react-router-dom';

const ResetPass = (props) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const procesarDatos = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Write a emmail please!');
      return;
    }
    setError(null);

    recuperar();
  };

  const recuperar = React.useCallback(async () => {
    try {
      await auth.sendPasswordResetEmail(email);
      props.history.push('/login');
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  }, [email, props.history]);

  return (
    <div className='mt-5'>
      <h3 className='text-center'>Reset password</h3>
      <hr />
      <div className='row justify-content-center'>
        <div className='col-12 col-sm-8 col-md-6 col-xl-4'>
          <form onSubmit={procesarDatos}>
            {error ? <div className='alert alert-danger'>{error}</div> : null}
            <input
              type='email'
              className='form-control mb-2'
              placeholder='Enter Email'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <button className='btn btn-lg btn-dark btn-block' type='submit'>
              Reset password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(ResetPass);
