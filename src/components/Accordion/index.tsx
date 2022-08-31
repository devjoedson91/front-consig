import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from './styles.module.scss';

export type AccordionProps = {
    isCheckedPix: boolean;
    isCheckedDinheiro: boolean;
    getQtdeParcelas: (qtdeParcelas: number | string) => void;
    getCheckedCartao: (value: boolean) => void;
    changeItens: () => void;
}

export default function Accordion({
    isCheckedDinheiro, 
    isCheckedPix, 
    getQtdeParcelas, 
    getCheckedCartao,
    changeItens
}: AccordionProps) {

    const [isCheckedOne, setIsCheckedOne] = useState(false);
    const [isCheckedTwo, setIsCheckedTwo] = useState(false);
    const [isCheckedThree, setIsCheckedThree] = useState(false);
    const [checkCard, setCheckCard] = useState(false);
    const [cardRequired, setCardRequired] = useState(true);
    const [itemRequired, setItemRequired] = useState(true);
        
    useEffect(() => {

        if (isCheckedPix || isCheckedDinheiro) {

            setItemRequired(false);
            setCardRequired(false);
            setCheckCard(false);
            setIsCheckedOne(false);
            setIsCheckedTwo(false);
            setIsCheckedThree(false);
            const accordionItemOpened = document.querySelector(`[data-accordion-body="1"]`);
            accordionItemOpened.classList.remove(`${styles.active}`);

        }
        
        
    }, [isCheckedDinheiro, isCheckedPix]);

    useEffect(() => {

        if (isCheckedOne || isCheckedTwo || isCheckedThree) setItemRequired(false);

    }, [isCheckedOne, isCheckedTwo, isCheckedThree]);

    useEffect(() => {

        if (checkCard) setItemRequired(true);

    }, [checkCard]);


    function handleAccordion(event) {

        const accordionId = event.target.dataset.accordionHeader;
        const accordionItemOpened = document.querySelector(`[data-accordion-body="${accordionId}"]`);
        accordionItemOpened.classList.toggle(`${styles.active}`);
        setCheckCard(!checkCard);
        changeItens();
        
    }

    function dadosParcelamento(elementValue) {

        switch (elementValue) {
            case '1x':
                getQtdeParcelas(1);
                break;
            case '2x':
                getQtdeParcelas(2);
                break;
            case '3x':
                getQtdeParcelas(3);
                break;
            default:
                toast.warning('Não foram encontradas novas opções de parcelamento');
        }

    }

    return (

        <React.Fragment>
            <div className="accordion">
                <div className="accordion-header">
                    <input
                        className="form-check-input check-pgto ms-4"
                        type="checkbox"
                        id="checkCard"
                        data-accordion-header="1"
                        checked={checkCard}
                        onChange={(e) => {
                            handleAccordion(e);
                            getCheckedCartao(true);
                            setCardRequired(!cardRequired);
                        }}
                        required={cardRequired}
                    />
                    <label htmlFor="checkCard" className="form-check-label ms-4" data-accordion-header="1">
                        Cartão de Crédito
                    </label>
                </div>
                <div data-accordion-body="1" className={styles.accordionItem}>
                    <div className="accordion-body">
                        <div className="form-check mb-3">
                            <label className="form-check-label ms-6" htmlFor="defaultCheck1">
                                Parcelamento em
                            </label>
                        </div>
                        <div className="form-check mb-3">
                            <input 
                                className="form-check-input check-input-item ms-6" 
                                type="checkbox" 
                                value="1x" 
                                id="1x"
                                checked={isCheckedOne}
                                onChange={(e) => {
                                    setIsCheckedOne(!isCheckedOne);
                                    setIsCheckedTwo(false);
                                    setIsCheckedThree(false);
                                    dadosParcelamento(e.target.value);
                                }}
                                required={itemRequired}                           
                            />
                            <label className="form-check-label check-label ms-2" htmlFor="1x">
                                1x sem juros
                            </label>
                        </div>
                        <div className="form-check mb-3">
                            <input 
                                className="form-check-input check-input-item ms-6" 
                                type="checkbox" 
                                value="2x" 
                                id="2x"
                                checked={isCheckedTwo}
                                onChange={(e) => {
                                    setIsCheckedOne(false);
                                    setIsCheckedTwo(!isCheckedTwo);
                                    setIsCheckedThree(false);
                                    dadosParcelamento(e.target.value);
                                }}
                                required={itemRequired}            
                            />
                            <label className="form-check-label check-label ms-2" htmlFor="2x">
                                2x sem juros
                            </label>
                        </div>
                        <div className="form-check mb-3">
                            <input 
                                className="form-check-input check-input-item ms-6" 
                                type="checkbox" 
                                value="3x" 
                                id="3x" 
                                checked={isCheckedThree}
                                onChange={(e) => {
                                    setIsCheckedOne(false)
                                    setIsCheckedTwo(false);
                                    setIsCheckedThree(!isCheckedThree);
                                    dadosParcelamento(e.target.value);
                                }}
                                required={itemRequired}                       
                            />
                            <label className="form-check-label check-label ms-2" htmlFor="3x">
                                3x sem juros
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>

    );

}