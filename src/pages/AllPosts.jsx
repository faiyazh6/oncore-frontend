import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import sanityClient from '../sanityClient';
import { format } from 'date-fns';
import { FaBook } from 'react-icons/fa';

function calculateReadingTime(body) {
  const words = body.reduce((acc, block) => {
    if (block.children) {
      block.children.forEach((child) => {
        acc += child.text.split(' ').length;
      });
    }
    return acc;
  }, 0);
  const readingTime = Math.ceil(words / 200);
  return readingTime;
}

export default function AllPosts() {
  const [allPostsData, setAllPosts] = useState(null);
  const [visiblePosts, setVisiblePosts] = useState(6);
  const [searchInput, setSearchInput] = useState('');
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "post"]{
          title,
          slug,
          mainImage{
            asset->{
              _id,
              url
            }
          },
          author->{
            name,
            image{
              asset->{
                _id,
                url
              }
            }
          },
          publishedAt,
          body,
          tags
        }`
      )
      .then((data) => {
        setAllPosts(data);
        setArticles(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    setFilteredArticles(
      articles.filter((article) =>
        article.title.toLowerCase().includes(searchInput.toLowerCase())
      )
    );
  }, [searchInput, articles]);

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleResultClick = (slug) => {
    navigate(`/support/articles/${slug.current}`);
  };

  const handleLoadMore = () => {
    setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 6);
  };

  return (
    <div>
      <div className="lg:pl-64">
        <div className="my-5 flex h-16 shrink-0 items-center justify-between bg-white px-4 sm:px-6 lg:px-8">
          <h1 className="font-bold text-4xl font-manrope text-custom-blue">Support Pages</h1>
        </div>

        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl mx-auto">
              <input
                type="text"
                placeholder="Search..."
                className="w-full py-3 px-4 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                value={searchInput}
                onChange={handleSearchChange}
              />
              {searchInput && (
                <div className="mt-4 bg-white p-4 rounded-md shadow-md">
                  {filteredArticles.length > 0 ? (
                    filteredArticles.map((article) => (
                      <div
                        key={article.slug.current}
                        onClick={() => handleResultClick(article.slug)}
                        className="py-2 border-b last:border-b-0 cursor-pointer"
                      >
                        <h3 className="text-lg font-semibold">{article.title}</h3>
                        {article.publishedAt && (
                          <div className="text-gray-500 text-sm">
                            {format(new Date(article.publishedAt), 'MMMM dd, yyyy')}
                          </div>
                        )}
                        <div className="text-gray-700 text-sm mb-2">
                          {article.body && article.body[0] && article.body[0].children && article.body[0].children[0].text.slice(0, 150)}...
                        </div>
                        <div className="text-gray-500 text-sm flex items-center">
                          <FaBook className="mr-1" /> {calculateReadingTime(article.body)} min read
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-2 text-gray-500">No articles found.</div>
                  )}
                </div>
              )}
            </div>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {allPostsData &&
                allPostsData.slice(0, visiblePosts).map((post, index) => (
                  <Link to={`/support/articles/${post.slug.current}`} key={post.slug.current} className="block rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="rounded-lg overflow-hidden">
                      {post.mainImage && post.mainImage.asset && (
                        <img src={post.mainImage.asset.url} alt={post.title} className="w-full h-48 object-cover" />
                      )}
                    </div>
                    <div className="p-4 bg-white rounded-b-lg">
                      <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                      {post.author && (
                        <div className="flex items-center mb-4">
                          {post.author.image && post.author.image.asset && (
                            <img src={post.author.image.asset.url} alt={post.author.name} className="w-10 h-10 rounded-full mr-3" />
                          )}
                          <div className="text-sm font-medium text-gray-700">{post.author.name}</div>
                        </div>
                      )}
                      {post.publishedAt && (
                        <div className="text-gray-500 text-sm mb-2">
                          {format(new Date(post.publishedAt), 'MMMM dd, yyyy')}
                        </div>
                      )}
                      <div className="text-gray-700 text-sm mb-4">
                        {post.body && post.body[0] && post.body[0].children && post.body[0].children[0].text.slice(0, 150)}...
                      </div>
                      <div className="text-gray-500 text-sm flex items-center">
                        <FaBook className="mr-1" /> {calculateReadingTime(post.body)} min read
                      </div>
                      {post.tags && (
                        <div className="flex flex-wrap space-x-2">
                          {post.tags.map((tag, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
            </div>
            {allPostsData && visiblePosts < allPostsData.length && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={handleLoadMore}
                  className="px-4 py-2 bg-indigo-500 text-white rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
