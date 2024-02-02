import { Schema, models, model } from "mongoose"

const EventSchema = new Schema(
    {
        type: String, // click or view 
        page: String, // for example: "henry"
        uri: String, // henry | https://
    },
    {
        timestamps: true,
    },
);

export default models && models.Event ? models.Event : model('Event', EventSchema);
// export const Event = models?Event || model('Event', EventSchema);