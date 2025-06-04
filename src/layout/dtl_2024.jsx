import { collection,  getDocs, getFirestore, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../styles/_macbook.scss';

function Dtl2024() {
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [projectName, setProjectName] = useState("");
    const [projectTitle, setProjectTitle] = useState("");
    const [projectYearMonth, setProjectYearMonth] = useState("");
    const [projectYear, setProjectYear] = useState("");
    const [description, setDescription] = useState("");
    const [thumbnailImage, setThumbnailImage] = useState("");
    const [thumbnailImage1, setThumbnailImage1] = useState("");
    const [thumbnailImage2, setThumbnailImage2] = useState("");
    const [fullImage, setFullImage] = useState("");
    const [splitImages, setSplitImages] = useState("");
    const [projectMemo, setProjectMemo] = useState("");
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [viewAll, setViewAll] = useState(true); 
    
    const [selectedYear, setSelectedYear] = useState(""); 
    const [projects, setProjects] = useState([]);
    const [showSplitImagesModal, setShowSplitImagesModal] = useState(false);
    const hostingURL = process.env.REACT_APP_HOSTING_URL;

    const db = getFirestore();
    const [data, setData] = useState([]);


    // 컴포넌트가 마운트될 때 데이터 가져오기

    useEffect(() => {
        const fetchData = async () => {
            try {
                const collectionRef = collection(db, 'projects');
                const q = query(collectionRef, orderBy('projectYearMonth', 'desc')); // 내림차순 정렬
                const querySnapshot = await getDocs(q);
    
                const fetchedData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
    
                setData(fetchedData);
            } catch (error) {
                console.error("데이터를 가져오는 중 오류 발생:", error);
            }
        };
    
        fetchData();
    }, [db]);
    

        
    const showSplitImages = (project) => {
        setSelectedProject(project);
        setShowSplitImagesModal(true);
    };

    const hideSplitImagesModal = () => {
        setShowSplitImagesModal(false);
        setSelectedProject(null);
    };

    const startEditProject = (project) => {
        setIsEditing(true);
        setSelectedProject(project);
        setProjectName(project.projectName);
        setProjectTitle(project.projectTitle);
        setProjectYearMonth(project.projectYearMonth);
        setProjectYear(project.projectYear);
        setDescription(project.description);
        setThumbnailImage(project.thumbnailImage);
        setFullImage(project.fullImage);
        setSplitImages(project.splitImages.join("\n"));
        setProjectMemo(project.projectMemo);
        setShowModal(true);
    };

        // const years = Array.from(new Set(filteredProjects.map((project) => project.projectYearMonth.split(".")[0])));
        const years = [...new Set(data.map(p => p.projectYear))].sort().reverse();
    console.log(years);
        const filterByYear = (year) => {
             const filtered = data.filter(project => project.projectYear === year);
        setFilteredProjects(filtered);
            setSelectedYear(year);
            setViewAll(false); 
          };
        const showAllProjects = () => {
            setFilteredProjects(data);
        setSelectedYear("");
        setViewAll(true); 
        };

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
                        <div className="flex flex-wrap flex-col justify-between">
                                              <ul className="inline-flex border-b">
                        <li>
                            <button
                                className={`px-4 py-2 ${viewAll ? "font-bold opacity-100 border-b-2" : "opacity-60"}`}
                                onClick={showAllProjects}
                            >
                                전체보기
                            </button>
                        </li>
                        {years.map((year) => (
                            <li key={year} >
                                <button
                                    className={`px-8 py-2 ${selectedYear === year ? "font-bold opacity-100 border-b-2" : "opacity-60"}`}
                                    onClick={() => filterByYear(year)}
                                >
                                    {year}
                                </button>
                            </li>
                        ))}
                    </ul>

                        </div>
                        {/* 프로젝트 불러오기 */}
                        <section className="bg-zinc-800 p-6">
                            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 overflow-hidden">
                                {filteredProjects.map((project) => {
                                        return (
                                    <Link to={`/${project.id}`}
                                        key={project.id} 
                                        className="cursor-pointer  flex-wrap  group p-4 flex bg-zinc-900  
                                                transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
                                    >
        
                                        <div className="flex flex-col text-left items-start justify-between">
                                            <div className="xl:max-h-[340px]  w-full  md:min-h-[128px] aspect-square">
                                            <div className="relative group" rel="noopener noreferrer">
                                            <div className="viewport !m-0 !bg-none overflow-hidden hover:opacity-0">
                                                <img src={`${hostingURL}/${project.projectYear}/${project.thumbnailImage1}`} alt="" />
                                                {/* <div className=" relative rotate-45 left-[50%] bottom-[50%] aspect-square object-contain transition-opacity duration-300 group-hover:opacity-0 ">
                                                
            
                                                    <img
                                                        src={`${hostingURL}/${project.projectYear}/${project.fullImage}`}
                                                        alt=""
                                                        className="absolute w-1/4 right-[0%] top-[50%] -mt-[240%]"loading="lazy"
                                                    />
                                                    <img
                                                        src={`${hostingURL}/${project.projectYear}/${project.fullImage}`}
                                                        alt=""
                                                        className="absolute w-1/4 left-[50%] top-[15%] -mt-[45%]"loading="lazy"
                                                    />
                                                    <img
                                                        src={`${hostingURL}/${project.projectYear}/${project.fullImage}`}
                                                        alt=""
                                                        className="absolute w-1/4 left-[25%] top-[0%] mt-[50%]"loading="lazy"
                                                    />
                                                    <img
                                                        src={`${hostingURL}/${project.projectYear}/${project.fullImage}`}
                                                        alt=""
                                                        className="w-1/4 absolute left-[0%] top-[75%] -mt-[75%] "loading="lazy"
                                                    />
                                                                                                        <img
                                                        src={`${hostingURL}/${project.projectYear}/${project.fullImage}`}
                                                        alt=""
                                                        className="w-1/4 absolute left-[-25%] top-[-300%] -mt-[75%]"loading="lazy"
                                                    />
                                                    <img
                                                        src={`${hostingURL}/${project.projectYear}/${project.fullImage}`}
                                                        alt=""
                                                        className="absolute w-1/4 left-[100%] -top-[100%] -mt-[-170%]"loading="lazy"
                                                    />
                                                </div> */}
                                            </div>
                                            <img
                                                src={`${hostingURL}/${project.projectYear}/${project.thumbnailImage}`}
                                                alt="썸네일"
                                                className="aspect-square object-contain transition-opacity duration-300 group-hover:opacity-100"
                                            />
                                            {/* 썸네일 이미지 */}
                                        </div>

                                            </div>
                                            <div className="lg:ml-0 lg:w-[54%] flex flex-col w-full md:h-auto h-full ml-4 mt-4">
                                                <h3 className="w-full text-sm opacity-10 font-semibold text-white overflow-hidden whitespace-nowrap text-ellipsis hidden">{project.projectName}</h3>
        
                                                <h3 className="text-base font-semibold text-white overflow-hidden whitespace-nowrap text-ellipsis">{project.projectTitle}</h3>
                                                <p className=" text-gray-400 max-w-full text-base overflow-hidden whitespace-nowrap text-ellipsis">{project.description}</p>
                                                <p className="lg:mt-auto ">
                                                    <button 
                                                        className="hidden pr-3 inline-flex items-center text-violet-300 mt-2 transition-colors duration-300 ease-in-out hover:text-violet-400"
                                                        onClick={() => showSplitImages(project)}
                                                    >
                                                        <span>분할 Link</span>
                                                    </button>
                                                    <a 
                                                        href={`${hostingURL}/${project.projectYear}/${project.fullImage}`}
                                                        rel="noopener noreferrer" 
                                                        className="hidden inline-flex items-center text-violet-300 mt-2 transition-colors duration-300 ease-in-out hover:text-violet-400"
                                                    >
                                                        <span>전체 Link</span>
                                                    </a>
                                                    <p className="text-gray-500 mt-2 min-h-[42px] bg-black rounded p-2 w-full hidden" title="프로젝트 메모">{project.projectMemo}</p>
                                                </p>

                                            </div>

        
                                        </div>
        
                                    </Link>
                                        )
                                })}
                            </div>
                        </section>
                            
                    </div>
                </section>

            </section>
    
    </> );
}

export default Dtl2024;