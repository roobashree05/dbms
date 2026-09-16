# AIJewel CRM - Complete Lead Management & Communication Platform

A production-quality, full-stack CRM platform built for AIJewel Jewellery business with WhatsApp Business integration, Meta Ads automation, voice calling, meeting scheduling, and AI-powered customer engagement.

## 🎯 Core Features

### Lead Management
- Unlimited CRM lead storage with pagination and server-side search
- Lead import (CSV, WhatsApp groups)
- Duplicate detection
- Lead status tracking and assignment
- Lead timeline and activity history
- Bulk operations (assign, tag, export, delete)

### WhatsApp Integration
- WhatsApp Business API integration (mock & production)
- Incoming/outgoing message handling
- Conversation history
- Message delivery & read status
- Media support (images, videos, documents)
- WhatsApp group lead imports (500+ contacts)

### Meta Ads & Marketing
- Meta campaign creation and scheduling
- Facebook & Instagram ad management
- Click-to-WhatsApp ads
- Campaign performance reporting
- Personalized marketing with customer variables
- Campaign approval workflow

### Communication Dashboard
- WhatsApp-style messaging interface (3-section layout)
- Voice call integration (mock & supported providers)
- Incoming/outgoing call history
- Call recordings and transcripts
- Video call capability (WebRTC)
- Call status tracking

### AI & Automation
- Knowledge base management
- AI response generation
- Personalized customer messaging
- Automated welcome messages
- Lead qualification
- Human escalation

### Calendar & Scheduling
- Meeting booking system
- Calendar availability management
- Meeting reminders
- Booking confirmation workflow

### Advanced Features
- Role-based access control (Admin, Marketing Manager, Executive, Sales, Management)
- Audit logging of all actions
- Real-time notifications
- Dashboard analytics
- Call recording & transcription
- Customer 360 view
- Personalization preview
- Campaign reporting & analytics

## 🛠️ Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 14, React 18, TypeScript, Tailwind CSS |
| **Backend** | Node.js, NestJS, TypeScript |
| **Database** | PostgreSQL (Docker) |
| **ORM** | Prisma with migrations |
| **Caching** | Redis (Docker) |
| **Real-time** | Socket.IO/WebSockets |
| **Storage** | Local (S3-ready architecture) |
| **Testing** | Jest, Playwright, Supertest |
| **API Docs** | OpenAPI/Swagger |
| **Infrastructure** | Docker Compose |

## 📁 Project Structure

```
aijewel-crm/
├── apps/
│   ├── web/                    # Next.js frontend
│   │   ├── app/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── styles/
│   │   └── public/
│   └── api/                    # NestJS backend
│       ├── src/
│       │   ├── modules/
│       │   │   ├── auth/
│       │   │   ├── leads/
│       │   │   ├── customers/
│       │   │   ├── whatsapp/
│       │   │   ├── campaigns/
│       │   │   ├── calls/
│       │   │   ├── meetings/
│       │   │   ├── knowledge-base/
│       │   │   ├── ai/
│       │   │   ├── notifications/
│       │   │   ├── audit/
│       │   │   └── reports/
│       │   ├── common/
│       │   ├── config/
│       │   └── main.ts
│       └── test/
├── packages/
│   ├── shared/                 # Shared types & utilities
│   ├── ui/                     # Shared UI components
│   └── types/                  # TypeScript definitions
├── infrastructure/
│   └── docker/
│       ├── postgres/
│       ├── redis/
│       └── app/
├── database/
│   ├── migrations/
│   ├── seeds/
│   └── schema.prisma
├── mocks/
│   ├── whatsapp/
│   ├── meta/
│   ├── voice/
│   ├── calendar/
│   └── ai/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docs/
│   ├── ARCHITECTURE.md
│   ├── DATABASE.md
│   ├── API.md
│   ├── LOCAL_SETUP.md
│   ├── TESTING.md
│   ├── AWS_MIGRATION.md
│   ├── INTEGRATIONS.md
│   └── SECURITY.md
├── docker-compose.yml
├── .env.example
└── package.json
```

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+
- npm or yarn

### Local Development Setup

```bash
# Clone the repository
git clone https://github.com/roobashree05/dbms.git
cd aijewel-crm

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start services (PostgreSQL, Redis)
docker compose up -d

# Run database migrations
npm run db:migrate

# Seed sample data
npm run db:seed

# Start backend (in another terminal)
cd apps/api
npm run start:dev

# Start frontend (in another terminal)
cd apps/web
npm run dev
```

Visit: `http://localhost:3000`

### Running Tests

```bash
# Unit tests
npm run test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# Test coverage
npm run test:coverage
```

## 📚 Documentation

- [Architecture Overview](./docs/ARCHITECTURE.md) - System design & modules
- [Database Schema](./docs/DATABASE.md) - Entity relationships
- [API Documentation](./docs/API.md) - REST endpoints & Swagger
- [Local Setup Guide](./docs/LOCAL_SETUP.md) - Detailed setup instructions
- [Testing Guide](./docs/TESTING.md) - Testing strategy
- [AWS Migration](./docs/AWS_MIGRATION.md) - Deployment to AWS
- [Integrations](./docs/INTEGRATIONS.md) - Mock & real providers
- [Security Guide](./docs/SECURITY.md) - Security best practices

## 🔐 Authentication & Roles

### Roles
- **ADMIN** - Full system access
- **MARKETING_MANAGER** - Manage campaigns, team, reports
- **MARKETING_EXECUTIVE** - Execute campaigns, handle leads
- **SALES** - Sales conversion, customer management
- **MANAGEMENT** - View reports, analytics

### Permissions
Enforced at backend API level, not just frontend UI.

## 📊 Demo Workflow (End-to-End)

1. Import 500 WhatsApp contacts → Become CRM leads
2. Open a lead → View customer 360 view
3. Send WhatsApp message → Receive AI response
4. Create personalized campaign → Preview messages
5. Schedule campaign → Execute in mock mode
6. Book customer meeting → Add to calendar
7. Make outbound call → Mock voice bot interaction
8. View call recording → Play & read transcript
9. View dashboard → See all metrics
10. Export report → Send to stakeholders

## 🏗️ Development Phases

- [x] Phase 1: Project Foundation (Structure, Docker, Git)
- [ ] Phase 2: Database & Authentication
- [ ] Phase 3: Lead Management
- [ ] Phase 4: WhatsApp Mock Integration
- [ ] Phase 5: Campaign Management
- [ ] Phase 6: AI Knowledge Base
- [ ] Phase 7: Personalized Marketing
- [ ] Phase 8: Call Recordings
- [ ] Phase 9: Calendar & Scheduling
- [ ] Phase 10: Voice Bot
- [ ] Phase 11: Dashboard & Reporting
- [ ] Phase 12: Audit & Security
- [ ] Phase 13: Testing
- [ ] Phase 14: Performance Testing
- [ ] Phase 15: Final Local Deployment

## 🔒 Security Features

- Password hashing (bcrypt)
- JWT/Session authentication
- Role-based authorization
- Input validation
- SQL injection protection
- XSS protection
- CSRF protection
- Secure headers
- Environment-based secrets
- Audit logging

## 📈 Scalability

- Pagination for large datasets
- Server-side search & filtering
- Database indexing strategy
- Redis caching (optional)
- Prepared for AWS migration
- Unlimited lead storage (no hardcoded limits)

## 🌐 Deployment

### Local
```bash
docker compose up
npm run start
```

### AWS (Future)
- PostgreSQL → Amazon RDS
- File Storage → Amazon S3
- Redis → ElastiCache
- App → ECS/Fargate
- Secrets → AWS Secrets Manager
- Logs → CloudWatch

## 📄 Environment Variables

See `.env.example` for complete configuration. Key variables:

```
# Database
DATABASE_URL=postgresql://...

# Redis
REDIS_URL=redis://...

# Authentication
JWT_SECRET=your-secret-key

# External Services
WHATSAPP_PROVIDER=mock
META_PROVIDER=mock
VOICE_PROVIDER=mock
CALENDAR_PROVIDER=mock
AI_PROVIDER=mock

# File Storage
UPLOAD_DIRECTORY=./uploads

# Application
NODE_ENV=development
DEMO_MODE=true
```

## 🧪 Testing

- **Unit Tests**: Jest
- **Integration Tests**: Supertest, Jest
- **E2E Tests**: Playwright
- **Coverage**: >80% target

## 📞 Support

For issues, questions, or contributions, please open an issue on GitHub.

## 📄 License

MIT License - See LICENSE file for details

## 🎯 Next Steps

1. Review [ARCHITECTURE.md](./docs/ARCHITECTURE.md)
2. Follow [LOCAL_SETUP.md](./docs/LOCAL_SETUP.md)
3. Read [API.md](./docs/API.md)
4. Run tests: `npm run test`
5. Start local development: `npm run dev`

---

**Built with ❤️ for AIJewel**  
A production-grade CRM platform for jewelry business automation.
