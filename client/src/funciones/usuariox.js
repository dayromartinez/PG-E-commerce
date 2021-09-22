export default async function usuariox(id) {

    var profile= await fetch (`http://localhost:4000/auth/profile/${id}`);
    profile= await profile.json();
    return profile;
};