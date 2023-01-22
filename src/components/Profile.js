import Link from "next/link";
export default function Profile(props) {
  const profile = props.profile;

  // When displayFullProfile is true, we show more info.
  const displayFullProfile = props.displayFullProfile;

  // Setting the picture of the profile correctly

  let profileInfo = {...profile}
  let picture = profile.picture
  if (picture && picture.original && picture.original.url) {
    if (picture.original.url.startsWith('ipfs://')) {
      let result = picture.original.url.substring(7, picture.original.url.length)
      profileInfo.avatarUrl = `http://lens.infura-ipfs.io/ipfs/${result}`
    } else {
        profileInfo.avatarUrl = picture.original.url
    }
  }

  
  return (
    <div className="p-8">
      <Link href={`/profile/${profileInfo.id}`}>
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="md:flex">
            <div className="md:shrink-0">
              {profileInfo.picture ? (
                <img
                  src={
                    profileInfo.avatarUrl || 'https://picsum.photos/200'
                  }
                  className="h-48 w-full object-cover md:h-full md:w-48"
                />
              ) : (
                <div
                  style={{
                    backgrondColor: "gray",
                  }}
                  className="h-48 w-full object-cover md:h-full md:w-48"
                />
              )}
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                {profileInfo.handle}
                {displayFullProfile &&
                  profileInfo.name &&
                  " (" + profile.name + ")"}
              </div>
              <div className="block mt-1 text-sm leading-tight font-medium text-black hover:underline">
                {profileInfo.bio}
              </div>
              <div className="mt-2 text-sm text-slate-900">{profileInfo.ownedBy}</div>
              <p className="mt-2 text-xs text-slate-500">
                following: {profileInfo.stats.totalFollowing} followers:{" "}
                {profileInfo.stats.totalFollowers}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}