function isAuthorized(ownedPerms, perms) {
    if(Array.isArray(perms))
        return perms.some((perm) => ownedPerms[perm]);
    else if(typeof perms === 'string')
        return Boolean(ownedPerms[perms]);
    else return false;
}

export default isAuthorized;
