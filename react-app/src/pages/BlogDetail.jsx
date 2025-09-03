// src/pages/BlogDetail.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const BACKEND_URL = 'YOUR_VERCEL_BACKEND_URL'; 

function BlogDetail() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/api/blogs/${id}`);
                if (!response.ok) {
                    throw new Error('Blog not found');
                }
                const data = await response.json();
                setBlog(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchBlog();
        }
    }, [id]);

    if (loading) {
        return <div className="text-center py-5">Loading...</div>;
    }

    if (error) {
        return <div className="text-center py-5 text-danger">{error}</div>;
    }

    if (!blog) {
        return <div className="text-center py-5">Blog not found.</div>;
    }

    return (
        <div className="container py-5">
            <article>
                <header className="mb-4">
                    <h1 className="fw-bolder mb-1">{blog.title}</h1>
                    <div className="text-muted fst-italic mb-2">Posted on {new Date(blog.createdAt).toLocaleDateString()}</div>
                </header>
                <figure className="mb-4">
                    <img className="img-fluid rounded" src={blog.image_url} alt={blog.title} />
                </figure>
                <section className="mb-5">
                    <p className="fs-5">{blog.content}</p>
                </section>
            </article>
        </div>
    );
}

export default BlogDetail;