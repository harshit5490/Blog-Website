import React,{useState,useEffect} from "react";
import appwriteservice from "../appwrite/config";
import { Container,PostCard } from "../components";
import { useSelector } from "react-redux";

function Home(){
    const [posts,setPosts]=useState([])
    const authstatus = useSelector(state => state.auth.status);

    useEffect(()=>{
        appwriteservice.getPosts([]).then((posts)=>{
            if(posts){
                setPosts(posts.documents)
            }
        })
    },[authstatus])
    if(!authstatus){
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="w-full p-2">
                            <h1 className="text-2xl font-bold hover:text-gray-500">Login to read Posts</h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    else{
        
        return (
            <div className="w-full py-8">
                <Container>
                    <div className="flex flex-wrap">
                        {posts.map((post)=>(
                            <div className="p-2 w-1/4" key={post.$id}>
                                <PostCard {...post} />
                                
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        )
    }
   
}
export default Home