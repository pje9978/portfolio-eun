function MacBook_2025(image) {

    console.log(image.image);
    return ( <>
            <div className="macbook">
                
                     <div className="screen">
                        <div className="viewport">
                            <div className=" relative rotate-45 left-[50%] bottom-[50%]">
                        
                                    <img src={image.image}  alt=""  className="absolute  w-1/4 right-[0%] top-[50%] -mt-[240%]"/>
                                    <img src={image.image}  alt=""  className="absolute  w-1/4 left-[50%] top-[15%] -mt-[45%]"/>
                                 
                                    <img src={image.image}  alt=""  className="absolute  w-1/4 left-[25%] top-[50%] mt-[50%]"/>
                                    <img src={image.image}  alt=""  className="w-1/4 absolute left-[0%] top-[75%] -mt-[75%]"/>
                                    <img src={image.image}  alt=""  className="absolute  w-1/4 left-[100%] -top-[100%]  -mt-[100%]"/>
                                    
                                    
                            </div>
                        </div>
                    </div> 
                    <div className="base"></div>
                    <div className="notch"></div>
              
           
            </div>
        </> );
}

export default MacBook_2025;
