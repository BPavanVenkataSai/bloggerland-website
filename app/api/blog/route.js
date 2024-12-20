import { connectDB } from "@/lib/config/db"
import BlogMode1 from "@/lib/models/BlogModels";
const { NextResponse } = require("next/server")
import {writeFile} from 'fs/promises'

const fs = require('fs')

const LoadDB = async () => {
    await connectDB();
}

LoadDB();


//API Endpoint to get all blogs
export async function GET(request) {

    const blogId = request.nextUrl.searchParams.get("id");
    if(blogId){
        const blog = await BlogMode1.findById(blogId);
        return NextResponse.json(blog);
    }else{
        const blogs = await BlogMode1.find({});
        return NextResponse.json({blogs});
    }
};


// API Endpoint for Uploading blogs
export async function POST(request) {

    const formData = await request.formData();
    const timestamp = Date.now();

    const image = formData.get('image')
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `./public/${timestamp}_${image.name}`;
    await writeFile(path, buffer);
    const imgUrl = `/${timestamp}_${image.name}`
    
    const blogData = {
        title: `${formData.get('title')}`,
        description: `${formData.get('description')}`,
        category: `${formData.get('category')}`,
        author: `${formData.get('author')}`,
        image: `${imgUrl}`,
        authorImg: `${formData.get('authorImg')}`
    }

    await BlogMode1.create(blogData);
    console.log("Blog Saved");
    return NextResponse.json({success:true, msg:"Blog Added"})
}

//Creating API Endpoint to delete Blog

export async function DELETE(request) {
    const id = await request.nextUrl.searchParams.get('id');
    const blog = await BlogMode1.findById(id);
    fs.unlink(`./public${blog.image}`, ()=>{});
    await BlogMode1.findByIdAndDelete(id);
    return NextResponse.json({msg:"Blog Deleted"});
}
