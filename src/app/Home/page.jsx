export default function Inicio(){
    return(
        <div className="bg-amber-500 flex flex-col items-center h-screen gap-20 p-20">
            <div className="flex flex-col items-center justify-center bg-white text-gray-400 p-5">
                <div className="flex items-center gap-20 justify-between">
                    <h1 className="text-2xl">Gestion Veterinaria</h1>
                    <div className="flex gap-5">
                        <button className="bg-green-500 text-white p-2 rounded-lg">Registrar</button>
                        <button className="bg-yellow-500 text-white p-2 rounded-lg">Buscar por nombre</button>
                        <button className="bg-red-500 text-white p-2 rounded-lg"> Eliminar por nombre</button>
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    );
}