import { BannerStatus, ImageStatus, LikeType, PostType, ReportType, Sex } from "@prisma/client";

export interface PostProps {
    id: number;
    description?: string;
    views?: BigInt;
    shared?: BigInt;
    userId: number; 

    user: UserProps;
    tags?: PostTagProps[];
    likes?: LikeProps[];
    comments?: CommentProps[];
    userSavedPosts?: SavedPostProps[];
    postTypeChoice: PostTypeChoiceProps[];
}
interface PostTagProps {
    id: number;
    postId: number;
    post: PostProps;
    tagSlug: string;
    tag: TagProps
}
interface UserProps {
    id: number;
    email: string;
    firstName?: string;
    lastName?: string;
    webpage?: string;
    avatar?: string;
    birth?: Date;
    sex?: Sex;
    // subscriptions: SubscriptionProps[];
    salons?: SalonProps[];
    profile_image?: ProfileImageProps[];
    banner_image?: BannerImageProps[];

    i_follow?: FollowProps[];
    they_follow?: FollowProps[];
    roles?: RoleUserProps[]; // Pas sûr car c'est une pivot
    posts?: PostProps[];
    savedPost?: SavedPostProps[];
    userComments?: CommentProps[];
    userLikes?: LikeProps[];
    userReports?: ReportProps[];
    messages_emitted?: InstantMessageProps[];
    messages_received?: InstantMessageProps[];

}
interface RoleUserProps {
    userId: number;
    roleSlug: string;
    user: UserProps;
    role: RoleProps;
    assignedAt: Date;
    assignedBy?: string;
}
interface InstantMessageProps {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    userEmitter: UserProps;
    emitterId: number;
    userReceiver: UserProps;
    receiverId: number;
    contents: MessageContentProps[];
}

interface MessageContentProps {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    instantMessage: InstantMessageProps;
    instantMessageId: number;
    textContent?: TextContentProps[];
    emojiContent?: EmojiContentProps[];
}
interface EmojiContentProps {
    emoji: EmojiProps;
    emojiId: number;
    messageContent: MessageContentProps;
    messageContentId: number;
}
interface TextContentProps {
    id: number;
    text: string;
    messageContent: MessageContentProps;
    messageContentId: number;
}
interface EmojiProps {
    id: number;
    name: string;
    slug: string;
    emojiContent: EmojiContentProps[];
}

interface ReportProps {
    id: number;
    content: string;
    reportType: ReportType;
    reportItemId: number;
    userReporting: UserProps;
    userId: number;
}

interface LikeProps {
    id: number;
    likeType: LikeType;
    likedItemId: number;
    userLiking: UserProps;
    userId: number;
    createdAt: Date;
    post?: PostProps;
}

interface CommentProps {
    id: number;
    description?: string;
    postId: number;
    post: PostProps;
    userId: number;
    user: UserProps;
}

interface SavedPostProps {
    id: number;
    userId: number;
    user: UserProps;
    postId: number;
    post: PostProps;
}

interface RoleProps {
    id: number;
    name: string;
    slug: string;
    // authorizations: AuthorizationRoleProps[];
    users: UserProps[];
}
interface FollowProps {
    id: number;
    followerId: number;
    follower: UserProps;
    followedId: number;
    followed: UserProps;
    createdAt: Date;
    updatedAt: Date;
}
interface ImageUserProps {
    id: number;
    url: string;
    name?: string;
    userId: number;
    user: UserProps;
}

interface BannerImageProps extends ImageUserProps { 
    status: BannerStatus;
}

interface ProfileImageProps extends ImageUserProps{
    status: ImageStatus;
}

interface SalonProps {
    id: number;
    name: string;
    logo?: string;
    street: string;
    zipcode: string;
    country: string;
    userId: number;
    user: UserProps[];
}


interface TagProps {
    id: number;
    name: string;
    slug: string;
    posts: PostTagProps[];
}

interface PostTypeChoiceProps {
    id: number;
    post: PostProps;
    postId: number;
    type: PostType;
    content: PostContentProps;
}
interface PostContentProps {
    id: number;
    postType: PostType;
    postTypeId: number;
    content: string;
}
