# Testing Guidelines

- All core features must have unit tests.
- Every new feature or bug fix should include appropriate tests.
- Tests should be easy to read, maintain, and update.
- Use descriptive test names and clear assertions.
- Maintain high coverage for critical paths (input, validation, API, error handling).
- Separate frontend and backend tests in their respective folders.
- Run all tests before merging or deploying changes.
- Fix failing tests before committing code.
- Prefer automated tests (Jest) for both frontend and backend.
- Mock external dependencies and APIs where needed.
- Keep tests fast and isolated from external systems.
- Document any complex test logic with comments.
