import { Link } from "react-router-dom"

function PostCard({ $id, title, imageURL }) {
    
    return (
        <Link to={`/posts/${$id}`}>
            <div className="w-full bg-yellow-100 rounded-xl p-4 shadow-md">
                <div className="w-full flex flex-col items-center">
                    <img src={imageURL} alt={title}
                        className="w-full h-48 object-contain rounded-xl shadow-md transition-transform duration-300 hover:scale-105 bg-gray-100 bg-gray-100  " />

                    <h2 className="text-xl font-semibold text-gray-900 mt-3 text-center font-semibold line-clamp-1">{title}</h2>
                </div>
            </div>
        </Link>
    )

}

export default PostCard;