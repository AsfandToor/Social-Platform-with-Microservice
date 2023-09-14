"use client";
import React, { useEffect, useState } from "react";

import apolloClient from "@/app/graphql/client";
import { useLazyQuery } from "@apollo/client";
import { GET_POSTS } from "@/app/graphql/query/post";

import { useAtom } from "jotai";
import { Seen } from "../atoms/atoms";
import { showComments } from "../atoms/atoms";

import InfiniteScroll from "react-infinite-scroll-component";
import SideNav from "./components/sideNav";
import Postcard from "./components/postcard";
import CreatePost from "./components/createPost";
import BottomNav from "./components/bottomNav";
import Skeleton from "./components/skeleton";

import { PagiantedPosts, Post } from "@/app/types/post";


const LIMIT = "5"

const Page = () => {


  //* To show create post
  const [seen, setSeen] = useAtom(Seen);
  const [posts, setPosts] = useState<PagiantedPosts>({
    docs: [],
    limit: 0,
    page: 0,
    totalDocs: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [loadPosts, { data, called, loading, error }] = useLazyQuery(
    GET_POSTS,
    {
      client: apolloClient,
      initialFetchPolicy: "network-only",
      fetchPolicy: "network-only",
    }
  );

  useEffect(() => {
    loadPosts({
      variables: {
        limit: LIMIT,
        page: "1",
      },
      onCompleted: (data) => {
        setPosts(data.getPosts);
      }
    });
  }, []);

  return (
    <div className="flex w-full ">
      <div className="hidden xl:block">
        <SideNav />
      </div>
      <BottomNav />
      


      <div className="w-[100%] xl:w-[85%]  ">
        {seen ? <CreatePost></CreatePost> : null}
        {!called || loading ? (
          <div className="flex flex-col gap-y-20 items-center mt-11 md:ml-[14.5%] z-10">
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        ) : (
          <InfiniteScroll
            className="flex flex-col items-center mt-11 mx-2 md:ml-[14.5%]"
            dataLength={posts!.docs.length}
            next={async () => {
              const response = await loadPosts({
                variables: {
                  limit: LIMIT,
                  page: ((posts?.page || 0) + 1).toString(),
                },
              });
              const newPosts = response.data.getPosts as PagiantedPosts;
              setPosts({
                docs: [...posts!.docs, ...newPosts.docs],
                limit: newPosts.limit,
                page: newPosts.page,
                totalDocs: newPosts.totalDocs,
                totalPages: newPosts.totalPages,
                hasNextPage: newPosts.hasNextPage,
                hasPrevPage: newPosts.hasPrevPage,
              });
            }}
            hasMore={posts?.hasNextPage || false}
            loader={<div>Loading</div>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {posts?.docs.map((post: Post) => (
              <Postcard
                key={post._id}
                id={post._id}
                user={"User"}
                img={post.images?.[0]?.url || "https://picsum.photos/470/350"}
                caption={post.caption}
                likes={12}
                comments={post.comments}
              />
            ))}
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};
export default Page;
