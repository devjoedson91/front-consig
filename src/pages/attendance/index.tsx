import { FormEvent, useEffect, useState } from "react";
import Head from "next/head";
import desktop02 from '../../../public/images/desktop-pagina-2.png';
import Image from "next/image";
import Button from "../../components/Button";
import Accordion from "../../components/Accordion";
import Router from "next/router";
import firebase from "../../services/firebaseConnection";
import styles from './styles.module.scss';
import { toast } from 'react-toastify';

type ProfessionProps = {
    id: number | string;
    nome: string;
}

export default function Attendance() {

    const [listEspecialidades, setListEspecialidades] = useState<ProfessionProps[]>([]);
    const [especialidade, setEspecialidade] = useState('');
    const [valueConsulta, setValueConsulta] = useState('');
    const [checkPix, setCheckPix] = useState(false);
    const [checkCash, setCheckCash] = useState(false);
    
    useEffect(() => {

        async function getEspecialidades() {

            await firebase.database().ref('especialidades').on('value', (snapshot) => {

                setListEspecialidades(snapshot.val());

            })

        }

        getEspecialidades();

    }, []);

    function maskValue(value: string) {

        let elementValue = value.replace(/\D/g, '');

        if (elementValue.length > 4) {
            elementValue = elementValue.replace(/(\d{3})(\d)/, '$1,$2');            
        } else if (elementValue.length < 5) {
            elementValue = elementValue.replace(/(\d{2})(\d)/, '$1,$2');
        }

        return elementValue;
            
    }

    async function handleRegister(event: FormEvent<HTMLFormElement>) {

        const form = document.querySelector('.needs-validation');

        if (!event.currentTarget.checkValidity()) {

            event.preventDefault();
            event.stopPropagation();
            form.classList.add('was-validated');
            
        } else {

            // event.preventDefault();

            // const checkBoxs = document.querySelectorAll('.check-pgto');

            // checkBoxs.forEach(item => console.log(item));

            if (localStorage.getItem('consig@register')) {

                let dataEdit = JSON.parse(localStorage.getItem('consig@register'));

                localStorage.setItem('consig@register', JSON.stringify(
                    Object.assign(dataEdit, {
                        especialidade,
                        valueConsulta
                    })
                ))

                event.preventDefault();
                Router.push('/reviews');

            } else {

                toast.error('Conclua o cadastro básico!');
                event.preventDefault();
                Router.push('/');

            }       

        }

    }

    function changeItens() {
        setCheckCash(false);
        setCheckPix(false);
    }

    return (

        <>
            <Head>
                <title>Consig Facil</title>
            </Head>

            <div className="container mt-4 mb-4 p-4">
                <div className="row align-items-center">
                    <div className="col-md-7">

                        <h2 className="mb-4">Sobre o profissional</h2>

                        <h5 className="mb-4 fw-semibold">Detalhes do atendimento</h5>

                        <form onSubmit={handleRegister} className="row needs-validation" noValidate>

                            <div className="mb-3">
                                <label className="form-label">Especialidade principal*</label>
                                <select
                                    className="form-select"
                                    onChange={(e) => setEspecialidade(e.target.value)}
                                    required
                                >
                                    <option value="">Selecione</option>
                                    {
                                        listEspecialidades.map(item => {
                                            return (
                                                <option key={item.id}>{item.nome}</option>
                                            );
                                        })
                                    }
                                </select>
                                <div className="invalid-feedback">
                                    Error message
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Informe o preço da consulta*</label>
                                <div className="input-group flex-nowrap">
                                    <span className={`${styles.bgMain} input-group-text`}>R$</span>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        maxLength={6}
                                        placeholder="Valor" 
                                        value={valueConsulta}
                                        required 
                                        onChange={(e) => setValueConsulta(maskValue(e.target.value))}
                                    />
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
                                            <input 
                                                className="form-check-input check-pgto ms-4" type="checkbox" 
                                                id="checkPix" 
                                                value="Pix"
                                                checked={checkPix}
                                                onChange={() => {
                                                    setCheckPix(!checkPix);
                                                }}
                                            />
                                                <label htmlFor="checkPix" className="form-check-label ms-4">
                                                    Pix
                                                </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="breadcrumb mb-3 shadow p-3 bg-body rounded">
                                    <div className="breadcrumb-item">
                                        <div className="form-check">
                                            <input 
                                                className="form-check-input check-pgto ms-4" type="checkbox" 
                                                id="checkCash" 
                                                value="Dinheiro"
                                                checked={checkCash}
                                                onChange={() => {
                                                    setCheckCash(!checkCash);
                                                }}
                                            />
                                                <label htmlFor="checkCash" className="form-check-label ms-4">
                                                    Em dinheiro
                                                </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="breadcrumb mb-3 shadow p-3 bg-body rounded">
                                    <div className="breadcrumb-item">
                                        <div className="form-check">
                                            <Accordion 
                                                isCheckedPix={checkPix}
                                                isCheckedCash={checkCash}
                                                onChange={changeItens}
                                            />
                                        </div>
                                    </div>
                                </div>

                                
                            </div>

                            <div className="row justify-content-center">
                                <div className="col-9">
                                    <h6 className="num-pagina-progress">2 de 2</h6>
                                    <div className="progress mb-3" style={{ height: 20 }}>
                                        <div className="progress-bar" role="progressbar" style={{ width: '66.66%', backgroundColor: '#483698' }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}></div>
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