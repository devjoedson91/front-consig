import { ReactNode, ButtonHTMLAttributes } from 'react';
import styles from './styles.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode,
}

export default function Button({children, ...rest}: ButtonProps) {

    return (
        <div className="row justify-content-center">
            <div className="col-9">
                <button className={styles.button} {...rest}>
                    <a className={styles.buttonText}>{children}</a>
                </button>
            </div>
        </div>
    );
}