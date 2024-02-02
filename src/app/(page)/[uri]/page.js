import { Page } from "@/models/Page";
import mongoose from "mongoose";
import Image from "next/image";
import { User } from "@/models/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLink, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { faDiscord, faFacebook, faGithub, faInstagram, faTelegram, faTiktok, faWhatsapp, faYoutube } from "@fortawesome/free-brands-svg-icons";
import Event from "@/models/Event";

const buttonIcons = {
    email: faEnvelope,
    mobile: faPhone,
    instagram: faInstagram,
    facebook: faFacebook,
    discord: faDiscord,
    tiktok: faTiktok,
    youtube: faYoutube,
    whatsapp: faWhatsapp,
    github: faGithub,
    telegram: faTelegram
}

function buttonLink(key, value) {
    if (key === "mobile") {
        return "tel:"+value;
    }
    if (key === "email") {
        return "mailto:"+value;
    }
    return value;
}

export default async function UserPage({params}) {
    const uri = params.uri;

    mongoose.connect(process.env.MONGODB_URI);
    const page = await Page.findOne({uri});
    const user = await User.findOne({email:page.owner});
    await Event.create({uri:uri, page:uri, type:"view"});

  return (
    // We have verified that we are receiving inside props
    // {"params":{"uri":"henry"},"searchParams":{}}
    // <div>
    //     {JSON.stringify(props)}
    // </div>

    // <div>       
    //     {JSON.stringify(uri)}
    // </div>
    <div className="bg-blue-950 text-white min-h-screen">
        {/* We have checked, what object user print on screen */}
        {/* {JSON.stringify(user)} */}
        <div 
            className="h-64 bg-gray-400 bg-cover bg-center"
            style={
                page.bgType === "color"
                    ? {backgroundColor: page.bgColor}
                    : {backgroundImage: `url(${page.bgImage})`} 
            }
        >
        </div>
        <div className="aspect-square w-36 h-36 mx-auto relative -top-16 -mb-12">
            <Image
                className="rounded-full w-full h-full object-cover"
                src={user.image}
                alt="avatar"
                width={256}
                height={256}
            />
        </div>
        <h2 className="text-2xl text-center mb-1">{page.displayName}</h2>
        <h3 className="text-md flex gap-2 justify-center items-center text-white/70">
            <FontAwesomeIcon className="h-4" icon={faLocationDot}/>
            <span>
                {page.location}
            </span>
        </h3>
        <div className="max-w-xl mx-auto text-center my-2">
            <p>
                {page.bio}
            </p>
        </div>
        <div className="flex gap-2 justify-center mt-4 pb-4">
            {/* We have checked that page.buttons is an object, isn't an array */}
            {/* {JSON.stringify(page.buttons)} */}
            {Object.keys(page.buttons).map(buttonKey => (
                <Link 
                    key={buttonKey}
                    href={buttonLink(buttonKey, page.buttons[buttonKey])}
                    className="rounded-full bg-white text-blue-950 p-2 flex justify-center items-center"
                >
                    <FontAwesomeIcon className="w-5 h-5" icon={buttonIcons[buttonKey]}/> 
                    {/* We have obtained the key and the value */}
                    {/* {buttonKey}
                    {page.buttons[buttonKey]} */}
                </Link>
            ))}
        </div>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 p-4">
            {page.links.map(link => (
                <Link
                    key={link.url}
                    ping={process.env.URL+"/api/click?url="+btoa(link.url)+"&page="+page.uri}
                    // We have verified that we can resolve with encodeURI as well
                    // ping={process.env.URL+"/api/click?url="+encodeURI(link.url)}
                    className="bg-blue-900 py-2 px-4 flex"
                    href={link.url}
                    target="_blank">
                    <div className="bg-blue-700 aspect-square relative -left-6 w-16 h-16 overflow-hidden flex justify-center items-center ">
                        {link.icon && <Image src={link.icon} alt={"icon"} width={64} height={64}/>}
                        {!link.icon && <FontAwesomeIcon className="w-8 h-8" icon={faLink}/>}
                    </div>
                    <div className="flex justify-center items-center">
                        <div>
                            <h3>
                                {link.title}
                            </h3>
                            <p className="text-white/50 text-sm h-10">
                                {link.subtitle}
                            </p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    </div>
  )
}
