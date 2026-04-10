import { parseDateKey } from '../../utils/dateUtils';

export default function MyBookingsPage({ bookings, onCancelBooking }) {
  return (
    <main className="contentStack bookingsPage">
      <section className="neu-card">
        <h2>My bookings</h2>

        {bookings.length === 0 ? (
          <p className="mutedText">You have no bookings yet.</p>
        ) : (
          <div className="bookingList">
            {bookings.map((booking) => (
              <article className="bookingCard neu-inset" key={booking.id}>
                <div>
                  <strong>{booking.court}</strong>
                  <div className="mutedText smallText">
                    {parseDateKey(booking.date).toLocaleDateString()} • {booking.time}
                  </div>
                  <div className="mutedText smallText">
                    {booking.name} • {booking.phone}
                  </div>
                </div>

                <div className="bookingActions">
                  <span className="tinyText">ID: {booking.id}</span>
                  <button className="btn btn-danger" onClick={() => onCancelBooking(booking.id)}>
                    Cancel
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
