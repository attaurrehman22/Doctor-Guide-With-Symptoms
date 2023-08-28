import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const _Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin =async () => {
    if (!email || !password) {
      console.log('Please enter both email and password.');
      return;
    }

    console.log('Email:', email);
    console.log('Password:', password);
    if(email==="admin" && password==="admin")
    {
      window.location.href = '/Adminpan';
    }
    else{
      try {
        const response = await fetch("http://localhost:5000/getuser");
        const data = await response.json();
        console.log("data =====",data)
        if(data==="EXIST"){
          window.location.href = '/Selectbodyparts';
        }
      } catch (error) {
        console.warn("error");
      }
    }
    // Add your login logic here
  };

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5">
        <div className="row d-flex justify-content-center align-items-center" style={{ height: '60px' }}>
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-5 text-center">

                <div className="mb-md-3 mt-md-2 pb-5">

                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">Please enter your login and password!</p>

                  <div className="form-outline form-white mb-2">
                    <input
                      type="email"
                      id="typeEmailX"
                      className="form-control form-control-lg"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="form-label" htmlFor="typeEmailX">Email</label>
                  </div>

                  <div className="form-outline form-white mb-2">
                    <input
                      type="password"
                      id="typePasswordX"
                      className="form-control form-control-lg"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="form-label" htmlFor="typePasswordX">Password</label>
                  </div>

                  <button className="btn btn-outline-light btn-lg px-5" onClick={handleLogin}>Login</button>

                </div>

                <div>
                  <p className="mb-0">Don't have an account? <a href="Signup" className="text-white-50 fw-bold">Sign Up</a></p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default _Login;
