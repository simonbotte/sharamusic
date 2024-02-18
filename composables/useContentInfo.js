const useContentInfo = (content) => {
    const getContentInfo = () => {
        console.log(content.value);
        switch (content.type) {
            case "artists":
                return {
                    title: content.attributes.name,
                    description: "Artiste",
                };
            case "albums":
                return {
                    title: content.attributes.name,
                    description: `Album · ${content.attributes.artistName}`,
                };
            case "songs":
                return {
                    title: content.attributes.name,
                    description: `Morceau · ${content.attributes.artistName}`,
                };
            default:
                return {
                    title: content.name,
                    description: content.path,
                };
        }
    };
    return { getContentInfo };
};
export default useContentInfo;
