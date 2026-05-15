# 🛒 Stengg Ecom Fasion Shop — Getting Started Guide
 
This guide walks you through setting up and running the full project locally after cloning the repository.
 
---
 
## 📋 Prerequisites
 
| Tool | Version | Purpose |
|------|---------|---------|
| [.NET SDK](https://dotnet.microsoft.com/download) | 9.0+ | Run the backend API |
| [SQL Server + SSMS](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) | SSMS 20+ | Database |
| [Node.js](https://nodejs.org/) | 20.x+ | Run the frontend |
| [npm](https://www.npmjs.com/) | 10.x+ | Frontend package manager |
| Git | Any | Clone the repository |
 
---
 
## 📁 Project Structure
 
```
/
├── Api/                  # ASP.NET Core Web API (port 7148)
├── Application/          # Application logic / use cases
├── Domain/               # Domain models and interfaces
├── Infrastructure/       # Database access and external services
├── Table-Init.sql        # SQL script to initialize the database
└── frontend/             # React + Vite frontend (port 5173)
```
 
---
 
## Setup Instructions
 
### 1. Clone the Repository
 
```bash
git clone https://github.com/jxgzy24140/Stengg-Ecom.git
cd Stengg-Ecom
```
 
### 2. Set Up the Database
 
Make sure your SQL Server instance is running locally (`localhost` or `.\SQLEXPRESS`).
 
**Using SSMS:**
1. Open SSMS and connect to your SQL Server instance.
2. Go to **File → Open → File...** and select `Table-Init.sql`.
3. Press `F5` to execute.
**Using `sqlcmd`:**
```bash
sqlcmd -S localhost -E -i Table-Init.sql
```
  
### 3. Configure & Run the Backend
 
Add `Ecom.Api/appsettings.json` and update the connection string as json like below:
 
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=EComDb;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```
 
> For SQL Server authentication:
> ```
> Server=localhost;Database=EComDb;User Id=your_username;Password=your_password;TrustServerCertificate=True;
> ```
 
Then restore packages and run:
 
```bash
dotnet restore
dotnet run --project Api
```
 
Alternatively, set `Ecom.Api` as the startup project in your IDE and run from there.
 
The API will be available at **`https://localhost:7148`**.
 
> If you get a certificate error, run `dotnet dev-certs https --trust` once.
 
### 4. Set Up & Run the Frontend
 
```bash
cd frontend
npm install
npm run dev
```
 
The frontend will be available at **`http://localhost:5173`**.
 
---
 
## ✅ Verification
 
| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173/products |
| Backend (Swagger) | https://localhost:7148/swagger |
 
