# TODO: Custom API Key Authentication

- [x] 1. Create `backend/middleware/apiKey.js` - middleware that validates `x-api-key` header
- [x] 2. Edit `backend/server.js` - apply apiKey middleware to all `/api` routes
- [x] 3. Edit `backend/.env` - add `API_KEY`
- [x] 4. Edit `backend/.env.example` - add `API_KEY` placeholder
- [x] 5. Edit `frontend/.env.local` - add `NEXT_PUBLIC_API_KEY`
- [x] 6. Edit `frontend/.env.example` - add `NEXT_PUBLIC_API_KEY` placeholder
- [x] 7. Edit `frontend/services/api.js` - attach `x-api-key` header on all requests
- [x] 8. Edit `frontend/context/AuthContext.jsx` - attach header on login/register fetch
- [x] 9. Update `README.md` - document the new API_KEY env var

## ✅ All steps complete
