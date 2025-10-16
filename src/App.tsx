import './index.css';
import { Button } from "@/components/ui/button"


function App() {
  return (
    <>
      <div>
        <h1 className='text-red-500'>
          TailwindCSS is working!
        </h1>
      </div>
      
      <div className="flex min-h-svh flex-col items-center justify-center">
        <Button>Click me</Button>
      </div>
    </>
  );
}

export default App;
