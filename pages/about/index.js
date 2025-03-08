'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function About() {
  return (
    <div className='slugpage abouttext'>
      <div className='container flex flex-col flex-center'>
        {/* Profile Image */}
        <div className='mb-3'>
          <Image
            src='/img/assia.jpg' // Replace with your actual image path
            alt='Assia'
            width={150}
            height={150}
            className='aboutimg'
          />
        </div>

        {/* Introduction */}
        <h1 className='slugtitle mb-2'>
          Hello, I'm{' '}
          <span className='aboutspan'>{process.env.NEXT_PUBLIC_APP_NAME}</span>
        </h1>
        <p className=' text-justify dark'>
          I am a passionate web developer specializing in building modern,
          responsive, and high-performance web applications. With expertise in
          Next.js, React.js, JavaScript, and database management, I craft
          seamless digital experiences that prioritize functionality,
          aesthetics, and user engagement. My journey in web development is
          driven by a love for problem-solving and innovation, allowing me to
          develop dynamic websites and applications that meet both business and
          user needs. Beyond coding, I focus on UI/UX design, performance
          optimization, and accessibility, ensuring that every project is not
          only visually appealing but also intuitive and inclusive.
          Additionally, I have strong communication skills, enabling me to
          collaborate effectively with teams and clients to transform ideas into
          fully functional web solutions. Whether it’s designing custom
          components, integrating APIs, or optimizing SEO, I always strive to
          deliver efficient, scalable, and maintainable solutions. You can
          explore my portfolio to see the projects I have worked on, and feel
          free to connect with me to discuss ideas or collaborations!
        </p>

        <p>
          On this blog, you&apos;ll discover weekly articles and tutorials
          covering a range of topics including web development, software
          engineering, and programming languages. Sahand is continually learning
          and exploring new technologies, so make sure to visit frequently for
          the latest updates!
        </p>

        {/* Skills Section */}
        <div className='mt-1 mb-1'>
          <h2 className='text-center mb-1'>Skills</h2>
          <p className='text-gray-600'>
            Next.js, React.js, JavaScript, Tailwind CSS, HTML, MongoDB,
            Supabase, and more.
          </p>
        </div>

        {/* Portfolio Link */}
        <div className='mt-3 flex flex-col flex-center gap-1 mb-3'>
          <p className='text-center'>
            I invite you also to interact with take a look on my portfolio,
            where you can find examples of my work and projects. <br />I look
            forwards to collaborate with you 😀 Click the button bellow 👇
          </p>
          <Link
            href='https://souhaildahmouni.kesug.com/?i=2'
            target='_blank'
            rel='noopener noreferrer'
            className='aboutlink button'
          >
            View My Portfolio
          </Link>
        </div>
        <br />
      </div>
    </div>
  );
}
