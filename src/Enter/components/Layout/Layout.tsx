import styles from './Layout.module.scss'
import {ReactNode} from "react";
import Footer from "../Footer/Footer";
import { Header } from '../Header/Header'
import { Sidebar } from '../Siderbar/Siderbar'
import '../../styles/global/variables.scss'
import '../../styles/global/fonts.scss'
import '../../styles/global/core.scss'
import '../../styles/global/reset.scss'
import '../../styles/global/text.scss'
import '../../styles/breakpoints.scss'
import '../../styles/mixins.scss'


type LayoutProps = {
    children: ReactNode
}
const Layout = ({ children }: LayoutProps) => {

    return (
        <div className={styles.page}>
            <div className={styles.overlay}></div>
            <Sidebar />
            <Header />

            <main className={styles.main}>{children}</main>

            <Footer />
        </div>
    )
}

export default Layout