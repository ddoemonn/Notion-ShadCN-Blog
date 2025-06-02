# 🚀 Notion-ShadCN-Blog

**Your personal blog ready in 1 minute!** ⚡

A beautiful, fast, and modern blog powered by Notion as CMS and built with Next.js 15 + ShadCN/UI. No database setup, no complex configuration - just connect your Notion workspace and you're ready to go!

## 🖼️ Screenshots
<img width="1710" alt="Screenshot 2025-06-03 at 00 40 58" src="https://github.com/user-attachments/assets/dca8c148-3753-4b5c-9440-7d84b2a3af61" />
<img width="1710" alt="Screenshot 2025-06-03 at 00 44 53" src="https://github.com/user-attachments/assets/645821cd-4ca1-4640-b011-71c32405886b" />
<img width="1710" alt="Screenshot 2025-06-03 at 00 45 01" src="https://github.com/user-attachments/assets/a417a462-d859-4f87-980d-c5f7058de57c" />


## ✨ Features

- 🎨 **Beautiful UI** - Clean, modern design with ShadCN/UI components
- 📝 **Notion as CMS** - Write your posts in Notion, see them live instantly
- 🌙 **Dark/Light Mode** - Automatic theme switching
- 📱 **Fully Responsive** - Perfect on all devices
- ⚡ **Lightning Fast** - Built with Next.js 15 and optimized for performance
- 🔍 **Smart Search** - Search through your posts with ease
- 🏷️ **Auto Tags** - Automatic tag detection from Notion
- 📊 **Mermaid Diagrams** - Support for flowcharts and diagrams
- 🎯 **SEO Ready** - Perfect SEO with automatic meta tags
- 🚀 **Auto Deploy** - Deploy to Vercel in one click

## 🎯 Quick Start (1 Minute Setup!)

### 1. Fork & Clone
```bash
git clone https://github.com/ddoemonn/Notion-ShadCN-Blog
cd Notion-ShadCN-Blog
npm install
```

### 2. Setup Environment
```bash
cp .env.example .env.local
```

Edit `.env.local` with your info:
```env
# 🔑 Notion API (Required)
NOTION_SECRET=your_notion_integration_secret_here

# 👤 Your Personal Info
USER_NAME="Your Name"
USER_ROLE="Your Role/Title"
USER_DESCRIPTION="A brief description about yourself"
USER_EMAIL="your.email@example.com"
USER_AVATAR="/avatar.jpg"

# 🌐 Site Configuration
NEXT_PUBLIC_SITE_URL="https://yourdomain.com"
```

### 3. Create Notion Integration
1. Go to [Notion Integrations](https://www.notion.so/my-integrations)
2. Click "New integration"
3. Give it a name (e.g., "My Blog")
4. Copy the "Internal Integration Token" → This is your `NOTION_SECRET`

### 6. Run & Deploy
```bash
npm run dev
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + ShadCN/UI
- **CMS**: Notion API
- **Language**: TypeScript
- **Deployment**: Vercel (recommended)
- **Icons**: Lucide React
- **Diagrams**: Mermaid.js

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── blog/[slug]/       # Dynamic blog post pages
│   ├── page.tsx           # Homepage
│   └── layout.tsx         # Root layout
├── components/            
│   ├── notion/            # Modular Notion renderer
│   │   ├── text-blocks.tsx
│   │   ├── list-blocks.tsx
│   │   ├── media-blocks.tsx
│   │   └── layout-blocks.tsx
│   ├── ui/                # ShadCN/UI components
│   └── ...               # Custom components
├── lib/
│   ├── notion.ts          # Notion API integration
│   └── utils.ts           # Utilities
└── public/               # Static assets
```

## 🎨 Customization

### Styling
- Modify `app/globals.css` for global styles
- Use ShadCN/UI components in `components/ui/`
- Customize colors in `tailwind.config.js`

### Content Types
The blog automatically supports:
- 📝 Rich text with formatting
- 🖼️ Images and media
- 📊 Tables and databases
- 🔗 Links and embeds
- ✅ Todo lists
- 📋 Code blocks with syntax highlighting
- 📈 Mermaid diagrams
- 💬 Quotes and callouts

### Adding Custom Blocks
Add new block types in `components/notion/` following the modular structure.

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repo to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms
- **Netlify**: Works perfectly
- **Railway**: Great for backend-heavy needs
- **DigitalOcean**: App Platform ready

## 📝 Writing Your First Post

1. Open Notion
2. Create a new page in your database (or anywhere!)
3. Add a title, some content, tags
4. Set status to "Published"
5. Your post is live! 🎉

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this for your own blog!

## 🙏 Acknowledgments

- [Notion](https://notion.so) for the amazing API
- [ShadCN/UI](https://ui.shadcn.com/) for beautiful components
- [Next.js](https://nextjs.org/) for the awesome framework
- [Vercel](https://vercel.com/) for easy deployment

---

**Made with ❤️ and ☕ - Happy blogging!**

[![Star on GitHub](https://img.shields.io/github/stars/yourusername/notion-shadcn-blog?style=social)](https://github.com/yourusername/notion-shadcn-blog)
[![Fork on GitHub](https://img.shields.io/github/forks/yourusername/notion-shadcn-blog?style=social)](https://github.com/yourusername/notion-shadcn-blog/fork)
