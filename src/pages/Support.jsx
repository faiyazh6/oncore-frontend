import React, { useEffect, useState } from 'react';
import Header from '../components/support/Header';
import FAQs from '../components/support/FAQs';
import SupportLinks from '../components/support/SupportLinks';

const Support = () => {
  const [selectedFaq, setSelectedFaq] = useState(null);

  useEffect(() => {
    // Replace these details with the actual user information
    const user = {
      email: 'user@example.com',
      fullName: 'User Full Name',
      profileImgUrl: 'https://example.com/profile.jpg',
    };

    window.pylon = {
      chat_settings: {
        app_id: '830bc5f7-26c1-4d82-b15a-85cc26ffb406',
        email: user.email,
        name: user.fullName,
        avatar_url: user.profileImgUrl,
      },
    };
  }, []);

  useEffect(() => {
    console.log("Selected FAQ updated:", selectedFaq);
  }, [selectedFaq]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="lg:pl-64">
        <Header setSelectedFaq={setSelectedFaq} />
        <main>
          <div className="px-0 sm:px-0 lg:px-0">
            <SupportLinks />
            <FAQs selectedFaq={selectedFaq} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Support;
