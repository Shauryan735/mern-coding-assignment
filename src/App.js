import React, { useEffect, useState } from 'react';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { getRandomImage } from './api';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const ShareButton = ({ imageUrl }) => {
  return (
    <div className="share-buttons">
      <FacebookShareButton url={window.location.href}>
        Share on Facebook
      </FacebookShareButton>
      <TwitterShareButton url={window.location.href}>
        Share on Twitter
      </TwitterShareButton>
      <WhatsappShareButton url={window.location.href}>
        Share on WhatsApp
      </WhatsappShareButton>
    </div>
  );
};

const ImagePage = () => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchRandomImage = async () => {
      const randomImage = await getRandomImage();
      setImageUrl(randomImage);
    };
    fetchRandomImage();
  }, []);

  return (
    <div className="container">
      {imageUrl && (
        <>
          <img src={imageUrl} alt="Random" className="image" />
          <ShareButton imageUrl={imageUrl} />
        </>
      )}
    </div>
  );
};

const App = () => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchRandomImage = async () => {
      const randomImage = await getRandomImage();
      setImageUrl(randomImage);
    };
    fetchRandomImage();
  }, []);

  const previewImageUrl = window.location.origin + imageUrl;

  return (
    <Router>
      <Route path="/" exact component={ImagePage} />
      <Route
        path="/preview"
        render={() => (
          <Helmet>
            {previewImageUrl && (
              <meta property="og:image" content={previewImageUrl} />
            )}
          </Helmet>
        )}
      />
    </Router>
  );
};

export default App;
