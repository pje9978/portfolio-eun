import { collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import Banner from "./banner";



function Dtl2024() {

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3
    };

//   const basePath = "http://pje9978.ipdisk.co.kr:8000/list/HDD1/Work/02_Joongsan/2024/Detail/";
//   const [projectsByYear, setProjectsByYear] = useState([]); // 전체 데이터를 저장
//   const [currentYear, setCurrentYear] = useState(null); // 선택된 년도
//   const [currentProject, setCurrentProject] = useState(null); // 선택된 프로젝트

//   // 현재 선택된 년도의 프로젝트 목록
//   const currentYearProjects =
//     projectsByYear.find((yearGroup) => yearGroup.year === currentYear)?.projects || [];

    const db = getFirestore();
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const collectionRef = collection(db, '02_Joongsan', 'detail', '2024');
            const querySnapshot = await getDocs(collectionRef);

            // 가져온 문서들을 배열로 변환하여 상태 업데이트
            const fetchedData = querySnapshot.docs.map(doc => ({
                id: doc.id, // 문서 ID
                ...doc.data() // 문서 데이터 (name 등)
            }));

            setData(fetchedData); // 상태 업데이트
        } catch (error) {
            console.error("데이터를 가져오는 중 오류 발생:", error);
        }
    };

    // 컴포넌트가 마운트될 때 데이터 가져오기
    useEffect(() => {
        fetchData();
    }, []);
    console.log(data);
    return ( <>
            <section className="mainpage mt-40" data-aos="fade-up" data-aos-duration="1000" >
                <header className="text-center">
                    {/* <h2 className="content__title md:text-[10vw] font-larger text-[15vw]  opacity-80" data-splitting
                        data-effect10>Gallery.</h2> */}
                    <h2 className="text-xl opacity-50">[2024~]</h2>
                    <h3 className="text-center text-3xl  font-semibold mt-2 "> <span className="block  w-full whitespace-pre-wrap  opacity-100">Current Company Portfolio:</span>
                        <span className="opacity-50">Product Detail Page Designs</span>
                    </h3>
                </header>
                <section>
                    <div className="slider-container container mx-auto overflow-hidden">
                        <Slider {...settings} className="cursor-pointer flex justify-center items-center">
                            {/* {data.map((item) => (
                            <section key={item.id}>
                                <strong>ID:</strong> {item.id}, <strong>Name:</strong> {item.name}
                                <ul>
                                        {item.url?.map((link, index) => (
                                            <li key={index}>
                                                <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                                            </li>
                                        )) || null}
                                </ul>

                            </section>
                            ))} */}

                            {data.map((item,index) => (
                                <section key={item.index} className="slide container mx-auto py-24 flex p-2 ">
                                    <figure className="slide__img-wrap cursor-pointer">
                                        {/* <div  alt={item.name} className="slide__img w-full bg-cover bg-center bg-no-repeat " style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/capture/gallery/thumb/${item.name}.jpg)`}}/> */}
                                    <img src={item.thumb} alt="img" className="w-[600px] text-center mx-auto" />
                                    </figure>
                                    {/* <h2 className="slide__side">{item.title}</h2> */}
                                    <article className="slide__title-wrap flex flex-col justify-start items-start p-4 mx-auto">
                                        <h5 className="slide__number relative mb-6 after:content-[''] after:absolute after:-bottom-2 after:w-4 after:m-auto after:h-[2px] pb-1 after:left-0 after:bg-white after:mt-6 text-center">
                                        {/* {index + 1} */}1
                                        </h5>
                                            <h3 className="slide__title font-semibold text-3xl mb-4 text-left w-[fill-available] truncate whitespace-nowrap overflow-hidden text-ellipsis" >{item.title}</h3>
                                            <h4 className="slide__subtitle text-sm opacity-80 -mt-3 text-left h-14 ">{item.subtitle}</h4>
                                            <Link to={`2024/${index}/${item.id}`}  className="relative inline-flex justify-center items-center z-100 mt-6 px-2 py-1 border border-white/20 text-white/70 hover:border-white/100 hover:text-white/100">Link</Link>
                                    </article>
                                </section>
                                
                            ))}

                        </Slider>
                        
                    </div>
                </section>

            </section>
    
    </> );
}

export default Dtl2024;