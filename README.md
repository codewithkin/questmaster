# QuestMaster

An interactive storytelling game where your choices shape the adventure.

## 🚀 Overview
QuestMaster is a text-based adventure game that allows players to embark on immersive story-driven journeys. Every decision you make alters the storyline, leading to multiple branching paths and unique endings. Dive into a world of mystery, strategy, and adventure where your fate is in your hands.

## 🎮 Features
- **Choice-Driven Gameplay** – Make decisions that shape the outcome of your story.
- **Dynamic Narratives** – Experience multiple endings based on your actions.
- **Engaging Storylines** – Dive into rich, immersive stories with compelling characters.
- **Seamless User Experience** – Optimized for both desktop and mobile devices.
- **Fast Performance** – Powered by Edge Functions for ultra-responsive gameplay.

## 📦 Tech Stack
- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Vercel Edge Functions
- **Database:** Firebase / Supabase (if applicable)
- **Hosting:** Vercel

## 📜 Installation & Setup
To run the project locally, follow these steps:

```bash
# Clone the repository
git clone https://github.com/yourusername/questmaster.git
cd questmaster

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:3000/`.

## 🚀 Deployment
QuestMaster is deployed on Vercel. To deploy your own version:

```bash
# Install Vercel CLI
global add vercel

# Deploy the project
vercel
```

## 🛠 Environment Variables
To configure the project, create a `.env.local` file and add the following variables:

```env
NEBIUS_API_KEY=your_nebius_api_key
```

## 🐛 Troubleshooting
- **504 Gateway Timeout:** Increase Vercel's function timeout or optimize API calls.
- **400 Bad Request:** Ensure API requests are correctly formatted and include required parameters.
- **Slow Responses:** Edge functions are optimized in production; local dev mode may not reflect real performance.

## 👥 Contributors
- [Your Name](https://github.com/codewithkin)

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Support
If you like this project, consider giving it a ⭐ on GitHub!
