# CMS Admin UI

A professional, modern, and responsive CMS Admin Dashboard built with React and Ant Design. Features a clean interface with dark theme support and comprehensive content management capabilities.

## Features

### 🎨 Modern UI/UX
- Clean and professional design
- Responsive layout for all devices
- Dark/Light theme toggle
- Collapsible sidebar navigation
- Intuitive user interface

### 📊 Dashboard
- Key metrics overview (users, posts, views, bounce rate)
- Interactive charts and graphs
- Traffic analytics with line charts
- User signup trends with bar charts
- Device usage pie chart
- Recent posts table

### 📝 Post Management
- Create, edit, and delete posts
- Rich text editor with TinyMCE
- Post status management (draft, published, scheduled)
- Category and tag management
- Featured image upload
- SEO settings
- Bulk operations
- Advanced search and filtering

### 👥 User Management
- User CRUD operations
- Role-based access control (Admin, Editor, Author, Subscriber)
- User status management
- Advanced search and filtering
- User activity tracking
- Bulk user operations

### ⚙️ Settings
- General site configuration
- Media and branding settings
- Content management settings
- User and comment settings
- SEO and analytics configuration
- System settings
- Email configuration

## Tech Stack

- **React 18** - Modern React with hooks
- **Ant Design 5** - Professional UI component library
- **React Router DOM** - Client-side routing
- **Recharts** - Beautiful charts and graphs
- **TinyMCE** - Rich text editor
- **Day.js** - Date manipulation library

## Project Structure

```
src/
├── components/
│   └── Layout/
│       ├── Header.js          # Top navigation header
│       └── Sidebar.js         # Collapsible sidebar
├── pages/
│   ├── Dashboard.js           # Main dashboard with metrics
│   ├── PostManagement.js      # Post listing and management
│   ├── PostEditor.js          # Create/edit posts
│   ├── UserManagement.js      # User management interface
│   └── Settings.js            # Site configuration
├── App.js                     # Main app component
├── index.js                   # App entry point
└── index.css                  # Global styles
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cms-admin-ui
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Key Components

### Layout Components

**Header.js**
- Collapsible sidebar toggle
- Global search functionality
- Theme switcher (light/dark)
- User profile dropdown

**Sidebar.js**
- Navigation menu with icons
- Collapsible design
- Active route highlighting

### Page Components

**Dashboard.js**
- Metrics cards with statistics
- Interactive charts using Recharts
- Recent activity tables

**PostManagement.js**
- Data table with sorting and filtering
- Bulk operations
- Status management
- Search functionality

**PostEditor.js**
- Rich text editor integration
- Form validation
- Image upload
- SEO optimization fields

**UserManagement.js**
- User CRUD operations
- Role and permission management
- Advanced filtering
- User activity tracking

**Settings.js**
- Comprehensive site configuration
- Form-based settings management
- File upload for branding
- System preferences

## Customization

### Theme Customization
The app uses Ant Design's theme system. You can customize colors, fonts, and other design tokens by modifying the `ConfigProvider` theme configuration in `App.js`.

### Adding New Features
1. Create new components in the appropriate directories
2. Add routes in `App.js`
3. Update the sidebar navigation in `Sidebar.js`

### API Integration
Replace the mock data in components with actual API calls. The components are structured to easily integrate with REST APIs or GraphQL endpoints.

## Responsive Design

The interface is fully responsive and works well on:
- Desktop computers (1200px+)
- Tablets (768px - 1199px)
- Mobile devices (< 768px)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or support, please open an issue in the repository or contact the development team.

---

Built with ❤️ using React and Ant Design