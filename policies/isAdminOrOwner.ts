import { AuthUserProps } from "types/all";

type IsOwnerOrSuperAdmin = {
    ownerId: number;
    user: AuthUserProps;
}

export const isOwner = async (props: IsOwnerOrSuperAdmin) => {
    const { ownerId, user } = props
    return ownerId === user.id;
}


export const isSuperAdmin = async (user: AuthUserProps) => {
    const roles = user.roles;
    return roles.some((role) => role.roleSlug === 'super_admin');
}


export const isOwnerOrSuperAdmin = async (props: IsOwnerOrSuperAdmin) => {
    const {ownerId, user} = props;
    const isOwnerResponse = await isOwner({
        ownerId: ownerId,
        user: user
    });

    const isSuperAdminReponse = await isSuperAdmin(user);

    return isOwnerResponse || isSuperAdminReponse;
}