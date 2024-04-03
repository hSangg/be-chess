import { bookingService } from "../services/Booking.service.js";

const booking = async (req, res) => {
    const { reservations } = await bookingService(req, res);
    if (reservations) {
        res.status(201).json({
            status: "SUCCESS",
            message: "Booking success",
            data: reservations
        });
    }
}

export { booking }