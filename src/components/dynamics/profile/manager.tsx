"use client";

import {
  activeTabStore,
  initialBandDeleteStore,
  initialSessionDeleteStore,
} from "@/store";
import DeleteConfirm from "./sessionPostDeleteConfirm";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import app from "../../../../shared/firebase.config";
import SessionPostItem from "../session/sessionPostItem";
import BandPostItem from "../band/bandPostItem";
import Categories from "../catagories";

import PlainProfile from "@/components/statics/plainProfile";
import SessionPostDeleteConfirm from "./sessionPostDeleteConfirm";
import BandPostDeleteConfirm from "./bandPostDeleteConfirm";

const Manager = () => {
  const { data: session } = useSession();
  const [userSessionPost, setUserSessionPost] = useState([]);
  const [userBandPost, setUserBandPost] = useState([]);
  const db = getFirestore(app);

  useEffect(() => {
    getUserSessionPost(), getUserBandPost();
  }, [session]);

  const getUserSessionPost = async () => {
    if (session?.user.email) {
      const q = query(
        collection(db, "posts"),
        where("userEmail", "==", session?.user?.email)
      );
      const posts = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        data.id = doc.id;
        posts.push(data);
      });
      setUserSessionPost(posts);
    }
  };

  const getUserBandPost = async () => {
    if (session?.user.email) {
      const q = query(
        collection(db, "bands"),
        where("userEmail", "==", session?.user?.email)
      );
      const posts = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        data.id = doc.id;
        posts.push(data);
      });
      setUserBandPost(posts);
    }
  };

  const { initialSessionDelete } = initialSessionDeleteStore((state) => ({
    initialSessionDelete: state.initialSessionDelete,
  }));

  const { initialBandDelete } = initialBandDeleteStore((state) => ({
    initialBandDelete: state.initialBandDelete,
  }));

  const { activeTab } = activeTabStore((state) => ({
    activeTab: state.activeTab,
  }));

  return (
    <div className="flex flex-col justify-center items-center mb-2">
      <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 font-semibold font-gugi animate-slideInLeft">
        Manage Your Posts
      </p>
      <Categories />
      {initialSessionDelete && <SessionPostDeleteConfirm />}
      {initialBandDelete && <BandPostDeleteConfirm />}
      <div className="">
        {activeTab === "sessions" && (
          <>
            {userSessionPost.length === 0 ? (
              <PlainProfile />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-8">
                {" "}
                {userSessionPost.map((item, index) => (
                  <div key={index} className="animate-myPulse">
                    <SessionPostItem post={item} modal={true} manage={true} />
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === "band" && (
          <>
            {userBandPost.length === 0 ? (
              <PlainProfile />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-8">
                {" "}
                {userBandPost.map((item, index) => (
                  <div key={index} className="animate-myPulse">
                    <BandPostItem post={item} modal={true} manage={true} />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Manager;
