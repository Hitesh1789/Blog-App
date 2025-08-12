import {useState,useEffect} from "react";
import {PostForm,Container} from "../components";
import { useParams,useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";

function EditPost(){
    const posts  = useSelector((state)=>state.post.posts);
    const [post,setPost] = useState(null);
    const {slug} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        if(slug){
            const foundPost = posts.find((post) => post.$id === slug);
            if(foundPost) setPost(foundPost);
            else navigate('/');
        }
        else{
            navigate('/');
        }
    },[slug,navigate,posts])


    return( post ? (
        <div>
            <Container>
                <PostForm post={post}/>
            </Container>
        </div>
        ) : null
    )
}

export default EditPost;