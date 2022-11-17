import {Footer} from 'components/Footer';
import {About} from 'containers/Main/About';
import {Slider} from 'containers/Main/Slider';
import {AnimationFrameBottom} from 'components/AnimationFrameBottom';
import {AnimationFrameBottomSecond} from 'components/AnimationFrameBottomSecond';

import style from './styles.module.scss'
import {Quote} from './About/Quote/index';
import Light from '../../components/Light'
import TopSection from "./TopSection";

function Main() {
    return (
        <div className={style.background}>
            <TopSection/>
            <Quote/>
            <About/>
            <Slider/>
            <Light/>
            <Footer/>
            <AnimationFrameBottom/>
            <AnimationFrameBottomSecond/>
        </div>
    )
}

export default Main;
