"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Page } from "@/models/Page";
import { User } from "@/models/User";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export async function savePageSettings(formData) {

    mongoose.connect(process.env.MONGODB_URI);
    const session = await getServerSession(authOptions);

    if (session) {

        const dataKeys = [
            "displayName",
            "location",
            "bio",
            "bgType",
            "bgColor",
            "bgImage"
        ];

        const dataToUpdate = {};

        // this block replace the buttom block
        for (const key of dataKeys) {
            if (formData.has(key)) {
                dataToUpdate[key] = formData.get(key);
            }
        }

        // const displayName = formData.get("displayName");
        // const location = formData.get("location");
        // const bgType = formData.get("bgType");
        // const bio = formData.get("bio");
        // const bgColor = formData.get("bgColor");
        // const bgImage = formData.get("bgImage");
        // if (bgColor) dataToUpdate.bgColor = bgColor;
        // if (bgImage) dataToUpdate.bgImage = bgImage;

        await Page.updateOne(
            {owner:session?.user?.email},
            dataToUpdate,
        );

        if (formData.has("avatar")) {
            const avatarLink = formData.get("avatar");
            await User.updateOne(
                {
                    email: session.user?.email
                },
                {
                    image: avatarLink
                }

            )
        }
         
        return true;
    }

  return false;
}

export async function savePageButtons(formData) {
    mongoose.connect(process.env.MONGODB_URI);
    const session = await getServerSession(authOptions);

    if (session) {

        const buttonsValues = {};
        formData.forEach((value, key) => {
            buttonsValues[key] = value;
        });

        const dataToUpdate = {buttons:buttonsValues};
        await Page.updateOne(
            {owner:session?.user?.email},
            dataToUpdate,
        );
        return true;
    }
    return false;
}

export async function savePageLinks(links) {
    mongoose.connect(process.env.MONGODB_URI);
    const session = await getServerSession(authOptions);

    if (session) {
        // Test
        // console.log(links);
        await Page.updateOne(
            {owner:session?.user?.email},
            {links},
        )
    } else {
        return false;
    }
}