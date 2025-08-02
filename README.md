# James Portfolio

A modern portfolio website built with Next.js, showcasing tools, frameworks, and blog articles. This project demonstrates best practices in React development, testing, and content management.

## Features

### 🎨 Showcase Section
- Display tools and frameworks with filtering capabilities
- Search functionality across projects
- Featured projects highlighting
- Responsive grid layout
- Demo and source code links

### 📝 Blog System
- Markdown-based blog posts
- Tag-based categorization
- Search and filter functionality
- Responsive design
- SEO optimized

### 🛠 Technical Stack
- **Frontend**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Testing**: Vitest + Playwright
- **Content**: Markdown with gray-matter
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio-site
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
portfolio-site/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── blog/           # Blog pages
│   │   ├── showcase/       # Showcase pages
│   │   └── about/          # About page
│   ├── components/         # React components
│   ├── lib/               # Utility functions
│   └── test/              # Test setup
├── content/
│   └── blog/              # Markdown blog posts
├── tests/
│   └── e2e/               # Playwright E2E tests
└── public/                # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run unit tests with Vitest
- `npm run test:ui` - Run tests with UI
- `npm run test:e2e` - Run E2E tests with Playwright
- `npm run test:e2e:ui` - Run E2E tests with UI

## Content Management

### Adding Blog Posts

1. Create a new markdown file in `content/blog/`
2. Add frontmatter with metadata:
```markdown
---
title: "Your Post Title"
date: "2024-01-15"
excerpt: "Brief description of the post"
tags: ["Tag1", "Tag2"]
featured: false
---

Your content here...
```

### Adding Showcase Items

Edit the `showcaseItems` array in `src/app/showcase/page.tsx`:

```typescript
{
  id: 1,
  title: 'Project Name',
  description: 'Project description',
  category: 'tool' | 'framework',
  tags: ['React', 'TypeScript'],
  image: '/path/to/image',
  demoUrl: 'https://demo.example.com',
  githubUrl: 'https://github.com/example/project',
  featured: true,
}
```

## Testing

### Unit Tests
Tests are written using Vitest and React Testing Library:

```bash
npm run test
```

### E2E Tests
End-to-end tests using Playwright:

```bash
npm run test:e2e
```

### Test Coverage
- Component testing with React Testing Library
- E2E testing with Playwright
- Mock implementations for Next.js features

## Deployment

This project is designed to run locally. For production deployment:

1. Build the project:
```bash
npm run build
```

2. Start the production server:
```bash
npm run start
```

## Customization

### Styling
- Modify Tailwind classes in components
- Update color scheme in `tailwind.config.js`
- Add custom CSS in `src/app/globals.css`

### Content
- Update personal information in components
- Modify sample data in showcase and about pages
- Add your own blog posts in `content/blog/`

### Configuration
- Update metadata in `src/app/layout.tsx`
- Modify navigation items in `src/components/Navigation.tsx`
- Update social links in `src/components/Footer.tsx`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

- Email: james@example.com
- GitHub: [@james](https://github.com/james)
- LinkedIn: [James](https://linkedin.com/in/james)

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS.
