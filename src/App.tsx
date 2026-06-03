import HomePage from './pages/HomePage';

export default function App() {
//   useEffect(() => {
//     const handleResize = () => {
//       const app = document.getElementById('app');
//       if (app) {
//         const targetWidth = 1440;
//         const targetHeight = 700;
//         const windowWidth = window.innerWidth;
//         const windowHeight = window.innerHeight;

//         const scaleX = windowWidth / targetWidth;
//         const scaleY = windowHeight / targetHeight;

//         app.style.transform = `translate(-50%, -50%) scale(${scaleX}, ${scaleY})`;
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     handleResize();

//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

  return <HomePage />;
}
