import Link from 'next/link';
export default function Home(){
  return(
    <div className="bg-amber-500 flex flex-col items-center h-screen gap-20 p-20">
      <h1 className="text-4xl text-amber-950">Taller veterinaria JavaScript</h1>
      <div className="bg-white rounded-lg shadow flex flex-col items-center justify-center p-8 text-orange-400">
        <h1 className="text-3xl">Bienvenido al taller de veterinaria en JavasScript</h1>
        <p className="pt-5 text-2xl">Para ir a la gestion de la veterinaria da click en el boton</p>
        <Link href="/Home" className='bg-amber-500 text-white p-3 rounded-lg mt-10'>
          <h1>Iniciar</h1>
        </Link>
        
      </div>
    </div>
  )
}