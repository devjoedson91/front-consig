import { FormEvent, useEffect, useState } from "react";
import Head from "next/head";
import desktop01 from '../../public/images/desktop-pagina-1.png';
import Image from "next/image";
import Button from "../components/Button";
import Router from "next/router";
import firebase from "../services/firebaseConnection";
import { PropsRegister } from '../types';

type stateProps = {

    id: number | string;
    nome: string;
    sigla: string;
}

type cityProps = {
    id: number | string;
    nome: string;
}

export default function Home() {

    const [listUf, setListUf] = useState<stateProps[]>([]);
    const [listCity, setListCity] = useState<cityProps[]>([]);
    const [nome, setNome] = useState('');
    const [city, setCity] = useState('');
    const [estado, setEstado] = useState('');
    const [uf, setUf] = useState('');
    const [cpf, setCpf] = useState('');
    const [phone, setPhone] = useState('');
    const [listData, setListData] = useState<PropsRegister>();
        
    const [storageRegister, setStorageRegister] = useState<PropsRegister[]>(() => {

        const storagedData = typeof window !== 'undefined' ? localStorage.getItem('consig@register') : null;

        if (storagedData) {
            return JSON.parse(storagedData);
        }

        return [];

    });

    useEffect(() => {

        async function getUf() {

            await firebase.database().ref('estados').on('value', (snapshot) => {

                setListUf(snapshot.val());

            })

        }

        getUf();

    }, []);

    useEffect(() => {

        async function loadData() {

            if (listUf.length > 0 && listCity.length > 0 && storageRegister) {

                storageRegister.map(data => {

                    setListData(data);

                    const optionsEstado = document.querySelectorAll('.option-select');
                    optionsEstado.forEach(option => {

                        if (option.innerHTML === data.estado) {

                            option.setAttribute('selected', 'selected');
                            let optionValue = option.getAttribute('value');
                            setUf(optionValue);

                        }

                    });

                    const optionsCity = document.querySelectorAll('.option-city');
                    optionsCity.forEach(cidade => {
                        if (cidade.innerHTML === data.city) {
                            cidade.setAttribute('selected', 'selected');
                        }
                    });


                });

            }
        }

        loadData();

    }, [listUf, listCity, storageRegister]);

    useEffect(() => {

        async function getCity() {

            await firebase.database().ref('cidades').once('value', (snapshot) => {

                const list = snapshot.val().filter(cidade => {

                    if (cidade.uf === uf) return cidade;

                })

                setListCity(list);

            });

        }

        getCity();


    }, [uf]);


    async function handleRegister(event: FormEvent<HTMLFormElement>) {

        const form = document.querySelector('.needs-validation');

        if (!event.currentTarget.checkValidity()) {

            event.preventDefault();
            event.stopPropagation();
            form.classList.add('was-validated');

        } else {

            const udpateRegister = [...storageRegister];

            const newRegister = { 
                nome, 
                cpf, 
                phone, 
                estado, 
                city,
                especialidade: '',
                valorConsulta: 0,
                formPgto: '',
                qtdeParcelas: 0
            };

            udpateRegister.push(newRegister);
            setStorageRegister(udpateRegister);
            localStorage.setItem('consig@register', JSON.stringify(udpateRegister));

            event.preventDefault();
            Router.push('/attendance');


        }

    }

    function maskCpf(value: string) {

        // let i = 0;
        // return pattern.replace(/#/g, () => value[i++] || '');

        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1')

    }

    function maskPhone(value: string) {

        let phoneText = value.replace(/\D/g, "");

        phoneText = phoneText.replace(/^0/, "");

        if (phoneText.length > 10) {
            phoneText = phoneText.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
        } else if (phoneText.length > 2) {
            phoneText = phoneText.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
        } else if (phoneText.length > 1) {
            phoneText = phoneText.replace(/^(\d*)/, "($1");
        }
        return phoneText;
    }

    return (

        <>

            <Head>
                <title>Consig Facil</title>
            </Head>

            <div className="container mt-4 p-4">
                <div className="row align-items-center">
                    <div className="col-md-7">

                        <h2 className="mb-4">Sobre o profissional</h2>

                        <h5 className="mb-4 fw-semibold">Dados do profissional</h5>

                        <form onSubmit={handleRegister} className="row needs-validation" noValidate>

                            <div className="mb-3">
                                <label className="form-label">Nome completo*</label>
                                <input
                                    type="text"
                                    name="nome"
                                    className="form-control"
                                    placeholder="Digite o nome completo"
                                    minLength={3}
                                    maxLength={48}
                                    value={listData && listData.nome || nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    required
                                />
                                <div className="invalid-feedback">
                                    Error message
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">CPF*</label>
                                <input
                                    type="text"
                                    name="cpf"
                                    className="form-control"
                                    placeholder="Digite um CPF"
                                    maxLength={14}
                                    autoComplete="off"
                                    value={listData && listData.cpf || cpf}
                                    onChange={(e) => setCpf(maskCpf(e.target.value))}
                                    required
                                />
                                <div className="invalid-feedback invalid-cpf">
                                    Error message
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Numero do celular*</label>
                                <input
                                    type="text"
                                    name="numero"
                                    className="form-control"
                                    placeholder="(00) 00000-0000"
                                    maxLength={16}
                                    value={listData && listData.phone || phone}
                                    onChange={(e) => setPhone(maskPhone(e.target.value))}
                                    required
                                />
                                <div className="invalid-feedback">
                                    Error message
                                </div>
                            </div>

                            <div className="row mb-3">

                                <div className="col-6 inputState">
                                    <label className="form-label">Estado*</label>
                                    <select
                                        onChange={(e) => {
                                            setUf(e.target.value);
                                            setEstado(e.target.options[e.target.selectedIndex].text);
                                        }}
                                        className="form-select estados"
                                        name="estado"
                                        required
                                    >
                                        <option value="">Selecione</option>
                                        {listUf.map(estado => {

                                            return (
                                                <option
                                                    key={estado.id}
                                                    value={estado.sigla}
                                                    className="option-select"
                                                >
                                                    {estado.nome}
                                                </option>
                                            );

                                        })}
                                    </select>
                                    <div className="invalid-feedback">
                                        Error message
                                    </div>
                                </div>

                                <div className="col-6 inputCity">
                                    <label className="form-label">Cidade*</label>
                                    <select
                                        onChange={(e) => setCity(e.target.value)}
                                        className="form-select"
                                        name="cidade"
                                        required
                                    >
                                        <option value="">Selecione</option>
                                        {listCity.map(cidade => {

                                            return (
                                                <option
                                                    key={cidade.id}
                                                    className="option-city"
                                                >
                                                    {cidade.nome}
                                                </option>
                                            );

                                        })}
                                    </select>
                                    <div className="invalid-feedback">
                                        Error message
                                    </div>
                                </div>

                            </div>

                            <div className="row justify-content-center">
                                <div className="col-9">
                                    <h6 className="num-pagina-progress">1 de 2</h6>
                                    <div className="progress mb-3" style={{ height: 20 }}>
                                        <div className="progress-bar" role="progressbar" style={{ width: '33.33%', backgroundColor: '#483698' }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}></div>
                                    </div>
                                </div>
                            </div>

                            <Button type="submit">PROXIMO</Button>

                        </form>

                    </div>

                    <div className="col-md-5">
                        <Image src={desktop01} className="img-fluid" alt="desk-pagina1" />
                    </div>

                </div>
            </div>


        </>
    );
}
