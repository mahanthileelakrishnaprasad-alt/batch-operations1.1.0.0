# Batch Operations – Listing, Search & Pagination

React.js frontend + Django REST Framework (ViewSet) backend.
Batch records come from a mock Python list (`backend/batches/data.py`), so no database is needed. Only GET endpoints exist.

## Project structure

```
batch-operations/
├── backend/
│   ├── config/            # settings, root urls, wsgi
│   ├── batches/
│   │   ├── data.py        # mock records (12 batches)
│   │   ├── services.py    # search + filter + pagination logic
│   │   ├── serializers.py # query-param validation + response shape
│   │   ├── views.py       # BatchViewSet
│   │   ├── urls.py        # router
│   │   └── tests.py
│   ├── manage.py
│   └── requirements.txt
└── frontend/
    └── src/
        ├── components/    # Sidebar, FilterBar, BatchTable, Pagination, StatusBadge
        ├── pages/         # BatchOperations
        ├── services/      # axios API calls
        ├── hooks/         # useDebounce
        ├── App.jsx
        └── main.jsx
```

## Backend setup (Python 3.10+)

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py runserver      # http://localhost:8000
```

Run tests: `python manage.py test`

## Frontend setup (Node 18+)

```bash
cd frontend
npm install
npm run dev                     # http://localhost:5173
```

Optional: copy `.env.example` to `.env` to change the API URL (default `http://localhost:8000/api`).

## API

`GET /api/batches?page=1&limit=5&search=&status=&centre=`

| Param    | Description                                      |
|----------|--------------------------------------------------|
| `page`   | Page number (default 1)                          |
| `limit`  | Records per page (default 5, max 50)             |
| `search` | Matches Batch Code or Course Name (contains)     |
| `status` | `Running`, `Upcoming` or `Completed`             |
| `centre` | Exact centre name                                |

Search and filters are combined (AND). Response:

```json
{
  "success": true,
  "data": [],
  "pagination": { "page": 1, "limit": 5, "totalRecords": 12, "totalPages": 3 }
}
```

`GET /api/batches/centres` returns the centre names for the "All Centres" dropdown.
Invalid params return `400`; POST/PUT/PATCH/DELETE return `405`.

## Features

- Table with Batch Code, Course, Centre, Start Date, Capacity (enrolled/total), Status
- Debounced search, status and centre filters that work together
- Pagination (5 per page): Previous/Next, clickable page numbers, "Showing 1–5 of 12 batches"
- Page resets to 1 whenever search or filters change
- Loading, error (with retry) and empty states
- "Create Batch" button is UI only; the filter icon clears search and filters
