// pages/profile/[id].js

import { useQuery } from "@apollo/client";
import { fetchProfileQuery } from "api.js";
import { useRouter } from "next/router";


import Profile from "../../components/Profile.js";

export default function ProfilePage() {
  const router = useRouter();
  const { id } = router.query;

  console.log("fetching profile for", id);
  const { loading, error, data } = useQuery(fetchProfileQuery, {
    variables: { request: { profileId: id } },
  });

  if (loading) return "Loading..";
  if (error) return `Error! ${error.message}`;

  console.log("on profile page data: ", data);

  return <Profile profile={data.profile} displayFullProfile={true}/>
}