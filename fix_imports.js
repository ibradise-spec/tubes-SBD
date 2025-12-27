const fs = require('fs');
const path = require('path');

const filesToFix = [
  // App.js
  { 
    file: 'src/App.js',
    find: "import { AuthProvider } from '/Context/AuthContext';",
    replace: "import { AuthProvider } from './Context/AuthContext';"
  },
  
  // Dashboard components
  {
    file: 'src/components/Dashboard/AdminDashboard.jsx',
    find: "import { useAuth } from '/../context/AuthContext';",
    replace: "import { useAuth } from '../../context/AuthContext';"
  },
  {
    file: 'src/components/Dashboard/AdminDashboard.jsx',
    find: "import './Dashboard.css';",
    replace: ""
  },
  
  {
    file: 'src/components/Dashboard/CSDashboard.jsx',
    find: "import { useAuth } from '/../context/AuthContext';",
    replace: "import { useAuth } from '../../context/AuthContext';"
  },
  
  {
    file: 'src/components/Dashboard/LogisticsDashboard.jsx',
    find: "import { useAuth } from '/../context/AuthContext';",
    replace: "import { useAuth } from '../../context/AuthContext';"
  },
  
  // Layout components
  {
    file: 'src/components/Layout/Navbar.jsx',
    find: "import { useAuth } from '../context/AuthContext';",
    replace: "import { useAuth } from '../../context/AuthContext';"
  },
  
  {
    file: 'src/components/Layout/ProtectedRoute.jsx',
    find: "import { useAuth } from '/../context/AuthContext';",
    replace: "import { useAuth } from '../../context/AuthContext';"
  },
  
  {
    file: 'src/components/Layout/Sidebar.jsx',
    find: "import { useAuth } from '/../context/AuthContext';",
    replace: "import { useAuth } from '../../context/AuthContext';"
  },
  
  // Management
  {
    file: 'src/components/Management/UserManagement.jsx',
    find: "import { useAuth } from '/../context/AuthContext';",
    replace: "import { useAuth } from '../../context/AuthContext';"
  },
  
  // Pages
  {
    file: 'src/pages/Dashboard.jsx',
    find: "import { useAuth } from '/context/AuthContext';",
    replace: "import { useAuth } from '../context/AuthContext';"
  },
  
  {
    file: 'src/pages/Error403.jsx',
    find: "import './Error403.css';",
    replace: ""
  },
  
  {
    file: 'src/pages/Login.jsx',
    find: "import { useAuth } from '/context/AuthContext';",
    replace: "import { useAuth } from '../context/AuthContext';"
  }
];

filesToFix.forEach(({ file, find, replace }) => {
  const filePath = path.join(__dirname, file);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (content.includes(find)) {
      content = content.replace(find, replace);
      fs.writeFileSync(filePath, content);
      console.log(`✓ Fixed: ${file}`);
    } else {
      console.log(`⚠  Not found in ${file}: ${find}`);
    }
  } else {
    console.log(`✗ File not found: ${file}`);
  }
});

console.log('\n✅ Import paths fixed!');