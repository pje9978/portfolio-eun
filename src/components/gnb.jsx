import { Link } from "react-router-dom";

function Gnb() {
    return ( <>
        <nav role="navigation" className="w-screen  bg-black z-50 border-b  border-textwhite" >
        <section className="container mx-auto px-6 flex flex-wrap">
            <h1 className="md:w-auto text-xl font-bold flex w-full justify-center items-center py-4 text-textwhite">
                <Link to="/" ><h1 className="font-bold">PORTFOLIO.</h1></Link>
            </h1>
            <ul className="md:w-auto md:flex-row flex  flex-wrap w-full justify-center  ml-auto items-center text-base h-full">
                <li className="relative h-full">
                    <a href="#work" className="block p-5 opacity-50 text-center text-textwhite text-xs nav-after hover:opacity-100 hover:after:w-full">
                        Work</a>
                </li>
                <li className="relative h-full"><a href="/#gallery"
                        className="block p-5 opacity-50 text-center text-textwhite text-xs nav-after hover:opacity-100 hover:after:w-full">
                        Gallery</a></li>
                <li className="relative h-full"><a href="#contact"
                        className="block p-5 opacity-50 text-center text-textwhite text-xs nav-after hover:opacity-100 hover:after:w-full">
                        Contact</a></li>
            </ul>
        </section>
        </nav>
    </> );
}

export default Gnb;