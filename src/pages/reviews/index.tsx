import { useEffect, useState } from "react";
import Head from "next/head";
import desktop03 from '../../../public/images/desktop-pagina-3.png';
import Button from "../../components/Button";
import Image from "next/image";
import Link from "next/link";
import firebase from '../../services/firebaseConnection';
import Router from 'next/router';
import { toast } from "react-toastify";
import { PropsRegister } from "../../types";

export default function Reviews() {

    const [listData, setListData] = useState<PropsRegister>();

    useEffect(() => {

        async function loadData() {

            const data = await JSON.parse(localStorage.getItem('consig@register'));

            setListData(data);

        }

        loadData();

    }, []);

    async function handleRegister() {

        if (localStorage.getItem('consig@register')) {

            let users = await firebase.database().ref('dados_usuarios');
            let key = users.push().key;

            users.child(key).set(listData);

            localStorage.clear();

            toast.success('Cadastrado com sucesso!');

            Router.push('/');

        } else {
            Router.push('/');
        }

    }

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
                            <div className="fs-6">{listData && listData.nome}</div>

                        </div>
                        <div className="mb-3">
                            <label htmlFor="cpf" className="fw-bold">CPF</label>
                            <div className="input-group flex-nowrap">
                                <div className="fs-6">{listData && listData.cpf}</div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cpf" className="fw-bold">Numero de celular ou telefone</label>
                            <div className="input-group flex-nowrap">
                                <div className="fs-6" >{listData && listData.phone}</div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cpf" className="fw-bold">Estado/Cidade</label>
                            <div className="input-group flex-nowrap">
                                <div className="fs-6">{listData && `${listData.estado} - ${listData.city}`}</div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cpf" className="fw-bold">Especialidade principal</label>
                            <div className="input-group flex-nowrap">
                                <div className="fs-6">{listData && listData.especialidade}</div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cpf" className="fw-bold">Preço da consulta</label>
                            <div className="input-group flex-nowrap">
                                <div className="fs-6">{listData && listData.valorConsulta}</div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cpf" className="fw-bold">Forma de pagamento da consulta</label>
                            <div className="input-group flex-nowrap">
                                <div className="fs-6">{listData && `${listData.formPgto} ${listData.qtdeParcelas ? listData.qtdeParcelas+'x' : ''}`} </div>
                            </div>
                        </div>

                        <div className="mx-auto text-center mt-5 mb-4">
                            <Button 
                                type="submit" 
                                style={{backgroundColor: '#FBDE40', color: '#483698'}}
                                onClick={handleRegister}
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