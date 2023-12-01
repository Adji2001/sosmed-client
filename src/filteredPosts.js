export const getFilteredPosts = (posts, keyword) => {
    if (keyword) {
      const isKeywordExist = (array, string) => array.toLowerCase().includes(string);
  
      return posts.filter((post) => isKeywordExist(post.desc, keyword));
    }
    return posts;
  };