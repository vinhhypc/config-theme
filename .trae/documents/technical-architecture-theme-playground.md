## 1.Architecture design
```mermaid
graph TD
  A["User Browser"] --> B["React Frontend Application"]
  B --> C["Ant Design ConfigProvider"]

  subgraph "Frontend Layer"
    B
    C
  end

  subgraph "Service Layer (Provided by Supabase)"
    D["None"]
  end
```

## 2.Technology Description
- Frontend: React@18 + TypeScript + Ant Design@5 + vite
- Backend: None

## 3.Route definitions
| Route | Purpose |
|-------|---------|
| / | Trang Playground: chỉnh theme bên trái, preview realtime bên phải, demo component theo nhóm |

## 6.Data model(if applicable)
Không có cơ sở dữ liệu trong phạm vi MVP.