A full-stack MERN application designed to streamline communication between citizens and GHMC (Greater Hyderabad Municipal Corporation) authorities regarding cleanliness and sanitation issues.

Citizens can raise complaints with real-time location, and GHMC officials can manage and update complaint statuses efficiently — improving civic cleanliness management.
---

#Tech stack
##Frontend
  1.React (Vite) — Fast, modern React development setup
  2.Tailwind CSS — Responsive, professional-grade UI styling
  3.React-Leaflet (OpenStreetMap) — For location selection and visualization
  4.Axios — For API communication
  5.React Router & Context API — Role-based routing and global authentication state

##Backend
  1.Node.js + Express.js — RESTful API framework
  2.MongoDB Atlas — Cloud-hosted NoSQL database
  3.JWT (JSON Web Token) — Secure authentication and authorization
  4.Cloudinary — Image upload and storage service for complaints
  5.Multer — File handling middleware for Node

---
#Features 

🧑‍💼 For GHMC Authorities
Register with office name, email, password, address, and geo-location
Receive nearby complaints raised by users
View complaint details (photo, description, location)
Update complaint status — Pending → In Progress → Resolved
Real-time dashboard summary of complaint statistics

👤 For Common Users
Register and login as a citizen user
Raise a cleanliness complaint with:
📸 Photo upload
📝 Description
📍 Live location (via GPS) or manual selection on map
Automatically find and submit complaint to nearest GHMC authority
View complaint status updates (Pending, In Progress, Resolved) in real-time
Track progress visually with status timeline UI


🌐 General Application Features
Fully role-based authentication
Clean and responsive Tailwind-based UI
Dark mode ready
Secure cloud image storage
Interactive map support via React-Leaflet + OpenStreetMap
Mobile-responsive layouts and fixed footer/navigation bar

---

#App Flow

🧑‍💼 GHMC Authority Flow
  1.Register → Provide details including office name, address, and map location.
  2.Login → Access dashboard with list of complaints assigned by users nearby.
  3.View Complaints → Each complaint displays user info, photo, and coordinates.
  4.Update Status → Change complaint progress (Pending, In Progress, Resolved).
  5.Monitor Summary → Dashboard shows real-time complaint statistics.

👤 User (Citizen) Flow
   1.Register → Create account and share location.
   2.Login → Redirected to personal dashboard.
   3.Find Nearby GHMC Offices → App auto-detects nearest registered authorities.
   4.Raise Complaint → Upload photo, add issue description, and choose:
     * Use My Current Location (GPS auto-detects coordinates)
     or Select Location Manually (via interactive map)
   5.Track Complaint →
       View all complaints in “My Complaints” section
       Monitor their current status visually
       See progress in real-time when GHMC authority updates the record

---
##Environment Variables
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

---

##Future Enhancements
  1.Real-time updates using Socket.IO
  2.Advanced analytics dashboard for authorities
  3.Integration with Google Maps or Mapbox API
  4.Email/SMS notifications for complaint status
  5.Progressive Web App (PWA) support

---

##Screenshots of home page,dashboards,login,signup

  



  




