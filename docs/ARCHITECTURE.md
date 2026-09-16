# AIJewel CRM - System Architecture

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER BROWSER                             │
│                    (Next.js Frontend)                           │
│  - Dashboard                                                    │
│  - Lead Management                                              │
│  - WhatsApp Chat UI                                             │
│  - Campaign Management                                          │
│  - Call Interface                                               │
└────────────────────────┬────────────────────────────────────────┘
                         │ HTTP/WebSocket
                         │ REST API + Socket.IO
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                    NestJS BACKEND API                           │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ API Modules                                              │  │
│  │ - Authentication                                         │  │
│  │ - Users & Permissions                                    │  │
│  │ - Leads & Customers                                      │  │
│  │ - WhatsApp (Mock/Real)                                   │  │
│  │ - Meta Ads (Mock/Real)                                   │  │
│  │ - Campaigns & Marketing                                  │  │
│  │ - Calls & Recordings                                     │  │
│  │ - Meetings & Calendar                                    │  │
│  │ - Knowledge Base & AI                                    │  │
│  │ - Notifications                                          │  │
│  │ - Audit Logs                                             │  │
│  │ - Reports                                                │  │
│  └──────────────────────────────────────────────────────────┘  │
│                         ↓                                        │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Infrastructure Services                                  │  │
│  │ - Logger                                                 │  │
│  │ - Error Handler                                          │  │
│  │ - File Storage (Local/S3-ready)                          │  │
│  │ - Provider Factory                                       │  │
│  │ - Validators                                             │  │
│  └──────────────────────────────────────────────────────────┘  │
└─┬──────────────────────────────────────────────────────────────┬┘
  │                                                              │
  ├─────────────────────────────────┬───────────────────────────┤
  │                                 │                           │
  ↓                                 ↓                           ↓
┌──────────────────┐      ┌──────────────────┐      ┌──────────────────┐
│   PostgreSQL     │      │   Redis Cache    │      │   Mock Providers │
│   Database       │      │   (Session,      │      │                  │
│                  │      │    Cache)        │      │ - WhatsApp       │
│ - Users          │      │                  │      │ - Meta/Facebook  │
│ - Leads          │      └──────────────────┘      │ - Voice/Call     │
│ - Customers      │                                │ - Calendar       │
│ - Messages       │                                │ - AI             │
│ - Conversations  │                                └──────────────────┘
│ - Calls          │
│ - Campaigns      │
│ - Recordings     │
│ - etc...         │
└──────────────────┘

     (Local Docker Containers)
```

## Technology Layers

### 1. **Presentation Layer (Frontend)**
- **Framework:** Next.js 14
- **UI Library:** React 18
- **Styling:** Tailwind CSS
- **State Management:** React Hooks + Context API
- **Real-time:** Socket.IO Client
- **Components:** Reusable UI components library

### 2. **API Layer (Backend)**
- **Framework:** NestJS
- **Language:** TypeScript
- **API Style:** REST
- **Authentication:** JWT + Sessions
- **Real-time:** Socket.IO Server
- **Documentation:** Swagger/OpenAPI

### 3. **Business Logic Layer**
- **Lead Management:** CRUD, import, duplicate detection
- **WhatsApp:** Message sending/receiving, conversation management
- **Campaigns:** Creation, personalization, scheduling, execution
- **Calls:** Initiation, recording, transcription
- **Meetings:** Calendar integration, booking, reminders
- **AI:** Knowledge base lookup, response generation
- **Notifications:** Event-driven notifications
- **Audit:** Complete action logging

### 4. **Data Access Layer**
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Migrations:** Prisma migrations
- **Caching:** Redis

### 5. **Integration Layer**
- **Provider Pattern:** Abstract providers for external services
- **Implementations:**
  - Mock (Local testing)
  - Real (Production APIs)
- **Services:**
  - WhatsApp Business API
  - Meta/Facebook API
  - Calendar (Google, Outlook, mock)
  - Voice (Twilio, WebRTC, mock)
  - AI (Mock knowledge base)

---

## Module Structure

```
apps/api/src/modules/

├── auth/
│   ├── controllers/
│   ├── services/
│   ├── dto/
│   ├── guards/
│   ├── strategies/
│   └── auth.module.ts

├── users/
│   ├── controllers/
│   ├── services/
│   ├── dto/
│   └── users.module.ts

├── leads/
│   ├── controllers/
│   ├── services/
│   ├── dto/
│   ├── validators/
│   └── leads.module.ts

├── whatsapp/
│   ├── controllers/
│   ├── services/
│   ├── dto/
│   ├── providers/
│   │   ├── whatsapp.provider.ts (interface)
│   │   ├── mock-whatsapp.provider.ts
│   │   └── meta-whatsapp.provider.ts (future)
│   └── whatsapp.module.ts

├── campaigns/
│   ├── controllers/
│   ├── services/
│   ├── dto/
│   └── campaigns.module.ts

├── calls/
│   ├── controllers/
│   ├── services/
│   ├── dto/
│   ├── providers/
│   └── calls.module.ts

├── meetings/
│   ├── controllers/
│   ├── services/
│   ├── dto/
│   ├── providers/
│   └── meetings.module.ts

├── knowledge-base/
│   ├── controllers/
│   ├── services/
│   ├── dto/
│   └── kb.module.ts

├── ai/
│   ├── controllers/
│   ├── services/
│   ├── dto/
│   ├── providers/
│   └── ai.module.ts

├── notifications/
│   ├── controllers/
│   ├── services/
│   ├── dto/
│   └── notifications.module.ts

├── audit/
│   ├── controllers/
│   ├── services/
│   ├── dto/
│   └── audit.module.ts

└── reports/
    ├── controllers/
    ├── services/
    ├── dto/
    └── reports.module.ts
```

---

## Data Flow Examples

### Example 1: Lead Import

```
User uploads CSV
    ↓
Frontend validation
    ↓
POST /api/leads/import
    ↓
Backend validation (email, phone)
    ↓
Duplicate detection
    ↓
Create leads in database
    ↓
Notify user: "150 leads imported, 5 duplicates"
```

### Example 2: WhatsApp Message Received

```
Customer sends message on WhatsApp
    ↓
Meta/WhatsApp webhook → AIJewel backend
    ↓
POST /api/whatsapp/webhook
    ↓
Verify webhook signature
    ↓
Extract customer phone & message
    ↓
Find or create customer in CRM
    ↓
Create conversation record
    ↓
Store message
    ↓
Broadcast to connected users via WebSocket
    ↓
Marketing team sees notification
    ↓
Marketing team replies
```

### Example 3: Campaign Execution

```
Marketing team creates campaign
    ↓
Defines target customers
    ↓
Writes template: "Hi {{name}}, new products..."
    ↓
Schedules execution time
    ↓
Campaign saved to database with status: SCHEDULED
    ↓
[At scheduled time]
Batch job processes campaign
    ↓
For each customer:
  - Fetch customer details
  - Replace variables in template
  - Send via WhatsApp provider
  - Store message record
  - Update campaign metrics
    ↓
Generate campaign report
    ↓
Notify manager: "Campaign sent to 500, delivered 495"
```

---

## Provider Pattern

Externally dependent services use a provider pattern for abstraction:

```typescript
// Interface (Contract)
interface WhatsAppProvider {
  sendMessage(phone: string, message: string): Promise<MessageResult>;
  getConversation(customerId: string): Promise<Conversation>;
  getMessageStatus(messageId: string): Promise<Status>;
}

// Mock Implementation (Local Testing)
class MockWhatsAppProvider implements WhatsAppProvider {
  async sendMessage(phone: string, message: string) {
    // Simulate sending
    return { id: 'mock-123', status: 'sent' };
  }
}

// Real Implementation (Production)
class MetaWhatsAppProvider implements WhatsAppProvider {
  async sendMessage(phone: string, message: string) {
    // Call real Meta API
    return await axios.post(META_ENDPOINT, { phone, message });
  }
}

// Factory
class WhatsAppProviderFactory {
  static create(): WhatsAppProvider {
    if (process.env.WHATSAPP_PROVIDER === 'meta') {
      return new MetaWhatsAppProvider();
    }
    return new MockWhatsAppProvider();
  }
}
```

## Database Schema Overview

```
Users ─┬─→ Roles ─→ Permissions
       └─→ Leads ─┬─→ Customers
                  ├─→ LeadTags
                  ├─→ WhatsAppConversations ─→ WhatsAppMessages
                  ├─→ Calls ─→ CallRecordings
                  ├─→ Meetings
                  └─→ FollowUps

Campaigns ─┬─→ CampaignMessages
           ├─→ CampaignRecipients
           └─→ CampaignMetrics

KnowledgeBase ─→ KnowledgeBaseDocuments

AIConversations ─→ AIMessages

Notifications
AuditLogs
Files (uploaded media)
```

---

## Security Architecture

1. **Authentication**
   - JWT tokens with expiration
   - Session management with Redis
   - Refresh token rotation

2. **Authorization**
   - Role-based access control (RBAC)
   - Permission checking at controller level
   - Database-level row security (future)

3. **Data Protection**
   - Input validation (DTO validators)
   - SQL injection prevention (Prisma ORM)
   - XSS prevention (React/Next.js)
   - CSRF protection
   - Secure headers (Helmet.js)

4. **Secrets Management**
   - Environment variables
   - No hardcoded credentials
   - Secure file storage for uploads
   - API keys isolated per provider

---

## Scalability Considerations

### Current (Local Development)
- Single PostgreSQL instance
- Single Redis instance
- In-memory services

### Future (AWS Deployment)
- PostgreSQL → Amazon RDS (managed)
- Redis → ElastiCache (managed)
- Node.js → ECS/Fargate (containerized)
- File storage → S3
- Secrets → AWS Secrets Manager
- Logs → CloudWatch
- Queue jobs → SQS (for campaigns, recordings)

---

## Error Handling & Logging

```
Application Error
    ↓
Centralized Error Handler
    ↓
Log to file/console
    ↓
Create structured error response
    ↓
Return to client:
{
  "success": false,
  "errorCode": "LEAD_NOT_FOUND",
  "message": "Lead with ID 123 was not found",
  "statusCode": 404
}
```

---

## Development Workflow

1. **Local Development**
   - Docker Compose starts services
   - npm run dev starts watchers
   - Hot reload on file changes
   - Tests run automatically

2. **Testing**
   - Unit tests for services
   - Integration tests for APIs
   - E2E tests for workflows

3. **Deployment**
   - Docker images built
   - Pushed to registry
   - Deployed to target infrastructure

---

See [LOCAL_SETUP.md](./LOCAL_SETUP.md) for running instructions.
