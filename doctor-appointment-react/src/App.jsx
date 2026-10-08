import React, { useState } from 'react';

function App() {
  const [selectedDept, setSelectedDept] = useState('Medicine');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [confirmation, setConfirmation] = useState(null);

  // Doctors database grouped by department
  const doctorsData = {
    Medicine: [
      { id: 101, name: 'Dr. Sarah Jenkins', qualification: 'MBBS, MD (Internal Medicine)', email: 'sarah.j@careplus.com', experience: '10 yrs exp' },
      { id: 102, name: 'Dr. Alan Grant', qualification: 'MBBS, FCPS (Medicine)', email: 'alan.g@careplus.com', experience: '8 yrs exp' },
      { id: 103, name: 'Dr. Maria Gomez', qualification: 'MBBS, MD', email: 'maria.g@careplus.com', experience: '12 yrs exp' },
    ],
    Cardiology: [
      { id: 201, name: 'Dr. Robert Chen', qualification: 'MBBS, MD, DM (Cardiology)', email: 'robert.c@careplus.com', experience: '15 yrs exp' },
      { id: 202, name: 'Dr. Emily Watson', qualification: 'MBBS, FACC', email: 'emily.w@careplus.com', experience: '11 yrs exp' },
      { id: 203, name: 'Dr. David Kim', qualification: 'MBBS, MD (Cardiology)', email: 'david.k@careplus.com', experience: '9 yrs exp' },
    ],
    Dental: [
      { id: 301, name: 'Dr. Lisa Ray', qualification: 'BDS, MDS (Orthodontics)', email: 'lisa.r@careplus.com', experience: '7 yrs exp' },
      { id: 302, name: 'Dr. James Wilson', qualification: 'BDS, FCPS (Dental)', email: 'james.w@careplus.com', experience: '14 yrs exp' },
      { id: 303, name: 'Dr. Nina Patel', qualification: 'BDS, MDS (Periodontics)', email: 'nina.p@careplus.com', experience: '6 yrs exp' },
    ],
    Gynecology: [
      { id: 401, name: 'Dr. Sophia Martinez', qualification: 'MBBS, MS (OB-GYN)', email: 'sophia.m@careplus.com', experience: '13 yrs exp' },
      { id: 402, name: 'Dr. Rachel Green', qualification: 'MBBS, DGO, FCPS', email: 'rachel.g@careplus.com', experience: '10 yrs exp' },
      { id: 403, name: 'Dr. Hannah Abbott', qualification: 'MBBS, MS', email: 'hannah.a@careplus.com', experience: '8 yrs exp' },
    ],
    Surgery: [
      { id: 501, name: 'Dr. Michael Taylor', qualification: 'MBBS, MS (General Surgery)', email: 'michael.t@careplus.com', experience: '16 yrs exp' },
      { id: 502, name: 'Dr. Christopher Lee', qualification: 'MBBS, FRCS (Surgery)', email: 'chris.l@careplus.com', experience: '12 yrs exp' },
      { id: 503, name: 'Dr. Olivia Brown', qualification: 'MBBS, MS', email: 'olivia.b@careplus.com', experience: '9 yrs exp' },
    ],
  };

  const availableTimes = ['09:00 AM', '10:30 AM', '02:00 PM', '04:30 PM', '06:00 PM'];

  const handleBookAppointment = (e) => {
    e.preventDefault();
    if (!selectedDoctor || !bookingDate || !bookingTime) {
      alert('Please select a doctor, date, and schedule time.');
      return;
    }
    setConfirmation({
      doctor: selectedDoctor,
      department: selectedDept,
      date: bookingDate,
      time: bookingTime,
    });
  };

  return (
    <div style={styles.container}>
      {/* Header Bar */}
      <nav style={styles.navbar}>
        <div style={styles.logo}>🏥 CarePlus Medical</div>
        <button style={styles.signInBtn}>Sign In</button>
      </nav>

      {/* Hero Header */}
      <header style={styles.hero}>
        <h1 style={styles.title}>Doctor Appointment System</h1>
        <p style={styles.subtitle}>
          Book your doctor appointment easily and quickly with top-rated medical specialists.
        </p>
      </header>

      <main style={styles.mainContent}>
        {/* Step 1: Select Department */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>1. Select a Department</h2>
          <div style={styles.deptGrid}>
            {Object.keys(doctorsData).map((dept) => (
              <button
                key={dept}
                onClick={() => {
                  setSelectedDept(dept);
                  setSelectedDoctor(null);
                }}
                style={{
                  ...styles.deptCard,
                  ...(selectedDept === dept ? styles.deptCardActive : {}),
                }}
              >
                {dept}
              </button>
            ))}
          </div>
        </section>

        {/* Step 2: Select Doctor */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>2. Available Doctors in {selectedDept}</h2>
          <div style={styles.doctorGrid}>
            {doctorsData[selectedDept].map((doc) => (
              <div
                key={doc.id}
                onClick={() => setSelectedDoctor(doc)}
                style={{
                  ...styles.doctorCard,
                  ...(selectedDoctor?.id === doc.id ? styles.doctorCardActive : {}),
                }}
              >
                <div style={styles.avatar}>{doc.name.charAt(4)}</div>
                <h3 style={styles.docName}>{doc.name}</h3>
                <p style={styles.docQual}>{doc.qualification}</p>
                <span style={styles.docExp}>{doc.experience}</span>
                <p style={styles.docEmail}>✉️ {doc.email}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Step 3: Date & Schedule Selection */}
        {selectedDoctor && (
          <section style={styles.bookingBox}>
            <h2 style={styles.sectionTitle}>
              3. Schedule Appointment with {selectedDoctor.name}
            </h2>
            <form onSubmit={handleBookAppointment} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Select Date:</label>
                <input
                  type="date"
                  required
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  style={styles.dateInput}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Select Time Slot:</label>
                <div style={styles.timeGrid}>
                  {availableTimes.map((time) => (
                    <button
                      type="button"
                      key={time}
                      onClick={() => setBookingTime(time)}
                      style={{
                        ...styles.timeSlot,
                        ...(bookingTime === time ? styles.timeSlotActive : {}),
                      }}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" style={styles.confirmBtn}>
                Confirm Appointment
              </button>
            </form>
          </section>
        )}
      </main>

      {/* Confirmation Modal */}
      {confirmation && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2 style={{ color: '#16a34a', marginTop: 0 }}>✅ Appointment Confirmed!</h2>
            <p><strong>Doctor:</strong> {confirmation.doctor.name}</p>
            <p><strong>Email:</strong> {confirmation.doctor.email}</p>
            <p><strong>Department:</strong> {confirmation.department}</p>
            <p><strong>Date:</strong> {confirmation.date}</p>
            <p><strong>Time Slot:</strong> {confirmation.time}</p>
            <button
              onClick={() => {
                setConfirmation(null);
                setSelectedDoctor(null);
                setBookingDate('');
                setBookingTime('');
              }}
              style={styles.closeBtn}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f8fafc',
    color: '#1e293b',
    minHeight: '100vh',
    margin: 0,
    paddingBottom: '4rem',
  },
  navbar: {
    backgroundColor: '#ffffff',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  logo: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#2563eb',
  },
  signInBtn: {
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    cursor: 'pointer',
  },
  hero: {
    textAlign: 'center',
    padding: '3rem 1rem 2rem 1rem',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e2e8f0',
  },
  title: {
    fontSize: '2.25rem',
    fontWeight: '800',
    color: '#0f172a',
    margin: '0 0 0.5rem 0',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#64748b',
  },
  mainContent: {
    maxWidth: '1000px',
    margin: '2rem auto',
    padding: '0 1rem',
  },
  section: {
    marginBottom: '2.5rem',
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    marginBottom: '1rem',
    color: '#1e293b',
  },
  deptGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: '0.75rem',
  },
  deptCard: {
    backgroundColor: '#ffffff',
    padding: '1rem',
    borderRadius: '0.5rem',
    border: '1px solid #cbd5e1',
    fontWeight: '600',
    color: '#334155',
    cursor: 'pointer',
  },
  deptCardActive: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
    borderColor: '#2563eb',
  },
  doctorGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1rem',
  },
  doctorCard: {
    backgroundColor: '#ffffff',
    padding: '1.25rem',
    borderRadius: '0.75rem',
    border: '1px solid #e2e8f0',
    cursor: 'pointer',
  },
  doctorCardActive: {
    borderColor: '#2563eb',
    boxShadow: '0 0 0 2px #2563eb',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#e0e7ff',
    color: '#4338ca',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    marginBottom: '0.75rem',
  },
  docName: {
    margin: '0 0 0.25rem 0',
    fontSize: '1.1rem',
  },
  docQual: {
    margin: '0 0 0.5rem 0',
    fontSize: '0.85rem',
    color: '#64748b',
  },
  docExp: {
    backgroundColor: '#f1f5f9',
    padding: '0.2rem 0.5rem',
    borderRadius: '0.25rem',
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#475569',
  },
  docEmail: {
    margin: '0.75rem 0 0 0',
    fontSize: '0.85rem',
    color: '#2563eb',
  },
  bookingBox: {
    backgroundColor: '#ffffff',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    border: '1px solid #e2e8f0',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontWeight: '600',
    fontSize: '0.9rem',
  },
  dateInput: {
    padding: '0.6rem',
    borderRadius: '0.375rem',
    border: '1px solid #cbd5e1',
    fontSize: '0.95rem',
    maxWidth: '250px',
  },
  timeGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  timeSlot: {
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    border: '1px solid #cbd5e1',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
  },
  timeSlotActive: {
    backgroundColor: '#1e293b',
    color: '#ffffff',
    borderColor: '#1e293b',
  },
  confirmBtn: {
    backgroundColor: '#16a34a',
    color: '#ffffff',
    border: 'none',
    padding: '0.75rem',
    borderRadius: '0.375rem',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '0.5rem',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '0.75rem',
    width: '90%',
    maxWidth: '400px',
  },
  closeBtn: {
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    width: '100%',
    marginTop: '1rem',
    cursor: 'pointer',
  },
};

export default App;