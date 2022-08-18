import { FormEvent, useEffect, useState } from "react";
import Head from "next/head";
import desktop02 from '../../../public/images/desktop-pagina-2.png';
import Image from "next/image";
import Button from "../../components/Button";
import Accordion from "../../components/Accordion";
import Router from "next/router";
import firebase from "../../services/firebaseConnection";

export default function Attendance() {

    const [isActive, setIsActive] = useState(false);

    return (

        <>
            <Head>
                <title>Consig Facil</title>
            </Head>

            <div className="container mt-4 mb-4 p-4">
                <div className="row align-items-center">
                    <div className="col-md-7">

                        <h2 className="mb-4">Sobre o profissional</h2>

                        <h5 className="mb-4 fw-bold">Detalhes do atendimento</h5>

                        <form className="row needs-validation" noValidate>

                            <div className="mb-3">
                                <label className="form-label">Especialidade principal*</label>
                                <select
                                    className="form-select"
                                    required
                                >
                                    <option value="">Selecione</option>
                                </select>
                                <div className="invalid-feedback">
                                    Error message
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Informe o preço da consulta*</label>
                                <div className="input-group flex-nowrap">
                                    <span className="input-group-text bg-main">R$</span>
                                    <input type="text" className="form-control" size={6} placeholder="Valor" required />
                                </div>
                                <div className="invalid-feedback">
                                    Error message
                                </div>
                            </div>

                            <div className="mb-4" aria-label="breadcrumb">

                                <label className="form-label mb-3">Formas de pagamento da consulta*</label>
                                <div className="breadcrumb mb-3 shadow p-3 bg-body rounded">
                                    <div className="breadcrumb-item">
                                        <div className="form-check">
                                            <input className="form-check-input check-pgto ms-4" type="checkbox" id="checkPix" />
                                                <label htmlFor="checkPix" className="form-check-label ms-4">
                                                    Pix
                                                </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="breadcrumb mb-3 shadow p-3 bg-body rounded">
                                    <div className="breadcrumb-item">
                                        <div className="form-check">
                                            <input className="form-check-input check-pgto ms-4" type="checkbox" id="checkCash" />
                                                <label htmlFor="checkCash" className="form-check-label ms-4">
                                                    Em dinheiro
                                                </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="breadcrumb mb-3 shadow p-3 bg-body rounded">
                                    <div className="breadcrumb-item">
                                        <div className="form-check">
                                            <Accordion active={isActive} />
                                        </div>
                                    </div>
                                </div>

                                
                            </div>

                            <div className="row justify-content-center">
                                <div className="col-9">
                                    <h6 className="num-pagina-progress">1 de 2</h6>
                                    <div className="progress mb-3" style={{ height: 25 }}>
                                        <div className="progress-bar" role="progressbar" style={{ width: 33 }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}></div>
                                    </div>
                                </div>
                            </div>

                            <Button type="submit">PROXIMO</Button>

                        </form>

                    </div>

                    <div className="col-md-5">
                        <Image src={desktop02} className="img-fluid" alt="desk-pagina2" />
                    </div>
                </div>
            </div>

        </>

    );

}