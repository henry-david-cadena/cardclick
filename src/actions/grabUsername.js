"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import mongoose from "mongoose";
import { Page } from "@/models/Page";

export default async function grabUsername(formData) {

    console.log("Form data: ");
    console.log(formData);

    const username = formData.get('username');

    mongoose.connect(process.env.MONGODB_URI);

    const existingPageDoc = await Page.findOne({uri:username});

    if (existingPageDoc) {
        return false;
    } else {
        const session = await getServerSession(authOptions);
        
        return await Page.create(
            {
                uri:username,
                owner:session?.user?.email
            }
        );
    }
}
