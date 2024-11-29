import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function ImageGenerator() {
  const [prompt, setPrompt] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [apiKey, setApiKey] = useState('') // State to store the user input API key
  const [showApiError, setShowApiError] = useState(false) // State to show an error message if the API key is missing

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setImageUrl('')
    setShowApiError(false)

    if (!apiKey) {
      setShowApiError(true) // Show an error if API key is not provided
      setLoading(false)
      return
    }

    try {
      const formData = new FormData()
      formData.append('prompt', prompt)
      formData.append('negative_prompt', '') // Optional: you can set a default negative prompt
      formData.append('aspect_ratio', '1:1') // Default aspect ratio
      formData.append('seed', '0') // Default random seed
      formData.append('output_format', 'png') // Default format

      const response = await fetch('https://api.stability.ai/v2beta/stable-image/generate/core', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Accept: 'image/*',
        },
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to generate image')
      }

      const blob = await response.blob()
      const imageUrl = URL.createObjectURL(blob)
      setImageUrl(imageUrl)
    } catch (err) {
      setError('An error occurred while generating the image.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Generate Your Image</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Describe your image"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                required
              />
            </div>

            {/* New input field for the API key */}
            <div>
              <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700">
                Enter your API Key (You can get a free API after signup on <a href="https://platform.stability.ai/" className="text-blue-600" target="_blank" rel="noopener noreferrer">Stability AI Platform</a>)
              </label>
              <Input
                id="apiKey"
                type="password"
                placeholder="Your API Key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                required
              />
              {showApiError && <p className="text-red-500 mt-2">Please enter your API key to proceed.</p>}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Generating...' : 'Generate Image'}
            </Button>
          </form>
          {error && <p className="mt-4 text-red-500">{error}</p>}
          {imageUrl && (
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Generated Image:</h3>
              <img src={imageUrl} alt="Generated image" className="w-full rounded-lg shadow-lg" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
