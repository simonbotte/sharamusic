const useContentInfo = (content) => {
    const getContentInfo = () => {
        switch (content.type) {
            case "artists":
                return {
                    title: content.attributes.name,
                    description: '',
                    type: 'artist'
                };
            case "albums":
                return {
                    title: content.attributes.name,
                    description: ` · ${content.attributes.artistName}`,
                    type: 'album'
                };  
            case "songs":
                return {
                    title: content.attributes.name,
                    description:` · ${content.attributes.artistName}`,
                    type: 'song'
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
