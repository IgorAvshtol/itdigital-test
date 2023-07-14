import { ReactNode } from 'react';
import styles from 'styles/Button.module.css';

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  disable?: boolean;
}

export function Button({ children, onClick, disable }: ButtonProps) {
  return (
    <button className={styles.buttonContainer} onClick={onClick} disabled={disable}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  disable: false,
};
