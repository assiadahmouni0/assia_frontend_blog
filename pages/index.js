import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import useFetchData from '@/hooks/useFetchData';
import { FaHtml5 } from 'react-icons/fa';
import { TbBrandNextjs } from 'react-icons/tb';
import { FiDatabase } from 'react-icons/fi';
import { AiOutlineDeploymentUnit } from 'react-icons/ai';
import { FaTwitter } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa6';
import { FaXTwitter } from 'react-icons/fa6';
import { FaFacebook } from 'react-icons/fa';
export default function Home() {
  const [currentPage, setCurrentPage] = useState(1); // page number
  const [perPage] = useState(5); // five blogs per Page

  const { alldata, loading } = useFetchData(`/api/getblog`);

  // Filter the published blogs first
  const publishedBlogs = alldata.filter((blog) => blog.status === 'publish');

  // Pagination calculations for filtered blogs
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastBlog = currentPage * perPage;
  const indexOfFirstBlog = indexOfLastBlog - perPage;
  const currentBlogs = publishedBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const allblog = publishedBlogs.length;

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allblog / perPage); i++) {
    pageNumbers.push(i);
  }

  function extractFirstImageUrl(markdownContent) {
    // Check if markdown content is provided and not-empty
    if (!markdownContent || typeof markdownContent !== 'string') {
      return null;
    }

    // Regular expression to match the first image URL in markdown format ![alt text](imageurl)
    const regex = /!\[.*?\]\((.*?)\)/;
    const match = markdownContent.match(regex);
    return match ? match[1] : null;
  }

  /// blog's description
  function extractPreviewText(markdownContent, maxLength = 130) {
    // Check if content exists
    if (!markdownContent || typeof markdownContent !== 'string') {
      return '';
    }

    // Remove markdown images
    let text = markdownContent.replace(/!\[.*?\]$$.*?$$/g, '');

    // Remove markdown links but keep the text
    text = text.replace(/\[([^\]]+)\]$$([^)]+)$$/g, '$1');

    // Remove markdown headings
    text = text.replace(/#{1,6}\s/g, '');

    // Remove code blocks
    text = text.replace(/```[\s\S]*?```/g, '');

    // Remove inline code
    text = text.replace(/`[^`]*`/g, '');

    // Remove HTML tags
    text = text.replace(/<[^>]*>/g, '');

    // Trim whitespace and limit length
    text = text.trim();
    if (text.length > maxLength) {
      text = text.slice(0, maxLength) + '...';
    }

    return text;
  }

  return (
    <>
      <Head>
        <title>My Personal Blog</title>
        <meta name='description' content='This is my personal blog' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/canva.png' />
      </Head>
      <section className='header_data_section'>
        <div className='container flex flex-sb w-100'>
          <div className='leftheader_info' data-aos='fade-right'>
            <h1>
                  Hi i'm <span> {process.env.NEXT_PUBLIC_APP_NAME}</span>. <br /> Web Developer
            </h1>
            <h3>Specialized in Javascript, React and Next Js</h3>
            <div className='flex gap-2'>
              <Link href='/contact'>
                <button>Contact Me</button>
              </Link>
              <Link href='/about'>
                <button>About Me</button>
              </Link>
            </div>
          </div>

          <div className='rightheader_img' data-aos='fade-left'>
            <div className='img_bg_top'></div>
            <div className='img_bg_top'></div>
            <img src='/img/home.png' alt='blogger' />
          </div>
        </div>
      </section>

      <section className='main_blog_section'>
        <div className='container flex flex-sb flex-left flex-wrap gap-05'>
          <div className='leftblog_sec'>
            <h2>Recently published</h2>
            <div className='blogs_sec'>
              {loading ? (
                <div className='wh-100 flex flex-center mt-2 pb-5'>
                  <div className='loader'></div>
                </div>
              ) : (
                <>
                  {currentBlogs.map((blog) => {
                    const firstImageUrl = extractFirstImageUrl(
                      blog.description
                    );
                    return (
                      <div className='blog' key={blog._id}>
                        <div className='blogimg'>
                          <Link href={`/blog/${blog.slug}`}>
                            <img
                              src={firstImageUrl || '/img/noimage.jpg'}
                              alt={blog.title}
                            />
                          </Link>
                        </div>
                        <div className='bloginfo'>
                          <Link href={`/tag/${blog.tags[0]}`}>
                            <div className='blogtag'>{blog.tags[0]}</div>
                          </Link>
                          <Link href={`/blog/${blog.slug}`}>
                            <h3>{blog.title}</h3>
                          </Link>
                          <p>{extractPreviewText(blog.description)}</p>
                          <div className='blogauthor flex gap-1'>
                            <div className='blogaimg'>
                              <img src='/img/home.png' alt='blogger' />
                            </div>
                            <div className='flex flex-col flex-left gap-05'>
                              <h4>{process.env.NEXT_PUBLIC_APP_NAME}</h4>
                              <span>
                                {new Date(blog.createdAt).toLocaleDateString(
                                  'en-US',
                                  {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric',
                                  }
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>

            <div className='blogpagination'>
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              {pageNumbers
                .slice(
                  Math.max(currentPage - 3, 0),
                  Math.min(currentPage + 2, pageNumbers.length)
                )
                .map((number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={currentPage === number ? 'active' : ''}
                  >
                    {number}
                  </button>
                ))}

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === pageNumbers.length}
              >
                Next
              </button>
            </div>
          </div>

          <div className='rightblog_sec'>
            <div className='topics_sec' data-aos='fade-left'>
              <h2>Topics</h2>
              <div className='topics_list'>
                <Link href='/topics/javascript'>
                  <div className='topics'>
                    <div className='flex flex-center topics_svg'>
                      <FaHtml5 />
                    </div>
                    <h3>HTML, CSS, JAVASCRIPT</h3>
                  </div>
                </Link>

                <Link href='/topics/nextjs'>
                  <div className='topics'>
                    <div className='flex flex-center topics_svg'>
                      <TbBrandNextjs />
                    </div>
                    <h3>REACT JS, NEXT JS</h3>
                  </div>
                </Link>

                <Link href='/topics/database'>
                  <div className='topics'>
                    <div className='flex flex-center topics_svg'>
                      <FiDatabase />
                    </div>
                    <h3>DATABASE</h3>
                  </div>
                </Link>

                <Link href='/topics/deployment'>
                  <div className='topics'>
                    <div className='flex flex-center topics_svg'>
                      <AiOutlineDeploymentUnit />
                    </div>
                    <h3>DEPLOYMENT</h3>
                  </div>
                </Link>
              </div>
            </div>

            <div className='tags_sec mt-3' data-aos='fade-left'>
              <h2>Tags</h2>
              <div className='tags_list'>
                <Link href='/tag/html'>#HTML</Link>
                <Link href='/tag/css'>#CSS</Link>
                <Link href='/tag/javascript'>#JAVASCRIPT</Link>
                <Link href='/tag/reactjs'>#REACT JS</Link>
                <Link href='/tag/nextjs'>#NEXT JS</Link>
                <Link href='/tag/database'>#DATABASE</Link>
                <Link href='/tag/deployment'>#DEPLOYMENT</Link>
              </div>
            </div>

            <div className='letstalk_sec mt-3' data-aos='fade-left'>
              <h2>Let's Talk</h2>
              <div className='talk_sec'>
                <h4>You want to share any ideas with me ? Let's talk here !</h4>
                <div className='social_talks flex flex-center flex-wrap gap-1 mt-2'>
                  <div className='st_icon'>
                    <FaGithub />
                  </div>
                  <div className='st_icon'>
                    <FaInstagram />
                  </div>
                  <div className='st_icon'>
                    <FaTwitter />
                  </div>
                  <div className='st_icon'>
                    <FaLinkedin />
                  </div>
                  <div className='st_icon'>
                    <FaXTwitter />
                  </div>
                  <div className='st_icon'>
                    <FaFacebook />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
