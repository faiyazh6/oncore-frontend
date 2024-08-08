import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import sanityClient from '../../sanityClient';
import { FaQuestionCircle, FaBook } from 'react-icons/fa';
import { faqs } from './FAQs';

const Header = ({ setSelectedFaq }) => {
  const [searchInput, setSearchInput] = useState('');
  const [articles, setArticles] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "post"]{
          title,
          slug,
          body
        }`
      )
      .then((data) => setArticles(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    const combinedResults = [
      ...articles.map(article => ({ ...article, type: 'article' })),
      ...faqs.map(faq => ({ ...faq, type: 'faq' })),
    ];

    setFilteredResults(
      combinedResults.filter(item =>
        item.title?.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.question?.toLowerCase().includes(searchInput.toLowerCase())
      )
    );
  }, [searchInput, articles]);

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleResultClick = (item) => {
    if (item.type === 'article') {
      navigate(`/support/articles/${item.slug.current}`);
    } else {
      setSelectedFaq(item.question);
      document.getElementById('faqs').scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-blue-50 py-6 sm:py-9 lg:py-12">
      <div className="absolute top-8 right-8">
        <a
          href="https://portal.usepylon.com/oncore/forms/support-form"
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <div className="bg-[#222E93] text-white py-2 px-4 rounded-md text-center cursor-pointer">
            Submit Ticket
          </div>
        </a>
      </div>
      <div className="relative mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 px-6 lg:px-8">
        <div className="flex flex-col justify-center max-w-lg mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-700 sm:text-5xl font-manrope">
            How can we help you?
          </h1>
          <div className="mt-8 flex flex-col">
            <input
              type="text"
              placeholder="Search..."
              className="w-full py-3 px-4 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              value={searchInput}
              onChange={handleSearchChange}
            />
            {searchInput && (
              <div className="mt-4 bg-white p-4 rounded-md shadow-md">
                {filteredResults.length > 0 ? (
                  filteredResults.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => handleResultClick(item)}
                      className="py-2 border-b last:border-b-0 cursor-pointer"
                    >
                      <div className="flex items-center">
                        {item.type === 'article' ? (
                          <FaBook className="mr-2 text-customBlue" />
                        ) : (
                          <FaQuestionCircle className="mr-2 text-customBlue" />
                        )}
                        {item.title || item.question}
                      </div>
                    </div>
                  ))
                ) : (
                  <div>
                    <a
                      href="https://portal.usepylon.com/oncore/forms/support-form"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mt-2 text-customBlue hover:text-customBlue-dark"
                    >
                      No post is found - please open a support ticket
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center lg:justify-end-16">
          <img
            className="w-auto h-auto max-h-80"
            src="/images/oncore.png"
            alt="Oncore"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
