"use client"

import Image from "next/image"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCloudArrowUp, faPalette, faSave } from "@fortawesome/free-solid-svg-icons"
import { faImage } from "@fortawesome/free-solid-svg-icons"

import RadioTogglers from "../formItems/RadioTogglers"
import SubmitButton from "../buttons/Submitbutton"

import { savePageSettings } from "@/actions/pageActions"

import toast from "react-hot-toast"
import { useState } from "react"

import SectionBox from "../layout/SectionBox"
import { upload } from "@/libs/upload"

export default function PageSettingsForm({page, user}) {

    const [bgType, setBgType] = useState(page.bgType);
    // Create state for bgColor
    const [bgColor, setBgColor] = useState(page.bgColor);

    const [bgImage, setBgImage] = useState(page.bgImage);

    const [avatar, setAvatar] = useState(user?.image);

    async function saveBaseSettings(formData) {

        // We have checked that when we click on the button, we can see in console the information that the user introduced
        console.log(formData);
        console.log(formData.get("displayName"));

        const result = await savePageSettings(formData);

        if (result) {
            toast.success("Saved!");
        }

        // console.log({result});
    }

    // We have removed this upload function and we created a new file inside libs folder
    // async function upload(event, callbackFn) {
    //     const file = event.target.files?.[0];

    //     if (file) {

    //         const uploadPromise = new Promise((resolve, reject) => {
    //             const data = new FormData();
    //             data.set("file", file);
    //             fetch("/api/upload", {
    //                 method: "POST",
    //                 body: data,
    //             }).then(response => {

    //                 if (response.ok) {
    //                     response.json().then(link => {

    //                         // We have removed it, it is only for bgImage
    //                         // setBgImage(link);

    //                         callbackFn(link)
    //                         resolve(link);
    //                         // We don´t need anymore this line, we already have verified 
    //                         // console.log(link);
    //                     })
    //                 } else {
    //                     reject();
    //                 }
                    
    //             })
    //         })

    //         await toast.promise(uploadPromise, {
    //             loading: "Uploading...",
    //             success: "Uploader",
    //             error: "Upload error!"
    //         })
    //     }
    // }

    async function handleCoverImageChange(event) {

        await upload(event, link => {
            setBgImage(link);
        })
        // const file = event.target.files?.[0];

        // // console.log(file);

        // if (file) {

        //     const uploadPromise = new Promise((resolve, reject) => {
        //         const data = new FormData();
        //         data.set("file", file);
        //         fetch("/api/upload", {
        //             method: "POST",
        //             body: data,
        //         }).then(response => {

        //             if (response.ok) {
        //                 response.json().then(link => {

        //                     setBgImage(link);

        //                     resolve();
        //                     // We don´t need anymore this line, we already have verified 
        //                     // console.log(link);
        //                 })
        //             } else {
        //                 reject();
        //             }
                    
        //         })
        //     })

        //     await toast.promise(uploadPromise, {
        //         loading: "Uploading...",
        //         success: "Uploader",
        //         error: "Upload error!"
        //     })
        // }
    }

    async function handleAvatarImageChange(event) {
        await upload(event, link => {
            setAvatar(link);
        })
    }

    return (
        <div>
            <SectionBox>
                <form action={saveBaseSettings}>
                    <div
                        className="py-4 -m-4 min-h-[300px] flex justify-center items-center bg-cover bg-center"
                        style={
                            bgType === "color"
                                ? {backgroundColor: bgColor}
                                : {backgroundImage: `url(${bgImage})`} 
                        }
                    >
                        <div>
                            <RadioTogglers
                                defaultValue={page.bgType}
                                options={[
                                    {
                                        value:"color",
                                        icon: faPalette,
                                        label: "Color"
                                    },
                                    {
                                        value:"image",
                                        icon: faImage,
                                        label: "Image"
                                    },
                                ]}
                                onChange={value => setBgType(value)}
                            />
                                {bgType === "color" && (
                                    <div className="bg-gray-200 shadow text-gray-700 p-2 mt-2">
                                        <div className="flex gap-2 justify-center">
                                            <span>Background color:</span>
                                            <input
                                                onChange={event => setBgColor(event.target.value)}
                                                type="color"
                                                name="bgColor"
                                                defaultValue={page.bgColor}
                                            />
                                        </div>
                                    </div>
                                )}
                                {bgType === "image" && (
                                    <div className="flex justify-center ">
                                        
                                        <label
                                            className="bg-white shadow px-4 py-2 mt-2 flex gap-2"
                                        >
                                            <input
                                                type="hidden"
                                                name="bgImage"
                                                value={bgImage}
                                            />
                                            <input
                                                type="file"
                                                onChange={handleCoverImageChange}
                                                className="hidden"
                                            />
                                            <div className="flex gap-2 items-center cursor-pointer">
                                                <FontAwesomeIcon
                                                icon={faCloudArrowUp}
                                                className="text-gray-700"/>
                                                <span>Change image</span>
                                            </div>
                                        </label>
                                    </div>
                                )}
                            
                        </div>
                    </div>
                    <div className="flex justify-center -mb-10">
                        <div className="relative -top-8 w-[128px] h-[128px]">
                            <div className="overflow-hidden h-full rounded-full border-4 border-white shadow shadow-black/50">
                                <Image
                                    className="w-full h-full object-cover"
                                    src={avatar}
                                    alt={"avatar"}
                                    width={128}
                                    height={128}
                                />
                            </div>
                            <label
                                htmlFor="avatarIn"
                                className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow shadow-black/50 aspect-square flex items-center text-gray-700 cursor-pointer">
                            <FontAwesomeIcon size={"xl"} icon={faCloudArrowUp}/>
                            </label>
                            <input onChange={handleAvatarImageChange} id="avatarIn" type="file" className="hidden"/>
                            <input
                                type="hidden"
                                name="avatar"
                                value={avatar}
                            />
                        </div>
                    </div>
                    <div className="px-0 py-4">
                        <label className="input-label" htmlFor="nameIn">Display name</label>
                        <input
                            type="text"
                            id="nameIn"
                            name="displayName"
                            defaultValue={page.displayName}
                            placeholder="John Doe"
                        />
                        <label className="input-label" htmlFor="locationIn">Location</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            defaultValue={page.location}
                            placeholder="Somewhere in the world"
                        />
                        <label className="input-label" htmlFor="bioIn">Bio</label>
                        <textarea
                            name="bio"
                            defaultValue={page.bio}
                            id="bioIn"
                            placeholder="Your bio goes here..."
                        />
                        <div className="max-w-[200px] mx-auto mt-4">
                            <SubmitButton >
                                <FontAwesomeIcon icon={faSave}/>
                                <span>Save</span>
                            </SubmitButton>
                        </div>
                    </div>
                </form>
            </SectionBox>   
        </div>
    )
}
