import React, { useState } from "react";
import '/Users/eun/Data/portfolio-design/src/App.css'; // 애니메이션 효과를 위한 CSS
import { FaRandom } from "react-icons/fa";

const ImageGallery = () => {
  const [visibleImages, setVisibleImages] = useState(6);
  const [images, setImages] = useState([
    "https://picsum.photos/id/1/100/100",
    "https://picsum.photos/id/2/100/100",
    "https://picsum.photos/id/3/100/100",
    "https://picsum.photos/id/4/100/100",
    "https://picsum.photos/id/5/100/100",
    "https://picsum.photos/id/6/100/100",
    "https://picsum.photos/id/7/100/100",
    "https://picsum.photos/id/8/100/100",
    "https://picsum.photos/id/9/100/100",
    "https://picsum.photos/id/10/100/100",
    "https://picsum.photos/id/11/100/100",
    "https://picsum.photos/id/12/100/100",
    "https://picsum.photos/id/13/100/100",
    "https://picsum.photos/id/14/100/100",
    "https://picsum.photos/id/15/100/100",
    "https://picsum.photos/id/16/100/100",
    "https://picsum.photos/id/17/100/100",
    "https://picsum.photos/id/18/100/100",
    "https://picsum.photos/id/19/100/100",
  ]);

  // 배열을 랜덤하게 섞는 함수
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // 요소를 스왑
    }
    return shuffled;
  };

  // 랜덤 버튼 클릭 시 이미지 순서 변경
  const shuffleImages = () => {
    setImages(shuffleArray(images)); // 랜덤 순서로 이미지 상태 업데이트
  };

  // 더보기 버튼 클릭 시 이미지 추가
  const loadMoreImages = () => {
    setVisibleImages((prev) => prev + 3);
  };

  return (
    <div className="flex flex-col w-full">
      {/* 이미지 리스트 */}
      <section className="flex flex-col p-8">
        <title className="text-center text-3xl font-semibold mt-2 block w-full whitespace-pre-wrap opacity-100">
          Banner
        </title>

        <div className="flex p-8 justify-end">
          <FaRandom
            className="cursor-pointer block text-2xl"
            onClick={shuffleImages}
          />
        </div>

        {/* 반응형 그리드 */}
        <div className="image-gallery grid grid-cols-3 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {images.slice(0, visibleImages).map((image, index) => (
            <div
              key={index}
              className="image-container relative overflow-hidden group transform transition-all duration-300"
            >
              {/* 1:1 비율 설정 */}
              <div className="aspect-w-1 aspect-h-1">
                <img
                  src={image}
                  alt="dfsdf"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>
          ))}
        </div>

        <section className="flex flex-col w-full">
          {/* 더보기 버튼 */}
          {visibleImages < images.length && (
            <button
              className="hover:opacity-100 border load-more-btn py-2 px-4 text-white opacity-20 font-semibold mt-4 transition-colors duration-300"
              onClick={loadMoreImages}
            >
              더보기
            </button>
          )}
        </section>
      </section>
    </div>
  );
};

export default ImageGallery;
