import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import Gnb from "../components/gnb";
import { Link } from "react-router-dom";

export default function AdminPage({data}) {
    const hostingURL = process.env.REACT_APP_HOSTING_URL;
    const [projectMemo, setProjectMemo] = useState(""); // 새로운 state 추가

    const [projectName, setProjectName] = useState("");
    const [projectYearMonth, setProjectYearMonth] = useState("");
    const [description, setDescription] = useState("");
    const [thumbnailImage, setThumbnailImage] = useState("");
    const [fullImage, setFullImage] = useState("");
    const [splitImages, setSplitImages] = useState("");
    const [projects, setProjects] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingProjectId, setEditingProjectId] = useState("");
    const [selectedYear, setSelectedYear] = useState(""); 
    const [viewAll, setViewAll] = useState(true); 
    const [showSplitImagesModal, setShowSplitImagesModal] = useState(false); // State for showing split images modal
    const [selectedProject, setSelectedProject] = useState(null); // To store selected project for showing split images
    console.log(fullImage);
    const fetchProjects = async () => {
        const projectsCollectionRef = collection(db, "projects");
        const snapshot = await getDocs(projectsCollectionRef);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
      
        data.sort((a, b) => {
          const [yearA, monthA] = a.yearMonth.split(".").map(Number);
          const [yearB, monthB] = b.yearMonth.split(".").map(Number);
      
          if (yearA === yearB) {
            return monthB - monthA;
          }
          return yearB - yearA;
        });
      
        setProjects(data);
      };
      
      const convertURLs = async () => {
        if (!projectYearMonth || !projectName || !thumbnailImage) {
            alert("모든 필드를 채워주세요!");
            return;
        }
    
        const [year, month] = projectYearMonth.split(".");
        if (!year || !month) {
            alert("연도와 월을 올바르게 입력해주세요 (예: 2024.03)");
            return;
        }
    
        if (!hostingURL) {
            alert("호스팅 주소가 설정되지 않았습니다.");
            return;
        }
    
        try {
            const cleanedSplitImages = splitImages
                .split("\n")
                .map((img) => {
                    const cleanedImg = img.trim().replace(/^\.\/?/, ""); // 경로 앞의 ./를 제거하고 공백을 제거
                    return `${hostingURL}/${year}/${cleanedImg}`;
                });
    
            const projectData = {
                projectName,
                description,
                projectMemo: projectMemo || "",
                splitImages: cleanedSplitImages,
                year,
                month,
                yearMonth: `${year}.${month}`,
                hostingURL,  // 여기서 hostingURL도 포함하여 저장
            };
    
            if (isEditing) {
                // 수정 시에도 새로운 호스팅 주소 반영
                await updateDoc(doc(db, "projects", editingProjectId), projectData);
                alert("프로젝트가 수정되었습니다!");
            } else {
                // 새로운 항목 등록 시에도 호스팅 주소 반영
                const convertedThumbnail = `${hostingURL}/${year}/Detail/${projectName}/thumb/thumb.jpg`;
                const convertedFullImage = `${hostingURL}/${year}/Detail/${projectName}/${projectName}.jpg`;
    
                await addDoc(collection(db, "projects"), {
                    ...projectData,
                    thumbnailImage: convertedThumbnail,
                    fullImage: convertedFullImage,
                });
                alert("프로젝트가 등록되었습니다!");
            }
    
            // 입력값 초기화
            setProjectName("");
            setDescription("");
            setProjectMemo("");
            setThumbnailImage("");
            setFullImage("");
            setSplitImages("");
            setProjectYearMonth("");
            setShowModal(false);
            setIsEditing(false);
            fetchProjects();
        } catch (e) {
            console.error("Error adding document: ", e);
            alert("프로젝트 등록/수정 중 오류가 발생했습니다.");
        }
    };
    
    
      
    useEffect(() => {
      fetchProjects();
    }, []);
  
    const deleteProject = async (id) => {
        const isConfirmed = window.confirm("정말로 이 프로젝트를 삭제하시겠습니까?");
        if (!isConfirmed) return;
    
        try {
            await deleteDoc(doc(db, "projects", id));
            fetchProjects();
        } catch (error) {
            console.error("Error deleting project: ", error);
        }
    };
    
  
    const handleProjectNameChange = (e) => {
      const name = e.target.value;
      setProjectName(name);
  
      const year = projectYearMonth.split(".")[0];
      const thumbnail = `${hostingURL}/${year}/Detail/${name}/thumb/${name}_thumb.jpg`;
      const full = `${hostingURL}/${year}/Detail/${name}/${name}.jpg`;

      setThumbnailImage(thumbnail);
      setFullImage(full);
    };

    const startEditProject = (project) => {
        setProjectName(project.projectName);
        setProjectYearMonth(project.yearMonth);
        setDescription(project.description);
        setThumbnailImage(project.thumbnailImage);
        setFullImage(project.fullImage);
        setSplitImages(project.splitImages.join("\n"));
        setEditingProjectId(project.id);
        setIsEditing(true); // Ensure we set this to true for editing
        setShowModal(true);  // Show modal for editing
      };
      

    // Show modal for split images
    const showSplitImages = (project) => {
      setSelectedProject(project);
      setShowSplitImagesModal(true);
    };

    const hideSplitImagesModal = () => {
      setShowSplitImagesModal(false);
    };

    const filterByYear = (year) => {
      setSelectedYear(year);
      setViewAll(false); 
    };

    const showAllProjects = () => {
      setSelectedYear("");
      setViewAll(true); 
    };

    const filteredProjects = viewAll
      ? projects
      : selectedYear
      ? projects.filter((project) => project.year === selectedYear)
      : projects;

    const years = Array.from(new Set(projects.map((project) => project.year)));

    return (
        <div className="">
        <Gnb />
        <main className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">관리자 페이지</h1>
    
            <div className="mb-4 flex justify-between">
                {/* 연도탭 */}
                <ul className="inline-flex space-x-4 border-b">
                    <li>
                        <button
                            className={`px-4 py-2 ${viewAll ? "font-bold opacity-100 border-b-2" : "opacity-60"}`}
                            onClick={showAllProjects}
                        >
                            전체보기
                        </button>
                    </li>
                    {years.map((year) => (
                        <li key={year}>
                            <button
                                className={`px-4 py-2 ${selectedYear === year ? "font-bold opacity-100 border-b-2" : "opacity-60"}`}
                                onClick={() => filterByYear(year)}
                            >
                                {year}
                            </button>
                        </li>
                    ))}
                </ul>
                {/* 글등록 버튼 */}
                <button
                className="bg-[#7c55c0] inline-flex w-auto h-full text-white p-2 px-4"
                onClick={() => setShowModal(true)}
                >
                글 등록
                </button>
            </div>

            {/* 모달탭 */}

            {showModal && (
            <div className="fixed inset-0 text-zinc-700 bg-zinc-900 bg-opacity-50 flex justify-center items-center z-50 ">
                <div className="bg-white p-6 rounded-md mx-4 w-full md:w-[70%] lg:w-[50%]">
                <h2 className="text-lg font-semibold mb-4">{isEditing ? "프로젝트 수정" : "프로젝트 등록"}</h2>
                <div className="mb-4 text-left ">
                    <label htmlFor="projectName" className="block opacity-30 text-sm font-medium text-gray-700">프로젝트 이름</label>
                    <input
                        id="projectName"
                        type="text"
                        className="mt-1 p-2 border border-gray-300 w-full"
                        placeholder="프로젝트 이름"
                        value={projectName}
                        onChange={handleProjectNameChange}
                    />
                </div>

                <div className="mb-4 text-left ">
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

                <div className="mb-4 text-left ">
                    <label htmlFor="description" className="block opacity-30 text-sm font-medium text-gray-700">프로젝트 설명</label>
                    <textarea
                        id="description"
                        className="mt-1 p-2 border border-gray-300 w-full"
                        placeholder="프로젝트 설명"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="mb-4 text-left ">
                    <label htmlFor="thumbnailImage" className="block opacity-30 text-sm font-medium text-gray-700">썸네일 이미지 경로 (자동으로 채워집니다)</label>
                    <input
                        id="thumbnailImage"
                        type="text"
                        className="mt-1 p-2 border border-gray-300 w-full"
                        placeholder="썸네일 이미지 경로 (자동으로 채워집니다)"
                        value={thumbnailImage}
                        
                    />
                </div>

                <div className="mb-4 text-left ">
                    <label htmlFor="fullImage" className="block opacity-30 text-sm font-medium text-gray-700">프로젝트 이미지 (통) 경로 (자동으로 채워집니다)</label>
                    <input
                        id="fullImage"
                        type="text"
                        className="mt-1 p-2 border border-gray-300 w-full"
                        placeholder="프로젝트 이미지 (통) 경로 (자동으로 채워집니다)"
                        value={fullImage}
                        
                    />
                </div>

                <div className="mb-4 text-left ">
                    <label htmlFor="splitImages" className="block opacity-30 text-sm font-medium text-gray-700">프로젝트 이미지 (분할) 경로 (줄바꿈으로 여러 이미지 입력)</label>
                    <textarea
                        id="splitImages"
                        className="mt-1 p-2 h-[200px] border border-gray-300 w-full"
                        placeholder="프로젝트 이미지 (분할) 경로 (줄바꿈으로 여러 이미지 입력)"
                        value={splitImages}
                        onChange={(e) => setSplitImages(e.target.value)}
                    />
                </div>

                <div className="mb-4 text-left ">
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
                    className="bg-blue-500 text-white p-2 mb-2 w-full"
                    onClick={convertURLs}
                >
                    {isEditing ? "수정" : "등록"}
                </button>
                <button
                    className="bg-gray-500 text-white p-2 w-full"
                    onClick={() => {
                        // 수정 모드를 종료하고, 입력된 값을 초기화
                        setShowModal(false);
                        setProjectName("");
                        setProjectYearMonth("");
                        setDescription("");
                        setThumbnailImage("");
                        setFullImage("");
                        setSplitImages("");
                        setProjectMemo("");
                        setIsEditing(false); // 수정 모드 종료
                    }}
                >
                닫기
            </button>

                </div>
            </div>
            )}

 

            {/* 프로젝트 불러오기 */}
            <section className="bg-zinc-800 p-6">
                <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3">
                    {filteredProjects.map((project) => (
                    <div
                        key={project.id} 
                        className="cursor-pointer group   p-4 flex flex-wrap bg-zinc-900  
                                transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
                    >
                 
                        {/* 썸네일 */}
                        <p className="w-[150px] h-[150px]">
                        <Link  to={`/${project.id}`}   href={project.thumbnailImage} rel="noopener noreferrer">
                            <img src={project.thumbnailImage} alt="썸네일" className="w-[150px] h-[150px] object-cover rounded-md" />
                        </Link>
                        </p>

                        {/* 텍스트 컨텐츠 */}
                        <div className="flex flex-col items-start ml-3">
                        <h3 className="text-xl font-semibold text-white">{project.projectName}</h3>
                        <p className="text-gray-400">{project.description}</p>
                        <p><strong className="hidden">프로젝트 이미지 (분할):</strong>
                            <button 
                                className="inline-flex items-center text-violet-300 mt-2 transition-colors duration-300 ease-in-out hover:text-violet-400"
                                onClick={() => showSplitImages(project)}
                            >
                                <span>분할 이미지 경로</span>
                                
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 ml-1">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                            </svg>
                            </button>
                        </p>
                        {/* 전체 이미지 보기 */}
                        <a 
                            href={project.fullImage}  
                            rel="noopener noreferrer" 
                            className="inline-flex items-center text-violet-300 mt-2 transition-colors duration-300 ease-in-out hover:text-violet-400"
                        >
                            <span>전체 이미지 보기</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 ml-1">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                            </svg>
                        </a>
                        

                        {/* 프로젝트 메모 */}
                        <p className="text-gray-500 mt-2"><strong>프로젝트 메모:</strong> {project.projectMemo}</p>
                        </div>

                        {/* 버튼 영역 */}
                        <div className="flex w-full md:w-auto md:w-full mt-4">
                        <button 
                            className="bg-zinc-700 text-white p-2 rounded-md w-full inline-flex justify-center md:w-[50%] 
                                    transition-all duration-300 ease-in-out hover:bg-zinc-600"
                            onClick={() => startEditProject(project)}
                        >
                            ✏️ 수정
                        </button>
                        <button
                            className="bg-red-500 text-white p-2 rounded-md w-full inline-flex justify-center md:w-[50%] 
                                    transition-all duration-300 ease-in-out hover:bg-red-600 ml-2"
                            onClick={() => deleteProject(project.id)}
                        >
                            🗑 삭제
                        </button>
                        </div>
                    </div>
                    ))}
                </div>
                </section>

            {/* 분할경로 모달 */}
            {showSplitImagesModal && selectedProject && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="p-6 rounded-md w-full m-4 max-w-lg bg-white">
                    <button
                                className="bg-zinc-800 text-white p-2 mt-4 w-full"
                                onClick={hideSplitImagesModal}
                            >
                                닫기
                            </button>
                        <div className="p-6 bg-white max-h-[80vh] overflow-y-auto">
                            <h2 className="text-lg font-semibold mb-4 text-zinc-600">프로젝트 이미지 (분할) 경로</h2>
                            <ul className="flex flex-col space-y-2">
                                {selectedProject.splitImages.map((img, index) => (
                                    <li key={index} className="text-sm break-words">
                                        <a href={img} rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                            {img}
                                        </a>
                                    </li>
                                ))}
                            </ul>

                        </div>
                    </div>
                </div>
            )}


        </main>
      </div>
    );
}
