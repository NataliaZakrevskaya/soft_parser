import React from 'react';
import styles from './fullVersionPlug.module.scss'
import cn from 'classnames'

interface IProps{
  changeVersion: () => void
  hideVersionPlug: () => void
  fullVersion: boolean
}

const FullVersionPlug = ({changeVersion, hideVersionPlug, fullVersion}: IProps) => {
  return (
    <div className={cn(styles.fullVersionPlug, {
      [styles.fullVersionPlug_pc]: fullVersion
    })}>
      <p
        className={styles.plugText}>
        {fullVersion ? 'Перейти в мобильную версию' : 'Перейти в полную версию'}
      </p>
      <div className={styles.controlsWrapper}>
        <button
          className={styles.openBtn}
          onClick={changeVersion}>
          Открыть
        </button>
        <button
          className={styles.closeBtn}
          onClick={hideVersionPlug}
        >
          <div className={styles.closeIcon}/>
        </button>
      </div>
    </div>
  );
};

export default FullVersionPlug;