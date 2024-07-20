import { IoIosCheckmarkCircleOutline } from "react-icons/io";

function Result({result}) {
    return ( <>
        <section className="mt-6">
            {result.map((item, index) => (
                
                    <div key={index} role="group" aria-label="result" className="container mx-auto flex items-ceter justify-center text-left hover:text-gray-200">
                        <IoIosCheckmarkCircleOutline className="mr-3 flex self-center items-center" />
                        <h4>{item}</h4>
                    
                    </div>
                
            ))}
        </section>
    </> );
}

export default Result;