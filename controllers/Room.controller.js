import { addRoomService, getRoomService } from "../services/Room.service.js";

const addRoom = async (req, res) => {
    const { room, err, message, status } = await addRoomService(req, res);
    if (room) {
        res.status(status).json({
            status: "SUCCESS",
            message: message,
            room: room
        })
    }
    else {
        res.status(status).json({
            status: "FAILED",
            message: message,
            error: err
        })
    }
}

const getRoom = async (req, res) => {
    const { rooms, err, message, status } = await getRoomService(req, res);
    if (rooms) {
        res.status(status).json({
            status: status,
            message: message,
            rooms: rooms
        })
    }
    else {
        res.status(status).json({
            status: status,
            message: message,
            error: err
        })
    }
}
export { addRoom, getRoom }