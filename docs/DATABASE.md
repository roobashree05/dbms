# Database Schema

## Overview

The AIJewel CRM database is built with PostgreSQL and managed through Prisma ORM. It's designed to handle unlimited lead storage with proper indexing for performance.

## Entity Relationship Diagram

```
Users 
  ├─ Roles (Admin, Manager, Executive, Sales)
  ├─ Permissions
  ├─ Leads (assigned)
  ├─ Campaigns (created)
  ├─ Calls (agent)
  └─ Meetings (organizer)

Leads
  ├─ Customer (1:1)
  ├─ LeadSource
  ├─ LeadCategory
  ├─ LeadTags
  ├─ Notes
  ├─ LeadTimeline (activity)
  ├─ WhatsAppConversations
  ├─ Calls
  ├─ Meetings
  ├─ FollowUps
  ├─ CampaignRecipients
  └─ AIConversations

WhatsApp
  ├─ WhatsAppContact
  ├─ WhatsAppGroup (import source)
  ├─ WhatsAppConversation
  └─ WhatsAppMessage

Campaigns
  ├─ CampaignMessage (sent messages)
  ├─ CampaignRecipient (targets)
  └─ CampaignMetric (performance)

Calls
  ├─ CallRecording
  └─ CallTranscript (speech-to-text)

Meetings
  └─ Calendar events linked to leads/customers

Knowledge Base
  └─ KnowledgeBaseDocument

AI
  ├─ AIConversation
  └─ AIMessage

FollowUps
  └─ Linked to leads with due dates

Notifications
  └─ Event-based notifications

AuditLog
  └─ Complete action history
```

## Core Tables

### Users
- Stores application users
- Role-based access control
- One user can manage multiple leads, campaigns

### Leads
- Core entity - represents potential customers
- Status: NEW, CONTACTED, QUALIFIED, MEETING_SCHEDULED, FOLLOW_UP, CONVERTED, LOST
- Source: WHATSAPP_GROUP, META_ADS, MANUAL, CSV_IMPORT, etc.
- Can be assigned to users for follow-up
- Has unlimited capacity

### Customers
- 1:1 relationship with Lead (after conversion)
- Stores detailed customer information
- Communication preferences
- Consent for marketing/calls

### WhatsApp Tables
- **WhatsAppContact**: Individual contacts from WhatsApp
- **WhatsAppGroup**: Group information (import source)
- **WhatsAppConversation**: Thread between user and contact
- **WhatsAppMessage**: Individual messages with status

### Campaigns
- **Campaign**: Main campaign record (DRAFT → SCHEDULED → RUNNING → COMPLETED)
- **CampaignMessage**: Actual messages sent to each recipient
- **CampaignRecipient**: Target leads for campaign
- **CampaignMetric**: Performance metrics

### Calls
- **Call**: Call record (INCOMING/OUTGOING, VOICE/VIDEO)
- **CallRecording**: Audio file metadata
- **CallTranscript**: AI-generated transcript from recording

### Meetings
- Calendar events
- Linked to leads/customers
- Organizer and participant tracking

### Knowledge Base
- Stores company/product information
- Used by AI for grounded responses
- Categories: COMPANY, PRODUCT, PRICING, FAQ, SUPPORT, etc.

### AI
- **AIConversation**: Chat conversation with AI
- **AIMessage**: Individual messages in conversation
- Tracks confidence score and used knowledge sources

### FollowUps
- Task reminders linked to leads
- Types: CALL, EMAIL, WHATSAPP, MEETING
- Priority levels: LOW, NORMAL, HIGH, URGENT

### Audit Log
- Complete history of all actions
- User, action, entity, before/after data
- IP address and user agent for security

## Indexing Strategy

```sql
-- Lead lookups by status (dashboard, filtering)
CREATE INDEX idx_leads_status ON leads(status);

-- Lead lookup by source (import tracking)
CREATE INDEX idx_leads_source ON leads(source);

-- Lead lookup by phone (duplicate detection)
CREATE INDEX idx_leads_phone ON leads(phone);

-- Lead lookup by assigned user
CREATE INDEX idx_leads_assigned_to ON leads(assigned_to_id);

-- Lead timeline chronological queries
CREATE INDEX idx_lead_timeline_created ON lead_timeline(created_at);

-- WhatsApp message sorting
CREATE INDEX idx_whatsapp_messages_timestamp ON whatsapp_message(timestamp);

-- Campaign scheduling
CREATE INDEX idx_campaigns_scheduled_at ON campaigns(scheduled_at);

-- Meeting calendar lookups
CREATE INDEX idx_meetings_start_time ON meetings(start_time);

-- Follow-up due dates
CREATE INDEX idx_followups_due_date ON follow_ups(due_date);

-- Audit trail searches
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at);
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
```

## Migrations

All schema changes use Prisma migrations:

```bash
# Create migration
cd apps/api
npx prisma migrate dev --name add_new_field

# Apply migrations
npx prisma migrate deploy

# View schema
npx prisma studio
```

## Data Relationships

### One-to-Many
- User → Leads
- User → Campaigns
- Lead → Notes
- Lead → Calls
- Campaign → Messages

### Many-to-Many
- Leads ↔ Tags (through LeadTag)
- Roles ↔ Permissions (through role_permission)

### One-to-One
- Lead → Customer (after conversion)
- Call → CallRecording
- CallRecording → CallTranscript

## Scalability

### Current (Local)
- Single PostgreSQL instance
- Direct connection from backend
- In-memory caching with Redis

### AWS (Future)
- RDS PostgreSQL with replication
- Read replicas for reporting
- Connection pooling (PgBouncer)
- Partitioning for large tables (leads, messages)
- CloudWatch monitoring

## Constraints & Rules

1. **Unique Constraints**
   - User email
   - Lead phone (combination with WhatsApp phone)
   - WhatsApp contact phone
   - Role/Permission names

2. **Not Null Constraints**
   - Lead name, phone, status
   - Campaign name, type
   - User email, password

3. **Foreign Key Constraints**
   - Cascade delete: Notes, Messages, Recordings when parent deleted
   - Restrict delete: User roles, Lead status references

## Performance Tips

1. **Search Operations**
   - Use indexed fields (phone, email, status)
   - Implement pagination (LIMIT 50, OFFSET)
   - Server-side search with LIKE on indexed fields

2. **Bulk Operations**
   - Batch inserts (1000 rows at a time)
   - Bulk update with CASE statements
   - Avoid N+1 queries with proper joins

3. **Reporting**
   - Use aggregate functions (COUNT, SUM, AVG)
   - Materialized views for complex reports
   - Cache results in Redis

## Example Queries

```sql
-- Get leads created this week
SELECT * FROM leads WHERE created_at >= now() - interval '7 days' AND status = 'NEW';

-- Count messages by status
SELECT status, COUNT(*) FROM whatsapp_message GROUP BY status;

-- Campaign performance
SELECT c.name, COUNT(cr.id) as recipients, cm.delivered, cm.clicks
FROM campaigns c
LEFT JOIN campaign_recipients cr ON c.id = cr.campaign_id
LEFT JOIN campaign_metrics cm ON c.id = cm.campaign_id;

-- Leads with follow-ups due
SELECT l.*, fu.due_date FROM leads l
JOIN follow_ups fu ON l.id = fu.lead_id
WHERE fu.due_date <= now() AND fu.status = 'PENDING';
```

## Backup & Recovery

```bash
# Backup
pg_dump aijewel_crm > backup.sql

# Restore
psql aijewel_crm < backup.sql
```

## See Also

- [ARCHITECTURE.md](./ARCHITECTURE.md) - System design
- [API.md](./API.md) - API endpoints
- [LOCAL_SETUP.md](./LOCAL_SETUP.md) - Setup instructions
