import { useEffect } from "react";
import { Container, PostCard } from "../components";
import { useSelector, useDispatch } from "react-redux";
import postSerivce from "../appwrite/config"
import { addPosts, clearPosts } from "../store/postSlice";

function Home() {
    const authStatus = useSelector((state) => state.auth.status);
    const posts = useSelector((state) => state.post.posts);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            try {
                const postsResponse = await postSerivce.getPosts([]);
                if (postsResponse && postsResponse.documents) {
                    const postsWithImage = postsResponse.documents.map((post) => {
                        const imageURL = postSerivce.getFilePreview(post.featuredImage);
                        return { ...post, imageURL };
                    })

                    if (postsWithImage) dispatch(addPosts({ posts: postsWithImage }));
                }
                else {
                    dispatch(clearPosts());
                }
            } catch (error) {
                console.log("Error in fetching posts : " + error)
            }
        })();
    }, [authStatus]);


    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container >
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                {!authStatus && <>Login to read posts</>}
                                {authStatus && <>No Posts</>}
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        post.status == "active" &&
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home;