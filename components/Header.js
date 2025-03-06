import { IoSearchSharp } from 'react-icons/io5';
import { IoMoonSharp } from 'react-icons/io5';
import { IoSunnyOutline } from 'react-icons/io5';
import { IoSearch } from 'react-icons/io5';
import { HiBars3BottomRight } from 'react-icons/hi2';
import { FaXmark } from 'react-icons/fa6';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useFetchData from '../hooks/useFetchData';

export default function Header() {
  // function of open and close searchbar
  const [searchopen, setSearchopen] = useState(false);

  // for open searchbar
  const openSearchbar = () => {
    setSearchopen(true);
  };

  // for open searchbar
  const closeSearchbar = () => {
    setSearchopen(false);
  };

  // aside bar for  mobile device

  const [aside, setAside] = useState(false);

  // for open searchbar
  const openAsidemenu = () => {
    setAside(true);
  };

  // for open searchbar
  const closeAsidemenu = () => {
    setAside(false);
  };
  // to close aside menu also when i click on a link in the menu
  const handleLinkClick = () => {
    setAside(false);
  };

  // Dark mode on / off
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // check local storage for darkMode preference on initial load
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
  }, []);

  useEffect(() => {
    // apply dark mode styles when darkmode state changes
    if (darkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode); // toggle darkMode status
  };

  // fetch search data
  const { alldata, loading } = useFetchData('/api/getblog');

  // filtring published blogs
  const publishedBlogs = alldata.filter((blog) => blog.status === 'publish');

  const [searchQuery, setSearchQuery] = useState('');
  // filtering based on search query, search data from title
  const filtredBlogs =
    searchQuery.trim() === ''
      ? publishedBlogs
      : publishedBlogs.filter((blog) =>
          blog.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

  /// blog's description
  function extractPreviewText(markdownContent, maxLength = 100) {
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
      <div className='header_sec'>
        <div className='container header'>
          <div className='logo'>
            {/*<img src="canva.png" alt="logo"/>*/}
            <Link href='/'>
              <h1>My Blog</h1>
            </Link>
          </div>
          <div className='searchbar'>
            <IoSearchSharp />
            <input
              type='search'
              onClick={openSearchbar}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Discover news, articles and more...'
            />
          </div>

          <div className='nav_list_dark'>
            <ul>
              <li>
                <Link href='/'>Home</Link>
              </li>
              <li>
                <Link href='/about'>About Me</Link>
              </li>
              <li>
                <Link href='/contact'>Contact</Link>
              </li>
            </ul>
            {/*for mobile device*/}
            <div className='navlist_mobile_ul'>
              <button onClick={toggleDarkMode}>
                {darkMode ? <IoMoonSharp /> : <IoSunnyOutline />}
              </button>
              <button onClick={openSearchbar}>
                <IoSearch />
              </button>
              <button onClick={openAsidemenu}>
                <HiBars3BottomRight />
              </button>
            </div>
            <div className='darkmode'>
              <label className='switch'>
                <input
                  type='checkbox'
                  checked={darkMode}
                  onChange={toggleDarkMode}
                />
                <span className='slider_header'></span>
              </label>
            </div>
          </div>
        </div>

        <div className={`search_click ${searchopen ? 'open' : ''}`}>
          <div className='searchab_input'>
            <IoSearchSharp />
            <input
              type='search'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Discover news, articles and more...'
            />
          </div>

          <div className='search_data text-center'>
            {loading ? (
              <div className='wh_100 flex flex-center mt-2 pb-5'>
                <div className='loader'></div>
              </div>
            ) : (
              <>
                {searchQuery ? (
                  <>
                    {filtredBlogs.slice(0, 3).map((blog) => {
                      return (
                        <div
                          className='blog'
                          key={blog._id}
                          onClick={closeSearchbar}
                        >
                          <div className='bloginfo'>
                            <Link href={`/blog/${blog.slug}`}>
                              <h3>{blog.slug}</h3>
                            </Link>
                            <p> {extractPreviewText(blog.description)} </p>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <div>No search result</div>
                )}
              </>
            )}
          </div>

          <div className='exit_search' onClick={closeSearchbar}>
            <div>
              <FaXmark />
            </div>
            <h4>ESC</h4>
          </div>
        </div>

        {/*mobile navlist */}
        <div className={aside ? `navlist_mobile open` : 'navlist_mobile'}>
          <div className='navlist_m_title flex flex-sb'>
            <h1>My Blogs</h1>
            <button onClick={closeAsidemenu}>
              <FaXmark />
            </button>
          </div>
          <hr />
          <h3 className='mt-3'>Main Menu</h3>
          <ul onClick={handleLinkClick}>
            <li>
              <Link href='/'>Home</Link>
            </li>
            <li>
               <Link href="/about">About Me</Link>
            </li>
            <li>
              <Link href='/contact'>Contact</Link>
            </li>
          </ul>
          <hr />
          <h3 className='mt-3'>Topics</h3>
          <ul onClick={handleLinkClick}>
            <li>
              <Link href='/topics/javascript'>HTML, CSS & JAVASCRIPT</Link>
            </li>
            <li>
              <Link href='/topics/nextjs'>NEXT JS </Link>
            </li>
            <li>
              <Link href='/database'>DATABASE</Link>
            </li>
            <li>
              <Link href='/deployment'>DEPLOYMENT</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
