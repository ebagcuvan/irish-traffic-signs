# Irish Traffic Signs Learning Platform

A comprehensive web application for learning Irish traffic signs, built with Next.js and featuring interactive quizzes, detailed sign explanations, and a modern user interface.

## 🚦 Features

- **400+ Traffic Signs**: Complete collection of Irish road signs with detailed explanations
- **Interactive Quizzes**: Test your knowledge with multiple choice questions
- **Sign Details**: Comprehensive information including meaning, category, and context
- **Favorites System**: Save your favorite signs for quick access
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between themes for comfortable viewing
- **SEO Optimized**: Each sign has its own page with proper metadata
- **Modern UI**: Clean, intuitive interface with Irish green theme

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Data**: JSON-based sign database
- **Deployment**: Vercel-ready

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ebagcuvan/irish-traffic-signs.git
cd irish-traffic-signs
```

2. Install dependencies:
```bash
cd frontend
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
irish-traffic-signs/
├── frontend/                 # Next.js application
│   ├── app/                 # App router pages
│   │   ├── signs/          # Traffic signs pages
│   │   ├── quiz/           # Quiz functionality
│   │   ├── faq/            # FAQ page
│   │   └── ...
│   ├── components/         # React components
│   ├── lib/               # Utility functions
│   └── public/            # Static assets
├── data/                   # JSON data files
├── scripts/               # Utility scripts
└── docs/                  # Documentation
```

## 🎯 Key Pages

- **Homepage**: Hero section, features, testimonials, and app promotion
- **Signs**: Browse all traffic signs with filtering and search
- **Sign Detail**: Individual sign pages with comprehensive information
- **Quiz**: Interactive quiz to test your knowledge
- **FAQ**: Frequently asked questions about Irish traffic signs
- **Help Center**: Driving test information and resources
- **App**: Mobile app promotion page

## 🎨 Design Features

- **Irish Green Theme**: Consistent color scheme throughout
- **Modern Typography**: Clean, readable fonts
- **Responsive Grid**: Adaptive layouts for all screen sizes
- **Interactive Elements**: Hover effects and smooth transitions
- **Accessibility**: Proper contrast ratios and keyboard navigation

## 📱 Mobile App

The platform also promotes a mobile app with:
- Offline learning capabilities
- Progress tracking
- Push notifications
- Native performance

## 🔧 Development

### Adding New Signs

1. Add sign data to `data/traffic_signs.json`
2. Add corresponding image to `frontend/public/signs/`
3. Update the image path in the JSON file

### Customizing Styles

- Main theme colors: `frontend/tailwind.config.js`
- Component styles: Individual component files
- Global styles: `frontend/app/globals.css`

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support or questions, please open an issue on GitHub.

---

Built with ❤️ for Irish drivers and learners