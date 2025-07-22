import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './route/protectedRoute';
import { routes } from './route';

function App() {
  const renderRoute = (route:any) => {
    const Component = route.component;
    const element = route.isProtected ? (
      <ProtectedRoute>
        <Component />
      </ProtectedRoute>
    ) : (
      <Component />
    );
    return <Route path={route.path} element={element} />;
  }
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(renderRoute)} {/* Add this line to render all routes */}
      </Routes>
    </BrowserRouter>
  );
};
export default App;