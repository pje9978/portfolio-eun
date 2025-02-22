import { Route, Routes } from "react-router-dom";
import './styles/style.scss'
import "./App.css";
import Home from "./routes/home";
import About from "./routes/about";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy } from 'firebase/firestore';
import {db} from './firebase.jsx';
import NotFound from './routes/notFound.jsx';
import "slick-carousel/slick/slick.css";
import  "slick-carousel/slick/slick-theme.css";
import SubPage from './routes/Subpage.jsx';
import SubPageRe from "./routes/SubpageRe.jsx";

function App() {
  const [data2017, setData2017] = useState([]);
  const [data2024, SetData2024] = useState([]);
  // const [realtime, setRealtime] = useState([]);

  useEffect(() => {
      const fetchData1 = async () => {
          // 파이어베이스 클라우드 데이터베이스
          const usersCollectionRef = collection(db, 'gallery'); // 참조

          const userSnap = await getDocs(usersCollectionRef, orderBy('title', 'desc')); // 데이터 스냅 받아오기 - 비동기처리
          const data = userSnap.docs.map(doc => ({
              ...doc.data(),
              id: doc.id
          }));
          setData2017(data);
          return data;
      }

      const fetchData2 = async () => {
        try {
            const collectionRef = collection(db, '02_Joongsan', 'detail', '2024');
            const querySnapshot = await getDocs(collectionRef);

            // 가져온 문서들을 배열로 변환하여 상태 업데이트
            const fetchedData = querySnapshot.docs.map(doc => ({
                id: doc.id, // 문서 ID
                ...doc.data() // 문서 데이터 (name 등)
            }));

            SetData2024(fetchedData); // 상태 업데이트
        } catch (error) {
            console.error("데이터를 가져오는 중 오류 발생:", error);
        }
    };

      // 파이어베이스 리얼타임 데이터베이스
      // const fetchData2 = async () => {

      //   try {
      //     const databaseRef = firebase.database().refFromURL("https://portfolio-eun-default-rtdb.asia-southeast1.firebasedatabase.app"); // YOUR_DATABASE_URL 수정
      //     const snapshot = await databaseRef.once("value");
      //     const data = snapshot.val();
      //     setRealtime(data);
      //   } catch (error) {
      //     console.log("Error getting data:", error);
      //   }
      // };
  
      fetchData1();
      fetchData2();
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/2017/:id/:index" element={<SubPage data={data2017} />} />
        <Route path="/2024/:id/:index" element={<SubPageRe data={data2024} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
