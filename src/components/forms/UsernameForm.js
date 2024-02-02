"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import grabUsername from "@/actions/grabUsername";
import RightIcon from "../icons/RightIcon";
import SubmitButton from "../buttons/Submitbutton";

export default function UsernameForm({desiredUsername}) {

    const [taken, setTaken] = useState(false);

    async function handleSubmit(formData) {
        const result = await grabUsername(formData);

        console.log("FormData");
        console.log(result);

        setTaken(result === false);

        if (result) {
            redirect("/account?created="+formData.get("username"));
        }
    }

    return (
        <form
            action={handleSubmit}
        >
            <h1 className="text-4xl font-bold text-center mb-2">
                Grab your username
            </h1>
            <p className='text-center mb-6 text-gray-500'>
                Choose your username
            </p>
            <div className="max-w-xs mx-auto">
                <input
                    name="username"
                    defaultValue={desiredUsername}
                    className="block p-2 mx-auto border w-full mb-2 text-center"
                    type="text"
                    placeholder="username"
                />
                {/* ******************** If username is taken ******************** */}
                {taken && (
                    <div className="bg-red-200 border border-red-500 p-2 mb-2 text-center">
                        This username is taken
                    </div>
                )}  
                {/* ****************************************************************** */}
                <SubmitButton>
                    <span>Claim your username</span>
                    <RightIcon />
                </SubmitButton>
            </div>
        </form>
    )
}