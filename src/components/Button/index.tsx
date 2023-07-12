import { ReactNode } from 'react';
import styles from 'styles/Button.module.css';

interface ButtonProps {
  children: ReactNode;
}

export function Button({ children }: ButtonProps) {
  return (
    <button className={styles.buttonContainer}>
      {children}
    </button>
  );
}
