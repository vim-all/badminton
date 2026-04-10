import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import AdminPanel from './components/admin/AdminPanel';
import BookingsPage from './components/bookings/BookingsPage';
import MyBookingsPage from './components/bookings/MyBookingsPage';
import LandingPage from './components/landing/LandingPage';
import AppHeader from './components/layout/AppHeader';
import AdminLoginModal from './components/modals/AdminLoginModal';
import BookingModal from './components/modals/BookingModal';
import { BOOKING_VIEW, COURTS, ROUTES, STORAGE_KEYS } from './constants/appConstants';
import { buildWeek, formatFull, keyOfDate } from './utils/dateUtils';

export default function App() {
  const days = useMemo(() => buildWeek(), []);

  const [selectedDay, setSelectedDay] = useState(keyOfDate(days[0]));
  const [path, setPath] = useState(window.location.pathname || ROUTES.landing);

  const [bookings, setBookings] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);

  const [view, setView] = useState(BOOKING_VIEW.book);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);

  const [slotToBook, setSlotToBook] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    const rawBookings = localStorage.getItem(STORAGE_KEYS.bookings);
    const rawSlots = localStorage.getItem(STORAGE_KEYS.slots);

    if (rawBookings) {
      try {
        setBookings(JSON.parse(rawBookings));
      } catch {
        setBookings([]);
      }
    }

    if (rawSlots) {
      try {
        setAvailableSlots(JSON.parse(rawSlots));
      } catch {
        setAvailableSlots([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.bookings, JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.slots, JSON.stringify(availableSlots));
  }, [availableSlots]);

  useEffect(() => {
    const syncPath = () => setPath(window.location.pathname || ROUTES.landing);

    window.addEventListener('popstate', syncPath);
    return () => window.removeEventListener('popstate', syncPath);
  }, []);

  useEffect(() => {
    if (path === ROUTES.admin && !adminAuthenticated) {
      setShowAdminLogin(true);
    }
  }, [path, adminAuthenticated]);

  const navigateTo = (to) => {
    if (window.location.pathname !== to) {
      window.history.pushState({}, '', to);
    }

    setPath(to);
  };

  const slotIsBooked = (slot) =>
    bookings.some((booking) => {
      return (
        booking.date === slot.date &&
        booking.court === slot.court &&
        booking.time === slot.time
      );
    });

  const getSlotsForSelectedDayAndCourt = (court) =>
    availableSlots.filter((slot) => slot.date === selectedDay && slot.court === court);

  const createSlot = (slot) => {
    const exists = availableSlots.some(
      (existingSlot) =>
        existingSlot.date === slot.date &&
        existingSlot.court === slot.court &&
        existingSlot.time === slot.time
    );

    if (exists) {
      alert('Slot already exists.');
      return;
    }

    setAvailableSlots((prev) => [...prev, slot]);
  };

  const deleteSlot = (slot) => {
    const confirmed = window.confirm('Delete this slot and related bookings?');
    if (!confirmed) return;

    setAvailableSlots((prev) => {
      return prev.filter(
        (currentSlot) =>
          !(
            currentSlot.date === slot.date &&
            currentSlot.court === slot.court &&
            currentSlot.time === slot.time
          )
      );
    });

    setBookings((prev) => {
      return prev.filter(
        (booking) =>
          !(booking.date === slot.date && booking.court === slot.court && booking.time === slot.time)
      );
    });
  };

  const confirmBooking = ({ name, phone }) => {
    if (!slotToBook) return;

    if (slotIsBooked(slotToBook)) {
      alert('This slot is already booked.');
      setShowBookingModal(false);
      setSlotToBook(null);
      return;
    }

    const booking = {
      id: Date.now().toString(36),
      ...slotToBook,
      name,
      phone,
    };

    setBookings((prev) => [booking, ...prev]);
    setShowBookingModal(false);
    setSlotToBook(null);
  };

  const cancelBooking = (bookingId) => {
    const confirmed = window.confirm('Cancel this booking?');
    if (!confirmed) return;

    setBookings((prev) => prev.filter((booking) => booking.id !== bookingId));
  };

  const openBookingModal = (slot) => {
    setSlotToBook(slot);
    setShowBookingModal(true);
  };

  const closeBookingModal = () => {
    setShowBookingModal(false);
    setSlotToBook(null);
  };

  const handleCloseAdminLogin = () => {
    setShowAdminLogin(false);

    if (path === ROUTES.admin && !adminAuthenticated) {
      navigateTo(ROUTES.landing);
    }
  };

  const handleAdminLogin = () => {
    setAdminAuthenticated(true);
    setShowAdminLogin(false);
    navigateTo(ROUTES.admin);
  };

  const isLandingRoute = path === ROUTES.landing;
  const isBookingsRoute = path === ROUTES.bookings;
  const isAdminRoute = path === ROUTES.admin;

  const selectedDayObj = days.find((day) => keyOfDate(day) === selectedDay) || days[0];
  const selectedDayLabel = formatFull(selectedDayObj);

  return (
    <div className="appShell">
      <AppHeader
        isLandingRoute={isLandingRoute}
        isBookingsRoute={isBookingsRoute}
        isAdminRoute={isAdminRoute}
        view={view}
        bookingsCount={bookings.length}
        onNavigate={navigateTo}
        onChangeView={setView}
      />

      {isLandingRoute && <LandingPage />}

      {isBookingsRoute && view === BOOKING_VIEW.book && (
        <BookingsPage
          days={days}
          courts={COURTS}
          selectedDay={selectedDay}
          selectedDayLabel={selectedDayLabel}
          onSelectDay={setSelectedDay}
          getSlotsForCourt={getSlotsForSelectedDayAndCourt}
          isSlotBooked={slotIsBooked}
          onSelectSlot={openBookingModal}
          getDateKey={keyOfDate}
        />
      )}

      {isBookingsRoute && view === BOOKING_VIEW.myBookings && (
        <MyBookingsPage bookings={bookings} onCancelBooking={cancelBooking} />
      )}

      {isAdminRoute && adminAuthenticated && (
        <main className="contentStack">
          <AdminPanel
            days={days}
            slots={availableSlots}
            onCreateSlot={createSlot}
            onDeleteSlot={deleteSlot}
          />
        </main>
      )}

      {isAdminRoute && !adminAuthenticated && (
        <main className="contentStack">
          <section className="neu-card">
            <h2>Admin Area</h2>
            <p className="mutedText">Please sign in as admin to manage slot inventory.</p>
            <div style={{ marginTop: '14px' }}>
              <button className="btn btn-primary" onClick={() => setShowAdminLogin(true)}>
                Admin Login
              </button>
            </div>
          </section>
        </main>
      )}

      <BookingModal
        open={showBookingModal}
        slot={slotToBook}
        onClose={closeBookingModal}
        onSubmit={confirmBooking}
      />

      <AdminLoginModal
        open={showAdminLogin}
        onClose={handleCloseAdminLogin}
        onLogin={handleAdminLogin}
      />
    </div>
  );
}
