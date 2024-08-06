"use client";

import { useState } from "react"
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSignup } from "@/hooks/auth/useSignup";

export default function SingUpPage() {

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useSignup();
  const router = useRouter();
  
  const onSubmit = () => {
    if (!name || !email || !password || !company) {
      alert("Please enter information");
    } else {
      signup(name, company, email, password)
        .then((res) => {
          router.push("/auth/signin");
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <div className="signup flex w-screen h-screen">
      <div className="w-2/5 h-screen img-panel">

      </div>
      <div className="w-3/5 h-screen flex flex-wrap place-content-center main-board">
        <div className="text-white max-w-[500px]">
          <div className="text-center text-[48px] font-bold">Sign up</div>
          <div className="text-[18px]">Welcome to Alphaneural AI. To get started, please provide the following information.</div>
          <form
            className="mt-3"
            onSubmit={e => e.preventDefault()}
            noValidate
          >
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="common-input w-full my-4"
              type="text"
            />
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company Name"
              className="common-input w-full my-4"
              type="text"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="common-input w-full my-4"
              type="email"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="common-input w-full my-4"
              type="password"
            />
            <button
              onClick={onSubmit}
              className="common-btn w-full my-4 py-[12px]"
            >
              Create Account
            </button>
            <div className="flex flex-wrap justify-between items-center text-white">
              <div className="split-line w-2/5"></div>
              <div>or</div>
              <div className="split-line w-2/5"></div>
            </div>
            <button
              className="common-btn w-full my-4 py-[14px]"
            >
              <Image src="/images/ic-google.svg" alt="google icon" width={18} height={18}/>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}