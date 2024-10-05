import { BrowserRouter } from 'react-router-dom';
import RoutesComponent from './routes';

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.DEV ? '/' : '/react-foundation-3/'}>
      <RoutesComponent />
    </BrowserRouter>
  );
}
