"use client";

import { useEffect } from "react";
import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";


export default function HeroForm({user}){

    const router = useRouter();

    useEffect(() => {

        if ('localStorage' in window && window.localStorage.getItem('desiredUsername')) {
          const username = window.localStorage.getItem('desiredUsername');
          window.localStorage.removeItem('desiredUsername');
          redirect('/account?desiredUsername=' + username);
        }

    },[]);

    async function handleSubmit(event) {
        event.preventDefault();
        console.log("Hero-Form Printing event: ");
        console.log(event);
        
        const form = event.target;
        console.log("Hero-Form Printing event.target: ");
        console.log(event.target);
        
        const input = form.querySelector('input');
        console.log("Hero-Form Printing input: ");
        console.log(input);
                
        const username = input.value;
        console.log(`Hero-Form-input value: ${input.value}`);

        if (username.length > 0) {
            if (user) {
              router.push("/account?desiredUsername=" + username);
            } else {
              window.localStorage.setItem("desiredUsername", username);
              await signIn('google');
            }
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className='inline-flex items-center shadow-lg bg-white shadow-gray-700/20'
        >
            <span className='bg-white py-4 pl-4'>
                tarjeta.click/
            </span>
            <input
                type="text" 
                className='' 
                style={{backgroundColor:"white", marginBottom:0, paddingLeft:0}}
                placeholder='username'
            />
            <button type="submit" className='bg-blue-500 py-4 px-6 text-white whitespace-nowrap'>
                Join for Free
            </button>
        </form>
    )
}