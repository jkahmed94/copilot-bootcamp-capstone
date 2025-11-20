# Functional Requirements

## Core Features

### FR-1: Email Input
Users can enter or paste email text into a text area for rewriting.

**Acceptance Criteria:**
- Text area with minimum 8 rows
- Auto-focus on page load
- Support for keyboard shortcut (Ctrl/Cmd + Enter)

---

### FR-2: Tone Selection
Users can select from three predefined tones to transform their email.

**Tone Options:**
- Friendly 😊 - Warm and approachable
- Professional 💼 - Formal and polished
- Assertive 💪 - Direct and confident

**Acceptance Criteria:**
- Dropdown with clear tone descriptions
- Single tone selection at a time

---

### FR-3: Email Rewriting
System processes input and returns rewritten email in selected tone.

**Acceptance Criteria:**
- POST to `/rewrite` endpoint with text and tone
- Backend validates both fields are present
- Returns rewritten text or error message
- MVP: Placeholder response (AI integration post-MVP)

---

### FR-4: Input Validation
System validates user input before processing.

**Acceptance Criteria:**
- Email text cannot be empty
- Tone must be selected
- Clear error messages for validation failures
- Frontend and backend validation

---

### FR-5: User Feedback
System provides visual feedback for all operations.

**Acceptance Criteria:**
- Loading indicator during processing
- Error messages display prominently
- Errors auto-dismiss after 5 seconds
- Submit button disabled during processing

---

### FR-6: Result Display
System displays rewritten email clearly.

**Acceptance Criteria:**
- Dedicated output section
- Text is readable and selectable
- Placeholder text before first rewrite
- Visual distinction from input area

---

### FR-7: Health Check
Backend provides health check endpoint for monitoring.

**Acceptance Criteria:**
- `/health` endpoint returns `{"status": "ok"}`
- Returns 200 status code
- No authentication required

---

### FR-8: Error Handling
System handles errors gracefully.

**Error Types:**
- Network failures
- Validation errors
- Invalid tone selections
- Missing required fields

**Acceptance Criteria:**
- User-friendly error messages
- Appropriate HTTP status codes
- No application crashes
- All promise rejections caught

---

## Post-MVP

### FR-9: AI Integration
Replace placeholder with actual AI-powered email rewriting using OpenAI API.

### FR-10: Additional Tones
Add more tone options (Casual, Formal, Empathetic, Persuasive) based on user feedback.
