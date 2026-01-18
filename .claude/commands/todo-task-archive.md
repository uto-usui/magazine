---
description: Archive completed TODO file to docs/archive and clean up [/todo-task-archive]
arguments:
  - name: file_path
    type: string
    required: true
    description: Path to the TODO file to archive (e.g., TODO.md)
---

## context

- Archive Directory: @ai/archive
- Memory Directory: @ai/memory

## 📋 Archive Rules

### 🎯 Archive Purpose
- Preserve implementation results and specifications for future reference
- Remove draft/exploratory information, keeping only essential context
- Maintain decision rationale (why this implementation approach was chosen)
- Clean up TODO.md after successful archiving

### 📝 Information to Preserve

**MUST KEEP**:
- ✅ Implementation specifications and requirements
- ✅ Technical decisions and rationale (why this approach?)
- ✅ Final implementation details (completed tasks marked with `[x]`)
- ✅ Reference materials and related documentation links
- ✅ Important insights and lessons learned
- ✅ File paths and commit hashes of modified files

**REDUCE TO SUMMARY**:
- 🔸 Investigation/exploration process → Keep overview only
- 🔸 Multiple implementation candidates → Keep chosen approach + brief reason
- 🔸 Detailed task breakdowns → Keep high-level summary
- 🔸 Temporary notes and TODOs → Remove or summarize

**REMOVE**:
- ❌ Incomplete/abandoned tasks (unless context is needed)
- ❌ Duplicate information already in other docs
- ❌ Temporary debugging notes
- ❌ Draft content without value

### 📂 Archive File Naming Convention
- Format: `YYYY-MM-DD-{topic-name}.md`
- Example: `2025-10-19-evaluation-rank-accordion.md`
- Save to: `/ai/archive/YYYY-MM-DD-{topic-name}.md`

### 🔗 Cross-Reference Handling
- If TODO.md references `/ai/memory/` files, keep those references in archive
- Update memory file references if they need to be moved/consolidated

## Processing Flow

### Step 1: Read and Analyze TODO File
- Read the TODO file specified in $ARGUMENTS
- Identify:
  - Main topic/feature name
  - Completed tasks and implementation details
  - Related documentation and memory files
  - Technical decisions and rationale
  - Investigation results to preserve

### Step 2: Check Related Memory Files
- Check if TODO references any `/ai/memory/` files
- Read those files to understand full context
- Determine if memory files should be:
  - Kept as-is (referenced in archive)
  - Consolidated into archive
  - Removed (if duplicate/obsolete)

### Step 3: Create Archive Document
- Generate archive file in `/ai/archive/YYYY-MM-DD-{topic}.md`
- Structure:
  ```markdown
  # {Feature/Topic Name}

  **Archive Date**: YYYY-MM-DD
  **Status**: Completed
  **Related PR**: #{number} (if applicable)

  ## Overview
  [Brief description of what was implemented]

  ## Implementation Details
  [Key technical details from completed tasks]

  ## Technical Decisions
  [Why this approach was chosen - preserve decision rationale]

  ## Related Files
  - Modified: [list of files with line numbers/commit hashes]
  - Documentation: [links to related docs]

  ## Reference
  [Links to PRs, issues, external resources]

  ## Notes
  [Important insights, lessons learned, future considerations]
  ```

### Step 4: Clean Up Memory Files (if needed)
- If memory files are consolidated into archive:
  - Remove duplicate memory files
  - Keep unique memory files that may be referenced elsewhere

### Step 5: Remove TODO File
- Delete the original TODO.md file
- Ensure archive is saved before deletion

### Step 6: Completion Report
- Report archive file path
- Summarize preserved information
- List any cleaned up files
- Confirm TODO.md deletion

## 📚 Reference Documentation

- [Related Documentation List](@docs)

## Example Archive Output

```markdown
# User Authentication Feature Implementation

**Archive Date**: 2025-10-19
**Status**: Completed
**Related PR**: #123

## Overview
Implemented JWT-based authentication system with login, logout, and token refresh functionality. Added role-based access control (RBAC) for admin and user roles.

## Implementation Details

### Phase 1: Backend Authentication API
- Created authentication endpoints (`/api/auth/login`, `/api/auth/logout`, `/api/auth/refresh`)
- Implemented JWT token generation and validation middleware
- Added password hashing using bcrypt
- Set up token refresh mechanism with refresh tokens stored in httpOnly cookies

### Phase 2: Frontend Integration
- Created authentication context and hooks (`useAuth`, `useRequireAuth`)
- Implemented login/logout UI components
- Added protected route wrapper component
- Integrated token refresh logic with API interceptors

### Phase 3: Role-Based Access Control
- Extended JWT payload to include user roles
- Created permission checking utilities
- Added role-based UI rendering logic
- Implemented admin-only routes and components

## Technical Decisions

**Why JWT instead of session-based auth?**
- Better scalability for distributed systems
- Stateless authentication reduces server memory usage
- Easier to implement mobile app authentication in the future

**Why httpOnly cookies for refresh tokens?**
- Prevents XSS attacks by making tokens inaccessible to JavaScript
- More secure than localStorage for sensitive tokens

**Why bcrypt for password hashing?**
- Industry-standard algorithm with built-in salt generation
- Configurable work factor for future-proofing against hardware improvements

## Related Files

**Modified**:
- `src/server/routes/auth.ts` (Lines 15-156)
- `src/server/middleware/authenticate.ts` (Lines 1-48)
- `src/client/contexts/AuthContext.tsx` (Lines 1-95)
- `src/client/components/LoginForm.tsx` (Lines 1-120)
- `src/client/components/ProtectedRoute.tsx` (Lines 1-35)

**Created**:
- `src/server/utils/tokenManager.ts`
- `src/client/hooks/useAuth.ts`
- `src/types/auth.ts`

**Commits**:
- abc123d: Add JWT authentication endpoints
- def456e: Implement token refresh mechanism
- ghi789f: Create authentication context and hooks
- jkl012g: Add role-based access control

## Reference
- PR: https://github.com/{your-org}/{your-repo}/pull/123
- JWT Library: jsonwebtoken v9.0.2
- Bcrypt Library: bcrypt v5.1.1
- Related Documentation: `/ai/memory/authentication-strategy.md`

## Notes
- Token expiration set to 15 minutes (access token) and 7 days (refresh token)
- Consider implementing rate limiting for login attempts in the future
- Email verification not yet implemented - planned for next phase
- Admin role currently has full access - consider implementing granular permissions
```
