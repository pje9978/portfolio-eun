import { useLocation, useParams } from "react-router-dom";
import Gnb from "../components/gnb";
import '../styles/_macbook.scss';
import MacBook from "../components/subpage/macbook";
import Loading from "../components/loading";
import BackgroundBall from "../components/bgBall";

import { useEffect } from "react";

function SubPage(props) {
    let { id } = useParams();
    const location = useLocation();

    useEffect(() => {
      // 스크롤을 상단으로 이동시키는 함수 호출
      scrollToTop();
    }, [location]);
  
    const scrollToTop = () => {
      // 스크롤을 상단으로 이동시키는 함수 작성
      window.scrollTo(0, 0);
    };
    if (props.data.length === 0) {
        return <Loading />; // 데이터 로딩 중에는 로딩 메시지를 출력하도록 처리
    }
    const index = props.data.findIndex(item => item.id === id);


    return ( <>
        <Gnb/>
        <BackgroundBall />
        <main id="data-container" className="btn relative z-10 w-screen" >
            <div className="container mx-auto px-6">
                
                <section aria-label="intro" className="w-full relative pt-24">
                    <p className="text-xs tracking-widest flex flex-col mb-12 opacity-50 after:content-[''] after:w-[1px] after:mx-auto  after:h-[20px] after:bg-[--primary] after:mt-12">
                        <span className=" rounded px-1 leading-3">Web Design</span>
                        <span className=" rounded px-1 leading-3">Web Publishing</span>
                    </p>
                    {/* <Device device={props.data[index].device}/> */}
                    <h2 className="title text-5xl font-semibold mt-6 capitalize">{props.data[id].title}</h2>
                    <h3 className="flex flex-row gap-2 text-center flex-wrap justify-center items-center mt-4">
                        <span className="bg-black text-white/50 py-1 px-2">렌더링 및 사진 보정</span>
                        <span className="bg-black text-white/50 py-1 px-2">디자인 기획</span>
                        <span className="bg-black text-white/50 py-1 px-2">레이아웃 디자인</span>
                        <span className="bg-black text-white/50 py-1 px-2">상세페이지 디자인</span>
                    </h3>
                </section>
            
                <MacBook id={id} props={props} title={props.data[id].title} />
                {/* <Language language={props.data[id].language}/> */}
                <article className="text-gray-600 mt-24">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                        className="inline-block w-8 h-8 text-gray-400 mb-8" viewBox="0 0 975.036 975.036">
                        <path
                            d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z">
                        </path>
                    </svg>
                    <h3 className="title text-3xl font-semibold mt-2 capitalize text-gray-400">Overview</h3>
                    <h3 className="subTitle text-base mt-6 leading-relaxed w-2/3 mx-auto">{props.data[id].subtitle}</h3>
                   
                    {/* <Result result={props.data[id].result}/> */}
                    <span rol="line" aria-label="desc-line" className="inline-block h-1 w-10 rounded bg-white/50 my-12"></span>
                </article>
                {/* <Iphone url={props.data[id].url} title={props.data[id].title}/> */}
                <section className="my-12">
                    <header>
                        <h2 className="content__title grid text-center" data-splitting data-effect10>
                            <span className="md:text-[10vw] font-larger text-[15vw]  opacity-80 -mt-2">pages.</span>
                        </h2>
                    </header>            
                    <article className="flex justify-start gap-3 mx-auto flex-col max-w-[860px] items-start py-12  p-4">

                        <img src={`${process.env.PUBLIC_URL}/images/capture/gallery/dtl/${props.data[id].name}.jpg`} alt="" />
                        {/* <Page url={props.data[id].url} result={props.data[id].result} title={props.data[id].title}/> */}
                            
                    </article>
                    {/* <ul className="flex justify-center sm:w-[60vw] mx-auto flex-col  sm:flex-row flex-nowrap items-stretch py-12">
                            <li role="group" aria-label="page" className="flex flex-col w-1/2 md:self-start relative">
                            </li>
                    </ul> */}
                </section> 

               
               

                {/* {props.data[id].link.pdf ? (<a href={props.data[index].link.pdf} className="pdf block border text-xs border-white/50 text-white/80 hover:text-white/100 hover:border-white/100 px-3 py-3 mt-4 text-sm uppercase font-medium"> 기획서 보러가기 </a>) : null } */}
                
              
            </div>

        </main>
    </> );
}

export default SubPage;