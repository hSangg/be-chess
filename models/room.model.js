import { Mongoose } from "mongoose";

const roomSchema = new Mongoose.roomSchema({
    name: {
        type: String
    },
    summary: {
        type: String
    },
    transit: String,
    house_rules: String,
    thumbnail_url: String,
    host: Object,
    street: String,
    smart_location: String,
    country: String,
    latitude: String,
    longtitude: String,
    room_type: String,
    bathRooms: Number,
    bedRooms: Number,
    beds: Number,
    price: Number,
    weekly_price: Number,
    review: String
})

export default Mongoose.model('room', roomSchema)