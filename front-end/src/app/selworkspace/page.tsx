'use client'

import CustomSelect from '../../components/CustomSelect';
import { useState } from 'react';


export default function SelWorkspace() {
  const [options, setOptions] = useState([
    {
      label: "Option 1",
      value: "opt1",
    },
    {
      label: "Option 2",
      value: "opt2",
    },
    {
      label: "Option 3",
      value: "opt3",
    },
  ]);
  
  const handleChangeSelect = (e: any) => {
    console.log(e)
  };

  const isSearchable: boolean = false;


  return (
    <div className="sel-workspace w-screen h-screen flex flex-wrap place-content-center">
      <div className="mainboard max-w-[480] text-white px-12 py-10">
        <div className="text-center text-[36px] font-bold">
          Welcome to AlphaNeural AI
        </div>
        <p className="text-center pt-5 pb-10 text-[18px]">Let's get started by choosing your industry</p>
        <CustomSelect
          isSearchable={true}
          options={options}
          placeHolder="Choose Industry"
          onChange={(e: any) => handleChangeSelect(e)}
          isMulti={false}
        >
        </CustomSelect>
        <div className="flex justify-between pt-9">
          <div className="flex ai-role-btn px-10 py-4 text-[14px] rounded-[20px] relative cursor-pointer">
            AI Contributor
            <div className='ic-info p-1 rounded-full absolute right-2'>
              <svg className="text-white text-[14px] fill-white" width={14} height={14} viewBox="0 0 192 512">
                <path d="M160 448h-32V224c0-17.69-14.33-32-32-32L32 192c-17.67 0-32 14.31-32 32s14.33 31.1 32 31.1h32v192H32c-17.67 0-32 14.31-32 32s14.33 32 32 32h128c17.67 0 32-14.31 32-32S177.7 448 160 448zM96 128c26.51 0 48-21.49 48-48S122.5 32.01 96 32.01s-48 21.49-48 48S69.49 128 96 128z">
                </path>
              </svg>
            </div>
          </div>
          <div className="flex ai-role-btn px-10 py-4 text-[14px] rounded-[20px] relative cursor-pointer">
            AI Consumer
            <div className='ic-info p-1 rounded-full absolute right-2'>
              <svg className="text-white text-[14px] fill-white" width={14} height={14} viewBox="0 0 192 512">
                <path d="M160 448h-32V224c0-17.69-14.33-32-32-32L32 192c-17.67 0-32 14.31-32 32s14.33 31.1 32 31.1h32v192H32c-17.67 0-32 14.31-32 32s14.33 32 32 32h128c17.67 0 32-14.31 32-32S177.7 448 160 448zM96 128c26.51 0 48-21.49 48-48S122.5 32.01 96 32.01s-48 21.49-48 48S69.49 128 96 128z">
                </path>
              </svg>
            </div>
          </div>
        </div>
        <div className='text-center py-7'>
          <p className='text-[18px] pb-3'>Care to invite your team members?</p>
          <input type='' placeholder='Enter email address' className='common-input w-full' />
          <p className='text-[18px] pb-3 cursor-pointer pt-3'>Click here to add more team member</p>
        </div>
        <div className='common-btn py-3'>
          Continue
        </div>
      </div>
    </div>
  )
}