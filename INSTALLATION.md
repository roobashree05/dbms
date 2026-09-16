# 📦 AIJewel CRM - Complete Installation Guide

## System Requirements

### Minimum Requirements
- **OS:** Windows 10/11, macOS 10.15+, Linux (Ubuntu 20.04+)
- **RAM:** 8 GB
- **Disk Space:** 10 GB
- **Internet:** For downloading packages and Docker images

### Recommended Requirements
- **OS:** Windows 11, macOS Monterey+, Linux Ubuntu 22.04+
- **RAM:** 16 GB
- **Disk Space:** 15 GB
- **Processor:** 4+ cores

---

## Prerequisites Installation

### 1. Install Git

#### Windows
1. Download from: https://git-scm.com/download/win
2. Run installer
3. Choose "Use Git from Git Bash only" or "Use Git from the Windows Command Prompt"
4. Complete installation

#### macOS
```bash
brew install git
```

#### Linux (Ubuntu)
```bash
sudo apt-get update
sudo apt-get install git
```

### 2. Install Docker

#### Windows
1. Download: https://www.docker.com/products/docker-desktop
2. Run installer
3. Enable WSL 2 when prompted
4. Restart computer
5. Verify: `docker --version`

#### macOS
1. Download: https://www.docker.com/products/docker-desktop
2. Open DMG file
3. Drag Docker to Applications
4. Launch Docker
5. Verify: `docker --version`

#### Linux (Ubuntu)
```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add current user to docker group
sudo usermod -aG docker $USER

# Verify
docker --version
```

### 3. Install Node.js & npm

#### Windows
1. Download LTS from: https://nodejs.org/
2. Run installer
3. Accept default settings
4. Verify:
   ```bash
   node --version
   npm --version
   ```

#### macOS
```bash
brew install node@20
```

#### Linux (Ubuntu)
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

---

## Project Installation

### Step 1: Clone Repository

```bash
# Navigate to your desired directory
cd ~/Documents  # or your preferred location

# Clone the project
git clone https://github.com/roobashree05/dbms.git aijewel-crm

# Enter project directory
cd aijewel-crm
```

### Step 2: Setup Environment Variables

```bash
# Copy example environment file
cp .env.example .env

# View and edit if needed (optional)
# The .env.example should have correct defaults
```

### Step 3: Start Database Services

```bash
# Start PostgreSQL and Redis in Docker
docker compose up -d

# Verify services are running
docker compose ps
```

Expected output:
```
NAME              STATUS
aijewel_postgres  Up
aijewel_redis     Up
```

### Step 4: Install Dependencies

```bash
# Install root dependencies
npm install

# This installs packages for both frontend and backend
# Takes 5-10 minutes depending on internet speed
```

### Step 5: Setup Database

```bash
# Run Prisma migrations
npm run db:migrate

# Seed database with sample data
npm run db:seed
```

---

## Running the Application

### Development Mode (Recommended)

#### Terminal 1 - Backend API

```bash
cd apps/api
npm run dev
```

Wait for:
```
✔ Backend running on http://localhost:3001
✔ Swagger docs: http://localhost:3001/api/docs
```

#### Terminal 2 - Frontend

```bash
cd apps/web
npm run dev
```

Wait for:
```
✔ ready - started server on 0.0.0.0:3000
```

#### Terminal 3 (Optional) - Prisma Studio

```bash
cd apps/api
npm run db:studio
```

Opens database GUI at http://localhost:5555

### Production Mode

#### Build

```bash
npm run build
```

#### Start

```bash
# Terminal 1 - Backend
cd apps/api
npm run start

# Terminal 2 - Frontend
cd apps/web
npm run start
```

---

## Access the Application

### Frontend
- URL: http://localhost:3000
- All dashboard features
- Lead management
- Campaigns
- WhatsApp chat
- Reports

### Backend API
- URL: http://localhost:3001
- REST endpoints
- Swagger documentation: http://localhost:3001/api/docs
- Health check: http://localhost:3001/health

### Database GUI
- URL: http://localhost:5555
- Run: `npm run db:studio`
- Browse and edit database directly

---

## Login Credentials

### Admin Account
```
Email: admin@aijewel.com
Password: Admin@123
Role: ADMIN (Full access)
```

### Manager Account
```
Email: manager@aijewel.com
Password: Manager@123
Role: MARKETING_MANAGER
```

### Executive Account
```
Email: executive@aijewel.com
Password: Exec@123
Role: MARKETING_EXECUTIVE
```

### Sales Account
```
Email: sales@aijewel.com
Password: Sales@123
Role: SALES
```

---

## Verification Checklist

- [ ] Git installed: `git --version`
- [ ] Docker installed: `docker --version`
- [ ] Node.js installed: `node --version`
- [ ] Project cloned
- [ ] Docker services running: `docker compose ps`
- [ ] npm packages installed: Check `node_modules/` exists
- [ ] Database migrated: No errors in terminal
- [ ] Database seeded: See success messages
- [ ] Backend starts: `npm run dev` in `apps/api`
- [ ] Frontend starts: `npm run dev` in `apps/web`
- [ ] Website loads: http://localhost:3000
- [ ] Login successful
- [ ] Dashboard visible

---

## Common Issues & Solutions

### Docker not running
```bash
# Start Docker
docker compose up -d

# Verify
docker compose ps
```

### Port already in use
```bash
# Check what's using port 3000
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows

# Change port in apps/web/.env.local
PORT=3002
```

### Dependencies not installing
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules
rm -rf node_modules

# Reinstall
npm install
```

### Database connection error
```bash
# Check Docker logs
docker compose logs postgres

# Restart services
docker compose restart
```

### Module not found errors
```bash
# Make sure you're in correct directory
cd apps/api  # for backend
cd apps/web  # for frontend

# Install dependencies
npm install
```

---

## Development Workflow

### 1. Initial Setup (One time)
```bash
npm install
npm run db:migrate
npm run db:seed
```

### 2. Daily Development
```bash
# Terminal 1: Backend
cd apps/api && npm run dev

# Terminal 2: Frontend
cd apps/web && npm run dev
```

### 3. Make Changes
- Edit files
- Hot-reload automatically applies changes
- See changes in browser

### 4. Create New Features
```bash
# Backend: Create new module
cd apps/api
nest generate module features/new-feature

# Frontend: Create new page/component
cd apps/web
# Create files in app/new-feature/
```

### 5. Database Changes
```bash
# After modifying schema.prisma
cd apps/api
npm run db:migrate -- --name add_new_field
```

---

## Testing

### Unit Tests
```bash
cd apps/api
npm run test
```

### Integration Tests
```bash
cd apps/api
npm run test:integration
```

### End-to-End Tests
```bash
cd apps/web
npm run test:e2e
```

### Coverage Report
```bash
cd apps/api
npm run test:cov
```

---

## Stopping Services

### Stop Backend
- Terminal 1: Press `Ctrl + C`

### Stop Frontend
- Terminal 2: Press `Ctrl + C`

### Stop Database
```bash
docker compose down
```

### Stop Everything
```bash
# Kill all processes
killall node  # macOS/Linux
taskkill /F /IM node.exe  # Windows

# Stop Docker
docker compose down
```

---

## Advanced Configuration

### Enable Demo Mode
```bash
# In .env
DEMO_MODE=true

# Uses all mock providers
# Great for testing without real integrations
```

### Change Database
```bash
# In .env
DATABASE_URL="postgresql://user:password@host:5432/dbname"
```

### Enable Logging
```bash
# In .env
LOG_LEVEL=debug
```

### Configure File Storage
```bash
# In .env
UPLOAD_DIRECTORY="./uploads"
MAX_FILE_SIZE=52428800  # 50MB
```

---

## Performance Optimization

### Backend
```bash
# Enable caching
REDIS_URL=redis://localhost:6379

# Increase pool size
DATABASE_POOL_SIZE=20
```

### Frontend
```bash
# Enable production build
npm run build
npm run start
```

### Database
- Indexes created automatically
- See `database/migrations/` for schema

---

## Next Steps

1. Read [HOW_TO_RUN_IN_VS_CODE.md](./HOW_TO_RUN_IN_VS_CODE.md) for detailed VS Code guide
2. Check [ARCHITECTURE.md](./docs/ARCHITECTURE.md) for system design
3. Read [API.md](./docs/API.md) for backend endpoints
4. Explore [DATABASE.md](./docs/DATABASE.md) for data structure

---

## Support

- **Issues:** https://github.com/roobashree05/dbms/issues
- **Documentation:** `/docs` folder
- **API Docs:** http://localhost:3001/api/docs (when running)

---

**Happy Coding! 🚀**
