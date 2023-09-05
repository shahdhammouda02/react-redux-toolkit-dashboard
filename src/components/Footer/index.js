import {Typography} from "antd";
import styles from './footer.module.css'
const Footer=()=>{
    return(
        <div className={styles.footer}>
            <Typography.Link href="tel:+123456789" className={styles.links}>+123456789</Typography.Link>
            <Typography.Link href="https://www.google.com" target={"_blank"} className={styles.links}>
                Privacy Policy</Typography.Link>
            <Typography.Link href="https://www.google.com" target={"_blank"} className={styles.links}>
                Terms of use</Typography.Link>
        </div>
    )
}
export default Footer;