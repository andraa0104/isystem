# Setup Tutorial (Docker)

This document contains two quick setup guides:
1) Local MySQL (DB_HOST on the same computer)
2) VPS MySQL (DB_HOST on 103.121.122.196)

---

## Prerequisites (Both)

1) Install Docker Desktop and enable the WSL2 engine.
2) Enable WSL Integration in Docker Desktop:
   - Open Docker Desktop → Settings → Resources → WSL Integration.
   - Turn on "Enable integration with my default WSL distro".
   - Check `Ubuntu-22.04` (or your WSL distro).
   - Click "Apply & Restart".
3) (Optional but recommended) Install Ubuntu WSL:
   ```
   wsl --install -d Ubuntu-22.04
   ```
4) Copy or clone the `isystem` project to the new computer.

---

## Tutorial 1 — Local DB (MySQL on the same computer)

### 1) Update `.env`
Set the app URL and database configuration:
```
APP_URL=http://localhost:8080
ASSET_URL=http://localhost:8080

DB_HOST=host.docker.internal
DB_PORT=3306
DB_DATABASE=dbsja
DB_USERNAME=your_local_user
DB_PASSWORD=your_local_password
```

### 2) Start Docker
Production mode:
```
docker compose -f isystem/docker-compose.yml up -d --build
```

Development mode (hot reload):
```
docker compose -f isystem/docker-compose.yml -f isystem/docker-compose.dev.yml up -d
```

### 3) Open the app
```
http://localhost:8080
```

---

## Tutorial 2 — VPS DB (Host: 103.121.122.196)

### 1) Update `.env`
Set the app URL and database configuration:
```
APP_URL=http://localhost:8080
ASSET_URL=http://localhost:8080

DB_HOST=103.121.122.196
DB_PORT=3306
DB_DATABASE=dbsja
DB_USERNAME=abdul
DB_PASSWORD=your_vps_password
```

### 2) Start Docker
```
docker compose -f isystem/docker-compose.yml up -d --build
```

### 3) Ensure VPS access is allowed
On the VPS MySQL:
- Port 3306 must be open in the firewall.
- User `abdul` must be granted access from your client IP.

---

## Notes

- If you edit `.env`, restart containers:
  ```
  docker compose -f isystem/docker-compose.yml up -d
  ```
- For dev mode in WSL, run the compose commands inside Ubuntu for better file performance.
