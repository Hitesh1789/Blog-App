import {useSelector} from "react-redux";
import {PostCard,Container} from "../components/index"

function AllPosts(){
    const posts = useSelector((state)=>state.post.posts);

    return(
        <div className="w-full">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post)=>(
                        <div key={post.$id} className="w-1/4 p-2 ">
                            <PostCard {...post}/>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts;