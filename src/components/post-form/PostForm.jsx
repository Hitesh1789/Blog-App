import {useCallback ,useEffect} from "react";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {Button, Input,RTE,Select} from "../index"
import {useSelector,useDispatch} from "react-redux"
import appwriteService from "../../appwrite/config";
import { updatePost,addPost} from "../../store/postSlice";

export default function PostForm({post}){
    const navigate = useNavigate();
    const {register,handleSubmit,setValue,watch,control,getValues,formState:{errors}}  = useForm({
        defaultValues : {
            title : post?.title || '',
            slug  : post?.$id || '',
            content : post?.content || '',
            status : post?.status || 'active'
        }
    });

    const userData = useSelector((state)=> state.auth.userData);
    const dispatch = useDispatch();

    const submit = async (data)=>{
        //console.log(data)
        if(post){
            const file =  data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if(file){
                appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id,{
                ...data,
                featuredImage : file ? file.$id : undefined
            })

            const imageURL = appwriteService.getFilePreview(dbPost.featuredImage);

            if(dbPost){
                dispatch(updatePost({updatedPost : {...dbPost,imageURL},$id : dbPost.$id}))
                navigate(`/posts/${dbPost.$id}`)
            } 
        }
        else{
            const file =  await appwriteService.uploadFile(data.image[0]);

            if(file){
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({...data , userId : userData.$id})
                const imageURL = appwriteService.getFilePreview(dbPost.featuredImage);
                if(dbPost){
                    dispatch(addPost({...dbPost,imageURL}))
                    navigate(`/posts/${dbPost.$id}`)
                }
            }
        }
    }

    const slugTransform = useCallback((value)=>{
        if(post) return post.$id;

        if(value && typeof value ==='string')
            return value.trim().toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g,'-')
                .replace(/\s/g,'-')
                .substring(0,36)
                
        return '';
    },[]);

    useEffect(()=>{
        const subscription = watch((value,{name})=>{
            if(name==='title'){
                setValue('slug',slugTransform(value.title,{shouldValidate : true}))
            }
        })
        
        return ()=>{
            subscription.unsubscribe();
        }

    },[watch,slugTransform,setValue])

    return(
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                label="Title : "
                placeholder= "Title"
                className="mb-4"
                {...register("title",{required : "Please Enter a title"})}
                />
                {errors.title && <div className="text-red-600 mb-4">{errors.title.message}</div>}
                <Input
                label="Slug : "
                placeholder= "Slug"
                className="mb-4"
                {...register("slug",{required : true})}
                onInput = {(e)=>{
                    setValue("slug",slugTransform(e.currentTarget.value),{shouldValidate:true})
                }}
                />
                <RTE name="content" label="Content : " control={control} defaultValue = {getValues("content")}/> 
            </div>

            <div className="w-1/3 px-2">
                <Input
                label = "Featured Image : "
                type = "file"
                className = "mb-4"
                accept = "image/png, image/jpg, image/jpeg, image/gif"
                {...register("image",{
                    required: !post ? "Please Upload a image" : false
                })}
                />
                {errors.image && <div className="text-red-600 mb-4">{errors.image.message}</div>}
                
                {post && 
                (<div className="w-full mb-4 ">
                    <img
                    src = {post.imageURL}
                    alt = {post.title}
                    className="rounded-lg"
                    />
                </div>)
                }
                <Select
                label = "Status : "
                options = {["active", "inactive"]}
                className ="mb-4"
                {...register("status",{required:true})}
                />
                <Button type="submit" bgColor={post?"bg-green-500" : undefined} classname= "w-full"
                >{post ? "Update" : "Submit"}</Button>
            </div>
        </form>
    )
}