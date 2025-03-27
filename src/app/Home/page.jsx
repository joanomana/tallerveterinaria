'use client';
import { useState } from "react";
import Swal from 'sweetalert2';
import Link from 'next/link';


export default function Inicio() {
    const [mascotas, setMascotas] = useState([
        { "Nombre": "Toby", "Especie": "Gato", "Edad": 2, "Peso": 5, "Estado": "Sano" },
        { "Nombre": "Firulais", "Especie": "Perro", "Edad": 3, "Peso": 10, "Estado": "Enfermo" },
        { "Nombre": "Mishi", "Especie": "Gato", "Edad": 1, "Peso": 3, "Estado": "Sano" },
        { "Nombre": "Rex", "Especie": "Perro", "Edad": 5, "Peso": 15, "Estado": "Sano" },
        { "Nombre": "Toby", "Especie": "Gato", "Edad": 2, "Peso": 5, "Estado": "Sano" },
        { "Nombre": "Firu", "Especie": "Perro", "Edad": 3, "Peso": 10, "Estado": "Enfermo" },
    ]);
    const [nombreBuscar, setNombreBuscar] = useState("");
    const [nuevaMascota, setNuevaMascota] = useState({
        "Nombre": "",
        "Especie": "",
        "Edad": 0,
        "Peso": 0,
        "Estado": ""
    });

    const registrarMascota = () => {
        Swal.fire({
            title: 'Registrar Nueva Mascota',
            html: `
                <input id="nombre" class="swal2-input" placeholder="Nombre">
                <input id="especie" class="swal2-input" placeholder="Especie">
                <input id="edad" type="number" class="swal2-input" placeholder="Edad">
                <input id="peso" type="number" class="swal2-input" placeholder="Peso">
                <input id="estado" class="swal2-input" placeholder="Estado de salud">
            `,
            showCancelButton: true,
            confirmButtonText: 'Registrar',
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                const nombre = document.getElementById('nombre').value.trim();
                const especie = document.getElementById('especie').value.trim();
                const edad = parseInt(document.getElementById('edad').value);
                const peso = parseFloat(document.getElementById('peso').value);
                const estado = document.getElementById('estado').value.trim();
    
                if (!nombre || !especie || isNaN(edad) || isNaN(peso) || !estado) {
                    Swal.showValidationMessage('Todos los campos son obligatorios');
                    return false;
                }
    
                return { Nombre: nombre, Especie: especie, Edad: edad, Peso: peso, Estado: estado };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Registrando...',
                    text: 'Por favor espera...',
                    icon: 'info',
                    allowOutsideClick: false,
                    showConfirmButton: false,
                    timer: 2000
                });
    
                setTimeout(() => {
                    setMascotas([...mascotas, result.value]);
                    Swal.fire('¡Registrado!', 'La mascota ha sido agregada correctamente.', 'success');
                }, 2000); // Simula el tiempo de validación y registro
            }
        });
    };
    
    const buscarMascota = () => {
        Swal.fire({
            title: 'Buscar Mascota',
            input: 'text',
            inputPlaceholder: 'Ingrese el nombre de la mascota',
            showCancelButton: true,
            confirmButtonText: 'Buscar',
            cancelButtonText: 'Cancelar',
            inputValidator: (value) => {
                if (!value) {
                    return 'Debes ingresar un nombre';
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Buscando...',
                    text: 'Por favor espera...',
                    icon: 'info',
                    allowOutsideClick: false,
                    showConfirmButton: false,
                    timer: 2000
                });
    
                setTimeout(() => {
                    const mascotaBuscada = mascotas.find(mascota => mascota.Nombre.toLowerCase() === result.value.toLowerCase());
    
                    if (mascotaBuscada) {
                        Swal.fire({
                            title: 'Mascota Encontrada',
                            html: `
                                <b>Nombre:</b> ${mascotaBuscada.Nombre} <br>
                                <b>Especie:</b> ${mascotaBuscada.Especie} <br>
                                <b>Edad:</b> ${mascotaBuscada.Edad} años <br>
                                <b>Peso:</b> ${mascotaBuscada.Peso} kg <br>
                                <b>Estado de salud:</b> ${mascotaBuscada.Estado}
                            `,
                            icon: 'success'
                        });
                    } else {
                        Swal.fire({
                            title: 'No Encontrado',
                            text: 'No se encontró una mascota con ese nombre.',
                            icon: 'error'
                        });
                    }
                }, 2000); // Simula el tiempo de búsqueda
            }
        });
    };
    
    const eliminarNombreMascota = () => {
        Swal.fire({
            title: 'Eliminar Mascota',
            input: 'text',
            inputPlaceholder: 'Ingrese el nombre de la mascota a eliminar',
            showCancelButton: true,
            confirmButtonText: 'Buscar',
            cancelButtonText: 'Cancelar',
            inputValidator: (value) => {
                if (!value) {
                    return 'Debes ingresar un nombre';
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const mascotaBuscada = mascotas.find(mascota => mascota.Nombre.toLowerCase() === result.value.toLowerCase());
    
                if (mascotaBuscada) {
                    Swal.fire({
                        title: '¿Seguro que deseas eliminar esta mascota?',
                        html: `
                            <b>Nombre:</b> ${mascotaBuscada.Nombre} <br>
                            <b>Especie:</b> ${mascotaBuscada.Especie} <br>
                            <b>Edad:</b> ${mascotaBuscada.Edad} años <br>
                            <b>Peso:</b> ${mascotaBuscada.Peso} kg <br>
                            <b>Estado de salud:</b> ${mascotaBuscada.Estado}
                        `,
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Sí, eliminar',
                        cancelButtonText: 'Cancelar'
                    }).then((confirmResult) => {
                        if (confirmResult.isConfirmed) {
                            const mascotaFiltrada = mascotas.filter(mascota => mascota.Nombre.toLowerCase() !== result.value.toLowerCase());
                            setMascotas(mascotaFiltrada);
    
                            Swal.fire('Eliminado', 'La mascota ha sido eliminada correctamente.', 'success');
                        }
                    });
                } else {
                    Swal.fire('No Encontrado', 'No se encontró una mascota con ese nombre.', 'error');
                }
            }
        });
    };
    
    const actualizarMascota = (index) => {
        const mascotaEditar = mascotas[index];
    
        if (!mascotaEditar) {
            Swal.fire('Error', 'No se encontró la mascota.', 'error');
            return;
        }
    
        Swal.fire({
            title: 'Editar Mascota',
            html: `
                <input id="nombre" class="swal2-input" placeholder="Nombre" value="${mascotaEditar.Nombre}">
                <input id="especie" class="swal2-input" placeholder="Especie" value="${mascotaEditar.Especie}">
                <input id="edad" type="number" class="swal2-input" placeholder="Edad" value="${mascotaEditar.Edad}">
                <input id="peso" type="number" class="swal2-input" placeholder="Peso" value="${mascotaEditar.Peso}">
                <input id="estado" class="swal2-input" placeholder="Estado de salud" value="${mascotaEditar.Estado}">
            `,
            showCancelButton: true,
            confirmButtonText: 'Actualizar',
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                const nuevoNombre = document.getElementById('nombre').value.trim();
                const nuevaEspecie = document.getElementById('especie').value.trim();
                const nuevaEdad = parseInt(document.getElementById('edad').value);
                const nuevoPeso = parseFloat(document.getElementById('peso').value);
                const nuevoEstado = document.getElementById('estado').value.trim();
    
                if (!nuevoNombre || !nuevaEspecie || isNaN(nuevaEdad) || isNaN(nuevoPeso) || !nuevoEstado) {
                    Swal.showValidationMessage('Todos los campos deben estar llenos y ser válidos.');
                    return false;
                }
    
                return { Nombre: nuevoNombre, Especie: nuevaEspecie, Edad: nuevaEdad, Peso: nuevoPeso, Estado: nuevoEstado };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Actualizando...',
                    text: 'Por favor espera...',
                    icon: 'info',
                    allowOutsideClick: false,
                    showConfirmButton: false,
                    timer: 2500
                });
    
                setTimeout(() => {
                    const nuevasMascotas = [...mascotas];
                    nuevasMascotas[index] = result.value;
                    setMascotas(nuevasMascotas);
    
                    Swal.fire('Actualizado', 'La mascota ha sido actualizada.', 'success');
                }, 2500); // Simula el retraso en la actualización
            }
        });
    };
    
    const eliminarMascota = (index) => {
        const mascota = mascotas[index];
        Swal.fire({
            title: '¿Estás seguro?',
            html: `
                <p><strong>Nombre:</strong> ${mascota.Nombre}</p>
                <p><strong>Especie:</strong> ${mascota.Especie}</p>
                <p><strong>Edad:</strong> ${mascota.Edad} años</p>
                <p><strong>Peso:</strong> ${mascota.Peso} kg</p>
                <p><strong>Estado:</strong> ${mascota.Estado}</p>
                <br>
                <strong style="color: red;">Esta acción no se puede deshacer.</strong>
            `,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                const nuevasMascotas = mascotas.filter((_, i) => i !== index);
                setMascotas(nuevasMascotas);
                Swal.fire('Eliminado', 'La mascota ha sido eliminada.', 'success');
            }
        });
    };
    
    return (
        <div className="bg-amber-500 flex flex-col items-center h-screen gap-20 p-20">
            <div className="flex flex-col bg-white text-gray-400 p-5 gap-5 rounded-lg">
                <div className="flex items-center gap-20 justify-between">
                    <h1 className="text-2xl">Gestion Veterinaria</h1>
                    <div className="flex gap-5">
                        <button onClick={registrarMascota} className="bg-green-500 text-white p-2 rounded-lg hover:cursor-pointer">Registrar</button>
                        <button onClick={buscarMascota} className="bg-yellow-500 text-white p-2 rounded-lg hover:cursor-pointer">Buscar por nombre</button>
                        <button onClick={eliminarNombreMascota} className="bg-red-500 text-white p-2 rounded-lg hover:cursor-pointer"> Eliminar por nombre</button>
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
                                {mascotas.map((mascota, index) => (
                                    <tr key={index} className="text-center">
                                        <td>{mascota.Nombre}</td>
                                        <td>{mascota.Especie}</td>
                                        <td>{mascota.Edad} años</td>
                                        <td>{mascota.Peso} kg</td>
                                        <td>{mascota.Estado}</td>
                                        <td>
                                            <button onClick={()=>actualizarMascota(index)} className="bg-blue-600 p-2 rounded-lg m-2 text-white hover:cursor-pointer">Editar</button>
                                            <button onClick={()=>eliminarMascota(index)} className="bg-red-400 p-2 rounded-lg text-white hover:cursor-pointer">Eliminar</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Link href="/" className="bg-violet-500 px-5 py-2 rounded-lg text-white hover:cursor-pointer">Salir</Link>
        </div>
    );
}