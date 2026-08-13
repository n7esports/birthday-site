import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/Page1_Landing';
import { TimelinePage } from './pages/Page2_Timeline';
import { CakeBuilderPage } from './pages/Page3_CakeBuilder';
import { GalleryPage } from './pages/Page4_Gallery';
import { CountdownPage } from './pages/Page5_Countdown';
import { GuestbookPage } from './pages/Page6_Guestbook';
import { PlaylistPage } from './pages/Page7_Playlist';
import { TriviaPage } from './pages/Page8_Trivia';
import { GiftsPage } from './pages/Page9_Gifts';
import { VirtualRoomPage } from './pages/Page10_VirtualRoom';
import { PhotoBoothPage } from './pages/Page11_PhotoBooth';
import { FinalePage } from './pages/Page12_Finale';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/cake" element={<CakeBuilderPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/countdown" element={<CountdownPage />} />
        <Route path="/guestbook" element={<GuestbookPage />} />
        <Route path="/playlist" element={<PlaylistPage />} />
        <Route path="/trivia" element={<TriviaPage />} />
        <Route path="/gifts" element={<GiftsPage />} />
        <Route path="/room" element={<VirtualRoomPage />} />
        <Route path="/photobooth" element={<PhotoBoothPage />} />
        <Route path="/finale" element={<FinalePage />} />
      </Routes>
    </Router>
  );
};

export default App;