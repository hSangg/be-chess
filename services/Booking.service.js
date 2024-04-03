import reservations from "../models/reservations.model.js";

const bookingService = async (req, res) => {
    try {
        const { id, user_id, room_id, start_date, end_date, price } = req.body;
        if (!id || !user_id || !room_id || !start_date || !end_date || !price) {
            return res.status(400).json({
                status: "FAILED",
                message: "Missing fields"
            });
        }
        const [day, month, year] = start_date.split('/');
        const startDate = new Date(`${year}-${month}-${day}T00:00:00Z`);
        const [eday, emonth, eyear] = end_date.split('/');
        const endDate = new Date(`${eyear}-${emonth}-${eday}T00:00:00Z`);
        const millisecondsDiff = endDate.getTime() - startDate.getTime();
        const daysDiff = Math.floor(millisecondsDiff / (1000 * 60 * 60 * 24));
        const total = daysDiff * price;
        const createdAt = Date.now();
        const newReservations = new reservations({
            id,
            user_id,
            room_id,
            start_date: startDate,
            end_date: endDate,
            price,
            total,
            created_at: createdAt
        })
        const savedReservations = newReservations.save();
        return { reservations: savedReservations }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            status: "FAILED",
            message: "An error occurred",
            error: err.message
        });
        return { reservations: null }
    }
}

export { bookingService };