import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
// import { FiExternalLink } from "react-icons/fi";
import Slider from "react-slick";
import { Link } from "react-router-dom";

function Gallery() {

    const [data, setData] = useState([]);
    console.log(data)
    var settings = {
        focusOnSelect: true,
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        speed: 500,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              // infinite: true,
              // dots: true
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
          
        ],

      };

    useEffect(() => {
        
        const fetchData = async () => {
            const usersCollectionRef = collection(db, 'gallery'); 
            const userSnap = await getDocs(usersCollectionRef); 
            const data = userSnap.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));
            setData(data);
            
            // setLoding(false);
            return data;
        }

        fetchData();
        
    }, []);
      const [url, setUrl] = useState([]);
  
    useEffect(() => {
      fetch('/data/02_Joongsan.json') // JSON 파일 경로 지정
        .then((response) => response.json())
        .then((jsonData) => setUrl(jsonData))
        .catch((error) => console.error("Error loading JSON:", error));
    }, []);
      console.log(url);
    return ( <>
            <section id="gallery" className="mainpage mt-40" data-aos="fade-up" data-aos-duration="1000" >
                <header className="text-center">
                    {/* <h2 className="content__title md:text-[10vw] font-larger text-[15vw]  opacity-80" data-splitting
                        data-effect10>Gallery.</h2> */}
                    <h2 className="text-xl opacity-50">[2017-2022]</h2>
                    <h3 className="text-center text-3xl  font-semibold mt-2 "> <span className="block  w-full whitespace-pre-wrap  opacity-100">Previous Company Portfolio:</span>
                        <span className="opacity-50">A showcase of various graphic design</span>
                    </h3>
                </header>
                <div className="slider-container container mx-auto overflow-hidden">
                    <Slider {...settings} className="cursor-pointer flex justify-center items-center">
                        {data.map((item,index) => (
                           
                            <section key={item.id} className="slide container mx-auto py-24 flex p-2">
                                <figure className="slide__img-wrap cursor-pointer">
                                    {/* <div  alt={item.name} className="slide__img w-full bg-cover bg-center bg-no-repeat " style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/capture/gallery/thumb/${item.name}.jpg)`}}/> */}
                                <img src={`${process.env.PUBLIC_URL}/images/capture/gallery/thumb/${item.name}.jpg`} alt="img" />
                               
                                </figure>
                                {/* <h2 className="slide__side">{item.title}</h2> */}
                                <article className="slide__title-wrap flex flex-col justify-start items-start p-4">
                                    <h5 className="slide__number relative mb-6 after:content-[''] after:absolute after:-bottom-2 after:w-4 after:m-autoafter:h-[2px] pb-1  after:left-0 after:bg-white after:mt-6 ">{index + 1} </h5>
                                    <h3 className="slide__title font-semibold text-3xl mb-4 text-left w-screen truncate whitespace-nowrap overflow-hidden text-ellipsis" title={item.title}>{item.title}</h3>
                                    <h4 className="slide__subtitle text-sm opacity-80 -mt-3 text-left h-14 ">{item.subtitle}</h4>
                                    <Link to={`2017/${index}/${item.id}`}  className="relative inline-flex justify-center items-center z-100 mt-6 px-2 py-1 border border-white/20 text-white/70 hover:border-white/100 hover:text-white/100">Link</Link>
                                </article>
                            </section>
                            
                        ))}   

                    </Slider>
                    
                </div>
                <div>
                  {url.map((urls) => (
                    <>
                    {urls.projects.map((project)=>(
                      <>
                       <p>{project.name}</p>
                        {project.imageUrls.map((image,index)=>(
                           <img key={index} src={`http://pje9978.ipdisk.co.kr:8000/list/HDD1/Work/02_Joongsan/2024/${project.id}_${project.name}/thumb/${image}`} alt={project.name} className="w-full h-auto rounded" />
                        ))}
                      </>
                    ))}
                    </>
                  ))}
                </div>
                <div className="icon1 animate-bounce flex justify-center flex-col items-center mt-6">
                    <span className="text-xs opacity-80 z-0 text-center"> 이미지를 클릭해 다양한 그래픽 디자인을 확인하세요.</span>
                    <svg className=" mt-2" width="40px" height="40px" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg" stroke="#e8e5de">
                        <g className="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g className="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g className="SVGRepo_iconCarrier">
                            <path
                                d="M15 11L12 8M12 8L9 11M12 8V16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                stroke="#e8e5de" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round">
                            </path>
                        </g>
                    </svg>
                </div>
            </section>
    
    </> );
}

export default Gallery;