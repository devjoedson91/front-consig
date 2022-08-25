import { useEffect, useState } from "react";
import Head from "next/head";
import desktop03 from '../../../public/images/desktop-pagina-3.png';
import Button from "../../components/Button";
import Image from "next/image";
import Link from "next/link";

export default function Reviews() {

    useEffect(() => {

        if (localStorage.getItem('consig@register')) {

            const listData = JSON.parse(localStorage.getItem('consig@register'));
            setNome(listData.nome);
            setCpf(listData.cpf);
            setPhone(listData.phone);
            setUf(listData.uf);
            setCity(listData.city);
            setEspecialidade(listData.especialidade);
            setValueConsulta(listData.valueConsulta);

        }

    }, []);

    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [phone, setPhone] = useState('');
    const [uf, setUf] = useState('');
    const [city, setCity] = useState('');
    const [especialidade, setEspecialidade] = useState('');
    const [valueConsulta, setValueConsulta] = useState('');

    return (

        <>
            <Head>
                <title>Consig Facil</title>
            </Head>

            <div className="container mt-4 mb-4 p-4">
                <div className="row align-items-center">
                    <div className="col-md-7">
                        <h2 className="mb-4">Revisão do cadastro</h2>

                        <div className="row mb-3">

                            <label htmlFor="nome" className="fw-bold">Nome completo</label>
                            <div className="fs-6" >{nome}</div>

                        </div>
                        <div className="mb-3">
                            <label htmlFor="cpf" className="fw-bold">CPF</label>
                            <div className="input-group flex-nowrap">
                                <div className="fs-6" >{cpf}</div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cpf" className="fw-bold">Numero de celular ou telefone</label>
                            <div className="input-group flex-nowrap">
                                <div className="fs-6" >{phone}</div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cpf" className="fw-bold">Estado/Cidade</label>
                            <div className="input-group flex-nowrap">
                                <div className="fs-6" >{`${uf} - ${city}`}</div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cpf" className="fw-bold">Especialidade principal</label>
                            <div className="input-group flex-nowrap">
                                <div className="fs-6" >{especialidade}</div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cpf" className="fw-bold">Preço da consulta</label>
                            <div className="input-group flex-nowrap">
                                <div className="fs-6" >{valueConsulta}</div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cpf" className="fw-bold">Forma de pagamento da consulta</label>
                            <div className="input-group flex-nowrap">
                                <div className="fs-6">Dinheiro</div>
                            </div>
                        </div>

                        <div className="mx-auto text-center mt-5 mb-4">
                            <Button 
                                type="submit" 
                                style={{backgroundColor: '#FBDE40', color: '#483698'}}
                            >
                                CADASTRAR PROFISSIONAL
                            </Button>
                        </div>

                        <div className="mx-auto text-center">
                            <Link href="/"><a>Editar cadastro</a></Link>
                        </div>
                    </div>

                    <div className="col-md-5">
                        <Image src={desktop03} className="img-fluid" alt="desk-pagina3" />
                    </div>
                </div>
            </div>

        </>

    );

}