export default function LandingPage() {
  return (
    <main className="contentStack landingPage">
      <section className="neu-card landingShowcase">
        <div className="showcaseContent">
          <p className="sectionEyebrow">Simple. Fast. Reliable.</p>
          <h2>Book your badminton court in under a minute</h2>
          <p className="mutedText">
            Clean scheduling for players and easy slot control for admins. No confusion, no clutter,
            just a clear flow from slot selection to booking confirmation.
          </p>

          <div className="showcaseMeta">
            <span className="metaPill">Live slot availability</span>
            <span className="metaPill">Instant booking confirmation</span>
            <span className="metaPill">Easy booking management</span>
          </div>
        </div>

        <aside className="showcasePanel neu-inset">
          <h3>Everything you need</h3>
          <ul className="showcaseChecklist">
            <li>Browse date-wise availability across all courts.</li>
            <li>Book with your name and phone in a few clicks.</li>
            <li>Track and cancel bookings from one place.</li>
            <li>Admin controls which slots are visible to users.</li>
          </ul>
        </aside>
      </section>

      <section className="landingFeatures">
        <article className="neu-card featureCard">
          <h3>Clear availability</h3>
          <p className="mutedText">
            Players only see slots that are actually configured, reducing mistakes and double checks.
          </p>
        </article>

        <article className="neu-card featureCard">
          <h3>Fast booking flow</h3>
          <p className="mutedText">
            Select day, court, and time quickly with a streamlined interface built for readability.
          </p>
        </article>

        <article className="neu-card featureCard">
          <h3>Admin control</h3>
          <p className="mutedText">
            Create and remove slots anytime so users always book from the latest inventory.
          </p>
        </article>
      </section>

      <section className="neu-card landingFlow">
        <h3>How booking works</h3>
        <div className="flowGrid">
          <div className="flowStep neu-inset">
            <span className="stepNumber">1</span>
            <strong>Admin sets up slots</strong>
            <p className="mutedText">Only configured slots are shown to users.</p>
          </div>
          <div className="flowStep neu-inset">
            <span className="stepNumber">2</span>
            <strong>User selects a slot</strong>
            <p className="mutedText">Choose day, court, and preferred time.</p>
          </div>
          <div className="flowStep neu-inset">
            <span className="stepNumber">3</span>
            <strong>Booking is confirmed</strong>
            <p className="mutedText">Manage or cancel later from My Bookings.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
