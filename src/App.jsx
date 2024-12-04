import { useEffect } from "react";
import { useState } from "react"
import Card from "./components/shared/Card";
import ImageSearch from "./components/shared/ImageSearch";
// Remove dotenv import and config as it's not needed in create-react-app
// Remove dotenv import and config as it's not needed in create-react-app

function App() {

  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState('');

  useEffect(() => {
    // fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API}&q=${term}&image_type=photo&pretty=true`)
    const apiKey = import.meta.env.VITE_PIXABAY_API_KEY;
    fetch(`https://pixabay.com/api/?key=${apiKey}&q=${term}&image_type=photo&pretty=true`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setImages(data.hits);
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  }, [term]);

  return (
    <div className="container mx-auto mt-10">
      <ImageSearch searchText={(text) => setTerm(text)} />
      {!isLoading && images.length === 0 && <h1 className="text-5xl text-center mx-auto mt-32">No Images Found</h1>}
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <h1>Loading...</h1>
        </div>

      ) : (
        <div className="grid grid-cols-2 gap-4">
          {images.map(image => (
            <Card key={image.id} image={image} />
          ))}
        </div>
      )}
    </div>

  )
}

export default App
