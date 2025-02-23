import React, { useEffect, useRef, useState } from "react";

function Skill() {
  return (
    <>
      <section
        id="skill"
        className="flex-col before:content-[''] before:absolute before:left-1/2 before:translate-x-1/2 before:w-[1px] before:h-[2rem] before:bg-white before:mt-8 py-12 w-80% 2xl:w-[30%] xl:w-[40%] lg:w-[50%] md:w-[60%] mx-auto"
      >
        <div className="container mx-auto flex flex-col justify-center px-6 py-24" data-splitting data-effect14>
          <h2 className="content__title grid text-center" data-splitting data-effect10>
            <span className="md:text-[10vw] font-larger text-[15vw] opacity-80 -mt-2">Skill.</span>
          </h2>
          <div className="md:flex-row w-full md:mx-auto flex flex-col flex-wrap relative gap-8 items-start justify-items-start">
            <div className="w-full flex flex-col shrink-0 h-full justify-center items-center">
              <span className="text-xs tracking-widest">Skill</span>
              <h1 className="text-center text-3xl text-textwhite font-semibold mt-2">
                My focused technologies:
                <br />
                <span className="text-textwhite opacity-50">current areas of proficiency</span>
              </h1>
            </div>

            <h2 className="content__title content__title--left grow w-full flex-1">
              {/* Tool */}
              <div className="before:content-['[Tool]'] before:block before:tracking-widest before:text-xs before:opacity-50 before:my-3">
                <SkillBar name="Figma" percent={80} />
                <SkillBar name="PhotoShop" percent={80} />
                <SkillBar name="Illustrator" percent={60} />
                <SkillBar name="After Effect" percent={60} />
                <SkillBar name="Notion" percent={80} />
                <SkillBar name="Slack" percent={40} />
              </div>
              {/* Language */}
              <div className="before:content-['[Language]'] before:block before:tracking-widest before:text-xs before:opacity-50 before:my-3">
                <SkillBar name="HTML" percent={80} />
                <SkillBar name="CSS" percent={80} />
                <SkillBar name="JavaScript" percent={50} />
              </div>

              {/* Framework */}
              <div className="before:content-['[Framework]'] before:block before:tracking-widest before:text-xs before:opacity-50 before:my-3">
                <SkillBar name="SCSS / TailwindCSS" percent={70} />
                <SkillBar name="React" percent={60} />
              </div>
            </h2>
          </div>
        </div>
      </section>
    </>
  );
}

function SkillBar({ name, percent }) {
  const [width, setWidth] = useState(50); // 초기값을 50%로 설정
  const skillBarRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setWidth(percent); // 스크롤 시 애니메이션 시작 (100%로 설정)
          } else {
            setWidth(50); // 요소가 화면에서 벗어나면 다시 50%로 초기화
          }
        });
      },
      {
        threshold: 0.5, // 50%가 화면에 보일 때 애니메이션 시작
        rootMargin: "0px 0px -50% 0px", // 요소가 뷰포트에 들어올 때 트리거
      }
    );

    // ref를 변수에 복사하여 사용하는 방식
    const currentSkillBarRef = skillBarRef.current;

    if (currentSkillBarRef) {
      observer.observe(currentSkillBarRef);
    }

    return () => {
      // cleanup에서는 복사된 변수 사용
      if (currentSkillBarRef) {
        observer.unobserve(currentSkillBarRef);
      }
    };
  }, [percent]);

  return (
    <div
      ref={skillBarRef}
      className="skillbar relative block w-full mb-[30px] before:bg-[--my-bg] before:content-[''] before:h-[3px] before:absolute before:w-full before:-z-1"
      data-percent={`${percent}%`}
    >
      <div className="flex w-full justify-between">
        <div className="skillbar-title text-textwhite flex mb-1">{name}</div>
        <div className="skill-bar-percent flex uppercase">{percent}%</div>
      </div>
      <div
        className="skillbar-bar h-[3px] bg-white"
        style={{
          width: `${width}%`,
          transition: "width 1.5s ease-out", // Smooth animation
        }}
      ></div>
    </div>
  );
}

export default Skill;
