import React from 'react';

const ResetPasswordConfirm = (props) => {
    return (
        <div className='container mt-5'>
            <h1 className="text-info">Request Password Reset:</h1>
            <form>
                <div className='form-group'>
                    <input 
                    className='form-control'
                    type='email'
                    placeholder='Your Email'
                    name='email'
                    required
                />
                </div>
                <button className='btn btn-info' type='submit'>Reset Password</button>
            </form>
        </div>
);
};

export default ResetPasswordConfirm;