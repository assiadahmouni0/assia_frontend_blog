import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';


export default function TopLoadingLine() {
const router = useRouter();

const  [loadingProgress, setLoadingProgress] = useState(0);

useEffect(() => {
    const handleStart = () => {
        setLoadingProgress(80);
    }

    const handleComplate = () => {
        setLoadingProgress(100);
        setTimeout(() => {
            setLoadingProgress(0);
        }, 500)
    }

    // add event listeners for page loading
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplate);
    router.events.on('routeChangeError', handleComplate);

    // clean up event listener
    return () => {
        router.events.off('routeChangeStart', handleStart);
        router.events.off('routeChangeComplete', handleComplate);
        router.events.off('routeChangeError', handleComplate);
    }
}, [router.events])
    return <>

    <div className='topLoadingLine' style={{width: `${loadingProgress}%`}}></div>

    </>
}