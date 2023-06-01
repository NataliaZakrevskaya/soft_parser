import styles from './page.module.scss'
import {Button} from "@components/Common/Button/Button";
import Layout from "../../Enter/components/Layout/Layout";

export const NonAuth = () => {
  // const { state, dispatch, user } = useContext(Context)
  // const [isLoading, setIsLoading] = useState(true)

  // useEffect(() => {
  //   if (user) {
  //     router.push('/unit-calculator-ozon')
  //   } else {
  //     setIsLoading(false)
  //   }
  // }, [user])

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.pageTitle}>Трекер позиций</h1>
          <div className={styles.leftRightSideWrapper}>
            <img
              className={styles.image}
              src="/images/non-auth/not-auth.png"
              alt=""
            />
            <div className={styles.rightSide}>
              <div className={styles.rightSide_title}>
                Доступно для авторизованных пользователей
              </div>
              <div className={styles.rightSide_subtitle}>
                Для работы с Трекером позиций необходимо войти или
                зарегистрироваться
              </div>
              <div className={styles.rightSide_btnsWrapper}>
                <Button
                  className={styles.btn}
                  primary
                  href={`https://sellershub.ru/?soft-login=${'test'}`}
                >
                  Войти
                </Button>
                <Button
                  className={styles.btn}
                  href={'https://sellershub.ru/?registration=true'}
                >
                  Зарегистрироваться{' '}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
