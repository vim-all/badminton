import { BOOKING_VIEW } from '../../constants/appConstants';

export default function AppHeader({
  isLandingRoute,
  isBookingsRoute,
  isAdminRoute,
  view,
  bookingsCount,
  onNavigate,
  onChangeView,
}) {
  return (
    <header className="heroBar neu-card">
      <div>
        <p className="heroOverline">Premium Indoor Arena</p>
        <h1>Aurora Badminton Club</h1>
        <p className="mutedText">
          {isLandingRoute
            ? 'Book courts faster with a premium experience'
            : 'badminton booking portal • Admin-controlled slot inventory'}
        </p>
      </div>

      <div className="topActions">
        {isLandingRoute && (
          <>
            <button className="btn btn-primary" onClick={() => onNavigate('/bookings')}>
              Explore Bookings
            </button>
            <button className="btn btn-soft" onClick={() => onNavigate('/admin')}>
              Admin
            </button>
          </>
        )}

        {isBookingsRoute && (
          <>
            <button className="btn btn-soft" onClick={() => onNavigate('/')}>
              Home
            </button>
            <button
              className={`btn ${view === BOOKING_VIEW.book ? 'btn-primary' : 'btn-soft'}`}
              onClick={() => onChangeView(BOOKING_VIEW.book)}
            >
              Book
            </button>
            <button
              className={`btn ${view === BOOKING_VIEW.myBookings ? 'btn-primary' : 'btn-soft'}`}
              onClick={() => onChangeView(BOOKING_VIEW.myBookings)}
            >
              My Bookings ({bookingsCount})
            </button>
          </>
        )}

        {isAdminRoute && (
          <>
            <button className="btn btn-soft" onClick={() => onNavigate('/')}>
              Home
            </button>
            <button className="btn btn-primary" onClick={() => onNavigate('/bookings')}>
              Go to Bookings
            </button>
          </>
        )}
      </div>
    </header>
  );
}
