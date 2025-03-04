import Link from "next/link";

export default function Footer(){
    return <>
       <div className="footer">
         <div className="container flex flex-sb flex-wrap flex-left">
             <div className="footer_logo">
                  <h2>{process.env.NEXT_PUBLIC_APP_NAME} Blogs</h2>
                  <h4>&copy; 2025 All rights reserved.</h4>
                  <h3>Build by <span>{process.env.NEXT_PUBLIC_APP_NAME}</span></h3>
             </div>

             <div className="q_links">
                <h3>Quick Links</h3>
                <ul>
                    <li><Link href="https://souhaildahmouni.kesug.com/?i=2" target="_blank" rel="noopener noreferrer">My Portfolio</Link></li>
                    <li><Link href="/about">About Me</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                </ul>
             </div>

             <div className="q_links">
                <h3>Privacy & Policy</h3>
                <ul>
                    <li><Link href="/">Privacy & notice</Link></li>
                    <li><Link href="/">Cookies Policy</Link></li>
                    <li><Link href="/">Terms of Use</Link></li>
                </ul>
             </div>

             <div className="q_links">
                <h3>Social Media</h3>
                <ul>
                    <li><Link href="/" target="_blank" rel="noopener noreferrer">XTwitter</Link></li>
                    <li><Link href="/" target="_blank" rel="noopener noreferrer">Github</Link></li>
                    <li><Link href="/" target="_blank" rel="noopener noreferrer">Linkedin</Link></li>
                    <li><Link href="/" target="_blank" rel="noopener noreferrer">Instagram</Link></li>
                </ul>
             </div>
         </div>
       </div>
    </>
}