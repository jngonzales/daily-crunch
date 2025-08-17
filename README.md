# Daily Crunch - AI-Powered News Aggregator

A modern, AI-powered news aggregator that fetches real news from RSS feeds and provides intelligent summaries. Built with React, TypeScript, and Firebase.

## Recent Bug Fixes (August 2025)

### ✅ Fixed Issues:
1. **Fake News Content**: Replaced placeholder/fake news generation with real RSS feed fetching
2. **Firebase Index Errors**: Simplified database queries to avoid composite index requirements
3. **CORS Issues**: Added CORS proxy support for RSS feed fetching
4. **Fallback System**: Implemented NewsAPI.org as a backup when RSS feeds fail
5. **Error Handling**: Improved error messages and user feedback

### 🔧 Technical Improvements:
- **Real RSS Parsing**: Now fetches actual news from 50+ international sources
- **Better Error Recovery**: Automatic fallback to alternative news sources
- **Improved Performance**: Concurrent RSS fetching with proper error handling
- **User Experience**: Added RSS connection test and better loading states

## Features

- 🌍 **Real International News**: Fetches actual news from RSS feeds worldwide
- 🤖 **AI Summarization**: Intelligent article summaries using NLP
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile
- 🔐 **User Authentication**: Save articles and personalize your experience
- 🌐 **Country Filtering**: Get news from specific countries or regions
- ⚡ **Fast Loading**: Optimized performance with concurrent fetching

## News Sources

The app now fetches real news from:
- **North America**: CNN, NYT, Washington Post, TechCrunch, CBC
- **Europe**: BBC, Guardian, Reuters, Deutsche Welle, Le Monde
- **Asia**: NHK, Asahi, Korea Herald, Times of India
- **Oceania**: ABC News, Sydney Morning Herald, NZ Herald
- **South America**: Folha, Clarín, El Mercurio
- **Africa**: News24, Daily Nation, Punch, Al-Ahram

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd daily-crunch
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase** (optional, for user features)
   - Create a Firebase project
   - Add your Firebase config to `src/lib/firebase.ts`
   - Enable Authentication and Firestore

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Test RSS Connection**
   - Click "Test RSS Connection" to verify news fetching works
   - If RSS fails, the app automatically uses fallback sources

## How It Works

1. **RSS Fetching**: The app fetches news from RSS feeds using a CORS proxy
2. **Content Processing**: Articles are cleaned and categorized automatically
3. **AI Summarization**: NLP models generate intelligent summaries
4. **Fallback System**: If RSS fails, NewsAPI.org provides backup content
5. **User Features**: Save articles, filter by country, track reading history

## Troubleshooting

### RSS Feeds Not Working?
- Click "Test RSS Connection" to check status
- The app automatically falls back to NewsAPI.org
- Check browser console for detailed error messages

### Firebase Errors?
- Index errors are normal for new installations
- Saved articles will work once the database is set up
- Check Firebase console for configuration issues

### No News Loading?
- Try refreshing the page
- Check your internet connection
- The app will show helpful error messages

## Technologies Used

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **UI Components**: Radix UI, Shadcn/ui
- **News Fetching**: RSS Parser, Axios
- **AI/ML**: ONNX Runtime, Hugging Face Transformers
- **Backend**: Firebase (Auth, Firestore)
- **Build Tool**: Vite

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

---

**Note**: This app now fetches real news content. The previous version showed placeholder content, which has been completely replaced with actual RSS feed integration.
