## <a name="tech-stack">⚙️ Tech Stack</a>

- MongoDB
- React.js
- Tailwind CSS
- Node.js
- Express.js
- Cloudinary

# <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/skp544/blog_app.git
cd blog_app/server
```

**Installation For Server**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your server and add the following content:

```env
PORT=3000

MONGODB_URI=mongodb://localhost:27017/blog_app

JWT_SECRET=

CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_CLOUD_NAME=
```

Replace the values with your actual credentials

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the API.

**Installation For Client**

Go to the client directory

```bash
cd ../client
```

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your client and add the following content:

```env
VITE_FIREBASE_API_KEY=
```

Replace the values with your actual credentials

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the UI.
