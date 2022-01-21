import {useRouter} from 'next/router';
import styles from '../styles/Toolbar.module.css';
import Clock from 'react-live-clock';

export const Toolbar = () => {
    const router = useRouter();

    return(
        <div>
        <Clock
          format={'dddd, MMMM DD, YYYY, h:mm:ss A'} className={styles.clock}/>
            <ul className={styles.parentList}>
                <li className={styles.item}><a href='#' className={styles.countryLink}>U.S.</a></li>
                <li className={styles.item}><a href='#' className={styles.countryLink}>Canada</a></li>
                <li className={styles.item}><a href='#' className={styles.countryLink}>India</a></li>
            </ul>
            <h4 className={styles.title}>THE NEWS POINT</h4>
            <div className={styles.main}>
                <div onClick={()=>router.push('/')}>Home</div>
                <div onClick={()=>router.push('/feed/1')}>General</div>
                <div onClick={()=>router.push('/eom')}>Business</div>
                <div onClick={()=>router.push('/eom')}>Entertainment</div>
                <div onClick={()=>router.push('/eom')}>Health</div>
                <div onClick={()=>router.push('/eom')}>Science</div>
                <div onClick={()=>router.push('/eom')}>Sports</div>
                <div onClick={()=>router.push('/eom')}>Technology</div>
            </div>
            <div className={styles.borderDiv}></div>
        </div>
        
    )
};