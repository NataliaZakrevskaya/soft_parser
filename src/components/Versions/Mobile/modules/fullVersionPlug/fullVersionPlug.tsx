import React from 'react';
import styles from './fullVersionPlug.module.scss'

interface IProps{
  changeVersion: () => void
  hideVersionPlug: () => void
}

const FullVersionPlug = ({changeVersion, hideVersionPlug}: IProps) => {
  return (
    <div className={styles.fullVersionPlug}>
      <p
        className={styles.plugText}>
        Перейти в полную версию
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