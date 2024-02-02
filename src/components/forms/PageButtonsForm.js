"use client";

import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faGripVertical, faMobile, faPlus, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
    faDiscord, 
    faFacebook, 
    faGithub, 
    faInstagram, 
    faTelegram, 
    faTiktok, 
    faWhatsapp, 
    faYoutube
} from "@fortawesome/free-brands-svg-icons";
import SectionBox from "@/components/layout/SectionBox";
import SubmitButton from "../buttons/Submitbutton";
import { savePageButtons } from "@/actions/pageActions";
import toast from "react-hot-toast";

export const allButtons = [
    {
        key: 'email',
        'label': 'e-mail',
        icon: faEnvelope,
        placeholder: 'test@example.com'
    },
    {
        key: 'mobile',
        'label': 'mobile',
        icon: faMobile,
        placeholder: '+593 123 123 123'
    },
    {
        key: 'instagram',
        'label': 'instagram', 
        icon: faInstagram,
        placeholder: 'https://www.instagram.com/profile/...'
    },
    {
        key: 'facebook', 
        'label': 'facebook', 
        icon: faFacebook
    },
    {
        key: 'discord', 
        'label': 'discord', 
        icon: faDiscord
    },
    {
        key: 'tiktok', 
        'label': 'tiktok', 
        icon: faTiktok
    },
    {
        key: 'youtube', 
        'label': 'youtube', 
        icon: faYoutube
    },
    {
        key: 'whatsapp', 
        'label': 'whatsapp', 
        icon: faWhatsapp
    },
    {
        key: 'github',
        'label': 'github',
        icon: faGithub
    },
    {
        key: 'telegram',
        'label': 'telegram',
        icon: faTelegram
    },
];

function upperFirst(str) {
    return str.slice(0,1).toUpperCase() + str.slice(1);
}

export default function PageButtonsForm({user, page}) {

    const pageSavedButtonKeys = Object.keys(page.buttons);
    const pageSavedButtonsInfo = pageSavedButtonKeys.map(k => allButtons.find(b => b.key === k));
    const [activeButtons, setActiveButtons] = useState(pageSavedButtonsInfo);

    function addButtonToProfile(button) {
        setActiveButtons(prevButtons => {
            return [...prevButtons, button];
        });
    }

    async function saveButtons(formData) {
        await savePageButtons(formData);
        toast.success("Setting saved!");
    }

    function removeButton({key:keyToRemove}) {
        setActiveButtons(prevButtons => {
            return prevButtons.filter(button => button.key !== keyToRemove)
        })
    }

    const availableButtons = allButtons.filter(b1 => !activeButtons.find(b2 => b1.key === b2.key));

    return (
        <SectionBox>
            {/* This is only a test, to check, if we have gotten the active buttons from the data base */}
            {/* {JSON.stringify(pageSavedButtonKeys)} */}
            <form action={saveButtons}>
                <h2 className="text-2xl font-bold mb-4">Buttons</h2>
                <ReactSortable
                    handle={".handle"}
                    list={activeButtons}
                    setList={setActiveButtons}
                >
                    {activeButtons.map(activeButton => (
                        <div 
                            key={activeButton.key}
                            className="mb-4 md:flex items-center"
                        >
                            <div className="w-48 flex h-full text-gray-700 gap-2 p-2 items-center">
                                <div className="handle">
                                    <FontAwesomeIcon icon={faGripVertical} className="cursor-pointer text-gray-400 mr-2"/>
                                </div>
                                <FontAwesomeIcon icon={activeButton.icon}/>
                                <span>
                                    {upperFirst(activeButton.label)}:
                                </span>
                            </div>
                            <div className="grow flex">
                                <input
                                    name={activeButton.key}
                                    type="text"
                                    style={{marginBottom:"0"}}
                                    placeholder={activeButton.placeholder}
                                    defaultValue={page.buttons[activeButton.key]}
                                />
                                <button
                                    onClick={() => removeButton(activeButton)}
                                    type="button"
                                    className="py-2 px-4 bg-gray-300 cursor-pointer">
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        </div>
                    ))}
                </ReactSortable>
                <div className="flex flex-wrap gap-2 mt-4 border-y py-4">
                    {availableButtons.map(button => (
                        <button
                            type="button"
                            onClick={() => addButtonToProfile(button)}
                            key={button.key} 
                            className="flex items-center gap-1 p-2 bg-gray-200"
                        >
                            <FontAwesomeIcon icon={button.icon} />
                                <span className="">
                                    {/* We have converted this line into a function */}
                                    {/* {button.label.slice(0,1).toUpperCase() + button.label.slice(1)} */}
                                    {upperFirst(button.label)}
                                </span>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    ))}   
                </div>
                <div className="max-w-[200px] mx-auto mt-4">
                    <SubmitButton>
                        <FontAwesomeIcon icon={faSave}/>
                        <span>
                            Save
                        </span>
                    </SubmitButton>
                </div>
            </form>
        </SectionBox>
    )
}
