# BigLineKitchen Admin App

Admin frontend for BigLineKitchen food service platform.

## Features

### ✅ Implemented
- **Authentication**: Admin login with JWT tokens
- **Dashboard**: Overview with health status and quick actions
- **Foods Management**: List and create food items
- **Health Monitoring**: Backend connectivity status

### 🚧 In Progress
- **Partners Management**: CRUD for food partners
- **Assignments**: Map foods to partners
- **Customers**: View customer profiles and data

## API Integration

This admin app integrates with the BigLineKitchen Spring Boot backend:

### Authentication (`/auth`)
- `POST /auth/login` - Admin login (form data: email, password)
- `POST /auth/register-admin` - Register new admin

### Admin Operations (`/admin`)
- `GET /admin/get-all-food` - List all foods
- `POST /admin/upload-food` - Create new food
- `GET /admin/get-all-food-partner?id={adminId}` - List food partners
- `GET /admin/get-all-costumers?id={adminId}` - List customers
- `POST /admin/assign-food` - Assign food to partner
- `GET /admin/get-all-assigned-food-details` - List assignments

### Health Check (`/api/health`)
- `GET /api/health/status` - Application status
- `GET /api/health/database` - Database connectivity

## Entity Structures (from Backend)

### Foods
```json
{
  "id": "uuid",
  "name": "string",
  "category": "string", 
  "price": "number"
}
```

### Customers (Costumers)
```json
{
  "userId": "uuid",
  "name": "string",
  "state": "string",
  "city": "string",
  "pincode": "number",
  "address": "string"
}
```

### Food Partners
```json
{
  "userId": "uuid",
  "name": "string",
  "state": "string",
  "city": "string", 
  "address": "string",
  "licenseNumber": "string",
  "certifications": "string"
}
```

## Setup Instructions

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure backend URL** (in `src/api/http.js`):
   ```javascript
   baseURL: 'http://localhost:8080'
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Make sure BigLineKitchen backend is running** on `localhost:8080`

## Development

### File Structure
```
src/
├── api/           # HTTP client and endpoint definitions
├── app/           # Layout components
├── components/    # Reusable UI components
├── features/      # Feature-specific components
│   ├── auth/      # Login, authentication
│   ├── dashboard/ # Main dashboard
│   ├── foods/     # Food management
│   ├── partners/  # Partner management (planned)
│   └── customers/ # Customer management (planned)
└── App.jsx        # Main app with routing
```

### Key Files
- `src/api/endpoints.js` - All backend API endpoints
- `src/api/http.js` - Axios instance with JWT handling
- `src/features/auth/useAuth.js` - Authentication context
- `src/App.jsx` - Route configuration

### Adding New Features
1. Create API functions in `src/features/{feature}/{feature}.api.js`
2. Add UI components in `src/features/{feature}/`
3. Update navigation in `src/app/AdminLayout.jsx`
4. Add routes in `src/App.jsx`

## Notes

- All IDs are UUIDs (backend uses UUID primary keys)
- JWT tokens are stored in localStorage as 'adminToken'
- Backend returns JWT tokens for some list operations (partners, customers)
- Error handling includes automatic redirect on 401 (token expired)
- Vite proxy forwards `/auth`, `/admin`, `/api` to backend+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
