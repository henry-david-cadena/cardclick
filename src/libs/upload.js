import toast from "react-hot-toast";

export async function upload(event, callbackFn) {
    const file = event.target.files?.[0];

    if (file) {

        const uploadPromise = new Promise((resolve, reject) => {
            const data = new FormData();
            data.set("file", file);
            fetch("/api/upload", {
                method: "POST",
                body: data,
            }).then(response => {

                if (response.ok) {
                    response.json().then(link => {

                        // We have removed it, it is only for bgImage
                        // setBgImage(link);

                        callbackFn(link)
                        resolve(link);
                        // We don´t need anymore this line, we already have verified 
                        // console.log(link);
                    })
                } else {
                    reject();
                }
                
            })
        })

        await toast.promise(uploadPromise, {
            loading: "Uploading...",
            success: "Uploader",
            error: "Upload error!"
        })
    }
}