import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import mongoose from "mongoose";
import { Page } from "@/models/Page";

import UsernameForm from "@/components/forms/UsernameForm";
import PageSettingsForm from "@/components/forms/PageSettingsForm";
import PageButtonsForm from "@/components/forms/PageButtonsForm";
import PageLinksForm from "@/components/forms/PageLinksForm";
import cloneDeep from 'clone-deep';

// We have checked that request has params, and searchParams, now instead of use all request properties, we will use only searchParams 
// export default async function AccountPage({request}) {
export default async function AccountPage({searchParams}) {

    // console.log("--- Printing request of Account Page:---");
    // console.log(request);
    
    console.log("--- Printing searchParams of Account Page:---");
    console.log(searchParams);

    const session = await getServerSession(authOptions);
    const desiredUsername = searchParams?.desiredUsername;

    if (!session) {
        redirect("/");
    }

    mongoose.connect(process.env.MONGODB_URI);

    // _____________________________________________________________
    // Take care, if doesn't exist data on the data base, we will obtain an error:
    // Internal error: MongooseError: Operation `pages.findOne()` buffering timed out after 10000ms
    // This error occurs due to this block of code

    // const page = await Page.findOne({owner: session?.user?.email});

    // if (page) {
    //     return (
    //         <div>
    //             Your page es: /{page.uri}
    //         </div>
    //     );
    // }
    // _____________________________________________________________


    const page = await Page.findOne({owner: session?.user?.email});
    const leanPage = cloneDeep(page.toJSON());
    leanPage._id = leanPage._id.toString();

    if (page) {
        return (
            // Instead of this block we will use PageSettingsForm
            // <div>
            //     Your page is: /{page.uri}
            // </div>
            <>
                <PageSettingsForm page={leanPage} user={session.user}/>
                <PageButtonsForm page={leanPage} user={session.user}/> 
                <PageLinksForm page={leanPage} user={session.user}/>
            </>
        );
    }

    return (
        <div>
            {/* Test */}
            {/* account: {session?.user?.name} <br />
            desiredUsername: {desiredUsername} */}
            <UsernameForm desiredUsername={desiredUsername}/>
            {/* Your page es: /{JSON.stringify(page.uri)} */}
        </div>
    )
}
