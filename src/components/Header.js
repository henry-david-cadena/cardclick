import { getServerSession } from "next-auth"
import Link from "next/link"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogoutButton from "./buttons/LogoutButton";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons';

export default async function Header() {

    const session = await getServerSession(authOptions);
    console.log(`Header Printing data of user session${session}`);

    return (
        <header className='bg-white border-b py-4'>
            <div className="max-w-4xl flex justify-between items-center mx-auto px-6">
                <div className='flex items-center gap-6 '>
                    <Link href={'/'} className="flex items-center gap-2 text-blue-500">
                        <FontAwesomeIcon icon={faShareNodes} className="text-blue-500 h-4"/>
                        <span className="font-bold">TarjetaClick</span>
                    </Link>
                    <nav className='flex items-center gap-4 text-gray-500 text-sm '>
                        <Link href={'/about'}>About</Link>
                        <Link href={'/pricing'}>Pricing</Link>
                        <Link href={'/contact'}>Contact</Link>
                    </nav>
                </div>
                <div>
                    <nav className='flex items-center gap-4 text-sm text-slate-500'>
                    {!!session && (
                        <>
                            <Link href={'/account'}>Hello, {session?.user?.name}</Link>
                            <LogoutButton />
                        </>
                    )}
                    {!session && (
                        <>
                            <Link href={'/login'}>Sign In</Link>
                            <Link href={'/login'}>Crate Account</Link>
                        </>
                    )}
                    </nav>
                </div>
            </div>
        </header>
      )
    }
