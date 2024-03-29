import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { Typography, CircularProgress, Grid, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import Post from '../Posts/Post/Post';
import Form from '../Form/Form';
import { getPostsByCreator, getPostBySearch } from '../../actions/posts';



const CreatorOrTag = () => {
    const { name } = useParams();
    const dispatch = useDispatch();
    const { posts, isLoading } = useSelector((state) => state.posts);

    const [currentId, setCurrentId] = useState(0);

    const location = useLocation();

    const typeIsTag = location.pathname.startsWith('/tags');

    useEffect(() => {
        if (typeIsTag) {
            dispatch(getPostBySearch({ tags: name }));
        } else {
            dispatch(getPostsByCreator(name));
        }
    }, []);

    const DisplayTagName = () => {
        return (
            <Typography variant="h2" style={{ color: 'white' }}>{name}</Typography>
        );
    };

    const DisplayCreatorName = () => {
        var displayName = name;
        if (posts) { displayName = posts[0]?.name; }
        return (
            <Link to={`/user/profile/${name}`}>
                <Typography variant="h2" style={{ color: 'white' }}>{displayName}</Typography>
            </Link>
        );
    };

    //if (!posts.length && !isLoading) return 'No posts';

    return (
        <div>
            {typeIsTag ? <DisplayTagName /> : <DisplayCreatorName />}
            <Divider style={{ margin: '20px 0 50px 0' }} />
            {isLoading ? <CircularProgress /> : (
                <Grid container alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={12} md={6} lg={8} container alignItems="stretch" spacing={3}>
                        {posts?.map((post) => (
                            <Grid key={post._id} item xs={12} sm={12} md={6} lg={6}>
                                <Post post={post} setCurrentId={setCurrentId} />
                            </Grid>
                        ))}
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                    </Grid>
                </Grid>
            )}
        </div>
    );
};

export default CreatorOrTag;