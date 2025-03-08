"use client"

import { useRouter } from "next/router"
import axios from "axios"
import { useState, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism"
import remarkGfm from "remark-gfm"
import { FaTwitter } from "react-icons/fa"
import { FaGithub } from "react-icons/fa"
import { FaInstagram } from "react-icons/fa"
import { FaLinkedin } from "react-icons/fa6"
import Link from "next/link"
import { FaHtml5 } from "react-icons/fa"
import { TbBrandNextjs } from "react-icons/tb"
import { FiDatabase } from "react-icons/fi"
import { AiOutlineDeploymentUnit } from "react-icons/ai"

export default function BlogPage() {
  const router = useRouter()
  const { slug } = router.query

  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [copiedCode, setCopiedCode] = useState("")

  useEffect(() => {
    const fetchBlogData = async () => {
      if (!slug) return router.push("/404")

      try {
        const response = await axios.get(`/api/getblog?slug=${slug}`)
        const data = response.data
        setBlog(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching blog data:", error)
        setLoading(false)
      }
    }

    fetchBlogData()
  }, [slug, router])

  // Function to handle code copying
  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)

    // Reset copied state after 2 seconds
    setTimeout(() => {
      setCopiedCode("")
    }, 2000)
  }

  return (
    <>
      <div className="slugpage">
        <div className="container">
          <div className="topslug_titles">
            <h1 className="slugtitle">{loading ? <div>Loading...</div> : blog && blog[0]?.title}</h1>
            <h5>
              By <span>{process.env.NEXT_PUBLIC_APP_NAME}</span>. Published in{" "}
              <span>{loading ? <div>Loading...</div> : blog && blog[0]?.blogcategory}</span> .{" "}
              {blog &&
                new Date(blog[0].createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}{" "}
              <span>. 1 min read</span>{" "}
            </h5>
          </div>

          {/* Blog data section */}

          <div className="flex flex-sb flex-left pb-5 flex-wrap">
            <div className="leftblog_data_markdown">
              {loading ? (
                <div className="wh-100 flex flex-center mt-3">
                  <div className="loader">.</div>
                </div>
              ) : (
                <div className="w-100 blogcontent">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "")
                        const code = String(children).replace(/\n$/, "")

                        if (inline) {
                          return (
                            <code className="inline-code" {...props}>
                              {children}
                            </code>
                          )
                        }

                        return (
                          <div className="code-block-container">
                            <div className="code-header">
                              <span className="code-language">{match ? match[1] : "text"}</span>
                              <button className="copy-button" onClick={() => handleCopyCode(code)}>
                                {copiedCode === code ? "Copied!" : "Copy code"}
                              </button>
                            </div>
                            <SyntaxHighlighter
                              style={vscDarkPlus}
                              language={match ? match[1] : "text"}
                              PreTag="div"
                              {...props}
                            >
                              {code}
                            </SyntaxHighlighter>
                          </div>
                        )
                      },
                    }}
                  >
                    {blog[0].description}
                  </ReactMarkdown>
                </div>
              )}
            </div>

            <div className="rightslug_data" data-aos="fade-left">
              <div className="slug_profile_info">
                <div className="slugprofile_sec">
                  <div className="profile_imgbg"></div>
                  <div className="slug_profile_img">
                    <div className="image_bg_top0"></div>
                    <div className="image_bg_top1"></div>
                    <img src="/img/assia.jpg" alt="blogger" />
                  </div>
                </div>
                <h3>{process.env.NEXT_PUBLIC_APP_NAME}</h3>
                <h4>infirmière et étudiante en journalisme</h4>
                <div className="social_talks flex flex-center gap-1 mt-2">
                  
                     <Link href="⁄https://assiablog-git-main-assiadahmouni0s-projects.vercel.app/" 
                    className="st_icon">
                    <FaLinkedin />
                     <Link ⁄>
               
                  <div className="st_icon">
                    <FaInstagram />
                  </div>
                  <div className="st_icon">
                    <FaTwitter />
                  </div>
                  <div className="st_icon">
                  </div>
                </div>
              </div>

              <div className="topics_sec" data-aos="fade-left">
                <h2>Topics</h2>
                <div className="topics_list">
                  <Link href="/topics/javascript">
                    <div className="topics">
                      <div className="flex flex-center topics_svg">
                        <FaHtml5 />
                      </div>
                      <h3>HTML, CSS, JAVASCRIPT</h3>
                    </div>
                  </Link>

                  <Link href="/topics/nextjs">
                    <div className="topics">
                      <div className="flex flex-center topics_svg">
                        <TbBrandNextjs />
                      </div>
                      <h3>REACT JS, NEXT JS</h3>
                    </div>
                  </Link>

                  <Link href="/topics/database">
                    <div className="topics">
                      <div className="flex flex-center topics_svg">
                        <FiDatabase />
                      </div>
                      <h3>DATABASE</h3>
                    </div>
                  </Link>

                  <Link href="/topics/deployment">
                    <div className="topics">
                      <div className="flex flex-center topics_svg">
                        <AiOutlineDeploymentUnit />
                      </div>
                      <h3>DEPLOYMENT</h3>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .code-block-container {
          margin: 1rem 0;
          border-radius: 6px;
          overflow: hidden;
          background: #1e1e1e;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }
        
        .code-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 16px;
          background: #2d2d2d;
          color: #e0e0e0;
          font-family: monospace;
          font-size: 0.9rem;
        }
        
        .code-language {
          text-transform: uppercase;
          font-size: 0.8rem;
          font-weight: bold;
          color: #9cdcfe;
        }
        
        .copy-button {
          background: #3a3a3a;
          border: none;
          border-radius: 4px;
          color: #e0e0e0;
          padding: 4px 8px;
          font-size: 0.8rem;
          cursor: pointer;
          transition: background 0.2s;
        }
        
        .copy-button:hover {
          background: #4a4a4a;
        }
        
        .inline-code {
          background: rgba(0, 0, 0, 0.05);
          padding: 2px 4px;
          border-radius: 3px;
          font-family: monospace;
          font-size: 0.9em;
        }
        
        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .inline-code {
            background: rgba(255, 255, 255, 0.1);
          }
        }
        
        /* Make sure the syntax highlighter looks good */
        .blogcontent pre {
          margin: 0 !important;
          padding: 0 !important;
          background: transparent !important;
        }
      `}</style>
    </>
  )
}

