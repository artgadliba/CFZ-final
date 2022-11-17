import { Social } from 'components/Social';
import { Container } from 'components/Container';
import { ButtonWithArrow } from 'components/Button/ButtonWithArrow';
import { Icon } from 'components/Icon';

import style from './styles.module.scss'
import treesWithRiverMobile from "../../assets/img/footerMobile.svg"
import clsx from "clsx";

export const Footer = () => {

    const handleScrollToTop = () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    return (
        <footer >
            <Icon.TreesWithRiver className={style.image} />
            <img className={style.treesWithRiverMobile} src={treesWithRiverMobile} alt='forest'/>
            <div onClick={handleScrollToTop} className={style.footer}>
                <Container  className={clsx(style.container, style.footer_container)}>
                    <Social/>
                    <ButtonWithArrow  className={style.button} />
                </Container>
            </div>
        </footer>
    )
}