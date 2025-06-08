import {  useParams } from "react-router-dom";
import Gnb from "../components/gnb";
import '../styles/_macbook.scss';
import Loading from "../components/loading";
import BackgroundBall from "../components/bgBall";
import MacBook_2025 from "../components/subpage/macbook_2025";

export default function AdminSubPage({ data }) {
  // Get 'id' from URL params
  let { id } = useParams();
  const hostingURL = process.env.REACT_APP_HOSTING_URL;

  // Find the specific project from the data using the 'id'
  const project = data.find((item) => item.id === id);

  // Check if project is found
  if (!project) {
    return <Loading />;
  }


  return (
    <div >
      <Gnb />
      {/* <BackgroundBall /> */}

      <main id="data-container" className="btn relative z-10 w-screen">
        <div className="container mx-auto sm:px-6 p-0">
          <section aria-label="intro" className="w-full relative pt-24">
            <p className="text-xs tracking-widest flex flex-col mb-12 opacity-50 after:content-[''] after:w-[1px] after:mx-auto after:h-[20px] after:bg-[--primary] after:mt-12">
              <span className="rounded px-1 leading-3">Web Design</span>
              <span className="rounded px-1 leading-3">Web Publishing</span>
            </p>
            <h2 className="title text-4xl sm:text-5xl font-semibold mt-6 capitalize">{project.projectTitle}</h2>
            <h3 className="w-[80%] mx-auto flex flex-row gap-2 text-center flex-wrap justify-center items-center mt-4 text-sm">
              <span className="bg-black text-white/50 py-1 px-2">사진 보정</span>
              <span className="bg-black text-white/50 py-1 px-2">디자인 기획</span>
              <span className="bg-black text-white/50 py-1 px-2">레이아웃 디자인</span>
              <span className="bg-black text-white/50 py-1 px-2">상세페이지 디자인</span>
            </h3>
          </section>

          <MacBook_2025 project={project} classNam="" />

          <article className="text-gray-600 mt-24">
            <h3 className="title text-3xl font-semibold mt-2 capitalize text-gray-400">Overview</h3>
            <h3 className="subTitle text-base mt-6 leading-relaxed w-2/3 mx-auto">{project.subtitle}</h3>
            <span rol="line" aria-label="desc-line" className="inline-block h-1 w-10 rounded bg-white/50 my-12"></span>
          </article>

          <section className="my-12">
            <header>
              <h2 className="content__title grid text-center" data-splitting data-effect10>
                <span className="md:text-[10vw] font-larger text-[15vw] opacity-80 -mt-2">pages.</span>
              </h2>
            </header>

            <article className="flex justify-start mx-auto flex-col max-w-[860px] items-start mt-6 m-0">
              <ul className="flex flex-col">
                {project.splitImages.map((img, index) => {
                  return (
                    <li key={index} className="text-sm break-words">
                      <img src={`${hostingURL}/${project.projectYear}/${img}`} alt={img} />
                    </li>
                  );
                })}
              </ul>
              
              {/* <p className="my-20 justify-center text-center w-full before:content-[''] before:w-[10px] befor:mx-auto before:block before:flex-col before:max-w-fit before:border-b">봐주셔서 감사합니다.</p> */}
            </article>
          </section>
        </div>
      </main>
    </div>
  );
}
