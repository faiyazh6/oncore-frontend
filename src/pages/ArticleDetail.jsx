import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import sanityClient from '../sanityClient';
import { format } from 'date-fns';
import BlockContent from "@sanity/block-content-to-react";
import { FaBook, FaArrowLeft } from 'react-icons/fa';

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

function fetchRelatedPosts(currentPostId) {
  return sanityClient.fetch(
    `*[_type == "post" && _id != $currentPostId] | order(publishedAt desc)[0...3]{
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
      body
    }`,
    { currentPostId }
  );
}

export default function ArticleDetail() {
  const { id } = useParams();
  const [postData, setPostData] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[slug.current == "${id}"]{
          _id,
          title,
          mainImage{
            asset->{
              _id,
              url
            }
          },
          body,
          publishedAt,
          author->{
            name,
            image{
              asset->{
                _id,
                url
              }
            }
          }
        }`
      )
      .then((data) => {
        setPostData(data[0]);
        return data[0]._id;
      })
      .then(fetchRelatedPosts)
      .then(setRelatedPosts)
      .catch(console.error);
  }, [id]);

  if (!postData) return <div>Loading...</div>;

  const readingTime = calculateReadingTime(postData.body);

  return (
    <div className="lg:pl-64">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg space-y-8"> {/* Added space-y-8 for spacing between elements */}
        <header className="text-center mb-6">
          <h1 className="text-4xl font-bold mb-4">{postData.title}</h1> {/* Added mb-4 for margin-bottom */}
          <div className="flex items-center justify-center space-x-4 mb-4"> {/* Added mb-4 for margin-bottom */}
            {postData.author.image && postData.author.image.asset && (
              <img
                className="w-12 h-12 rounded-full"
                src={postData.author.image.asset.url}
                alt={postData.author.name}
              />
            )}
            <div className="text-left">
              <h4 className="text-lg font-semibold">{postData.author.name}</h4>
              <p className="text-gray-500">
                {format(new Date(postData.publishedAt), 'MMMM dd, yyyy')}
              </p>
            </div>
          </div>
          <div className="text-gray-500 text-sm mt-2">
            <span className="flex items-center justify-center">
              <FaBook className="mr-1" /> {readingTime} min read
            </span>
          </div>
        </header>
        {postData.mainImage && postData.mainImage.asset && (
          <img
            className="w-full h-auto rounded-lg mb-6"
            src={postData.mainImage.asset.url}
            alt={postData.title}
          />
        )}
        <div className="prose max-w-none mx-auto">
          <BlockContent blocks={postData.body} />
        </div>
        <hr className="my-10" />
        <div className="related-posts">
          <h2 className="text-2xl font-bold mb-4">More Posts</h2>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((post) => (
              <Link to={`/support/articles/${post.slug.current}`} key={post.slug.current} className="block rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
                {post.mainImage && post.mainImage.asset && (
                  <img src={post.mainImage.asset.url} alt={post.title} className="w-full h-48 object-cover" />
                )}
                <div className="p-4 bg-white">
                  <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                  {post.author && (
                    <div className="flex items-center mb-4">
                      {post.author.image && post.author.image.asset && (
                        <img src={post.author.image.asset.url} alt={post.author.name} className="w-8 h-8 rounded-full mr-2" />
                      )}
                      <div className="text-sm font-medium text-gray-700">{post.author.name}</div>
                    </div>
                  )}
                  <div className="text-gray-500 text-sm">
                    {format(new Date(post.publishedAt), 'MMMM dd, yyyy')}
                  </div>
                  <div className="text-gray-700 text-sm mt-2">
                    {post.body && post.body[0] && post.body[0].children && post.body[0].children[0].text.slice(0, 150)}...
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <Link to="/support/articles" className="text-customBlue hover:text-customBlue-dark flex items-center">
            <FaArrowLeft className="mr-1" />
            <span>Back to All Blog Posts</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
