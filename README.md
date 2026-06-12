# Crown Dental — React Frontend

A full-featured dental clinic website built with React, React Router v6, Axios, and Lucide React.

## Project Structure

```
src/
├── index.jsx                  # App entry point
├── App.jsx                    # Route definitions
├── services/
│   └── api.js                 # Axios instance with JWT interceptor
├── data/
│   └── staticProcedures.js    # Static treatment procedure steps
├── context/
│   ├── AuthContext.jsx         # Auth state (login/logout/token)
│   └── AppointmentContext.jsx  # Global appointment modal state
├── components/
│   ├── Layout.jsx              # Public layout wrapper (Header + Footer)
│   ├── AppointmentModal.jsx    # Global appointment booking modal
│   ├── LeadForm.jsx            # Contact/lead form component
│   ├── Login.jsx               # Admin login page
│   ├── ChangePassword.jsx      # Change password form
│   ├── Header/
│   │   └── Header.jsx          # Site header with nav + scroll effect
│   ├── Hero/
│   │   └── Hero.jsx            # Homepage hero with animated counters
│   └── Footer/
│       └── Footer.jsx          # Footer with newsletter subscribe
├── pages/
│   ├── Home.jsx                # Home page
│   ├── About.jsx               # About page
│   ├── Contact.jsx             # Contact page with Google Maps embed
│   ├── Doctors.jsx             # Doctors listing page
│   ├── Faq.jsx                 # FAQ accordion page
│   ├── Gallery.jsx             # Public photo gallery with lightbox
│   ├── PrivacyPolicy.jsx       # Privacy policy page
│   ├── RefundWarranty.jsx      # Refund & warranty policy page
│   ├── TermsOfUse.jsx          # Terms of use page
│   ├── Treatments/
│   │   ├── TreatmentsHub.jsx   # Treatments listing with filter dropdowns
│   │   └── SingleTreatment.jsx # Individual treatment detail page
│   └── Admin/
│       ├── Dashboard.jsx       # Admin layout with collapsible sidebar
│       ├── Appointments.jsx    # Appointment management table
│       ├── Gallery.jsx         # Gallery image upload & delete
│       ├── Leads.jsx           # Lead management with status updates
│       ├── Subscribers.jsx     # Newsletter subscriber list + CSV export
│       ├── TreatmentForm.jsx   # Add/edit treatment form
│       └── TreatmentsList.jsx  # Treatments management table
└── styles/
    ├── main.css                # Global styles
    ├── components/
    │   ├── Hero.css            # Hero section styles
    │   └── Footer.css          # Footer styles
    └── pages/
        └── Home.css            # Home page styles
```

## Setup

```bash
npm install
cp .env.example .env            # set REACT_APP_API_URL
npm start
```

## Key Dependencies

| Package | Purpose |
|--------|---------|
| react-router-dom v6 | Client-side routing |
| axios | HTTP client with JWT interceptor |
| lucide-react | Icon set |
| react-icons (fi) | Feather icons for admin sidebar |
| @fortawesome | Social media icons in footer |
| @lottiefiles/react-lottie-player | Success animation in appointment modal |
| slugify | URL slug generation in admin |

## API Endpoints Expected

| Method | Path | Used In |
|--------|------|---------|
| POST | /auth/login | Login.jsx |
| PUT | /auth/change-password | ChangePassword.jsx |
| GET/POST/PUT/DELETE | /treatments | TreatmentsHub, TreatmentForm, TreatmentsList |
| GET | /treatments/id/:id | TreatmentForm (edit) |
| GET | /treatments/:slug | SingleTreatment |
| GET/POST/PUT/DELETE | /appointments | AppointmentModal, Appointments |
| GET/POST/DELETE | /gallery | Gallery pages |
| GET/DELETE/PUT | /leads | Leads |
| GET | /subscribers | Subscribers |
| GET | /subscribers/export/csv | Subscribers (CSV download) |
| POST | /subscribe | Footer (newsletter) |
| POST | /leads | LeadForm |
| POST | /uploads/image | TreatmentForm, Admin Gallery |
