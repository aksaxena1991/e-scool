// import React from "react";
// import * as Components from './LoginComponents';
// import './login.css';
// import Logo from '../assets/logo.svg'
// import Spacer from "../components/spacer/Spacer";

// function Login() {
//   const [signIn, toggle] = React.useState(true);
//   return (
//     <div className="main-container" >
//       <Spacer height="25px"/>
//       <img className="img" src={Logo} alt="" height='48px' width='250px' />
//       <Spacer height="25px"/>
//       <Components.Container>
//         <Components.SignUpContainer signinIn={signIn}>
//           <Components.Form>
//             <Components.Title>Create Account</Components.Title>
//             <Components.Input type='text' placeholder='Name' />
//             <Components.Input type='email' placeholder='Email' />
//             <Components.Input type='password' placeholder='Password' />
//             <Components.Button>Sign Up</Components.Button>
//           </Components.Form>
//         </Components.SignUpContainer>

//         <Components.SignInContainer signinIn={signIn}>
//           <Components.Form>
//             <Components.Title>Sign in</Components.Title>
//             <Components.Input type='email' placeholder='Email' />
//             <Components.Input type='password' placeholder='Password' />
//             <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
//             <Components.Button>Sigin In</Components.Button>
//           </Components.Form>
//         </Components.SignInContainer>

//         <Components.OverlayContainer signinIn={signIn}>
//           <Components.Overlay signinIn={signIn}>
//             <Components.LeftOverlayPanel signinIn={signIn}>
//               <Components.Title>Welcome Back!</Components.Title>
//               <Components.Paragraph>
//                 To keep connected with us please login with your personal info
//               </Components.Paragraph>
//               <Components.GhostButton onClick={() => toggle(true)}>
//                 Sign In
//               </Components.GhostButton>
//             </Components.LeftOverlayPanel>

//             <Components.RightOverlayPanel signinIn={signIn}>
//               <Components.Title>Hello, Friend!</Components.Title>
//               <Components.Paragraph>
//                 Enter Your personal details and start journey with us
//               </Components.Paragraph>
//               <Components.GhostButton onClick={() => toggle(false)}>
//                 Sigin Up
//               </Components.GhostButton>
//             </Components.RightOverlayPanel>
//           </Components.Overlay>
//         </Components.OverlayContainer>
//       </Components.Container>
//     </div>
//   )
// }

// export default Login;


import React, { useState } from "react";
import * as Components from './LoginComponents';
import './login.css';
import Logo from '../assets/logo.svg';
import Spacer from "../components/spacer/Spacer";
import axios from 'axios';
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import iziToast from "izitoast";

function Login() {
  const [signIn, toggle] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { apipath } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(apipath + '/user/login', {
        email: email,
        password: password
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer 9246e2ee-a026-424f-94f7-e751351ec9a9'
        }
      });

      const result = response.data;
      const { role } = result;

      // Store the token
      localStorage.setItem("token", result.token);
      console.log(result);

      // Navigate to different dashboards based on role
      if (response.status !== 200) {
        if (response.status === 403) {
          if (result.error === "Forbidden" && result.message === "You are not authorized to log in") {
            iziToast.error({
              message: result.message,
              position: "topCenter"
            });
            return;
          }
        }
        throw new Error(result.message || "Login failed");
      }
      localStorage.setItem("token", result.token);

      if (role === 'school') {
        localStorage.setItem('schoolToken', result.token);
        localStorage.setItem('schoolName', result.userName);
        localStorage.setItem('schoolEmail', result.email);
        localStorage.setItem('schoolId', result.userId);
        iziToast.success({
          title: 'Success',
          message: 'School login successful',
          position: 'topCenter',
          timeout: 2000 // Optional, time in milliseconds after which the toast will disappear
        });

        navigate('/dashboard-home');
      } else if (role === 'admin') {
        localStorage.setItem('adminToken', result.token);
        localStorage.setItem('adminName', result.userName);
        localStorage.setItem('adminEmail', result.email);
        localStorage.setItem('adminId', result.userId);
        iziToast.success({
          title: 'Success',
          message: 'Admin login successful',
          position: 'topCenter',
          timeout: 2000 // Optional, time in milliseconds after which the toast will disappear
        });
        navigate('/admin-dashboard-home');

      } else {
        iziToast.error({
          message: "Login failed. Please check your email and password. " + result.error,
          position: "topCenter"
        });
        console.error("Login failed:", result.error);
      }
    } catch (error) {
      iziToast.error({
        message: "Error during login",
        position: "topCenter"
      });
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="main-container">
      <Spacer height="25px" />
      <img className="img" src={Logo} alt="" height='48px' width='250px' />
      <Spacer height="25px" />
      <Components.Container>
        <Components.SignUpContainer signinIn={signIn}>
          <Components.Form>
            <Components.Title>Create Account</Components.Title>
            <Components.Input type='text' placeholder='Name' />
            <Components.Input type='email' placeholder='Email' />
            <Components.Input type='password' placeholder='Password' />
            <Components.Button>Sign Up</Components.Button>
          </Components.Form>
        </Components.SignUpContainer>

        <Components.SignInContainer signinIn={signIn}>
          <Components.Form onSubmit={handleSignIn}>
            <Components.Title>Sign in</Components.Title>
            <Components.Input
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Components.Input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
            <Components.Button type="submit">Sign In</Components.Button>
          </Components.Form>
        </Components.SignInContainer>

        <Components.OverlayContainer signinIn={signIn}>
          <Components.Overlay signinIn={signIn}>
            <Components.LeftOverlayPanel signinIn={signIn}>
              <Components.Title>Welcome Back!</Components.Title>
              <Components.Paragraph>
                To keep connected with us please login with your personal info
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(true)}>
                Sign In
              </Components.GhostButton>
            </Components.LeftOverlayPanel>

            <Components.RightOverlayPanel signinIn={signIn}>
              <Components.Title>Hello, Friend!</Components.Title>
              <Components.Paragraph>
                Enter Your personal details and start journey with us
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(false)}>
                Sign Up
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </div>
  );
}

export default Login;
