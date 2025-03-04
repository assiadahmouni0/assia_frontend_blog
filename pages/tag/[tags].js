import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
 

export default function TagPage() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // page number
  const [perPage] = useState(4); // five blogs per Page
  const [blog, setBlog] = useState([]);
  const router = useRouter();

  const { tags } = router.query;

  useEffect(() => {
    // function to fetch blog data
    const fetchBlogdata = async () => {
      try {
        const res = await axios.get(`/api/getblog?tags=${tags}`);
        const alldata = res.data;
        setBlog(alldata);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching blog data:', error);
        setLoading(false);
      }
    };
    // fetch blog data only if category exists
    if (tags) {
      fetchBlogdata();
    } else {
      router.push('/404');
    }
  }, [tags]);


  // Pagination calculations for filtered blogs
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastBlog = currentPage * perPage;
  const indexOfFirstBlog = indexOfLastBlog - perPage;
  const currentBlogs = blog.slice(indexOfFirstBlog, indexOfLastBlog);

  const allblog = blog.length;

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allblog / perPage); i++) {
    pageNumbers.push(i);
  }

  // Filter the published blogs first
  const publishedBlogs = currentBlogs.filter(
    (blog) => blog.status === 'publish'
  );

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

  return (
    <>
      <div className='blogpage'>
        <div className='category_slug'>
          <div className='container'>
            <div className='category_title'>
              <div className='flex gap-1'>
                <h1>{loading ? <div>Loading...</div> : publishedBlogs ? publishedBlogs && publishedBlogs[0]?.tags : publishedBlogs && publishedBlogs.tags}</h1>
                <span>{loading ? <div>0</div> : publishedBlogs.filter(blog => blog.tags).length}</span>
              </div>
              <p>
                Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                Lorem Ipsum Lorem Ipsum Lorem Ipsum
              </p>
            </div>

            <div className='category_blogs mt-3'>
              {loading ? (
                <>
                  <div className='wh_100 flex flex-center mt-2 pb-5'>
                    <div className='loader'></div>
                  </div>
                </>
              ) : (
                <>
                  {publishedBlogs.map((item) => {
                    const firstImageUrl = extractFirstImageUrl(
                      item.description
                    );
                    return (
                      <div className='cate_blog' key={item._id}>
                        
                          <Link href={`/blog/${item.slug}`}>
                            <img
                              src={firstImageUrl || '/img/noimage.jpg'}
                              alt={item.title}
                            />
                          </Link>
                        
                        <div className='bloginfo mt-2'>
                          <Link href={`/tag/${item.tags[0]}`}>
                            <div className='blogtag'>{item.tags[0]}</div>
                          </Link>
                          <Link href={`/blog/${item.slug}`}>
                            <h3>{item.title}</h3>
                          </Link>
                          <p>
                            Lorum ipsum Lorum ipsum Lorum ipsum Lorum ipsum
                            Lorum ipsum Lorum ipsum Lorum ipsum
                          </p>
                          <div className='blogauthor flex fap-1'>
                            <div className='blogaimg'>
                              <img src='/img/home.png' alt='blogger' />
                            </div>
                            <div className='flex flex-col flex-left gap-05'>
                              <h4>{process.env.NEXT_PUBLIC_APP_NAME}</h4>
                              <span>
                                {new Date(item.createdAt).toLocaleDateString(
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
                disabled={currentBlogs.length < perPage}
              >
                Next
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
