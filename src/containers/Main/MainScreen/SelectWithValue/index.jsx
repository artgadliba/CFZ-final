import clsx from 'clsx';
import {useState} from 'react';

import {Button} from 'components/Button';
import {SelectDefault} from 'components/Select';

import useWindowSize from 'hooks/useWindowSize';

import 'swiper/css'
import style from './styles.module.scss'


const data = [
    {label: 1, value: 1},
    {label: 2, value: 2},
    {label: 3, value: 3},
    {label: 4, value: 4},
    {label: 5, value: 5},
]

export const SelectWithValue = ({value, setValue}) => {
    const [isDisabled, setDisabled] = useState(false)
    const {width} = useWindowSize()

    const handleNextValue = () => {
        if (value >= 1 && value < 5) {
            setValue(prev => (Number(prev) + 1))
        }
    }

    const handlePrevValue =() => {
        if (value >= 2 && value <= 5) {
            setValue(prev => (Number(prev) - 1))
        }
    }

    const changeValue = (opt) => {
        if (opt.value) {
            setValue(opt?.value)
        }
    }

    const checkValidNumbers = (e) => {
        if (e.charCode < 49) {
            setValue(1)
        } else if (e.charCode > 53) {
            setValue(5)
        }
    }

    return (
        <>
            {width > 768
                ?
                <div className={style.content}>
                    <Button.WithArrow className={style.prev} onClick={handlePrevValue}/>
                    <div className={style.box}>
                        <div className={clsx(style.select, {[style.centerForOne]: Number(value) === 1})}>
                            <input
                                disabled={isDisabled}
                                value={value}
                                onChange={(e) => {
                                    if (0 <= e.target.value && e.target.value <= 5) {
                                        setValue(e.target.value)
                                    }
                                }}
                                onKeyPress={checkValidNumbers}
                            />
                        </div>
                    </div>
                    <Button.WithArrow className={style.next} onClick={handleNextValue}/>
                </div>
                :
                <SelectDefault change={changeValue} options={data}/>
            }
        </>
    )
}
