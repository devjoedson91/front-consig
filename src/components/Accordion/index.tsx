import React, { useState } from "react";
import styles from './styles.module.scss';

export default function Accordion() {


    function handleClickAccordion(event) {

        const accordionId = event.target.dataset.accordionHeader;
        const accordionItemOpened = document.querySelector(`[data-accordion-body="${accordionId}"]`);
        accordionItemOpened.classList.toggle(`${styles.active}`);

    }

    function handleClickItem(event) {

        const accordionItemSelected = document.querySelectorAll('.check-input-item');

        for (let i = 0; i < accordionItemSelected.length; i++) {

            accordionItemSelected[i].checked = accordionItemSelected[i] === event.target;
                                    
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
                        onClick={(e) => handleClickAccordion(e)}
                    />
                    <label htmlFor="checkCard" className="form-check-label ms-4" data-accordion-header="1">
                        Cartão de Crédito
                    </label>
                </div>
                <div data-accordion-body="1" className={styles.accordionItem}>
                    <div className="accordion-body" onClick={(e) => handleClickItem(e)}>
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