import {UserProfile} from "@clerk/nextjs";
import {PageLayout} from '@/ui/layout/pageLayout';

const UserProfilePage = () => (
    // <PageLayout>
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
    // </PageLayout>
);

export default UserProfilePage;
