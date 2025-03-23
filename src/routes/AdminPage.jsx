import React, { useState, useEffect } from "react";
import Gnb from "../components/gnb";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";

export default function AdminPage() {
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [projectName, setProjectName] = useState("");
    const [projectTitle, setProjectTitle] = useState("");
    const [projectYearMonth, setProjectYearMonth] = useState("");
    const [projectYear, setProjectYear] = useState("");
    const [description, setDescription] = useState("");
    const [thumbnailImage, setThumbnailImage] = useState("");
    const [fullImage, setFullImage] = useState("");
    const [splitImages, setSplitImages] = useState("");
    const [projectMemo, setProjectMemo] = useState("");
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [viewAll, setViewAll] = useState(true); 
    const [selectedYear, setSelectedYear] = useState(""); 
    const years = Array.from(new Set(filteredProjects.map((project) => project.projectYearMonth.split(".")[0])));

    const [showSplitImagesModal, setShowSplitImagesModal] = useState(false);
    const hostingURL = process.env.REACT_APP_HOSTING_URL;
    // const fetchProjects = async () => {
    //     try {
    //         const querySnapshot = await getDocs(collection(db, "projects"));
    //         const projectsList = querySnapshot.docs.map(doc => ({
    //             id: doc.id,
    //             ...doc.data()
    //         }));
    //         // Update your state with the new projects list (assuming you use React's useState)
    //         setProjects(projectsList); // Replace with your state update logic
    //     } catch (error) {
    //         console.error("Error fetching projects: ", error);
    //     }
    // };
    
    const handleProjectNameChange = (e) => setProjectName(e.target.value);
    useEffect(() => {
        // Firestore에서 전체 프로젝트 가져오기
        const fetchProjects = async () => {
            const querySnapshot = await getDocs(collection(db, "projects"));
            const fetchedProjects = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setProjects(fetchedProjects); // 상태 업데이트
            setFilteredProjects(fetchedProjects); // 필터링된 프로젝트 상태 업데이트
        };
        
        fetchProjects();
    }, []);

    const [projects, setProjects] = useState([]);
    const generateUrls = () => {
        const year = projectYearMonth.split(".")[0];
        const projectNameClean = projectName.replace(/\s+/g, "_");

        // 사용자가 입력한 splitImages 경로는 상대 경로 그대로 사용합니다.
        const splitImageUrls = splitImages.split("\n").map((img) => {
            const trimmedImg = img.trim();
            if (trimmedImg && trimmedImg.startsWith('./')) {
                return trimmedImg.slice(2); // './'를 잘라내고 상대 경로로 사용
            }
            return trimmedImg;
        });

        return {
            // thumbnail: `${hostingURL}/${year}/Detail/${projectNameClean}/thumb.jpg`,
            thumbnail: `Detail/${projectNameClean}/thumb.jpg`,
            // fullImage: `${hostingURL}/${year}/Detail/${projectNameClean}/${projectNameClean}.jpg`,
            fullImage: `Detail/${projectNameClean}/${projectNameClean}.jpg`,
            splitImage: splitImageUrls
        };
    };


    const handleSubmit = async () => {
        const { thumbnail, fullImage, splitImage } = generateUrls();
        const year = projectYearMonth.split(".")[0]; // 년도만 추출
    
        const newProject = {
            projectName,
            projectTitle,
            projectYearMonth,
            projectYear: year,  // **추가: 년도만 저장**
            description,
            thumbnailImage: thumbnail,
            fullImage,
            splitImages: splitImage,
            projectMemo,
        };
    
        if (isEditing && selectedProject) {
            try {
                await updateDoc(doc(db, "projects", selectedProject.id), newProject);
                setFilteredProjects((prevProjects) =>
                    prevProjects.map((project) =>
                        project.id === selectedProject.id ? { ...project, ...newProject } : project
                    )
                );
                setShowModal(false);
            } catch (e) {
                console.error("Error updating project: ", e);
            }
        } else {
            try {
                const docRef = await addDoc(collection(db, "projects"), newProject);
                console.log("Project added with ID: ", docRef.id);
                setFilteredProjects((prevProjects) => [...prevProjects, { id: docRef.id, ...newProject }]);
                setShowModal(false);
            } catch (e) {
                console.error("Error adding project: ", e);
            }
        }
    };
    
    
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
    const filterByYear = (year) => {
        setSelectedYear(year);
        setViewAll(false); 
      };
    const showAllProjects = () => {
    setSelectedYear("");
    setViewAll(true); 
    };
  
    const deleteProject = async (id) => {
        const isConfirmed = window.confirm("정말로 이 프로젝트를 삭제하시겠습니까?");
        if (!isConfirmed) return;
    
        try {
            await deleteDoc(doc(db, "projects", id));
            
            // 상태 업데이트: 삭제된 프로젝트를 상태에서 제거
            setProjects((prevProjects) => prevProjects.filter(project => project.id !== id));
            setFilteredProjects((prevProjects) => prevProjects.filter(project => project.id !== id));
    
        } catch (error) {
            console.error("Error deleting project: ", error);
        }
    };
    return (
        <div className="">
            <Gnb />
            <main className="container mx-auto p-4">
                <h1 className="text-xl font-bold mb-4">관리자 페이지</h1>

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
                    <button
                        className="bg-[#7c55c0] hover:bg-[#7845d2]  rounded-t-lg mt-4 text-center  w-full h-full text-white p-2 px-4"
                        onClick={() => {
                            // Reset all form fields
                            setIsEditing(false);  // Reset editing state
                            setProjectName("");
                            setProjectTitle("");
                            setProjectYearMonth("");
                            setProjectYear("");
                            setDescription("");
                            setThumbnailImage("");
                            setFullImage("");
                            setSplitImages("");
                            setProjectMemo("");
                            setShowModal(true);  // Show the modal
                        }}
                    >
                        글 등록
                    </button>
                </div>

                {/* 등록모달창 */}
                {showModal && (
                    <div className="fixed inset-0 text-zinc-700 bg-zinc-900 bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-md mx-4 w-full md:w-[70%] lg:w-[50%]">
                            <h2 className="text-lg font-semibold mb-4">{isEditing ? "프로젝트 수정" : "프로젝트 등록"}</h2>

                            <div className="mb-4 text-left">
                                <label htmlFor="projectName" className="block opacity-30 text-sm font-medium text-gray-700">프로젝트 이름(폴더이름명)</label>
                                <input
                                    id="projectName"
                                    type="text"
                                    className="mt-1 p-2 border border-gray-300 w-full"
                                    placeholder="프로젝트 이름"
                                    value={projectName}
                                    onChange={(e) => setProjectName(e.target.value)}
                                />
                            </div>
                            <div className="mb-4 text-left">
                                <label htmlFor="projectName" className="block opacity-30 text-sm font-medium text-gray-700">프로젝트 타이틀</label>
                                <input
                                    id="projectName"
                                    type="text"
                                    className="mt-1 p-2 border border-gray-300 w-full"
                                    placeholder="프로젝트 타이틀"
                                    value={projectTitle}
                                    onChange={(e) => setProjectTitle(e.target.value)}
                                />
                            </div>

                            <div className="mb-4 text-left">
                                <label htmlFor="projectYearMonth" className="block opacity-30 text-sm font-medium text-gray-700">프로젝트 연도.월 (예: 2024.03)</label>
                                <input
                                    id="projectYearMonth"
                                    type="text"
                                    className="mt-1 p-2 border border-gray-300 w-full"
                                    placeholder="프로젝트 연도.월 (예: 2024.03)"
                                    value={projectYearMonth}
                                    onChange={(e) => setProjectYearMonth(e.target.value)}
                                />
                            </div>

                            <div className="mb-4 text-left">
                                <label htmlFor="description" className="block opacity-30 text-sm font-medium text-gray-700">프로젝트 설명</label>
                                <textarea
                                    id="description"
                                    className="mt-1 p-2 border border-gray-300 w-full"
                                    placeholder="프로젝트 설명"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <div className="mb-4 text-left">
                                <label htmlFor="thumbnailImage" className="block opacity-30 text-sm font-medium text-gray-700">썸네일 이미지 경로 (자동으로 채워집니다)</label>
                                <input
                                    id="thumbnailImage"
                                    type="text"
                                    className="mt-1 p-2 border border-gray-300 w-full"
                                    placeholder="썸네일 이미지 경로 (자동으로 채워집니다)"
                                    value={generateUrls().thumbnail}
                                    readOnly
                                />
                            </div>

                            <div className="mb-4 text-left">
                                <label htmlFor="fullImage" className="block opacity-30 text-sm font-medium text-gray-700">프로젝트 이미지 (통) 경로 (자동으로 채워집니다)</label>
                                <input
                                    id="fullImage"
                                    type="text"
                                    className="mt-1 p-2 border border-gray-300 w-full"
                                    placeholder="프로젝트 이미지 (통) 경로 (자동으로 채워집니다)"
                                    value={generateUrls().fullImage}
                                    readOnly
                                />
                            </div>

                            <div className="mb-4 text-left">
                                <label htmlFor="splitImages" className="block opacity-30 text-sm font-medium text-gray-700">프로젝트 이미지 (분할) 경로 (줄바꿈으로 여러 이미지 입력)</label>
                                <textarea
                                    id="splitImages"
                                    className="mt-1 p-2 h-[200px] border border-gray-300 w-full"
                                    placeholder="프로젝트 이미지 (분할) 경로 (줄바꿈으로 여러 이미지 입력)"
                                    value={splitImages}
                                    onChange={(e) => setSplitImages(e.target.value)}
                                />
                            </div>

                            <div className="mb-4 text-left">
                                <label htmlFor="projectMemo" className="block opacity-30 text-sm font-medium text-gray-700">프로젝트 메모</label>
                                <textarea
                                    id="projectMemo"
                                    className="mt-1 p-2 border border-gray-300 w-full"
                                    placeholder="프로젝트 메모"
                                    value={projectMemo}
                                    onChange={(e) => setProjectMemo(e.target.value)}
                                />
                            </div>

                            <button
                                className="bg-[#7c55c0]  text-white p-2 mb-2 w-full"
                                onClick={handleSubmit}
                            >
                                {isEditing ? "수정" : "등록"}
                            </button>
                            <button
                                className="bg-gray-500 text-white p-2 w-full"
                                onClick={() => setShowModal(false)}
                            >
                                닫기
                            </button>
                        </div>
                    </div>
                )}

                {/* 프로젝트 불러오기 */}
                <section className="bg-zinc-800 p-6">
                    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredProjects.map((project) => {
                             return (
                            <div
                                key={project.id} 
                                className="cursor-pointer    w-full group p-4 flex flex-wrap bg-zinc-900  
                                        transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
                            >

                                <div className="flex flex-wrap text-left items-start w-full justify-between">
                                    <div className="xl:max-h-[340px] lg:max-h-[115px] lg:min-h-[115px] w-[40%] h-[40%] rounded md:min-h-[128px] min-h-full bg-black aspect-square">
                                        <Link to={`/${project.id}`} href={project.thumbnailImage} rel="noopener noreferrer">
                                            <img src={`${hostingURL}/${project.projectYear}/${project.thumbnailImage}`} alt="썸네일" className=" bg-black min-h-full object-cover rounded-md" />
                                        </Link>
                                    </div>
                                    <div className="lg:ml-0 lg:w-[54%] flex flex-col w-[54%] md:h-auto h-full ml-4 ">
                                        <h3 className="w-full text-sm opacity-10 font-semibold text-white overflow-hidden whitespace-nowrap text-ellipsis">{project.projectName}</h3>

                                        <h3 className="text-base font-semibold text-white overflow-hidden whitespace-nowrap text-ellipsis">{project.projectTitle}</h3>
                                        <p className=" text-gray-400 max-w-full text-base overflow-hidden whitespace-nowrap text-ellipsis">{project.description}</p>
                                        <p className="lg:mt-auto ">
                                            <button 
                                                className="pr-3 inline-flex items-center text-violet-300 mt-2 transition-colors duration-300 ease-in-out hover:text-violet-400"
                                                onClick={() => showSplitImages(project)}
                                            >
                                                <span>분할 Link</span>
                                            </button>
                                            <a 
                                                href={`${hostingURL}/${project.projectYear}/${project.fullImage}`}
                                                rel="noopener noreferrer" 
                                                className=" inline-flex items-center text-violet-300 mt-2 transition-colors duration-300 ease-in-out hover:text-violet-400"
                                            >
                                                <span>전체 Link</span>
                                            </a>
                                            <p className="text-gray-500 mt-2 min-h-[42px] bg-black rounded p-2 w-full hidden" title="프로젝트 메모">{project.projectMemo}</p>
                                        </p>
                                        <div className="xl:mt-4 md:hidden w-full flex mt-auto">
                                            <button 
                                                className="bg-zinc-700 text-white p-2 rounded w-full inline-flex justify-center md:w-[50%] 
                                                        transition-all duration-300 ease-in-out hover:bg-zinc-600"
                                                onClick={() => startEditProject(project)}
                                            >
                                                ✏️ 수정
                                            </button>
                                            <button
                                                className="bg-red-500 text-white p-2 rounded w-full inline-flex justify-center md:w-[50%] 
                                                        transition-all duration-300 ease-in-out hover:bg-red-600 ml-2"
                                                onClick={() => deleteProject(project.id)}
                                            >
                                                🗑 삭제
                                            </button>
                                        </div>
                                    </div>
                                    <div className="md:flex md:mt-4 hidden w-full flex mt-auto">
                                            <button 
                                                className="bg-zinc-700 text-white p-2 rounded w-full inline-flex justify-center md:w-[50%] 
                                                        transition-all duration-300 ease-in-out hover:bg-zinc-600"
                                                onClick={() => startEditProject(project)}
                                            >
                                                ✏️ 수정
                                            </button>
                                            <button
                                                className="bg-red-500 text-white p-2 rounded w-full inline-flex justify-center md:w-[50%] 
                                                        transition-all duration-300 ease-in-out hover:bg-red-600 ml-2"
                                                onClick={() => deleteProject(project.id)}
                                            >
                                                🗑 삭제
                                            </button>
                                        </div>

                                </div>

                            </div>
                             )
                        })}
                    </div>
                </section>

                {/* 분할이미지  */}
                {showSplitImagesModal && selectedProject && (
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex  justify-center items-center z-50">
                        <div className="p-6 rounded-md w-[80%] m-12 scroll bg-white">
                            <button
                                className="bg-zinc-800 text-white p-2 mt-4 w-full"
                                onClick={hideSplitImagesModal}
                            >
                                닫기
                            </button>
                            <div className="p-6 bg-white max-h-[80vh] overflow-y-auto">
                                <ul className="flex flex-col space-y-2 overflow-y-auto">
                                    {selectedProject.splitImages.map((img, index) => {
                                        const fullImageUrl = `${hostingURL}/${selectedProject.projectYear}/${img}`;
                                        return (
                                            <li key={index} className="text-sm break-words">
                                                <a href={fullImageUrl} rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                    {fullImageUrl}
                                                </a>
                                            </li>
                                        );
                                    })}
                                </ul>

                            </div>

                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
