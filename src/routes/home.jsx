
import { useEffect, useState } from "react";
import BackgroundBall from "../components/bgBall";
import Gnb from "../components/gnb";
import Footer from "../layout/footer";
import Gallery from "../layout/gallery";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import Loading from "../components/loading";
import Skill from "../layout/skill";
import Dtl2024 from "../layout/dtl_2024";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function Home() {
    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(true);
    useEffect(() => {
       
        const fetchData = async () => {
            // ... try, catch 생략
            const q = query(collection(db, "database"), orderBy('data', 'desc') );
            getDocs(q).then((querySnapshot) => {
            let data = []; // 데이터를 저장할 배열
            querySnapshot.forEach((doc) => {
                let docData = doc.data(); // 저장된 데이터
                let docId = doc.id; // 고유 아이디
                data.push({
                ...docData,
                id: docId
                });
            });
            setData(data);
            setLoading(false);
            
            return data;
            });
        }
        
        fetchData();
       
    }, []);
    
   
    return ( 
        <>
            {loading ? (
                <Loading />
            ) : (
            <>
            <div>
                <BackgroundBall />
                <Gnb/>
   
                <main className="w-full flex flex-col z-10 relative">
                    <Dtl2024 />
                    <Gallery/>
                    <Skill />
                </main> 
                <Footer />
                </div>
            </>
            )}
            
        </> 
        );
}

export default Home;