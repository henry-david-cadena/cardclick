"use client";

import { ReactSortable } from "react-sortablejs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SectionBox from "../layout/SectionBox";
import { faCloudArrowUp, faGripVertical, faLink, faPlus, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import SubmitButton from "../buttons/Submitbutton";
import { useState } from "react";
import { upload } from "@/libs/upload";
import Image from "next/image";
import { savePageLinks } from "@/actions/pageActions";
import toast from "react-hot-toast";

export default function PageLinksForm({page, user}) {

    const [links, setLinks] = useState(page.links || []);
    async function save() {  
        
        // Here, we have gotten to see all the links that we generated
        // console.log(links);
        await savePageLinks(links);
        toast.success("Saved!");
    }

    function addNewLink() {
        setLinks(prev => {
            return [...prev, {
                key: Date.now().toString(),
                title:"",
                subtitle:"",
                icon:"",
                url:"" 
            }];
        })
    }

    function handleUpload(event, linkKeyForUpload) {
        upload(event, uploadedImageUrl => {
            setLinks(prevLinks => {
                const newLinks = [...prevLinks];
                newLinks.forEach((link, index) => {
                    if (link.key === linkKeyForUpload) {
                        link.icon = uploadedImageUrl;
                    }
                })
                return newLinks;
            })
        })
    }

    function handleLinkChange(keyOfLinkToChange, prop, event) {
        setLinks(prev => {
            const newLinks = [...prev];
            newLinks.forEach((link) => {
                if (link.key === keyOfLinkToChange) {
                    link[prop] = event.target.value;
                }
            })
            return [...prev];
        })
    }

    function removeLink(linkKeyRemove) {
        setLinks(prevLinks => [...prevLinks].filter(l => l.key !== linkKeyRemove)
        )
    }

    return (
        <SectionBox>
            <form action={save}>
            <h2 className="text-2xl font-bold mb-4">Links</h2>
                <button
                    onClick={addNewLink}
                    type="button"
                    className="text-blue-500 text-lg flex gap-2 items-center"
                >
                    <FontAwesomeIcon className="bg-blue-500 text-white p-1 rounded-full aspect-square cursor-pointer" icon={faPlus}/>
                    <span>Add new</span>
                </button>
                {/* Test */}
                {/* {JSON.stringify(links)} */}
                <div className="">
                    <ReactSortable
                        handle={".handle"}
                        list={links}
                        setList={setLinks}
                    >
                        {links.map(l => (
                            <div key={l.key} className="mt-4 md:flex gap-6 items-center">
                                <div className="handle">
                                    <FontAwesomeIcon
                                        icon={faGripVertical}
                                        className="cursor-pointer text-gray-400 mr-2"/>
                                </div>
                                <div className="text-center">
                                    <div className="bg-gray-300 relative aspect-square overflow-hidden w-16 h-16 inline-flex items-center justify-center">
                                        {l.icon && (
                                            <Image
                                                className="w-full h-full object-cover"    
                                                src={l.icon}
                                                alt={"icon"}
                                                width={64}
                                                height={64}
                                            />
                                        )}
                                        {!l.icon && (
                                            <FontAwesomeIcon size="xl" icon={faLink}/>
                                        )}
                                    </div>
                                    <div>
                                        {/* Test */}
                                        {/* {JSON.stringify(l.icon)} */}
                                        <input
                                            onChange={(event) => handleUpload(event, l.key)}
                                            id={"icon" + l.key}
                                            type="file"
                                            className="hidden"
                                        />
                                        <label htmlFor={"icon" + l.key} className="border mt-2 p-2 flex items-center gap-1 text-gray-600 cursor-pointer mb-2 justify-center">
                                            <FontAwesomeIcon icon={faCloudArrowUp} />
                                            <span>
                                                Change icon
                                            </span>
                                        </label>
                                        <button
                                            onClick={() => removeLink(l.key)}
                                            type="button"
                                            className="w-full bg-gray-300 py-2 px-3 mb-2 h-full flex gap-2 items-center justify-center"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                            <span>Remove this link</span>
                                        </button>
                                    </div>
                                </div>
                                {/* We have checked the id we have created for each new link  */}
                                {/* {l.key} */}
                                <div className="grow">
                                    <label htmlFor="" className="input-label">Title:</label>
                                    <input
                                        value={l.title}
                                        onChange={event => handleLinkChange(l.key, "title", event)}
                                        type="text"
                                        placeholder="title"
                                    />
                                    {/* Test, when we enter a title we can see rendered below this input */}
                                    {/* {l.title} */}
                                    <label htmlFor="" className="input-label">Subtitle:</label>
                                    <input
                                        value={l.subtitle}
                                        onChange={event => handleLinkChange(l.key, "subtitle", event)}
                                        type="text"
                                        placeholder="subtitle (optional)" 
                                    />
                                    <label htmlFor="" className="input-label">Url:</label>
                                    <input
                                        value={l.url}
                                        onChange={event => handleLinkChange(l.key, "url", event)}
                                        type="text"
                                        placeholder="url"
                                    />
                                </div>
                            </div>
                        ))}
                    </ReactSortable>
                </div>
                <div className="border-t pt-4 mt-4">
                    <SubmitButton className="max-w-[200px] mx-auto">
                        <FontAwesomeIcon icon={faSave}/>
                        <span>Save</span>
                    </SubmitButton>
                </div>
            </form>
        </SectionBox>
    )
}
