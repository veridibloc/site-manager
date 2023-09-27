import {UserProfile} from "@clerk/nextjs";

const UserProfilePage = () => (
    <UserProfile path="/user" routing="path" appearance={{
        elements: {
            rootBox: {
                width: "100%",
                paddingRight: "2rem"
            }
        }
    }}/>
);

export default UserProfilePage;
