'use client'

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useLogin } from "@/hooks/auth/useLogin";
import { useCallback } from "react";
import { Checkbox } from "@mui/material";
import { FormControlLabel } from "@mui/material";
// import { LoginSocialGoogle, IResolveParams } from "reactjs-social-login";
import { GoogleLoginButton } from "react-social-login-buttons";
// import { google } from "googleapis";
// import { GoogleApis } from "googleapis";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useLogin();
  const router = useRouter();
  // const { OAuth2  } = google.auth;
  // const oAuth2Client = new OAuth2(
  //   '376096574131-7nqpivsaqhfu1mag96grv8i5kqk3t3hp.apps.googleusercontent.com',
  //   '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',
  //   'http://localhost:3000/api/auth/callback/google'
  // );

  // const getEmailFromAuthorizationCode = async (code: string) => {
  //   const { tokens } = await oAuth2Client.getToken(code);
  //   oAuth2Client.setCredentials(tokens);
  //   const userInfo = await google.oauth2('v2').userinfo.get({ auth: oAuth2Client });
  //   return userInfo.data.email;
  // };

  // const getEmailFromCode = async (code: string) => {
  //   console.log('-----start-----');
  //   await axios.post('https://oauth2.googleapis.com/token', {
  //     code,
  //     client_id: '376096574131-7nqpivsaqhfu1mag96grv8i5kqk3t3hp.apps.googleusercontent.com',
  //     client_secret: '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',
  //     redirect_uri: 'http://localhost:3000/api/auth/callback/google',
  //     grant_type: 'authorization_code',
  //   })
  //   .then(response => {
  //     console.log(response.data);
  //   });
  //   console.log('-----end-----');
  // }

  const [provider, setProvider] = useState('');
  const [profile, setProfile] = useState<any>();

  const onLoginStart = useCallback(() => {
    alert('login start');
  }, []);

  const onLogoutSuccess = useCallback(() => {
    setProfile(null);
    setProvider('');
    alert('logout success');
  }, []);

  const onLogout = useCallback(() => {}, []);

  const onSubmit = () => {
    if (!email || !password) {
      alert("Please enter information");
    } else {
      login(email, password)
        .then((res) => {
          console.log(res);
          // router.push("/profile");
        })
        .catch((e) => alert(e));
    }
  };

  return (
    <main className="signin w-screen h-screen flex flex-wrap place-content-center">
      <div className="mainboard max-w-[480px] max-h-[689px] sm:w-[480px] w-[90%] text-white">
        <div className="text-center text-[48px] font-bold">
          Log in
        </div>
        <form
          className="container"
          onSubmit={e => e.preventDefault()}
          noValidate
        >
          <label className="text-[12px]">Enter your email address</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="common-input w-full my-4"
            placeholder="johndoe@gmail.com"
          />
          <label className="text-[12px]">Enter your password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="common-input w-full my-4"
            placeholder="Type your password"
            type="password"
          />
          <div className="flex">
            <FormControlLabel control={<Checkbox />} label="Remeber Me" />
            <Link href="" className="my-auto ml-auto">Forgot Password?</Link>
          </div>
          <button
            onClick={onSubmit}
            className="common-btn w-full py-[12px]"
          >
            Log in
          </button>
          <div className='flex flex-wrap justify-between items-center text-white mt-[30px]'>
            <div className='split-line w-2/5'></div>
            <div>or</div>
            <div className='split-line w-2/5'></div>
          </div>
          <button
            // onClick={onSubmit}
            className="common-btn w-full py-[16px] mt-[30px]"
          >
            <Image src="/images/ic-google.svg" alt="google icon" width={18} height={18}/>
          </button>
          
          {/* <GoogleLogin
            clientId='750233282526-gfhofd3al0qtodt7or56vv1mtngofpn8.apps.googleusercontent.com'
            render={renderProps => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="common-btn w-full py-[16px] mt-[30px]"
              >
                <Image src="/images/ic-google.svg" alt="google icon" width={18} height={18}/>
              </button>
            )}
            buttonText="Continue with Google"
            onSuccess={responseGoogleSuccess}
            onFailure={responseGoogleFailure}
            cookiePolicy={'single_host_origin'}
            redirectUri='http://localhost:3000/api/auth/callback/google'
          /> */}
          <div className='w-full text-[14px] text-center text-white mt-[70px]'>
            <span>Don't have an account yet?</span>
            <Link
              href="/auth/signup"
              className='cursor-pointer ml-[5px]'
            >Sign up</Link>
          </div>
        </form>
        {/* <LoginSocialGoogle
          client_id='376096574131-7nqpivsaqhfu1mag96grv8i5kqk3t3hp.apps.googleusercontent.com'
          onLoginStart={onLoginStart}
          redirect_uri="http://localhost:3000/api/auth/callback/google"
          scope="profile email"
          discoveryDocs="claims_supported"
          access_type="offline"
          onResolve={({ provider, data }: IResolveParams) => {
            setProvider(provider);
            setProfile(data);
            // getEmailFromAuthorizationCode(data.code);
            console.log(data);
          }}
          onReject={(err: any) => {
            console.log(err);
          }}
        >
          <GoogleLoginButton className="bg-black"/>
        </LoginSocialGoogle> */}
      </div>
    </main>
  )
}