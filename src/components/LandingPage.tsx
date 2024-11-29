import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] text-center">
      <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
        Transform Your Words into Art
      </h1>
      <p className="text-xl mb-8 max-w-2xl">
        iMagine harnesses the power of cutting-edge AI to bring your ideas to life. 
        Describe your vision, and watch as it materializes before your eyes.
      </p>
      <Link to="/generate">
        <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
          Start Creating
        </Button>
      </Link>
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard 
          title="AI-Powered" 
          description="Utilizes state-of-the-art AI models to generate stunning images."
        />
        <FeatureCard 
          title="Limitless Creativity" 
          description="Your imagination is the only limit. Create any image you can describe."
        />
        <FeatureCard 
          title="Fast & Easy" 
          description="Generate high-quality images in seconds with a simple text prompt."
        />
      </div>
    </div>
  )
}

function FeatureCard({ title, description }) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-2 text-purple-400">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  )
}

