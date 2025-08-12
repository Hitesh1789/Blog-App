import {useEffect,useState} from "react";
import parse from "html-react-parser";
import {Button,Container} from "../components"
import {Link,useNavigate, useParams} from "react-router-dom"
import {useSelector,useDispatch} from "react-redux";
import appwriteService from "../appwrite/config";
import {deletePost as delPost } from "../store/postSlice";


function Post(){
    const userData = useSelector((state)=>state.auth.userData);
    const {slug} = useParams();
    const posts  = useSelector((state)=>state.post.posts);
    const [post,setPost] = useState(null);

    const navigate = useNavigate();
    const isAuthor = post && userData ? (post.userId===userData.$id) : false;
    const dispatch = useDispatch();
    
    useEffect(()=>{
        if(slug){
            const foundPost = posts.find((post) => post.$id === slug);
            if(foundPost) setPost(foundPost);
            else navigate('/');
        }
        else navigate('/');
    },[slug,posts,navigate]);
    
    const deletePost = ()=>{
        appwriteService.deletePost(slug).then((status)=>{ //slug(post.$id)
            if(status){
                dispatch(delPost({$id : slug}))
                appwriteService.deleteFile(post.featuredImage);
                navigate('/');
            }
        })
    }

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex flex-col items-center justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src = {post.imageURL}
                        alt = {post.title}
                        className=" rounded-xl"/>
                    {isAuthor && 
                        <div className="m-2">
                        <Link to={`/edit-post/${slug}`}>
                            <Button bgColor="bg-green-500" classname="mr-2">
                                Edit
                            </Button>
                        </Link>
                        <Button bgColor="bg-red-500" onClick = {deletePost} >
                            Delete
                        </Button>
                        </div>
                    }
                </div>
                
                <div>
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null
}

export default Post;
