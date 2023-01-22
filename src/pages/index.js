import Profile from "@/components/Profile";
import { useQuery } from "@apollo/client";
import { recommendProfiles } from "api"
import client from "apollo-client";
import { useEffect, useState } from "react";

export default function Home() {
  const [dataProfile, setDataProfile] = useState([])
  const {loading, error} = useQuery(recommendProfiles);

  const fetchProfiles = async () => {
    try{
      let response = await client.query({ query: recommendProfiles })

      let profileData = await Promise.all(response.data.recommendedProfiles.map(async profileInfo  => {
        let profile = {...profileInfo}
        let picture = profile.picture
        if (picture && picture.original && picture.original.url) {
          if (picture.original.url.startsWith('ipfs://')) {
            let result = picture.original.url.substring(7, picture.original.url.length)
            profile.avatarUrl = `http://lens.infura-ipfs.io/ipfs/${result}`
          } else {
            profile.avatarUrl = picture.original.url
          }
        }

        return profile
      }))
      setDataProfile(profileData)
      console.log(dataProfile)
    }catch(e){

    }
  }

  useEffect(() => {
    fetchProfiles();
  },[])
  return (
    <>
      <h3>Hello!</h3>
      {
        loading ? (
            <div>
              <h1>Loading...</h1>
            </div>
        ) : (
          dataProfile.map((profile, index) => {
            return (
              <Profile key={profile.id} profile={profile} displayFullProfile={false} />
            );
          })
        )
        
      }
    </>
  )
}
