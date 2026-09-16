# 🚀 HOW TO RUN AIJewel CRM IN VISUAL STUDIO CODE - STEP BY STEP

## 📋 Complete Beginner's Guide

This guide will walk you through running the entire AIJewel CRM application from scratch using Visual Studio Code.

---

## STEP 1: Download & Install Visual Studio Code

### 1.1 Download
- Go to: https://code.visualstudio.com/
- Click "Download"
- Choose your operating system (Windows, Mac, or Linux)
- Install it like any other program

### 1.2 Open Visual Studio Code
- Double-click the VS Code icon on your desktop
- You should see a welcome screen

---

## STEP 2: Download & Install Required Software

### 2.1 Install Git
**What is Git?** A tool to manage code versions

1. Go to: https://git-scm.com/download/win
2. Click "Click here to download"
3. Run the installer
4. Click "Next" for all options
5. Click "Install"
6. **Restart your computer**

**Verify Installation:**
- Open Command Prompt (Press `Windows + R`, type `cmd`, press Enter)
- Type: `git --version`
- You should see: `git version 2.42.0` (or similar)

### 2.2 Install Docker Desktop
**What is Docker?** A container system to run database and cache locally

1. Go to: https://www.docker.com/products/docker-desktop
2. Click "Download for Windows"
3. Run the installer
4. Check "Install required Windows components for WSL 2"
5. Click "Install"
6. **Restart your computer**

**Verify Installation:**
- Open Command Prompt
- Type: `docker --version`
- You should see: `Docker version 24.x.x` (or similar)

### 2.3 Install Node.js
**What is Node.js?** JavaScript runtime to run the backend and frontend

1. Go to: https://nodejs.org/
2. Download "LTS" version (NOT Current)
3. Run the installer
4. Click "Next" for all options
5. Click "Install"
6. **Restart your computer**

**Verify Installation:**
- Open Command Prompt
- Type: `node --version`
- You should see: `v18.x.x` or `v20.x.x`
- Type: `npm --version`
- You should see: `9.x.x` or `10.x.x`

---

## STEP 3: Clone the Project Repository

### 3.1 Open VS Code Terminal

1. Open Visual Studio Code
2. Press `Ctrl + Backtick` (the backtick key below Esc)
3. You should see a terminal at the bottom

**Alternative:** Go to Menu → Terminal → New Terminal

### 3.2 Navigate to Your Workspace

In the terminal, type:

```bash
cd Documents
```

Press Enter.

### 3.3 Clone the Project

Type:

```bash
git clone https://github.com/roobashree05/dbms.git aijewel-crm
```

Press Enter and wait for it to download (~2 minutes).

You should see:
```
Cloning into 'aijewel-crm'...
remote: Counting objects: ...
unpacking objects: 100% (xxx/xxx), done.
```

### 3.4 Open Project in VS Code

Type:

```bash
cd aijewel-crm
code .
```

Press Enter. VS Code will open the project in a new window.

---

## STEP 4: Start Database Services with Docker

### 4.1 Open Terminal in VS Code Project

1. In VS Code, press `Ctrl + Backtick`
2. You should see a terminal at the bottom

### 4.2 Start Docker Services

Type:

```bash
docker compose up -d
```

Press Enter.

You should see:
```
Creating aijewel_postgres ... done
Creating aijewel_redis ... done
```

**What happened?**
- PostgreSQL database started running
- Redis cache started running
- Both run in Docker containers (isolated environments)

### 4.3 Verify Services Started

Type:

```bash
docker compose ps
```

Press Enter.

You should see:
```
NAME              STATUS
aijewel_postgres  Up 10 seconds
aijewel_redis     Up 10 seconds
```

✅ If you see both are "Up", you're good!

---

## STEP 5: Install Project Dependencies

### 5.1 Install All Packages

In the VS Code terminal, type:

```bash
npm install
```

Press Enter.

⏳ **Wait 5-10 minutes** while it downloads all packages.

You'll see text scrolling. When done, you'll see:
```
added 1500+ packages in 5m
```

---

## STEP 6: Setup Database

### 6.1 Run Database Migrations

Type:

```bash
npm run db:migrate
```

Press Enter.

You should see:
```
✔ Database created
✔ Tables created
```

### 6.2 Add Sample Data

Type:

```bash
npm run db:seed
```

Press Enter.

You should see:
```
✔ Seeding database...
✔ Created 10 users
✔ Created 100 leads
✔ Created 20 customers
✔ Created 500 WhatsApp contacts
✔ Seeding complete
```

---

## STEP 7: Open Two Terminals for Backend & Frontend

### 7.1 First Terminal - Backend API

**Current Terminal:** Should still be open in VS Code

Type:

```bash
cd apps/api
npm run dev
```

Press Enter.

Wait for:
```
✔ Backend server running on http://localhost:3001
✔ Swagger docs at http://localhost:3001/api/docs
```

**IMPORTANT:** Do NOT close this terminal! Keep it running in the background.

### 7.2 Second Terminal - Frontend Website

1. In VS Code, click the "+" icon next to the terminal tab (at bottom)
2. A new terminal will open

Type:

```bash
cd apps/web
npm run dev
```

Press Enter.

Wait for:
```
✔ ready - started server on 0.0.0.0:3000
```

**Now you have 2 terminals running:**
- Terminal 1: Backend API (port 3001)
- Terminal 2: Frontend Website (port 3000)

---

## STEP 8: Open the Website in Browser

### 8.1 Open Your Browser

- Chrome
- Firefox
- Edge
- Any browser

### 8.2 Go to the Website

Type in the address bar:

```
http://localhost:3000
```

Press Enter.

🎉 **You should see the AIJewel CRM Login Page!**

---

## STEP 9: Login to AIJewel CRM

### 9.1 Admin Account (Full Access)

**Email:** `admin@aijewel.com`  
**Password:** `Admin@123`

### 9.2 Marketing Manager Account

**Email:** `manager@aijewel.com`  
**Password:** `Manager@123`

### 9.3 Marketing Executive Account

**Email:** `executive@aijewel.com`  
**Password:** `Exec@123`

---

## 🎯 What You Can Do Now

### 📊 Dashboard
- View total leads
- See WhatsApp messages sent
- Check active campaigns
- View call history

### 👥 Leads Management
- View all 100 sample leads
- Search for leads
- Filter by status
- Import new leads via CSV
- Create new leads manually

### 💬 WhatsApp Chat
- View 500 imported WhatsApp contacts
- Open conversations
- Send messages (mock mode)
- See message status

### 📢 Campaigns
- Create WhatsApp campaign
- Write personalized messages
- Schedule campaign
- View campaign results

### 📞 Calls
- View call history
- See call recordings
- Read call transcripts

### 📅 Meetings
- View calendar
- Book meetings
- Set reminders

---

## ⚠️ Troubleshooting

### Issue: "Cannot connect to database"

**Solution:**
```bash
# Check if Docker is running
docker compose ps

# If not running, start it
docker compose up -d
```

### Issue: "Port 3000 already in use"

**Solution:** Another app is using port 3000. Close the other app or:

1. Create file: `apps/web/.env.local`
2. Add: `PORT=3002`
3. Run: `npm run dev`
4. Go to: `http://localhost:3002`

### Issue: "npm: command not found"

**Solution:**
1. Restart your computer
2. Close and reopen VS Code
3. Try again

### Issue: "git: command not found"

**Solution:**
1. Restart your computer
2. Make sure Git was installed
3. Try again

### Issue: "Cannot find module" error

**Solution:**
```bash
# Clear cache
npm cache clean --force

# Reinstall
npm install
```

### Issue: Website shows blank page

**Solution:**
1. Press `Ctrl + Shift + Delete` to clear browser cache
2. Refresh page `Ctrl + R`
3. Or try a different browser

### Issue: Backend won't start

**Solution:**
```bash
# Make sure you're in apps/api folder
cd apps/api

# Install dependencies
npm install

# Try starting again
npm run dev
```

---

## 🛑 How to Stop Everything

### Stop Backend
- Go to Terminal 1
- Press `Ctrl + C`

### Stop Frontend
- Go to Terminal 2
- Press `Ctrl + C`

### Stop Database
- Open a new terminal
- Type: `docker compose down`
- Press Enter

---

## 🔄 Next Time You Run It

**You only need these 3 steps:**

### Step 1: Open VS Code Project
```bash
cd Documents/aijewel-crm
code .
```

### Step 2: Start Database (Terminal 1)
```bash
docker compose up -d
cd apps/api
npm run dev
```

### Step 3: Start Frontend (Terminal 2)
```bash
cd apps/web
npm run dev
```

### Step 4: Open Browser
```
http://localhost:3000
```

**Done! Your website is running!**

---

## 📚 Useful VS Code Tips

### Open Terminal
`Ctrl + Backtick`

### Create New Terminal
`Ctrl + Shift + Backtick`

### Switch Terminal
Click on terminal tab at bottom

### Save File
`Ctrl + S`

### Search File
`Ctrl + P`

### Find in Code
`Ctrl + F`

### Open Command Palette
`Ctrl + Shift + P`

---

## 📝 Project Structure Explained

```
aijewel-crm/
├── apps/
│   ├── web/              ← Frontend (React/Next.js) - Port 3000
│   └── api/              ← Backend (NestJS) - Port 3001
├── database/
│   └── schema.prisma     ← Database structure
├── docker-compose.yml    ← Docker configuration
├── package.json          ← Project settings
└── docs/                 ← Documentation
```

---

## ✅ Verification Checklist

- [ ] Git installed
- [ ] Docker installed
- [ ] Node.js installed
- [ ] Project cloned
- [ ] Docker services running
- [ ] npm packages installed
- [ ] Database migrated
- [ ] Database seeded
- [ ] Backend running (Terminal 1)
- [ ] Frontend running (Terminal 2)
- [ ] Website opens at http://localhost:3000
- [ ] Login works
- [ ] Dashboard loads

---

## 🎓 Learning Resources

- **VS Code Docs:** https://code.visualstudio.com/docs
- **Git Tutorial:** https://git-scm.com/book/en/v2
- **Docker Basics:** https://docs.docker.com/get-started/
- **Node.js Guide:** https://nodejs.org/en/docs/
- **Next.js Docs:** https://nextjs.org/docs
- **NestJS Docs:** https://docs.nestjs.com

---

## 💬 Need Help?

1. Check this guide again
2. Look at troubleshooting section
3. Open an issue on GitHub: https://github.com/roobashree05/dbms/issues
4. Check terminal error messages carefully

---

## 🎉 Congratulations!

You've successfully set up the AIJewel CRM!

**Next Steps:**
1. Explore the dashboard
2. Try creating a lead
3. Import sample data
4. Send a test campaign
5. Read the documentation

---

**Happy Coding! 🚀**
