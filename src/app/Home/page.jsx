'use client';
import {useState} from "react";
import Swal from 'sweetalert2';


export default function Inicio(){
    const [mascotas, setMascotas] = useState([
        {"Nombre": "Toby","Especie":"Gato","Edad":2,"Peso":5,"Estado":"Sano"},
        {"Nombre": "Firulais","Especie":"Perro","Edad":3,"Peso":10,"Estado":"Enfermo"},
        {"Nombre": "Mishi","Especie":"Gato","Edad":1,"Peso":3,"Estado":"Sano"},
        {"Nombre": "Rex","Especie":"Perro","Edad":5,"Peso":15,"Estado":"Sano"},
        {"Nombre": "Toby","Especie":"Gato","Edad":2,"Peso":5,"Estado":"Sano"},
        {"Nombre": "Firulais","Especie":"Perro","Edad":3,"Peso":10,"Estado":"Enfermo"},
    ]);
    const [nombreBuscar, setNombreBuscar] = useState("");
    const [nuevaMascota, setNuevaMascota] = useState({
        "Nombre": "",
        "Especie":"",
        "Edad":0,
        "Peso":0,
        "Estado":""
    });

    const registrarMascota = ()=>{
        setMascotas([...mascotas, nuevaMascota]);
        setNuevaMascota({
            "Nombre": "",
            "Especie":"",
            "Edad":0,
            "Peso":0,
            "Estado":""
        });
    };

    const buscarMascota = ()=>{
        const mascotaBuscada = mascotas.find(mascota => mascota.Nombre === nombreBuscar);
        console.log(mascotaBuscada);
    };
    const eliminarMascota = ()=>{
        const mascotaFiltrada = mascotas.filter(mascota => mascota.Nombre !== nombreBuscar);
        setMascotas(mascotaFiltrada);
    };

    const actualizarMascota = (nombre,nuevaInfo)=>{
        setMascotas(mascotas.map(mascota =>
            mascota.nombre.toLowerCase() === nombre.toLowerCase() ? {... mascota, ...nuevaInfo} : mascota
        ));
    };
    
    return(
        <div className="bg-amber-500 flex flex-col items-center h-screen gap-20 p-20">
            <div className="flex flex-col bg-white text-gray-400 p-5 gap-5 rounded-lg">
                <div className="flex items-center gap-20 justify-between">
                    <h1 className="text-2xl">Gestion Veterinaria</h1>
                    <div className="flex gap-5">
                        <button onClick={registrarMascota} className="bg-green-500 text-white p-2 rounded-lg hover:cursor-pointer">Registrar</button>
                        <button onClick={()=> alert(JSON.stringify(buscarMascota()))} className="bg-yellow-500 text-white p-2 rounded-lg hover:cursor-pointer">Buscar por nombre</button>
                        <button onClick={eliminarMascota} className="bg-red-500 text-white p-2 rounded-lg hover:cursor-pointer"> Eliminar por nombre</button>
                    </div>
                </div>
                <div className="flex flex-col gap-5 justify-center">
                    <h1 className="text-2xl">Mascotas Registradas</h1>
                    <div className="flex flex-col gap-1">
                        <table className="table-auto w-full mt-3">
                            <thead>
                                <tr className="text-center">
                                    <th>Nombre</th>
                                    <th>Especie</th>
                                    <th>Edad</th>
                                    <th>Peso</th>
                                    <th>Estado de salud</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="">
                                {mascotas.map((mascota,index)=>(
                                    <tr key={index} className="text-center">
                                        <td>{mascota.Nombre}</td>
                                        <td>{mascota.Especie}</td>
                                        <td>{mascota.Edad}</td>
                                        <td>{mascota.Peso}</td>
                                        <td>{mascota.Estado}</td>
                                        <td><button className="bg-blue-600 p-2 rounded-lg m-2 text-white hover:cursor-pointer">Editar</button>
                                        <button className="bg-red-400 p-2 rounded-lg text-white hover:cursor-pointer">Eliminar</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}