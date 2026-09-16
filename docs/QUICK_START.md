# 🚀 AIJewel CRM - Quick Start Guide (For Beginners)

## What is AIJewel CRM?

AIJewel CRM is a complete business management system for jewelry shops. It helps you:
- Manage customer leads
- Send WhatsApp messages
- Create advertising campaigns
- Schedule meetings
- Record calls
- Track sales

---

## ⚙️ Step-by-Step Setup (Like a Child!)

### Step 1: Install Required Software

You need 3 things on your computer:

#### 1️⃣ Git (Code Version Control)
- Go to: https://git-scm.com/download/win
- Click "Download" and install
- Accept all defaults
- Restart your computer

#### 2️⃣ Docker (Database & Services Container)
- Go to: https://www.docker.com/products/docker-desktop
- Click "Download" for Windows
- Install and restart your computer
- Open Command Prompt and type:
  ```
  docker --version
  ```
  You should see: `Docker version 24.x.x`

#### 3️⃣ Node.js (Programming Runtime)
- Go to: https://nodejs.org/
- Download "LTS" version (not Current)
- Install and restart your computer
- Open Command Prompt and type:
  ```
  node --version
  npm --version
  ```
  You should see version numbers

---

### Step 2: Download the Project

Open Command Prompt (Windows) and run:

```bash
# Go to your Documents folder
cd Documents

# Copy the project
git clone https://github.com/roobashree05/dbms.git aijewel-crm

# Go into the project folder
cd aijewel-crm
```

---

### Step 3: Start the Database (Docker)

Still in Command Prompt:

```bash
# Start database & cache
docker compose up -d

# Wait 10 seconds for database to start
```

You should see:
```
Creating aijewel_postgres ... done
Creating aijewel_redis ... done
```

---

### Step 4: Install Project Files

In Command Prompt:

```bash
# Install all code files
npm install

# Wait for 5-10 minutes...
```

---

### Step 5: Setup Database

In Command Prompt:

```bash
# Create database structure
npm run db:migrate

# Add sample data
npm run db:seed
```

You should see:
```
✓ Database created
✓ Tables created
✓ Sample data added
```

---

### Step 6: Start the Website

Open **TWO** Command Prompts (Windows: Press Windows + R, type `cmd`, hit Enter)

**In Command Prompt 1:**
```bash
cd Documents/aijewel-crm
cd apps/api
npm run dev
```

Wait for message: `✓ Server running on http://localhost:3001`

**In Command Prompt 2:**
```bash
cd Documents/aijewel-crm
cd apps/web
npm run dev
```

Wait for message: `ready - started server on 0.0.0.0:3000`

---

### Step 7: Open the Website

Open your web browser (Chrome, Firefox, Edge) and go to:

```
http://localhost:3000
```

You should see the AIJewel CRM login page! 🎉

---

## 🔐 Login Details

**Admin Account:**
- Email: `admin@aijewel.com`
- Password: `Admin@123`

**Marketing Manager:**
- Email: `manager@aijewel.com`
- Password: `Manager@123`

**Marketing Executive:**
- Email: `executive@aijewel.com`
- Password: `Exec@123`

---

## 📚 What You Can Do Now

### 1. View Dashboard
- Total leads
- Messages sent
- Campaigns running
- Call history

### 2. Import Leads
- Upload CSV file with customer names and phone numbers
- System automatically adds them

### 3. Create Campaign
- Write WhatsApp message
- Select customers
- Schedule when to send

### 4. View Conversations
- See all customer chats
- Send messages
- View response status

### 5. Book Meetings
- Check calendar
- Add customer meeting
- Get automatic reminders

---

## 🆘 Troubleshooting

### "Docker not found" Error
**Solution:** Restart your computer after installing Docker

### "Cannot connect to database" Error
**Solution:** Run this command:
```bash
docker compose logs postgres
```

### "Port 3000 already in use" Error
**Solution:** Close other apps using port 3000, or change port:
```bash
# In apps/web/.env.local
PORT=3002
```

### "npm: command not found" Error
**Solution:** Restart your computer after installing Node.js

### Website won't load
**Solution:** Make sure both commands are running in separate Command Prompts:
- Backend: `npm run dev` in `apps/api`
- Frontend: `npm run dev` in `apps/web`

---

## 🛑 Stopping the Website

### Stop Backend (Command Prompt 1)
```bash
Press Ctrl + C
```

### Stop Frontend (Command Prompt 2)
```bash
Press Ctrl + C
```

### Stop Database
```bash
docker compose down
```

---

## ✅ Next Time You Want to Run It

You only need 3 commands:

**Command Prompt 1:**
```bash
cd Documents/aijewel-crm
docker compose up -d
cd apps/api
npm run dev
```

**Command Prompt 2:**
```bash
cd Documents/aijewel-crm
cd apps/web
npm run dev
```

Then open: `http://localhost:3000`

---

## 📞 Need Help?

Open a new issue on GitHub: https://github.com/roobashree05/dbms/issues

---

**Congratulations! Your AIJewel CRM is now running! 🎉**
