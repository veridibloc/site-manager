import {UserProfile} from "@clerk/nextjs";

const UserProfilePage = () => (
        <UserProfile path="/user"
                     appearance={{
                         elements: {
                             rootBox: {
                                 width: "100%",
                                 paddingRight: "2rem"
                             }
                         }
                     }}
        />
);

export default UserProfilePage;
