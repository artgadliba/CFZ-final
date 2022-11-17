import { Container } from 'components/Container';

import { Card } from './Card';

import { ABOUT_CARDS } from 'constants/about_cards';

import style from './styles.module.scss'

export const About = () => {

  return (
    <section  className={style.section}>
      <Container>
        <div className={style.about}>
          {ABOUT_CARDS.map((item, i) => {
            return (
              <Card key={i} {...item} />
            )
          })}
        </div>
      </Container>
    </section>
  )
}