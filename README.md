# 🚀 Squad Up  

**Squad Up** is a full-stack platform that helps people **form teams for events** and organizations to **host events like hackathons, competitions, and workshops**. It also features a **real-time messaging system** so teams can collaborate smoothly.  

---

## ✨ Features  

### 👥 For Users & Teams  
- Create and manage user profiles with skills and interests.  
- Form or join teams for specific events.  
- Set team requirements and recruit members.  
- Real-time team chat using **WebSockets/Socket.IO**.  
- Notifications for invites, messages, and event updates.  

### 🏢 For Organizations  
- Host and manage events (hackathons, fests, competitions, workshops).  
- Define event details (rules, team sizes, deadlines, eligibility).  
- Approve teams and track participation.  
- Get analytics on participants and teams.  

---

## 🛠️ Tech Stack  

- **Frontend:** Vite + React + TailwindCSS  
- **Backend:** Node.js + Express.js  
- **Database:** MongoDB (Mongoose)  
- **Authentication:** JWT-based auth  
- **Real-time Communication:** Socket.IO  
- **Deployment:** Vercel (frontend) + Render/Heroku/AWS (backend)  

---

## 📂 Project Structure  
```bash
squad-up/
│── frontend/ # Frontend (Vite + React)
│── backend/ # Backend (Express + MongoDB)
│── docs/ # Documentation (ERD, API specs, roadmap)
```

---

## 🚧 Roadmap  

- [ ] User authentication & profiles  
- [ ] Event creation & management  
- [ ] Team creation & recruitment system  
- [ ] Real-time messaging (Socket.IO)  
- [ ] Notifications system  
- [ ] Analytics for organizations  