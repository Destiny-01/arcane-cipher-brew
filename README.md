# 🧙‍♂️ Private Potion Brewing Simulator

An enchanted, gamified learning experience that teaches Fully Homomorphic Encryption (FHE) concepts through mystical alchemy and potion brewing metaphors.

Built for the **Zama Hello FHEVM Bounty** 🌟

## ✨ Features

- **Mystical Design**: Dark enchanted forest theme with purple, green, and gold color palette
- **Gamified Learning**: Progress through 10 sections by completing interactive quizzes
- **Beautiful Animations**: Framer Motion transitions, particle effects, glowing elements
- **Interactive Quizzes**: Multiple question types (MCQ, True/False, Fill-in-the-blank)
- **Progress Tracking**: LocalStorage-based system tracks completed sections and quiz attempts
- **Responsive Layout**: Fixed header with mana bar, scrollable sidebar with locked/unlocked sections
- **Reusable Components**: Modular architecture with themed content blocks

## 🎨 Design System

- **Fonts**: 
  - Titles: Cinzel (serif)
  - Body: Crimson Text (serif)
- **Colors**:
  - Primary: Mystical Purple (`#a78bfa`)
  - Secondary: Emerald Green (`#6ee7b7`)
  - Accent: Golden (`#fbbf24`)
- **Effects**: Glow shadows, particle animations, portal swirls, parchment scrolls

## 🏗️ Architecture

### Component Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Fixed header with mana bar
│   │   ├── Sidebar.tsx         # Scrollable TOC with lock states
│   │   └── Footer.tsx          # Credits and resources
│   ├── content/
│   │   ├── SectionHeader.tsx   # Animated section titles
│   │   ├── LearningObjectives.tsx
│   │   ├── SubHeader.tsx
│   │   ├── ContentBlock.tsx
│   │   ├── CodeBlock.tsx       # Syntax-highlighted code
│   │   ├── NoteBlock.tsx       # Parchment-style notes
│   │   ├── TipBlock.tsx        # Glowing tip boxes
│   │   └── ResourceList.tsx    # External links
│   ├── quiz/
│   │   └── QuizModal.tsx       # Full-screen quiz interface
│   ├── ParticleBackground.tsx  # Canvas-based particle system
│   └── SectionTemplate.tsx     # Main section renderer
├── hooks/
│   └── useProgress.ts          # LocalStorage progress management
├── data/
│   └── sections.json           # Content & quiz data
└── pages/
    └── Index.tsx               # Main application page
```

### Key Technologies

- **React 18** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** (styling)
- **Framer Motion** (animations)
- **React Syntax Highlighter** (code blocks)
- **React Confetti** (celebration effects)
- **LocalStorage** (progress persistence)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd private-potion-brewing

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

### Building for Production

```bash
npm run build
npm run preview  # Preview production build
```

## 📚 Content Structure

### Section Data Format (sections.json)

```json
{
  "sections": [
    {
      "id": 1,
      "title": "Section Title",
      "subtitle": "Subtitle",
      "description": "Introduction text",
      "learningObjectives": ["Objective 1", "Objective 2"],
      "content": [
        { "type": "subheader", "text": "Subheading" },
        { "type": "text", "content": "Paragraph text" },
        { "type": "code", "language": "typescript", "code": "...", "title": "..." },
        { "type": "note", "icon": "scroll", "title": "...", "content": "..." },
        { "type": "tip", "icon": "sparkles", "title": "...", "content": "..." }
      ],
      "resources": [
        { "title": "Resource Name", "url": "https://..." }
      ]
    }
  ],
  "quizzes": [
    {
      "sectionId": 1,
      "questions": [
        {
          "id": 1,
          "type": "mcq",
          "question": "Question text?",
          "options": ["A", "B", "C", "D"],
          "correctAnswer": 2,
          "explanation": "Why this is correct"
        }
      ]
    }
  ]
}
```

### Quiz Question Types

1. **Multiple Choice (mcq)**
   - `correctAnswer`: index of correct option (0-based)

2. **True/False (true-false)**
   - `correctAnswer`: boolean

3. **Fill in the Blank (fill-blank)**
   - `correctAnswer`: string (case-insensitive comparison)

## 🎮 How to Use

1. **Start Learning**: Begin with Section 1 (unlocked by default)
2. **Read Content**: Explore the mystical content blocks and code examples
3. **Take Quiz**: Click the "Enter the Portal of Trials" button
4. **Master Section**: Score 100% to unlock the next section
5. **Track Progress**: Watch your mana bar fill as you complete sections
6. **Reset Anytime**: Use the Reset button in the header to start over

## 🔮 Features Explained

### Progress System
- Sections unlock sequentially after completing previous quiz
- Progress persists in LocalStorage
- Mana bar shows overall completion (10% per section)
- Quiz attempts and scores are tracked

### Quiz Modal
- Full-screen overlay with mystical cauldron theme
- Real-time feedback per question
- Confetti celebration on completion
- Unlimited retries until 100% score
- Smooth transitions between questions

### Animations
- Particle effects (80 floating particles)
- Glowing text effects on titles
- Portal swirl animation
- Fade-in animations on scroll
- Shake effect on wrong answers
- Confetti on quiz completion

## 🎨 Customization

### Adding New Sections

1. Add section data to `src/data/sections.json`
2. Add corresponding quiz questions
3. Sections automatically appear in sidebar
4. No code changes required!

### Styling

- Modify `src/index.css` for global theme tokens
- Update `tailwind.config.ts` for design system
- Use semantic CSS classes like `.glow-purple`, `.btn-enchanted`

## 📖 Resources

- [Zama Documentation](https://docs.zama.ai/)
- [fhEVM Documentation](https://docs.zama.ai/fhevm)
- [Introduction to FHE](https://www.zama.ai/introduction-to-homomorphic-encryption)

## 🤝 Contributing

This project was built for the Zama Hello FHEVM Bounty. Feel free to fork and adapt for your own educational purposes!

## 📝 License

MIT License - feel free to use this project as a template for other educational content.

## 🙏 Acknowledgments

- **Zama** for pioneering FHE technology and the fhEVM
- Design inspiration from mystical alchemy and fantasy RPGs
- Community FHE resources and documentation

---

**Built with 💜 for the Zama Community**

*May your potions brew privately, and your encryptions remain unbroken!* 🧪✨
