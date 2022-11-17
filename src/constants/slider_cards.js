import card1 from "../assets/img/cards/01_pepe.png"
import card2 from "../assets/img/cards/02_majin.png"
import card3 from "../assets/img/cards/03_moon.png"
import card1Webp from "../assets/img/cards/01_pepe.webp"
import card2Webp from "../assets/img/cards/02_majin.webp"
import card3Webp from "../assets/img/cards/03_moon.webp"

const SLIDER_CARDS = [
    {
        id: 0,
        image: {
            png: card1,
            webp: card1Webp
        },
        video: '/assets/videos/pepe.mp4',
    },
    {
        id: 1,
        image: {
            png: card2,
            webp: card2Webp
        },
        video: '/assets/videos/majin.mp4',
    },
    {
        id: 2,
        image: {
            png: card3,
            webp: card3Webp
        },
        video: '/assets/videos/moon.mp4',
    }
]

export {
    SLIDER_CARDS
}