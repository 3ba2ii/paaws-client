import React from 'react';
import styles from '../styles/footer.module.css';

interface footerProps {}

const Footer: React.FC<footerProps> = ({}) => {
  return (
    <div className={styles['footer-container'] + ' footer'}>
      <p className={styles['copyright']}>&copy;2021 Paaws Platform.</p>
      <ul className={styles['footer-list']}>
        <li>Terms</li>
        <li>Privacy</li>
        <li>Security</li>
        <li>Get In Touch</li>
        <li>Report a bug</li>
      </ul>
    </div>
  );
};
export default Footer;
