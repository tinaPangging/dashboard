
export const initials = (user) => {
    let initials = "";
    const name = user ? user : "";
    
    if (user) {
        initials = name.match(/ \w/g);
        initials = name[0] + (initials ? initials[0].trim()[0].toUpperCase() : "");
    }

    return initials;
};
