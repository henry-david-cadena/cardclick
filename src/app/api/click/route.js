import Event from "@/models/Event"

export async function POST(req) {
    // mongoose.connect(process.env.MONGODB_URI); -> This line block the process to register views and clicks

    const url = new URL(req.url);
    const clickedLink = atob(url.searchParams.get("url"));
    const page = url.searchParams.get("page");

    // With this Linefont, we have checked that target link is correct
    // console.log(clickedLink);

    await Event.create({type:"click", uri:clickedLink, page});

    return Response.json(true);
}