function MacBook({props, id, title}) {
    const imagePath = `${process.env.PUBLIC_URL}/images/capture/${title}/desktop1.png`;

    return ( <>
            <div className="macbook">
                {imagePath && (<>
                    <div className="screen">
                        <div className="viewport" style={{backgroundImage: `url(${imagePath})`}}>
                            <div className=" relative rotate-45 left-[50%] bottom-[50%]">
                                    <img src={`${process.env.PUBLIC_URL}/images/capture/gallery/dtl/${props.data[id].name}.jpg`}  alt=""  className="absolute  w-1/4 right-[0%] top-[50%] -mt-[240%]"/>
                                    <img src={`${process.env.PUBLIC_URL}/images/capture/gallery/dtl/${props.data[id].name}.jpg`}  alt=""  className="absolute  w-1/4 left-[50%] top-[15%] -mt-[45%]"/>
                                    {/* -top-[1500px] left-[575px]  */}
                                    <img src={`${process.env.PUBLIC_URL}/images/capture/gallery/dtl/${props.data[id].name}.jpg`}  alt=""  className="absolute  w-1/4 left-[25%] top-[50%] mt-[50%]"/>
                                    <img src={`${process.env.PUBLIC_URL}/images/capture/gallery/dtl/${props.data[id].name}.jpg`}  alt=""  className="w-1/4 absolute left-[0%] top-[75%] -mt-[75%]"/>
                                    <img src={`${process.env.PUBLIC_URL}/images/capture/gallery/dtl/${props.data[id].name}.jpg`}  alt=""  className="absolute  w-1/4 left-[100%] -top-[100%]  -mt-[100%]"/>
                                    
                                    
                            </div>
                        </div>
                    </div>
                    <div className="base"></div>
                    <div className="notch"></div>r
                </>
              )}
            </div>
        </> );
}

export default MacBook;