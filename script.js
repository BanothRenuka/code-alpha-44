class Room {
    constructor(type, price) {
        this.type = type;
        this.price = price;
    }
}

class Booking {
    constructor(name, roomType, nights, total) {
        this.id = Date.now();
        this.name = name;
        this.roomType = roomType;
        this.nights = nights;
        this.total = total;
    }
}

// Room data (availability simulation)
const rooms = {
    Standard: new Room("Standard", 100),
    Deluxe: new Room("Deluxe", 200),
    Suite: new Room("Suite", 350)
};

function bookRoom() {
    const roomType = document.getElementById("roomType").value;
    const guestName = document.getElementById("guestName").value;
    const nights = parseInt(document.getElementById("nights").value);

    if (!roomType || !guestName || !nights) {
        alert("Please fill all fields");
        return;
    }

    const room = rooms[roomType];
    const totalAmount = room.price * nights;

    // Payment simulation
    const confirmPayment = confirm(`Total Amount: $${totalAmount}\nProceed to payment?`);
    if (!confirmPayment) return;

    const booking = new Booking(guestName, roomType, nights, totalAmount);

    const bookings = getBookings();
    bookings.push(booking);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    displayBookings();
}

function getBookings() {
    return JSON.parse(localStorage.getItem("bookings")) || [];
}

function cancelBooking(id) {
    let bookings = getBookings();
    bookings = bookings.filter(b => b.id !== id);
    localStorage.setItem("bookings", JSON.stringify(bookings));
    displayBookings();
}

function displayBookings() {
    const list = document.getElementById("bookingList");
    list.innerHTML = "";

    const bookings = getBookings();

    bookings.forEach(b => {
        const div = document.createElement("div");
        div.className = "booking-card";
        div.innerHTML = `
            <strong>${b.name}</strong><br>
            Room: ${b.roomType}<br>
            Nights: ${b.nights}<br>
            Total: $${b.total}
            <br>
            <button class="cancel-btn" onclick="cancelBooking(${b.id})">Cancel</button>
        `;
        list.appendChild(div);
    });
}

// Load bookings on page refresh
displayBookings();
